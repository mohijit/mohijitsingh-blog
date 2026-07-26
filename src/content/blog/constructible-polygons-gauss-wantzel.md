---
title: "Constructible Polygons: Why Gauss Could Draw a 17-gon but Not a 7-gon"
description: "From bisecting an angle to Gauss's 17-gon: how field extensions of degree a power of two decide exactly which regular polygons compass and straightedge can build."
date: 2026-06-13
tags: ["math", "algebra"]
---

Euclidean geometry, as the Greeks played it, is a game with absurdly restrictive rules. You get a straightedge with no markings on it — it can extend a line, but it cannot measure anything. You get a compass that collapses the instant you lift it off the page, so it can draw a circle through a given point but cannot be used to "carry" a fixed length from one part of the drawing to another (though, as Euclid himself showed, you can simulate a rigid compass with a collapsing one anyway, so this restriction turns out to cost nothing). And you get two starting points to work with. That's the whole toolkit. From it, the Greeks built an impressive catalogue: bisect a segment, bisect an angle, drop a perpendicular, construct an equilateral triangle, a square, a regular pentagon. All classically known, all a few pages into Euclid's *Elements*.

Then the catalogue stalls. Nobody could construct a regular heptagon — a regular 7-gon. Or a regular 9-gon, or an 11-gon, or a 13-gon. Centuries passed. The obvious guess is that these are just harder, waiting for a cleverer construction, the way the pentagon presumably felt hard before someone found it. That guess turns out to be exactly backwards. The heptagon isn't a hard case of an easy problem — it's *impossible*, and provably so, in a precise sense that took over two thousand years to nail down. Meanwhile the pentagon, which looks about as complicated, is perfectly fine. So is the 17-gon, which a 19-year-old Carl Friedrich Gauss constructed in 1796, to general astonishment, using a method nobody expected to work at all. What separates 17 from 7? What separates 15 (constructible!) from 9 (not)? The answer, when it finally arrived, came not from geometry but from algebra — specifically, from asking how *big* certain field extensions of $\mathbb{Q}$ have to be. That's the payoff this post is building toward. Getting there means being honest and careful about what "constructible" means, translating it into algebra with an actual proof, and then doing some very satisfying number theory with Euler's totient function.

## What compass and straightedge actually allow

Fix two points in the plane, call them $P_0$ and $P_1$; set up coordinates so $P_0 = (0,0)$ and $P_1 = (1,0)$. A **constructible point** is any point obtainable from $P_0, P_1$ by a finite sequence of the following moves:

1. Draw the line through two already-constructed points.
2. Draw the circle centered at an already-constructed point, passing through another already-constructed point.
3. Mark a new point at the intersection of two already-drawn lines, a line and a circle, or two circles.

A **constructible number** is a real number that appears as a coordinate of some constructible point (equivalently, as the length of some segment between two constructible points, or the distance you can mark off from the origin along the $x$-axis). This is the entire formal content of "compass and straightedge" — no eyeballing, no marked rulers, nothing but repeatedly intersecting lines and circles determined by points you already have.

It's worth actually building a couple of these to see the rules in action, because the standard tricks recur constantly. **Bisecting a segment** $AB$: draw the circle centered at $A$ through $B$, and the circle centered at $B$ through $A$; these two circles (both radius $|AB|$) meet at two points, and the line through those two points crosses $AB$ exactly at its midpoint — this is also, incidentally, how you drop a perpendicular to a line at a given point. **Bisecting an angle** at a vertex $O$ with rays through $A$ and $B$: draw a circle centered at $O$ meeting the two rays at points equidistant from $O$ (relabel these $A$, $B$); then draw two circles of equal radius, one centered at $A$ and one at $B$, and let $C$ be one of their intersection points. Ray $OC$ bisects the angle, because $OA = OB$ makes triangle $OAB$ isosceles and $C$ sits on its axis of symmetry by construction.

