---
title: "Solvable Everywhere, Solvable Nowhere"
description: "An equation can have a solution modulo every integer and over the real numbers, yet still have no rational solution. Hasse–Minkowski, Selmer's cubic, and the Brauer–Manin obstruction."
date: 2026-07-26
tags: ["math", "number-theory"]
---

Here is a genuinely strange fact: there exist polynomial equations that have a solution modulo every integer $n$, *and* a solution in real numbers, but have no solution in rational numbers at all. Not "hard to find" — provably none exist. Every finite, checkable piece of local evidence you could possibly gather says yes, and the global answer is no. How is that possible?

The resolution takes a bit of machinery to state properly, and understanding it requires seeing both a case where local evidence *does* settle the question (quadratic equations) and a case where it demonstrably doesn't (cubic equations). That contrast — not just the existence of a counterexample — is the actual content of this post.

## Local and global solvability

A Diophantine equation is a polynomial equation for which we want integer or rational solutions — $x^2 + y^2 = 3z^2$, say, or $3x^3 + 4y^3 = 5z^3$. The rational numbers $\mathbb{Q}$ sit inside several different completed number systems, and each one gives a different lens for checking solvability:

- The real numbers $\mathbb{R}$, obtained by completing $\mathbb{Q}$ with respect to the ordinary absolute value.
- For each prime $p$, the $p$-adic numbers $\mathbb{Q}_p$, obtained by completing $\mathbb{Q}$ with respect to the $p$-adic absolute value, in which numbers are "close" when their difference is divisible by a high power of $p$.

```tikz
\node (Q) at (0,1.5) {$\mathbb{Q}$};
\node (R) at (3.2,3) {$\mathbb{R}$};
\node (Q2) at (3.2,1.8) {$\mathbb{Q}_2$};
\node (Q3) at (3.2,0.6) {$\mathbb{Q}_3$};
\node (Q5) at (3.2,-0.6) {$\mathbb{Q}_5$};
\node (dots) at (3.2,-1.8) {$\vdots$};
\draw[->] (Q) -- (R);
\draw[->] (Q) -- (Q2);
\draw[->] (Q) -- (Q3);
\draw[->] (Q) -- (Q5);
\draw[->] (Q) -- (dots);
```

Say an equation is **locally solvable** if it has a solution in $\mathbb{R}$ and in $\mathbb{Q}_p$ for *every* prime $p$. This looks like infinitely many separate conditions, but there's a concrete, finite way to probe $p$-adic solvability: check whether the equation has a solution modulo $p^k$ for each $k = 1, 2, 3, \dots$. A solution in $\mathbb{Q}_p$ (with $p$-adic integer coordinates, which is the case that matters here) is exactly a compatible sequence of solutions modulo $p, p^2, p^3, \dots$

What makes this tractable rather than an infinite regress is **Hensel's lemma**, the $p$-adic cousin of Newton's method. I'll state it precisely and use it, without reproving it here — the proof is a short, standard induction, but it's not the point of this post:

> **Hensel's lemma.** Let $f \in \mathbb{Z}_p[x]$ and suppose $a \in \mathbb{Z}_p$ satisfies $f(a) \equiv 0 \pmod p$ and $f'(a) \not\equiv 0 \pmod p$. Then there is a unique $\alpha \in \mathbb{Z}_p$ with $f(\alpha) = 0$ and $\alpha \equiv a \pmod p$.

In words: if you find a solution mod $p$ that isn't a degenerate (repeated) root of $f$ mod $p$, it automatically lifts to genuine solutions mod every higher power of $p$, and in fact to an exact $p$-adic solution. So in practice, "solvable in $\mathbb{Q}_p$" almost always reduces to a finite check mod $p$, with a bit of extra care only at the finitely many primes where the non-degeneracy condition fails (typically primes dividing the discriminant of the equation, plus small primes like 2 that need direct verification of higher congruences). Local solvability, despite quantifying over infinitely many primes, is genuinely checkable in principle case by case.

## The easy direction

Before asking whether local solvability is *enough*, it's worth being clear about why it's *necessary* — this direction is immediate and worth stating cleanly so it isn't confused with the hard direction later.

If $(x, y, z) \in \mathbb{Q}^3$ (or $\mathbb{Z}^3$) is a genuine rational solution to some equation $F(x,y,z) = 0$, then clearing denominators gives an integer solution, and reducing that integer solution modulo any $n$ gives a solution modulo $n$. Likewise, an integer solution literally *is* a real number solution and, via the inclusion $\mathbb{Z} \hookrightarrow \mathbb{Z}_p \subset \mathbb{Q}_p$, a $p$-adic solution for every $p$. So:
$$
\text{rational solution exists} \implies \text{local solution exists everywhere.}
$$
This is just "a global object restricts to a local one at every place." The interesting question — the one this whole post is about — is the converse: if an equation is locally solvable everywhere, must it have a rational solution?

## The good case: Hasse–Minkowski

