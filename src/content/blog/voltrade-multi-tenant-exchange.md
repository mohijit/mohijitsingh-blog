---
title: "Building Voltrade: architecture of a hosted, multi-tenant trading-exchange simulator"
description: "How Voltrade is structured — the registry of independent exchanges, the auth and persistence model, the bot fleet, and the process of getting there."
date: 2026-07-18
tags: ["engineering", "voltrade"]
---

Voltrade is a FastAPI trading-exchange simulator: order books, a matching
engine, a fleet of bots that make markets and push prices around, and a
browser client people actually trade in. It started as a single-tenant
program — one exchange, one set of order books, one bot population, one
SQLite file — which is a perfectly good shape for running one classroom
session, and the wrong shape for a *hosted* product where anyone should be
able to spin up their own independent session at any time. This post is about
the architecture that separates those two things, and the process of getting
from one to the other without ever touching the one component that had to
stay untouched: the matching engine itself.

## The core move: a registry of exchanges, not one exchange

The organizing decision is a single `ExchangeRegistry` that owns a dictionary
of independent `Exchange` objects, keyed by exchange ID. Each `Exchange`
carries its own order books, its own bot population (roughly five bot
archetypes — market makers, momentum, mean-reversion, noise, and
options/ETF-arbitrage traders — spawned and namespaced per exchange so bot IDs
never collide across sessions), its own tick loop, and its own row of
persisted state in SQLite. `registry.create()` spins up five background
asyncio tasks per exchange (tick loop, trade consumer, persist loop, snapshot
broadcaster, session-timer loop); `registry.destroy()` cancels all of them and
drops the exchange from memory, without touching its database row, so a
closed exchange's history stays inspectable afterward. One FastAPI process
hosts N of these side by side, and nothing is shared between them beyond the
process itself.

```tikz
\node[draw, rectangle, minimum width=3.2cm, minimum height=0.9cm] (reg) at (0,3) {ExchangeRegistry};
\node[draw, rectangle, minimum width=2.4cm, minimum height=0.8cm] (e1) at (-3.2,1) {Exchange A};
\node[draw, rectangle, minimum width=2.4cm, minimum height=0.8cm] (e2) at (0,1) {Exchange B};
\node[draw, rectangle, minimum width=2.4cm, minimum height=0.8cm] (e3) at (3.2,1) {Exchange C};
\node[draw, rectangle, minimum width=3cm, minimum height=0.8cm] (b1) at (-3.2,-1.2) {bots + SQLite};
\node[draw, rectangle, minimum width=3cm, minimum height=0.8cm] (b2) at (0,-1.2) {bots + SQLite};
\node[draw, rectangle, minimum width=3cm, minimum height=0.8cm] (b3) at (3.2,-1.2) {bots + SQLite};
\draw[->] (reg) -- (e1);
\draw[->] (reg) -- (e2);
\draw[->] (reg) -- (e3);
\draw[->] (e1) -- (b1);
\draw[->] (e2) -- (b2);
\draw[->] (e3) -- (b3);
```

The guiding constraint through this whole redesign was that the matching
engine itself — the part that actually crosses orders and prices trades —
never gets touched. Everything above it (registry, auth, persistence,
admin surface) gets rebuilt to be exchange-scoped; the core matching logic
that was already correct stays exactly as it was, just instantiated N times
instead of once. Keeping that boundary firm made the rest of the migration
tractable: every change could be reasoned about as "how does this piece
become aware of an exchange ID," not "does this change matching behavior."

## Auth needed a second axis

A single exchange only ever had to answer one question: is this caller the
admin, yes or no. A registry of exchanges needs a second one — admin *of
which exchange*. The scoped model is a JWT bearer token plus a
database-backed membership check: a request handler resolves the token to a
user, looks up that user's role for the specific `exchange_id` in the
request path, and only proceeds if the role is `host`. Every admin action —
managing participants, configuring the session, running scenarios — is
defined as a route under `/exchanges/{exchange_id}/admin/*` and goes through
that same check, so authorization is always asked "for this exchange"
rather than "in general."

Designing this meant deciding, up front, that authorization couldn't be a
global boolean anywhere in the codebase — every place that used to check "is
this an admin" had to be rewritten to check "is this user a host of exchange
X," which is a bigger, more mechanical rewrite than it sounds, since it
touches every admin-facing route rather than a single auth module.

