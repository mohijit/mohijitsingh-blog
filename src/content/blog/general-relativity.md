---
title: "General relativity, from two puzzles to an expanding universe"
description: "How the equivalence of gravitational and inertial mass leads to spacetime curvature, the Friedmann equations, and gravity's uneasy relationship with quantum mechanics."
date: 2026-07-05
tags: ["physics"]
---

Two puzzles sat inside Newtonian gravity, mostly ignored because the theory
worked so well.

**Puzzle one.** Newtonian gravity is an instantaneous action at a distance: move
the Sun, and Earth's orbit is supposed to respond *immediately*, no matter how
far apart they are. Special relativity (1905) says nothing — no force, no
signal, no information — propagates faster than light. Newtonian gravity
quietly violates this.

**Puzzle two**, older and stranger: in Newton's second law, $F=m_i a$, the mass
$m_i$ measures resistance to acceleration (inertial mass). In the law of
gravity, $F=Gm_gM/r^2$, the mass $m_g$ measures how strongly something is pulled
by gravity (gravitational mass). These are conceptually different roles — one is
about inertia, the other about coupling to a force — yet experimentally
($m_g/m_i$ has been measured to be constant to extraordinary precision going
back to Galileo-era drop experiments and refined by Eötvös-type torsion-balance
tests) they are *always equal*. Newtonian mechanics has no explanation for
this; it's simply asserted as a coincidence.

Einstein took puzzle two seriously as a clue rather than a coincidence, and it
led somewhere much stranger than a patch to Newton.

## The equivalence principle

If gravitational and inertial mass are always equal, then every object,
regardless of its mass or composition, accelerates identically in a
gravitational field — exactly what happens in an *accelerating reference
frame* with no gravity at all. Einstein's thought experiment: you're in a
sealed elevator. If it's sitting on Earth's surface, you feel your weight
pulling you down. If instead it's in deep space, far from any mass, being
accelerated upward by a rocket at $g$, you feel *exactly the same thing* — pushed
against the floor with the same force, dropped objects falling at the same rate.
With no windows, there is no experiment you can perform inside the elevator to
tell the two situations apart.

This is the **equivalence principle**: locally, gravity and acceleration are
indistinguishable. It's a genuine physical input, not something derived from
something more basic — it's the observation that launches the whole theory.

Here's the leap it invites. In an accelerating frame with no gravity, straight,
force-free trajectories (as seen from an inertial frame) *look curved* when
plotted in the accelerating frame's coordinates. If gravity is locally the same
thing as being in such a frame, then perhaps what we call "the force of
gravity" isn't a force pulling objects off straight paths at all — it's that
spacetime itself is curved, and objects in free fall are simply following the
straightest paths available to them through that curved spacetime. Gravity
becomes geometry.

## Spacetime, metrics, and geodesics

Special relativity already unified space and time into a single 4-dimensional
spacetime, with the flat **Minkowski metric**

$$
ds^2 = -c^2dt^2+dx^2+dy^2+dz^2,
$$

which measures the spacetime interval along a path (physically, $ds^2<0$ for
paths a massive object can actually follow, with $-ds^2/c^2$ giving the squared
proper time — the time a clock carried along that path would actually read).

General relativity's move is to let this metric become a general, position-
dependent object $g_{\mu\nu}(x)$, so that

$$
ds^2 = g_{\mu\nu}\,dx^\mu dx^\nu
$$

(Einstein summation: repeated upper/lower indices are summed), reducing to the
flat Minkowski form only in special cases (far from any mass, or in a small
enough local patch — this is the precise sense in which the equivalence
principle holds only *locally*). Free-falling objects — no rockets, no
surfaces pushing back — follow **geodesics**: paths that locally extremize
proper time. The geodesic equation is

$$
\frac{d^2x^\mu}{d\tau^2} + \Gamma^\mu_{\alpha\beta}\frac{dx^\alpha}{d\tau}\frac{dx^\beta}{d\tau} = 0.
$$