```tikz
\coordinate (O) at (0,0);
\coordinate (A) at (12:2);
\coordinate (B) at (78:2);
\coordinate (C) at (45:4.05);

\draw[thick,->] (O) -- (12:4.6);
\draw[thick,->] (O) -- (78:4.6);
\node[below] at (O) {$O$};

\draw (12:1.3) arc (12:78:1.3);

\fill (A) circle (1.3pt);
\fill (B) circle (1.3pt);
\node[below right] at (A) {$A$};
\node[above left] at (B) {$B$};

\draw ($(A)+(55:2.6)$) arc (55:85:2.6);
\draw ($(B)+(5:2.6)$) arc (5:35:2.6);

\fill (C) circle (1.3pt);
\node[right] at (C) {$C$};

\draw[thick,dashed] (O) -- (C);
```

An **equilateral triangle** on $P_0P_1$ is even simpler: draw the circle centered at $P_0$ through $P_1$, the circle centered at $P_1$ through $P_0$, and take either intersection point as the third vertex — both new sides automatically equal $|P_0P_1|$ by construction. From triangles, squares, and pentagons, Euclid could get quite far. The question this post is actually about is: how far, exactly, and why does the road stop where it does?

## From geometry to algebra

The key move — due, in its rigorous modern form, to Pierre Wantzel in 1837 — is to stop thinking about lines and circles and start thinking about which *field* the coordinates of a constructible point can live in. This section proves the central theorem of the whole subject, so it's worth doing carefully.

Suppose every point constructed so far has both coordinates in some field $F \subseteq \mathbb{R}$ containing $\mathbb{Q}$ (initially $F = \mathbb{Q}$, since $P_0=(0,0)$ and $P_1=(1,0)$ have rational coordinates). I'll show that any single new point — obtained from one of the three intersection operations above — has coordinates lying either in $F$ itself, or in a degree-2 extension $F(\sqrt{d})$ for some $d \in F$.

**Lines and circles have coefficients in $F$.** The line through $(x_1,y_1)$ and $(x_2,y_2)$, both in $F$, has equation $ax + by = c$ with $a = y_2 - y_1$, $b = x_1 - x_2$, $c = ax_1+by_1$ — all polynomial combinations of coordinates in $F$, hence all in $F$, since $F$ is closed under addition, subtraction, and multiplication. A circle centered at $(h,k) \in F$ through a point at squared-distance $r^2$ from it (and $r^2$ is itself a sum of squares of differences of $F$-coordinates, hence in $F$, even when $r$ itself might not be) has equation
$$
x^2 + y^2 + Dx + Ey + G = 0, \qquad D = -2h,\ E = -2k,\ G = h^2+k^2-r^2,
$$
with $D, E, G \in F$.