## Persisting configuration without a schema migration for every setting

Exchanges accumulate host-configurable settings over time — position limits,
session parameters, display preferences — and a lot of them are the kind of
thing you want to add without writing a database migration each time. The
pattern settled on is a single `settings_json` column on the `exchanges`
table: reading a setting means parsing that JSON blob and pulling out a key;
writing one means read-merge-write — load the existing blob, merge in the
new key, write the whole thing back — so new configurable features get a
new JSON key rather than a new column. On server restart, the boot sequence
re-creates each exchange via the registry and then replays its
`settings_json` back onto the fresh `Exchange` object, so a host's
configuration survives a redeploy without any of it living only in memory.

## The bot fleet as a first-class citizen, not a test fixture

The bots aren't a demo feature bolted on for realism — they're the mechanism
that gives the market something to trade against when human participants
are thin, and they're deliberately heterogeneous: market makers quoting both
sides for spread, momentum traders chasing recent moves, mean-reversion bots
fading them, noise traders adding baseline volume, and specialist bots
covering options and ETF arbitrage relationships. Making this work per
exchange rather than globally meant namespacing every bot's identity by
exchange ID at spawn time, so two exchanges running simultaneously never
share a participant ID space, and treating the bot fleet as part of what
`registry.create()` provisions rather than something started separately —
an exchange isn't "open" until its market has actual participants in it,
even before a single human logs in.

## The client side: a trading UI and an embedded Python terminal

The browser client is a WebSocket-driven trading UI — order entry, a live
order book, positions, P&L — talking to an exchange over a per-exchange
socket. Layered on top of that is an in-browser Python terminal (via
Pyodide, a WebAssembly build of CPython) that exposes the exchange over a
small Python wrapper class — `snapshot()`, `price()`, `positions()`, async
`buy`/`sell` — so a trader can script strategies against the live market
instead of only clicking buttons. That wrapper is deliberately thin: it's a
Pythonic face on the same WebSocket messages the JS UI already sends and
receives, not a second protocol. Building it meant designing the exchange's
outbound "snapshot" message to carry enough structured data (prices,
depth, positions, instrument metadata) that both the JS rendering layer and
the Python wrapper could be built directly on top of it, rather than
maintaining two separate data feeds for two separate frontends.

## Documentation as part of the build, not after it

Two wikis — one for traders, one for hosts — describe the platform's API and
features in prose, and treating them as part of the same change as the code
they describe (rather than a follow-up pass) turned out to matter more than
expected once the surface area grew: a REST endpoint's shape, a UI label, a
default parameter value are all things that drift the moment they're
described once and then left alone while the code keeps moving. The
practical process that emerged was to update the relevant wiki section in
the same change that touched the feature, on the theory that the only
reliable moment to fix documentation is while the context for what changed
is still in your head — not as a separately scheduled "docs pass" later.

## What the migration actually looked like, step by step

Roughly, in order: design the `ExchangeRegistry`/`Exchange` split and get one
exchange running through it end-to-end with no behavior change from the old
single-tenant version; move the matching engine underneath the new structure
without modifying its internals; rebuild authorization around
`(user, exchange_id) → role` instead of a single global flag; move
per-exchange configuration onto the `settings_json` pattern so new settings
don't each need a schema change; make the bot fleet spawn and namespace
itself per exchange as part of exchange creation; and finally extend the
client (trading UI and Python terminal) to address a specific exchange by ID
rather than assuming there's only one. Each of those was landed and verified
independently before the next started, specifically so that "does this still
match orders correctly" never had to be re-litigated at the same time as
"does this now support more than one exchange."

## Where it's headed

The next horizon is less about the single-exchange internals and more about
the platform around them: consolidating the news/scenario/session-timer
surface into one coherent event model instead of three overlapping views of
the same underlying mechanism, moving the app onto its own subdomain behind
a small portfolio hub, and — once there's enough load to justify it — lazily
hydrating idle exchanges instead of running every bot loop for every
exchange regardless of whether anyone's connected. None of that changes the
core registry-of-exchanges shape; it's the same architecture, carried
further out toward the edges.