Rather than just stating this, it's worth actually deriving it, because the
derivation is genuinely tractable — it's ordinary calculus of variations, not
differential geometry — and it tells you exactly what $\Gamma^\mu_{\alpha\beta}$
*is* rather than just what it's for.

**Deriving the geodesic equation.** "Extremize proper time" is easiest to work
with in the equivalent form of extremizing the "energy" functional

$$
S[x] = \int L\,d\tau, \qquad L = g_{\mu\nu}(x)\,\dot x^\mu \dot x^\nu,
\qquad \dot x^\mu \equiv \frac{dx^\mu}{d\tau},
$$

along a curve $x^\mu(\tau)$ with fixed endpoints (extremizing this $L$ gives
the same paths as extremizing $\int\sqrt{-g_{\mu\nu}\dot x^\mu\dot x^\nu}\,d\tau$
directly, without the awkwardness of a square root, provided $\tau$ is an
*affine* parameter along the path — which proper time is). This is exactly a
Lagrangian mechanics problem, so the Euler–Lagrange equation applies:

$$
\frac{d}{d\tau}\frac{\partial L}{\partial \dot x^\alpha} - \frac{\partial L}{\partial x^\alpha} = 0.
$$

Compute each piece. Since $L=g_{\mu\nu}\dot x^\mu\dot x^\nu$,

$$
\frac{\partial L}{\partial \dot x^\alpha} = 2g_{\alpha\nu}\dot x^\nu
\quad\Longrightarrow\quad
\frac{d}{d\tau}\left(2g_{\alpha\nu}\dot x^\nu\right)
= 2(\partial_\beta g_{\alpha\nu})\dot x^\beta\dot x^\nu + 2g_{\alpha\nu}\ddot x^\nu,
$$

using the chain rule to expand $\frac{d}{d\tau}g_{\alpha\nu}(x(\tau)) = (\partial_\beta g_{\alpha\nu})\dot x^\beta$. And directly,

$$
\frac{\partial L}{\partial x^\alpha} = (\partial_\alpha g_{\mu\nu})\dot x^\mu\dot x^\nu.
$$

Substituting into Euler–Lagrange:

$$
2g_{\alpha\nu}\ddot x^\nu + 2(\partial_\beta g_{\alpha\nu})\dot x^\beta\dot x^\nu - (\partial_\alpha g_{\beta\nu})\dot x^\beta\dot x^\nu = 0.
$$

The middle term is being contracted with $\dot x^\beta\dot x^\nu$, which is
symmetric in $\beta,\nu$, so only the symmetric part of $\partial_\beta
g_{\alpha\nu}$ in those two indices actually contributes; that lets us
symmetrize it for free as $\tfrac12\big[(\partial_\beta g_{\alpha\nu})+(\partial_\nu g_{\alpha\beta})\big]$
without changing the equation. So:

$$
2g_{\alpha\nu}\ddot x^\nu + \big(\partial_\beta g_{\alpha\nu}+\partial_\nu g_{\alpha\beta}-\partial_\alpha g_{\beta\nu}\big)\dot x^\beta\dot x^\nu = 0.
$$

Finally, multiply through by the inverse metric $g^{\mu\alpha}$ (defined by
$g^{\mu\alpha}g_{\alpha\nu}=\delta^\mu_\nu$) and divide by $2$:

$$
\ddot x^\mu + \underbrace{\tfrac12 g^{\mu\alpha}\big(\partial_\beta g_{\alpha\nu}+\partial_\nu g_{\alpha\beta}-\partial_\alpha g_{\beta\nu}\big)}_{\displaystyle \Gamma^\mu_{\beta\nu}}\dot x^\beta \dot x^\nu = 0.
$$

That's the geodesic equation, and the derivation *hands you* the Christoffel
symbol formula