**Line meets line: no extension needed.** Solving
$$
a_1x + b_1y = c_1, \qquad a_2x+b_2y=c_2
$$
by elimination gives $x$ and $y$ as ratios of $F$-elements (Cramer's rule), so the intersection point already has coordinates in $F$. Straightedge alone never forces an extension — that's the compass's job.

**Line meets circle: a quadratic appears.** Substitute a line $y = mx+c$ (with $m,c \in F$; a vertical line is handled the same way with $x$ and $y$ swapped) into the circle equation:
$$
x^2 + (mx+c)^2 + Dx + E(mx+c) + G = 0,
$$
which expands to
$$
(1+m^2)\,x^2 + (2mc+D+Em)\,x + (c^2+Ec+G) = 0.
$$
This is $Ax^2+Bx+C=0$ with $A,B,C \in F$, so by the quadratic formula
$$
x = \frac{-B \pm \sqrt{B^2-4AC}}{2A} \in F(\sqrt{\Delta}), \qquad \Delta = B^2-4AC \in F,
$$
and then $y = mx+c$ lands in the same field $F(\sqrt{\Delta})$, since $m,c \in F$. Either $\Delta$ is already a square in $F$ (and the point was in $F$ all along), or $[F(\sqrt{\Delta}):F] = 2$ exactly.

**Circle meets circle: reduces to the line case.** Two circles $x^2+y^2+D_1x+E_1y+G_1=0$ and $x^2+y^2+D_2x+E_2y+G_2=0$ (both with $F$-coefficients) both contain the quadratic terms $x^2+y^2$; subtracting one equation from the other cancels them and leaves
$$
(D_1-D_2)x + (E_1-E_2)y + (G_1-G_2) = 0,
$$
a line with coefficients in $F$ (the *radical axis* of the two circles). Any intersection point of the two circles lies on this line and on either original circle, so it's found by intersecting a line with a circle — exactly the case just handled. Degree at most 2 again.

So every single construction step produces coordinates lying in $F(\sqrt{d})$ for some $d$ in the current field $F$ — an extension of degree 1 or 2. Chaining these together, a constructible point reached after $k$ construction steps has coordinates in some field at the top of a tower
$$
\mathbb{Q} = F_0 \subseteq F_1 \subseteq F_2 \subseteq \cdots \subseteq F_k,
\qquad [F_{i+1}:F_i] \le 2 \text{ for every } i.
$$

```tikz
\node (F0) at (0,0) {$\mathbb{Q}=F_0$};
\node (F1) at (2.9,0) {$F_1$};
\node (F2) at (5.5,0) {$F_2$};
\node (Fdots) at (8.1,0) {$\cdots$};
\node (Fk) at (10.9,0) {$F_k$};

\draw[thick,->] (F0) -- node[above] {$\le 2$} (F1);
\draw[thick,->] (F1) -- node[above] {$\le 2$} (F2);
\draw[thick,->] (F2) -- node[above] {$\le 2$} (Fdots);
\draw[thick,->] (Fdots) -- node[above] {$\le 2$} (Fk);
```

By the tower law for field extensions — degrees multiply up a chain, $[F_k:\mathbb{Q}] = \prod_{i=0}^{k-1}[F_{i+1}:F_i]$ — the total degree $[F_k:\mathbb{Q}]$ is a product of 1's and 2's, hence a power of 2.

That's a statement about $F_k$, the field generated by *all* the coordinates constructed along the way. To get a statement about one specific constructible number $\alpha \in F_k$, apply the tower law once more to the sub-tower $\mathbb{Q} \subseteq \mathbb{Q}(\alpha) \subseteq F_k$:
$$
[F_k:\mathbb{Q}] = [F_k:\mathbb{Q}(\alpha)]\cdot[\mathbb{Q}(\alpha):\mathbb{Q}],
$$
so $[\mathbb{Q}(\alpha):\mathbb{Q}]$ divides $[F_k:\mathbb{Q}] = 2^s$. A divisor of a power of 2 has no prime factors other than 2 (unique factorization), so it is itself a power of 2. That gives the theorem this whole subject rests on:

**Theorem (Wantzel, necessity direction).** If $\alpha$ is a constructible real number, then $[\mathbb{Q}(\alpha):\mathbb{Q}]$ is a power of 2.

This is a one-way statement — it says constructibility *forces* degree to be a power of 2, not that every power-of-2-degree number is constructible (that converse is subtler, and gets its honest due later). But the forward direction alone is already enough to prove things are *impossible*, which is exactly what's needed for the heptagon.

## Regular polygons, roots of unity, and the totient function

Constructing a regular $n$-gon means constructing $n$ equally spaced points on a circle, which — once you have a circle and one vertex — comes down to constructing a single central angle of $2\pi/n$, since compass and straightedge can copy a given angle around a center repeatedly (mark off an angle equal to a given one is itself a three-line ruler-and-compass construction, no new field theory needed). So constructing the regular $n$-gon reduces to constructing the point $\bigl(\cos(2\pi/n), \sin(2\pi/n)\bigr)$ on the unit circle centered at a constructed center. Conversely, from $\cos(2\pi/n)$ alone you can recover $\sin(2\pi/n) = \sqrt{1-\cos^2(2\pi/n)}$ by building a right triangle with hypotenuse 1 — one more degree-$\le 2$ step, which cannot change whether an overall degree is a power of 2. So: **the regular $n$-gon is constructible if and only if the single real number $\cos(2\pi/n)$ is constructible.**

Now bring in the primitive $n$-th root of unity $\zeta_n = e^{2\pi i/n} = \cos(2\pi/n) + i\sin(2\pi/n)$. Its minimal polynomial over $\mathbb{Q}$ is the $n$-th cyclotomic polynomial $\Phi_n(x)$, of degree $\varphi(n)$ (Euler's totient — the count of integers in $\{1,\dots,n\}$ coprime to $n$), so $[\mathbb{Q}(\zeta_n):\mathbb{Q}] = \varphi(n)$. This is a standard fact about cyclotomic fields; I'll use it rather than reprove it here, since it would be a detour of its own.

$\zeta_n$ is not a real number for $n \ge 3$, so $\mathbb{Q}(\cos(2\pi/n))$, sitting inside $\mathbb{R}$, is a *proper* subfield of $\mathbb{Q}(\zeta_n)$. Concretely, $\zeta_n$ and its conjugate $\zeta_n^{-1} = \overline{\zeta_n}$ satisfy $\zeta_n + \zeta_n^{-1} = 2\cos(2\pi/n)$ and $\zeta_n \cdot \zeta_n^{-1} = 1$, so $\zeta_n$ is a root of
$$
t^2 - 2\cos(2\pi/n)\,t + 1 = 0,
$$
a quadratic over $\mathbb{Q}(\cos(2\pi/n))$. It's irreducible there — if it factored, $\zeta_n$ would already lie in $\mathbb{Q}(\cos(2\pi/n)) \subseteq \mathbb{R}$, but $\zeta_n$ isn't real for $n \ge 3$. So $[\mathbb{Q}(\zeta_n):\mathbb{Q}(\cos(2\pi/n))] = 2$ exactly, and by the tower law,
$$
[\mathbb{Q}(\cos(2\pi/n)):\mathbb{Q}] = \frac{\varphi(n)}{2}.
$$

Combine this with the theorem from the previous section: $\cos(2\pi/n)$ is constructible only if $\varphi(n)/2$ is a power of 2 — and since $\varphi(n)$ is always even for $n \ge 3$, that's exactly the same as saying $\varphi(n)$ itself is a power of 2. The geometric question "which regular polygons can be built?" has become the number-theoretic question **"for which $n$ is $\varphi(n)$ a power of 2?"**

## Which $n$ make $\varphi(n)$ a power of 2

Write $n = 2^k \cdot q_1^{b_1} q_2^{b_2} \cdots q_r^{b_r}$ with the $q_j$ distinct odd primes. Euler's totient is multiplicative over coprime factors, and $\varphi(p^b) = p^{b-1}(p-1)$ for any prime $p$, so
$$
\varphi(n) = \varphi(2^k) \cdot \prod_{j=1}^r q_j^{b_j-1}(q_j - 1).
$$

A product of positive integers is a power of 2 exactly when every one of those integers is itself a power of 2 (if any factor had an odd prime divisor $p$, that $p$ would divide the whole product, and a power of 2 has no odd prime divisors). $\varphi(2^k) = 2^{k-1}$ for $k \ge 1$ (or $1$ for $k=0$) is automatically a power of 2 for any $k$ — the factor of 2 in $n$ is never the obstruction. So the whole question comes down to each factor $q_j^{b_j-1}(q_j-1)$.

**Repeated odd prime factors are fatal.** If $b_j \ge 2$, then $q_j^{b_j-1}$ contributes a factor of the odd prime $q_j$ itself to $\varphi(n)$, which can never divide a power of 2. So every odd prime dividing $n$ must appear to exactly the first power: $n$'s odd part must be squarefree. (This is exactly why $n=9=3^2$ fails: $\varphi(9) = 3\cdot 2 = 6$, and that stray factor of 3 is unavoidable.)

**Single odd prime factors need $q_j - 1$ to be a power of 2.** With $b_j = 1$, the constraint on $\varphi(q_j) = q_j - 1$ being a power of 2 means $q_j = 2^e + 1$ for some positive integer $e$.

**And $e$ itself must be a power of 2.** Suppose $e$ has an odd divisor $d > 1$, and write $e = df$ with $f \ge 1$. Then, using the factorization $a^d + 1 = (a+1)(a^{d-1} - a^{d-2} + \cdots - a + 1)$ that holds whenever $d$ is odd (apply it with $a = 2^f$):
$$
2^e + 1 = (2^f)^d + 1 = (2^f+1)\bigl((2^f)^{d-1} - (2^f)^{d-2} + \cdots - 2^f + 1\bigr).
$$
Since $d>1$, $f<e$, so $2^f+1$ is a genuine factor of $2^e+1$ with $1 < 2^f+1 < 2^e+1$ — a nontrivial factorization, so $2^e+1$ is composite. Contrapositive: if $2^e+1$ is prime, $e$ has no odd divisor greater than 1, meaning $e$ is itself a power of 2.

Putting the three constraints together: $n$'s odd part must be a product of *distinct* primes, each of the special form $2^{2^m}+1$. Primes of this form have a name.

## The Fermat primes

$F_m = 2^{2^m}+1$ is the $m$-th **Fermat number**. Checking the first few by direct arithmetic:
$$
\begin{aligned}
F_0 &= 2^{1}+1 = 3, \\
F_1 &= 2^{2}+1 = 5, \\
F_2 &= 2^{4}+1 = 17, \\
F_3 &= 2^{8}+1 = 257, \\
F_4 &= 2^{16}+1 = 65537.
\end{aligned}
$$
All five are prime, and these are the five known **Fermat primes**: $3, 5, 17, 257, 65537$. Fermat himself conjectured every $F_m$ is prime; the conjecture broke at the very next case. Euler showed $F_5 = 2^{32}+1 = 4{,}294{,}967{,}297$ factors as $641 \times 6{,}700{,}417$, so $F_5$ is composite. Every Fermat number beyond $F_4$ that anyone has managed to test has turned out composite too — a long list of them, well into the hundreds and thousands in index, all checked and none prime. Whether $3, 5, 17, 257, 65537$ are the *only* Fermat primes that will ever exist is a genuinely open problem in number theory. Nobody has proved there are finitely many, nobody has found a sixth. It sits there, unresolved, at the exact spot where this very classical geometry problem bottoms out.

## The Gauss–Wantzel theorem

Assembling everything: $\varphi(n)$ is a power of 2 exactly when $n$'s odd part is a product of distinct Fermat primes (possibly the empty product, i.e., no odd prime factors at all), with no restriction on how many factors of 2 divide $n$. That gives the full classification.

**Theorem (Gauss–Wantzel).** For $n \ge 3$, the regular $n$-gon is constructible with compass and straightedge if and only if
$$
n = 2^k \, p_1 p_2 \cdots p_r,
$$
where $k \ge 0$ and $p_1, \dots, p_r$ are distinct Fermat primes.

Gauss established the sufficiency half — that these cases really are constructible — in 1796, as a teenager, famously via the regular 17-gon; Wantzel supplied the necessity half — that *no other* $n$ works — in 1837, using essentially the field-degree argument above.

Running through small $n$: $3, 4, 5, 6, 8, 10, 12, 15, 16, 17, 20$ are all constructible (check $15 = 3 \times 5$, two distinct Fermat primes, $\varphi(15) = 2 \times 4 = 8$ — a case the Greeks themselves handled by combining the triangle and pentagon constructions). Meanwhile:

- $n=7$: prime, and $7 - 1 = 6$ is not a power of 2 — 7 is not a Fermat prime. **Not constructible.**
- $n=9 = 3^2$: repeated odd prime factor. $\varphi(9)=6$. **Not constructible.**
- $n=11$: $11-1=10$, not a power of 2. **Not constructible.**
- $n=13$: $13-1=12$, not a power of 2. **Not constructible.**
- $n=14 = 2\times 7$: carries the same bad factor of 7 as the heptagon. $\varphi(14)=6$. **Not constructible.**

Every one of those fails for a checkable, arithmetic reason — not "nobody's found it yet," but "the totient function provably isn't a power of 2 for this $n$."

## Building the cases that work — a sketch, honestly labeled

Wantzel's necessity direction is a clean, complete argument, and the section above proved it in full. The other half — that *every* Fermat-prime case genuinely is constructible — is the harder, more constructive direction, and I want to be upfront that this post sketches it rather than carries it out. Doing it properly for $n=17$, the way Gauss actually did, means exhibiting $\cos(2\pi/17)$ as an explicit tower of nested square roots, and that computation is genuinely intricate.

The modern way to see *why* it must work uses Galois theory (which postdates Gauss's construction by a few decades — Galois's own work dates to the early 1830s, so Gauss couldn't have used this framing in 1796, and didn't). The extension $\mathbb{Q}(\zeta_n)/\mathbb{Q}$ is Galois, with Galois group isomorphic to $(\mathbb{Z}/n\mathbb{Z})^\times$, of order $\varphi(n)$. When $\varphi(n)$ is a power of 2, that Galois group is a 2-group, and every finite 2-group has a chain of subgroups of every intermediate order — index 2 in the next one up, all the way from the trivial group to the whole thing. The Galois correspondence turns that chain of subgroups into a matching tower of subfields between $\mathbb{Q}$ and $\mathbb{Q}(\zeta_n)$, each a degree-2 step above the last. And a degree-2 extension over a field of characteristic 0 is always obtained by adjoining a square root — solve the relevant quadratic. So $\zeta_n$, and with it $\cos(2\pi/n)$, sits at the top of a tower built entirely from square roots: constructible, by the very moves this post opened with.

Gauss's actual route in 1796 didn't have any of that machinery available and instead worked directly with **Gaussian periods**: since $(\mathbb{Z}/17\mathbb{Z})^\times$ is cyclic of order 16, its unique subgroups of orders 8, 4, 2, 1 give a chain of ways to partition the 16 nontrivial 17th roots of unity into sums invariant under successively smaller subgroups. Each successive sum (period) turns out to satisfy a quadratic equation over the previous one — first a sum of two "8-periods," then splitting each into a sum of two "4-periods," and so on down to $\cos(2\pi/17)$ itself — which is precisely a hand-built version of the same degree-2 tower, discovered before the group theory that now explains why it had to exist. I won't carry that computation through to the actual nested-radical formula for $\cos(2\pi/17)$ here; it's correct, it's beautiful, and it's also several pages of bookkeeping that would be a full post of its own. The honest summary is: the *existence* of a square-root tower for every Fermat-prime case is something this post's tools can prove in outline; *exhibiting* one explicitly, the way Gauss did by hand, is a separate and substantially harder undertaking.

## The same toolkit kills two other classical problems

Wantzel's 1837 paper didn't stop at polygons — the identical degree argument disposes of two other famously stubborn Greek problems in a couple of lines each.

**Doubling the cube** asks for a cube with twice the volume of a given one, i.e., constructing $\sqrt[3]{2}$ from a unit length. Its minimal polynomial $x^3 - 2$ is irreducible over $\mathbb{Q}$ (Eisenstein's criterion at $p=2$ applies directly), so $[\mathbb{Q}(\sqrt[3]{2}):\mathbb{Q}] = 3$ — not a power of 2. Impossible, by the same theorem.

**Trisecting an arbitrary angle** fails for the same reason on a specific case: trisecting $60°$ would require constructing $\cos(20°)$, and the triple-angle identity $\cos(3\theta) = 4\cos^3\theta - 3\cos\theta$ with $\theta = 20°$, $\cos 60° = \tfrac12$, gives $x=\cos(20°)$ as a root of $8x^3-6x-1=0$ — a cubic with no rational root (a short check of the candidates $\pm1,\pm\tfrac12,\pm\tfrac14,\pm\tfrac18$ rules each out), hence irreducible, hence degree 3 again. Not a power of 2, not constructible — so the general angle cannot be trisected by compass and straightedge, even though *some* angles (like $90°$) trisect just fine.

## Why this is satisfying

What makes this whole story land is how little it resembles a coincidence once you see the mechanism. The Greeks stared at the heptagon for two thousand years with no algebra to explain the wall they'd hit; it took turning "can I draw this" into "what's the degree of this field extension" to see that the wall was made of number theory the entire time — specifically, of a still-open question about how many primes of the form $2^{2^m}+1$ exist. That's a genuinely rare kind of payoff in mathematics: a two-millennia-old, purely geometric puzzle, resolved completely on one side and reduced to an unsolved problem on the other, by a change of lens nobody involved in the original question could have anticipated.
