---
title: "Building Voltrade: a hosted, multi-tenant trading-exchange simulator"
description: "How Voltrade went from one global exchange object to a registry of independent exchanges, and the real bugs — some fixed, one still open — that came with it."
date: 2026-07-18
tags: ["engineering", "voltrade"]
---

Voltrade is a FastAPI trading-exchange simulator: order books, a matching engine, a bot fleet that makes markets and pushes prices around, and a browser client people actually trade in. The original version had exactly one exchange. One set of order books, one set of bots, one SQLite file, one admin token. That's a fine shape for a single classroom session, and it's a bad shape for a hosted product — the moment a second person wants to run their own session at the same time as mine, "one exchange" stops being a simplification and starts being a wall.

The rebuild replaces the single global exchange with an `ExchangeRegistry` that owns a dictionary of independent `Exchange` objects, each with its own order books, its own ~63-bot population (market makers, momentum, mean-reversion, noise, options and ETF arb — see the naming convention documented right in `spawn_bots`), its own tick loop, and its own persisted SQLite rows. `registry.create()` spins up five background tasks per exchange — tick loop, trade consumer, persist loop, snapshot loop, session-timer loop — and `registry.destroy()` cancels all of them and drops the exchange from memory without touching its DB row, so a closed exchange can still be inspected later. One FastAPI process, N exchanges, no shared mutable state between them.

```tikz
\node[draw, rectangle, minimum width=3.2cm, minimum height=0.9cm] (reg) at (0,3) {ExchangeRegistry};
\node[draw, rectangle, minimum width=2.4cm, minimum height=0.8cm] (e1) at (-3.2,1) {Exchange A};
\node[draw, rectangle, minimum width=2.4cm, minimum height=0.8cm] (e2) at (0,1) {Exchange B};
\node[draw, rectangle, minimum width=2.4cm, minimum height=0.8cm] (e3) at (3.2,1) {Exchange C};
\node[draw, rectangle, minimum width=3cm, minimum height=0.8cm] (b1) at (-3.2,-1.2) {63 bots + SQLite};
\node[draw, rectangle, minimum width=3cm, minimum height=0.8cm] (b2) at (0,-1.2) {63 bots + SQLite};
\node[draw, rectangle, minimum width=3cm, minimum height=0.8cm] (b3) at (3.2,-1.2) {63 bots + SQLite};
\draw[->] (reg) -- (e1);
\draw[->] (reg) -- (e2);
\draw[->] (reg) -- (e3);
\draw[->] (e1) -- (b1);
\draw[->] (e2) -- (b2);
\draw[->] (e3) -- (b3);
```

## Auth had to grow a dimension it never had

A single exchange only ever needed one question: is this the admin, yes or no? A registry of exchanges needs a second one: admin *of which exchange*. The current model is a JWT bearer token plus a DB-backed membership check — `_require_host(exchange_id, request)` verifies the token, looks up `(exchange_id, user_id)` in an exchange-membership table, and requires `role == "host"` before letting a request through to any `/exchanges/{exchange_id}/admin/*` route. That's the path every scoped admin action — kick, position limits, scenarios, news — actually goes through now.

The old single-token model didn't just get replaced, though — it's still sitting in `app.py` as a long, still-functional block of `/api/admin/*` routes gated by comparing a query-string or body `token` against `EXCHANGE_ADMIN_TOKEN`, and every one of them operates on a bare module-level `exchange` variable instead of anything scoped to an exchange ID. It predates multi-tenancy and it shows: it's the one place in the codebase where "the exchange" still means a single global object. It's mostly unused now that the scoped routes cover the same ground, but ripping it out safely means confirming nothing external still calls it, so for now it's the textbook artifact of a migration — the old interface left running next to the new one because deleting it is a separate, riskier task from building the replacement.

## A bug that only exists because URLs have a spec

Moving the app to `trade.mohijitsingh.com` broke something that had nothing to do with the domain itself and everything to do with how the admin console's embedded Terminal tab decided whether to load. The tab lazily navigates an `<iframe>` the first time you click it, and the old check for "has this already loaded" was `frame.src.includes("/trade")`. That worked by accident on the old domain. On the new one it doesn't, because an iframe's `.src` getter is specified to resolve relative to the *current document* — an iframe that has never been navigated reports its own containing page's URL as its `src`. And the containing page's URL is `https://trade.mohijitsingh.com/...`, which already contains the substring `/trade`. So the "already loaded" check was true before the iframe had ever loaded anything, and the terminal tab silently stayed blank forever.

The fix is the obvious one once you see the actual failure mode — stop asking the DOM to tell you something it structurally can't answer, and track the fact yourself:

```js
if (frame && !frame.dataset.navigated) {
  frame.dataset.navigated = "1";
  frame.src = `/exchanges/${EID}/trade`;
} else if (frame && frame.contentWindow) {
  frame.contentWindow.postMessage({ type: "voltrade-tab-visible" }, "*");
}
```

An explicit flag instead of sniffing derived state. It's a small bug, but it's the kind that only ever shows up when you change an input (the hostname) that the original author had implicitly assumed would never contain the wrong substring.

## Sector is public, not proprietary