$$
\Gamma^\mu_{\alpha\beta} = \tfrac12 g^{\mu\nu}\big(\partial_\alpha g_{\nu\beta}+\partial_\beta g_{\nu\alpha}-\partial_\nu g_{\alpha\beta}\big)
$$

as a byproduct, rather than as a separately-asserted definition. Every piece
of it is now visibly just "derivatives of the metric," built entirely from
extremizing a genuinely simple functional. This is the one piece of real
tensor calculus in this post carried all the way through — everything past
this point (the Riemann tensor, the Ricci tensor, the field equations
themselves) builds on the same $\Gamma^\mu_{\alpha\beta}$ but takes further
derivatives and contractions that I'm not deriving here.

## Recovering Newton, as a limit

Before getting to what determines curvature, it's worth checking that the
geodesic equation just derived actually reduces to something familiar when
gravity is weak — because if it didn't, none of this would deserve to be
called a generalization of Newtonian gravity at all.

Take a **weak, static field**: write the metric as $g_{\mu\nu} = \eta_{\mu\nu} + h_{\mu\nu}$,
where $\eta_{\mu\nu} = \mathrm{diag}(-1,1,1,1)$ is the flat Minkowski metric
and $|h_{\mu\nu}|\ll1$ is a small perturbation with no time dependence
($\partial_0 h_{\mu\nu}=0$). Take a **slowly moving particle**: its spatial
velocity is small compared to $c$, so along its worldline $|dx^i/d\tau| \ll
|dx^0/d\tau|$, meaning the $\dot x^0\dot x^0$ term dominates every other term
in the geodesic equation's sum over $\beta,\nu$.

Keeping only that dominant term, the spatial components of the geodesic
equation reduce to

$$
\ddot x^i + \Gamma^i_{00}(\dot x^0)^2 \approx 0.
$$

Now evaluate $\Gamma^i_{00}$ from the formula just derived. Because the field
is static, $\partial_0 g_{\alpha 0}=0$ for every $\alpha$, which kills two of
the three terms in $\Gamma^i_{00}=\tfrac12g^{i\nu}(\partial_0g_{\nu0}+\partial_0g_{\nu0}-\partial_\nu g_{00})$,
leaving just

$$
\Gamma^i_{00} = -\tfrac12 g^{i\nu}\partial_\nu g_{00} \approx -\tfrac12\partial_i g_{00}
$$

(to leading order in $h$, the inverse metric is just $g^{i\nu}\approx\eta^{i\nu}=\delta^{i\nu}$,
and $\partial_\nu g_{00}$ is only nonzero for spatial $\nu=i$ since the field
is static). Substituting back and converting $\tau$-derivatives to
ordinary-time derivatives (for a slow particle $\tau\approx t$, and $\dot
x^0=c\,dt/d\tau\approx c$):

$$
\frac{d^2x^i}{dt^2} = \frac{c^2}{2}\,\partial_i g_{00}.
$$

Compare this directly against Newton's second law for motion in a
gravitational potential $\Phi$, $\dfrac{d^2x^i}{dt^2} = -\partial_i\Phi$.
Matching the two forces $g_{00}$ and $\Phi$ to describe the *same physical
motion* requires

$$
\partial_i g_{00} = -\frac{2}{c^2}\partial_i\Phi
\quad\Longrightarrow\quad
g_{00} = -1 - \frac{2\Phi}{c^2}
$$

(the integration constant is fixed by requiring $g_{00}\to-1$, the flat-space
value, as $\Phi\to0$ far from any mass). This is a genuinely satisfying
result: a single component of the metric, in the weak-field limit, *is* the
Newtonian potential, up to the constants needed to match units. Newtonian
gravity isn't a separate theory patched onto General Relativity — it's
exactly what General Relativity's geodesic equation says in the regime of
weak fields and slow speeds, derived here rather than assumed.