For one large and important class of equations, the converse is completely true. This is the **Hasse–Minkowski theorem**, proved by Helmut Hasse in the 1920s building on Hermann Minkowski's earlier work on quadratic forms over $\mathbb{Q}$:

> **Theorem (Hasse–Minkowski).** A quadratic form $Q(x_1, \dots, x_n)$ with rational coefficients represents zero nontrivially over $\mathbb{Q}$ (i.e. $Q(x_1,\dots,x_n) = 0$ has a solution with not all $x_i = 0$) if and only if it does so over $\mathbb{R}$ and over $\mathbb{Q}_p$ for every prime $p$.

For quadratic forms, local solvability everywhere is not just necessary but *sufficient*. This is the good case, and it's worth actually working through an example rather than just admiring the statement.

**Example.** Consider $x^2 + y^2 = 3z^2$. Does it have a nontrivial rational solution?

Check solvability mod $3$ first. The squares mod $3$ are $0$ and $1$ (since $1^2 \equiv 1$, $2^2 \equiv 1$). For $x^2 + y^2 \equiv 0 \pmod 3$, the only way to add two elements of $\{0,1\}$ and land on $0 \bmod 3$ is $0 + 0$. So mod $3$, any solution needs $x^2 \equiv 0$ and $y^2 \equiv 0$, i.e. $3 \mid x$ and $3 \mid y$.

