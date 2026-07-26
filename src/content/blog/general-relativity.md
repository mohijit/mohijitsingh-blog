---
title: "General relativity, from two puzzles to an expanding universe"
description: "How the equivalence of gravitational and inertial mass leads to spacetime curvature, the Friedmann equations, and gravity's uneasy relationship with quantum mechanics."
date: 2026-07-26
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

I'll be upfront about scope here: the $\Gamma^\mu_{\alpha\beta}$ (Christoffel
symbols) are built from derivatives of the metric $g_{\mu\nu}$, and deriving
their general formula and the geodesic equation itself from a variational
principle is real tensor calculus that I'm not carrying out in full here.
Conceptually, though, what they encode is simple to state: in curved
coordinates (or on a genuinely curved manifold), the coordinate basis vectors
themselves twist from point to point, and $\Gamma^\mu_{\alpha\beta}$ is exactly
the correction term needed to account for that twisting when you differentiate
a vector along a path. "Follow a geodesic" is the precise, curved-spacetime
replacement for "travel in a straight line at constant velocity."

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

- **Gravitational time dilation.** By the equivalence principle, a clock lower
  in a gravitational potential runs slow relative to one higher up — the same
  effect as time dilation for an accelerating observer. A photon climbing out of
  a gravitational well loses energy, which for light means its frequency drops:
  **gravitational redshift**. This has been measured directly (clocks at
  different altitudes measurably disagree) and is precise enough that GPS
  satellites must correct for it.
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