This result also pins down gravitational time dilation properly, rather than
leaving it as a verbal argument. Proper time along a slowly-moving worldline
relates to coordinate time via $d\tau = \sqrt{-g_{00}}\,dt \approx
\left(1+\dfrac{\Phi}{c^2}\right)dt$ (Taylor-expanding the square root to
leading order in $\Phi/c^2$, using $g_{00}\approx-1-2\Phi/c^2$). Two clocks
sitting at fixed positions with potentials $\Phi_1,\Phi_2$ therefore
accumulate proper time at the rate

$$
\frac{d\tau_2}{d\tau_1} \approx 1 + \frac{\Phi_2-\Phi_1}{c^2},
$$

which is the precise, derived form of gravitational time dilation: a clock
higher up (less negative $\Phi$, since $\Phi<0$ near a mass and $\Phi\to0$ far
away) runs fast relative to one lower down. This is exactly the effect GPS
satellites have to correct for, now obtained from the metric rather than
asserted from the equivalence principle alone.

## The field equations (stated, not derived)

What determines the curvature itself? Einstein's field equations:

$$
G_{\mu\nu} = \frac{8\pi G}{c^4}T_{\mu\nu}.
$$

Here $T_{\mu\nu}$ (the stress-energy tensor) encodes the density and flow of
energy, momentum, and pressure at each point, and $G_{\mu\nu}$ (the Einstein
tensor, built from the Ricci curvature tensor and scalar, which are themselves
built from derivatives of the Christoffel symbols) encodes spacetime's
curvature. I am stating this equation, not deriving it — arriving at it (whether
via Einstein's own physical reasoning process over 1907–1915, or via a modern
action-principle derivation from the Einstein–Hilbert action) is a genuinely
substantial piece of graduate-level differential geometry and physics that
doesn't fit honestly into a single post. The right one-line summary, due to
John Wheeler, is still worth having precisely because it's actually accurate,
not just a slogan: *spacetime tells matter how to move; matter tells spacetime
how to curve.*

(A common visual aid for curvature is a heavy ball sitting on a stretched
rubber sheet, with lighter balls rolling toward it along the sheet's curve.
It's worth flagging honestly that this analogy is weaker than it looks: the
ball dents the sheet, and rolls toward the dent, because of *ordinary 3D
gravity* pulling on it — the analogy silently uses gravity to explain gravity.
It's fine as a first mental picture for "curvature guides motion," but it
doesn't actually explain why mass curves spacetime in the first place.)

## A real worked payoff: the Friedmann equations

Rather than stopping at "the field equations exist," it's worth actually
following them through in one genuinely tractable case: a universe that is
homogeneous and isotropic — the same in every direction, from every point,
which is an excellent approximation to our actual universe on large scales.

The metric describing such a universe (the **Friedmann–Lemaître–Robertson–Walker**,
or FLRW, metric) is:

$$
ds^2 = -c^2dt^2 + a(t)^2\left[\frac{dr^2}{1-kr^2}+r^2(d\theta^2+\sin^2\theta\,d\phi^2)\right],
$$

where $a(t)$ is the **scale factor** (an overall size of space, growing or
shrinking with time) and $k\in\{-1,0,+1\}$ fixes the universe's overall spatial
curvature (open, flat, or closed).

To be honest about what's happening here: I am *not* re-deriving the field
equations or grinding through the full tensor computation of $G_{\mu\nu}$ for
this particular metric (that computation, done properly, involves computing all
the Christoffel symbols for this metric and then the Ricci tensor from them —
mechanical but lengthy). What I can do honestly is take that computation's
result and walk through *why* each term has the form it does. Plugging the
FLRW metric into the field equations, with $T_{\mu\nu}$ for a uniform fluid of
energy density $\rho$ and pressure $P$, produces the **first Friedmann
equation**:

$$
\left(\frac{\dot a}{a}\right)^2 = \frac{8\pi G}{3}\rho - \frac{kc^2}{a^2}.
$$

Read it physically, left to right. $\dot a/a$ is the fractional rate of change
of the universe's size — literally the expansion (or contraction) rate. The
equation says this rate squared is driven by two things: the energy density
$\rho$ (more stuff, more curvature, faster expansion — this term has exactly
the flavor of the field equations' "matter tells spacetime how to curve," now
with curvature manifesting as an expansion rate rather than a planetary orbit),
minus a correction from the spatial curvature $k$ (a closed universe, $k=+1$,
has an extra term working against expansion; a flat universe, $k=0$, drops that
term entirely).

This is precisely the equation **Alexander Friedmann** derived in 1922 and
**Georges Lemaître** derived independently a few years later (also connecting it
to the observed recession of galaxies, ahead of Hubble's more famous
observational confirmation) — and it was a startling prediction on its own
terms. Nothing about "the universe expands or contracts" was built into General
Relativity by hand; it fell straight out of solving the field equations for the
simplest possible matter distribution. At the time, a static, unchanging
universe was the default assumption (Einstein himself initially added an extra
term — the cosmological constant — specifically to try to force a static
solution, later reportedly regretting it once expansion was observed). The
Friedmann–Lemaître solution said: a static universe isn't a generic outcome of
General Relativity at all; expansion or contraction is.

## Predictions

A few of the theory's testable consequences, each traceable back to the same
curved-spacetime picture:

- **Gravitational time dilation and redshift**, derived above from $g_{00}$: a
  clock lower in a gravitational potential runs slow relative to one higher
  up. For light, the same effect shows up as a drop in frequency climbing out
  of a potential well — **gravitational redshift**. This has been measured
  directly (clocks at different altitudes measurably disagree) and is precise
  enough that GPS satellites must correct for it.
- **Light bending.** Light follows geodesics too, and a geodesic passing near a
  massive body bends. This was the theory's first dramatic public confirmation:
  Arthur Eddington's 1919 solar eclipse expedition measured starlight bending
  around the Sun by an amount matching Einstein's prediction (roughly twice the
  Newtonian estimate you'd get from treating light as a very fast, very light
  particle) rather than the Newtonian one.