Now push this into an honest descent argument over the integers. Suppose $(x,y,z)$ is a nontrivial integer solution with $|x|+|y|+|z|$ as small as possible. By the mod-3 argument, $3 \mid x$ and $3 \mid y$; write $x = 3x'$, $y = 3y'$. Then
$$
\begin{aligned}
9x'^2 + 9y'^2 &= 3z^2 \\
3x'^2 + 3y'^2 &= z^2,
\end{aligned}
$$
so $3 \mid z^2$, hence $3 \mid z$ (as $3$ is prime). Write $z = 3z'$:
$$
\begin{aligned}
3x'^2 + 3y'^2 &= 9z'^2 \\
x'^2 + y'^2 &= 3z'^2.
\end{aligned}
$$
So $(x', y', z')$ is *also* a solution, with every coordinate a third of the original. That contradicts minimality unless $x=y=z=0$. So $x^2+y^2=3z^2$ has **no** nontrivial integer or rational solution.

Notice what that descent argument actually shows at the local level: it says any solution's coordinates would have to be divisible by $3$ to arbitrarily high powers, which is impossible for a nontrivial vector — over the integers, and equally over $\mathbb{Z}_3$, where the same reasoning forces $x, y, z$ to have infinite $3$-adic valuation, i.e. to be zero. So this equation is not even solvable in $\mathbb{Q}_3$: **the local obstruction lives at $p=3$.** Over $\mathbb{R}$ there's no problem at all — the form $x^2+y^2-3z^2$ is indefinite (it takes both positive and negative values), so it has nontrivial real zeros, e.g. $(\sqrt3, 0, 1)$. But one failed prime is enough: Hasse–Minkowski (contrapositive) correctly predicts no rational solution, matching the elementary descent proof exactly.

For contrast, change one constant: $x^2+y^2=2z^2$ has the obvious solution $(1,1,1)$. Here local solvability holds everywhere (there's no analogous obstruction at any prime), and consistent with Hasse–Minkowski, a rational solution exists. The theorem isn't just a existence statement floating above the arithmetic — it's exactly tracking the same congruence obstructions you'd find by hand, and telling you when hunting for more of them is guaranteed to be futile.

## Where it breaks: cubic forms

Quadratic forms are, in a precise sense, special. The moment you move to cubic equations, local solvability everywhere stops being sufficient. This is not a hypothetical worry — there is a genuine, classically verified example.

In 1951, Ernst Selmer studied equations of the form $ax^3 + by^3 + cz^3 = 0$ and exhibited
$$
3x^3 + 4y^3 = 5z^3
$$
as an equation that is solvable modulo every integer $n$, and solvable over $\mathbb{R}$ (it's a cubic in three variables with mixed-sign coefficients, so it takes both signs and has real zeros), and yet has **no nontrivial rational solution**. I want to be honest about the scope of what I can walk through here: verifying local solvability at every prime for a specific cubic is a real computation — mod 2, mod 3, mod 5, and mod every other prime need to be checked (Hensel's lemma disposes of all but finitely many primes automatically, since the curve is nonsingular mod $p$ for all but finitely many $p$, but the finitely many bad primes need to be checked by hand), and proving the *absence* of rational points is not a short congruence argument the way it was for $x^2+y^2=3z^2$. Selmer's original proof runs to many pages. I'm stating the result because it's a well-documented classical fact — not reproducing the verification — and I'd rather say that plainly than fake a two-line argument for something that genuinely isn't two lines.

What I can do honestly is sketch *why* this kind of thing becomes possible for cubics, structurally. A smooth plane cubic curve like $3x^3+4y^3=5z^3$ has genus $1$. A genus-1 curve with at least one rational point can be given the structure of an elliptic curve (an abelian group), and its rational points form a finitely generated group by the Mordell–Weil theorem. But a genus-1 curve with *no* rational point isn't an elliptic curve at all in that sense — it's a **torsor** (principal homogeneous space) under the elliptic curve that is its Jacobian. Torsors under a fixed elliptic curve $E$ are classified by a cohomology group $H^1(\mathbb{Q}, E)$, and the ones that are locally solvable everywhere but have no rational point form a subgroup of that cohomology group called the **Tate–Shafarevich group** $\Sha(E)$. Selmer's cubic corresponds to a nontrivial element of exactly this kind of obstruction group.

The intuition worth taking away, even without the cohomology: local solvability at a prime $p$ only ever sees information about the equation reduced mod powers of $p$ — it's fundamentally a "one place at a time" check. But whether a curve of genus $\geq 1$ has a rational point can depend on genuinely *global* arithmetic data — the structure of an associated ideal class group, or (equivalently, in the cohomological language above) a class in a Tate–Shafarevich or Brauer group — that no single local computation, no matter how far you push the modulus, is able to detect. Local conditions are assembled prime by prime; the obstruction here is assembled from all of them simultaneously in a way that has no local shadow.

## The Hasse principle

This dividing line has a name. An equation, or a class of equations, is said to **satisfy the Hasse principle** if local solvability everywhere implies the existence of a rational (global) solution.

- **Quadratic forms satisfy the Hasse principle.** This is exactly the content of Hasse–Minkowski above.
- **Cubic forms do not, in general, satisfy the Hasse principle.** Selmer's curve is a counterexample.
- More generally, **conics** (genus-0 curves, which correspond to nondegenerate ternary quadratic forms) satisfy the Hasse principle — again this is Hasse–Minkowski in geometric language. Once genus goes up to $1$ or higher, the Hasse principle can fail, and by Faltings' theorem curves of genus $\geq 2$ have only finitely many rational points to begin with, which changes the character of the question but doesn't make local-global reasoning automatically valid.

This is a real dividing line in arithmetic geometry, not a technicality: it marks where "check finitely much local data" stops being a complete algorithm for existence of rational points, and something genuinely global has to enter.

## Measuring the failure: the Brauer–Manin obstruction

Once you know the Hasse principle can fail, the natural next question is whether you can *detect* the failure without appealing to a bespoke, equation-specific descent argument like Selmer's. This is genuinely research-level territory, and I'll flag it as a sketch rather than pretend to derive it.

The modern tool is the **Brauer–Manin obstruction**, introduced by Yuri Manin in the 1970s. The rough idea: attached to a variety $X$ (our curve or surface) is an algebraic invariant called its Brauer group $\mathrm{Br}(X)$, built from classes of central simple algebras (or, cohomologically, $H^2$ classes) over the function field of $X$. Each element $\alpha \in \mathrm{Br}(X)$ gives you a way to pair local points against $\alpha$ and get an invariant in $\mathbb{Q}/\mathbb{Z}$ at each place; a genuine rational point would have to make all of these invariants sum to zero across all places simultaneously (a reciprocity constraint coming from global class field theory). This carves out a subset
$$
X(\mathbb{A}_\mathbb{Q})^{\mathrm{Br}} \subseteq X(\mathbb{A}_\mathbb{Q})
$$
of the locally-solvable locus (the "adelic points") — the points that are consistent with every Brauer class, not just locally solvable at each place independently. Sometimes this smaller set is provably empty even though the naive locally-solvable set $X(\mathbb{A}_\mathbb{Q})$ is nonempty, which certifies that $X$ has no rational points without needing an ad hoc descent argument. For many classes of varieties, showing $X(\mathbb{A}_\mathbb{Q})^{\mathrm{Br}} = \emptyset$ (or nonempty) is exactly how Hasse principle failures get explained and organized today, and it's known that Brauer–Manin accounts for essentially all known failures for some restricted classes of varieties (though whether it accounts for *all* failures in general is itself a subtle, actively studied question). I'm deliberately not deriving the cohomological machinery here — this is a genuinely deep corner of arithmetic geometry, and a fair treatment of it is a topic (or a graduate course) in its own right.

## Back to the paradox

So: an equation can be solvable modulo every integer and over the reals, and still have no rational solution — and now it's clear exactly how much weight that "local evidence" is entitled to carry. For quadratic forms, Hasse–Minkowski says it's the whole story: check every completion, and you've settled the question completely, as the descent argument for $x^2+y^2=3z^2$ demonstrated concretely. For cubic forms and beyond, Selmer's curve $3x^3+4y^3=5z^3$ shows that local information, however exhaustively gathered one prime at a time, can simply miss a genuinely global obstruction — one that lives in an object like a Tate–Shafarevich or Brauer group rather than in any single completion of $\mathbb{Q}$.

That local data is necessary but not universally sufficient isn't a dead end; it's the reason the Hasse principle is a real theorem for some classes of equations and a real research question for others, and it's why an entire apparatus — Brauer–Manin and its descendants — exists to quantify exactly where and how the gap between "locally consistent" and "globally true" opens up.