Voltrade's price model correlates instruments through a factor decomposition — return on each name is a mix of a market factor, a sector factor, and idiosyncratic noise, calibrated per instrument via a `sector` field and a `sector_beta` loading. That grouping is a modeling convenience: two names get grouped together because it makes their correlation behave right, not because the grouping is meant to describe anything to a trader. A firm can sit in the "Defense" bucket for correlation purposes while being the kind of company you'd actually call "Industrials."

Those got conflated for a while, so `Instrument` now carries a second, separate field — `display_sector` — that exists purely as the human-readable label, and it's `display_sector`, not the internal `sector`, that goes out through `Exchange.snapshot()` under the `"sector"` key. That's the field both the JS trading UI's bio panel and the in-browser Python terminal's `exchange.snapshot()` actually see. The decision behind exposing it at all was simple once framed correctly: an industry classification is reference data, the same category of thing as a GICS or NAICS code — there's no reason a trader shouldn't know what sector a stock is in, and pretending otherwise was just an accident of the field being used internally first.

## Position limits, actually working this time

Position limits were always enforced by the matching engine and always documented in the admin wiki, but the only thing that could ever configure them was the legacy global-exchange endpoint — meaning for any exchange created after multi-tenancy shipped, there was no surface to turn them on at all. The docs described a feature that had quietly stopped being reachable.

The rebuilt version is a proper scoped feature: `GET`/`POST /exchanges/{exchange_id}/admin/position-limits`, host-only, with a global default and per-instrument overrides. Configuration is persisted in the `exchanges` table's `settings_json` column via a read-merge-write — load the existing JSON blob, merge in the new `position_limits` key, write the whole blob back — rather than a dedicated column, and it's rehydrated into the live `Exchange` object on server restart so a host's configuration survives a redeploy. It's a small feature, but it's the kind of thing that's easy to leave silently broken, because "the wiki still describes it" looks a lot like "it still works" until someone actually tries to use it on a new exchange.

## Kicking someone used to leave their orders behind

Kicking a participant removed them from the exchange's participant table and closed their WebSocket, but it didn't touch their resting orders — so a kicked trader's limit orders stayed live on the book, filling against other people, with nobody around who could see or cancel them. The fix is one call, made in the right order: `cancel_all_for_participant(pid)` now runs before the kick closes the connection, so a kicked participant leaves no orphaned liquidity behind. It's the kind of bug that's invisible in a quick admin-panel check (the participant list looks right immediately) and only shows up later, as unexplained fills against someone who's no longer there.

## Two Python terminals, one exchange, one API — mostly

The in-browser Python terminal exists in two places: a standalone Monaco-editor page (`pyterm.html`/`pyterm.js`) and a version embedded directly in the main trading UI (inside `trader.js`). Both wrap the same underlying WebSocket connection in a hand-rolled `class Exchange:` — `snapshot()`, `price()`, `positions()`, async `buy`/`sell` — because Pyodide code needs *something* Pythonic to call. The problem was that the two wrappers had drifted: two independent implementations of what's supposed to be the same API, maintained by hand, with no shared source. A recent pass brought their method surfaces back in line with each other. They're not literally the same file — `pyterm.js` and `trader.js` still each define their own `class Exchange`, wired to differently-named JS bridges — so this is closer to "resynchronized by hand, again" than "unified into one shared module." That's worth being honest about: it's a fix, not a structural guarantee that they can't drift apart a third time.

Related, and smaller: the docs claimed `numpy` was available in the terminal, but nothing was actually loading it — Pyodide bundles a minimal runtime by default and you have to ask for packages explicitly. The fix was `await pyodide.loadPackagesFromImports(code)` before running a snippet, which scans the code for its actual `import` statements and lazily fetches just those packages, rather than bundling everything upfront on every page load or leaving common libraries silently missing. Both terminal implementations now call it.

## Docs drift both ways

The wikis (`wiki.html` for traders, `admin-wiki.html` for hosts) are supposed to describe the current API, and after enough feature churn they stop doing that in both directions — sometimes the docs go stale, sometimes, as with position limits, the UI is what quietly fell behind while the wiki kept describing the feature correctly. The position-limits rebuild is a concrete example either way: the admin-wiki's REST reference for the old `/api/admin/position_limits` endpoint described a request/response shape (a `token` field, an `instrument_limits` key, a `limits` key in the response) that no longer matches the new scoped endpoint's actual shape (JWT auth, `overrides` in and out). That reference got rewritten as part of the same change, not as a separate cleanup pass — which is really the only way doc rot gets fixed in practice: while you're already in the code that made the docs wrong.

## What's still broken

The admin console's tab bar and topbar have a real layout bug on narrow screens — tabs overlap or get clipped. I've tried to fix it twice. Both attempts made the narrow-screen case better and broke something on normal desktop widths that hadn't been broken before, and both got reverted the same day. As of today the original narrow-screen bug is back, and it's staying that way until there's a fix that doesn't trade one regression for another.

The honest lesson isn't "CSS is hard," it's that both fix attempts looked correct from automated, screenshot-based checks at one or two viewport sizes and weren't actually re-checked across the *range* of sizes that matter before shipping. A screenshot at 1440px and a screenshot at 375px both looking fine doesn't mean the CSS is fine — it means those two exact widths are fine. Reverting twice rather than shipping a worse fix was the right call, but it means this is currently an open bug, not a solved one.