- **The expanding universe**, as derived above.
- **Gravitational waves** — ripples in the metric itself, propagating at $c$,
  predicted as a consequence of the field equations for time-varying mass
  distributions, and directly detected for the first time by LIGO in 2015 from
  a black hole merger.
- **Black holes** — regions where the field equations, applied to sufficiently
  concentrated mass, predict curvature so extreme that not even light can
  escape past a boundary (the event horizon). This is a genuine, if extreme,
  consequence of the same equations rather than a separate add-on.

## General relativity and quantum mechanics

The two great theories of 20th-century physics do not currently fit together,
and it's worth being precise about *why*, rather than leaving it as a vague
"they're incompatible."

General relativity treats spacetime as a smooth, deterministic geometric object
— curvature is a definite, continuous field. Quantum mechanics treats every
other known field (electromagnetic, the nuclear forces) as fundamentally
probabilistic, subject to quantization, uncertainty, and superposition. The
naive move — try to quantize gravity the same way electromagnetism was
quantized, treating small ripples in $g_{\mu\nu}$ as a quantum field the way
photons are ripples in the electromagnetic field — runs into a specific
technical wall: the resulting theory is **non-renormalizable**. Loosely, this
means that when you try to compute physical predictions (like scattering
probabilities) perturbatively, the calculation produces infinities at
short distances that can't be systematically absorbed into a finite number of
redefined physical constants the way they can for the other quantum field
theories in the Standard Model — you'd need to keep introducing new, independent
corrections at every order, which strips the theory of predictive power at high
energies.

This is an open problem, not a solved one, and the two major research programs
attempting to resolve it — **string theory** (replacing point particles with
extended one-dimensional objects, which softens the short-distance behavior)
and **loop quantum gravity** (quantizing spacetime geometry itself rather than
treating it as a fixed background) — remain active, unresolved research
directions rather than completed theories. Nothing here should be read as
implying either has succeeded; as of now, no experimentally verified theory of
quantum gravity exists.
