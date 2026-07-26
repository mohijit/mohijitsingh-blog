---
title: "The Shape of Symmetry: A Ground-Up Tour of Group Theory"
description: "Starting from the symmetries of a square, we build group theory from scratch with real proofs: Lagrange's theorem, the First Isomorphism Theorem, quotient groups, and a full proof of Cauchy's theorem."
date: 2026-05-16
tags: ["math", "algebra"]
---

Take a square piece of cardboard and ask: in how many ways can you pick it up and put it back down so that it still looks like the same square sitting in the same spot? You can leave it alone. You can rotate it by 90°, 180°, or 270°. You can flip it over across either diagonal, or across either line joining the midpoints of opposite edges. That's it — eight ways total, no more. Try a ninth and you'll find it's secretly one of the eight in disguise, or it doesn't preserve the square at all.

This question — "what are the symmetries of this shape, and how do they interact?" — turns out to be one of the most productive questions in mathematics. The eight motions of the square form a self-contained algebraic universe, and understanding that universe is the fastest way into group theory. So let's start there, not with a definition.

## The symmetries of a square

Label the square's corners $1, 2, 3, 4$ going counterclockwise, with corner $1$ at the top right. Put the center of the square at the origin, so $1 = (1,1)$, $2 = (-1,1)$, $3 = (-1,-1)$, $4 = (1,-1)$.

Let $r$ be rotation by $90°$ counterclockwise. As a function of coordinates, $r(x,y) = (-y, x)$, and tracking the corners:

$$r: 1 \to 2 \to 3 \to 4 \to 1.$$

Let $s$ be reflection across the vertical axis, $s(x,y) = (-x, y)$. On corners:

$$s: 1 \leftrightarrow 2, \qquad 3 \leftrightarrow 4.$$

Every one of the eight symmetries is a *function* from the square to itself, and functions compose: apply one, then another. Throughout, $fg$ means "first do $g$, then do $f$" — the same convention you'd use for function composition $f(g(x))$. Two facts jump out immediately if you sit with a few examples:

**Composing two symmetries always gives another symmetry.** If $f$ and $g$ each map the square onto itself rigidly, so does $fg$ — there is no way to combine two rigid motions and get something that isn't rigid. So the eight symmetries are *closed* under composition: you never need a ninth symmetry to describe the result of combining two you already have.

**Composition doesn't commute.** Let's check $rs$ against $sr$ directly, corner by corner. For $rs$ (do $s$ first, then $r$):

$$1 \xrightarrow{s} 2 \xrightarrow{r} 3, \quad 2 \xrightarrow{s} 1 \xrightarrow{r} 2, \quad 3 \xrightarrow{s} 4 \xrightarrow{r} 1, \quad 4 \xrightarrow{s} 3 \xrightarrow{r} 4.$$

So $rs$ sends $1\to3$, fixes $2$ and $4$, and sends $3 \to 1$ — it's the reflection across the diagonal through corners $2$ and $4$. Now $sr$ (do $r$ first, then $s$):

$$1 \xrightarrow{r} 2 \xrightarrow{s} 1, \quad 2 \xrightarrow{r} 3 \xrightarrow{s} 4, \quad 3 \xrightarrow{r} 4 \xrightarrow{s} 3, \quad 4 \xrightarrow{r} 1 \xrightarrow{s} 2.$$

So $sr$ fixes $1$ and $3$, and swaps $2$ and $4$ — the reflection across the *other* diagonal, through corners $1$ and $3$. These are two different symmetries: $rs \neq sr$. Rotating-then-reflecting is genuinely different from reflecting-then-rotating. Order matters.

A few more things are true, and true for a reason that has nothing to do with squares specifically:

- **Composition is associative.** $(fg)h$ and $f(gh)$ both mean "do $h$, then $g$, then $f$" — there's no ambiguity to resolve, so they're automatically equal. This is a free fact about function composition in general, not something special about symmetries.
- **There's a do-nothing symmetry**, the identity $e$, with $ef = fe = f$ for every symmetry $f$.
- **Every symmetry can be undone.** Rotating by $90°$ is undone by rotating by $-90°$ (i.e. $270°$); every reflection undoes itself, since flipping twice across the same line is doing nothing. So every $f$ has an inverse $f^{-1}$ with $ff^{-1} = f^{-1}f = e$.

Closure, associativity, an identity, and inverses are *exactly* the properties you need to manipulate symmetries algebraically — to solve equations like "which symmetry $x$ satisfies $rx = s$?" (answer: multiply both sides on the left by $r^{-1}$, giving $x = r^{-1}s$, and this reasoning only works because those four properties hold). Group theory is the decision to study *any* set with an operation satisfying these four properties, forgetting where it came from.

## What a group is

A **group** is a set $G$ together with a binary operation $G \times G \to G$, written $(a,b) \mapsto ab$, satisfying:

1. **Associativity**: $(ab)c = a(bc)$ for all $a,b,c \in G$.
2. **Identity**: there exists $e \in G$ such that $ea = ae = a$ for all $a \in G$.
3. **Inverses**: for every $a \in G$ there exists $a^{-1} \in G$ with $aa^{-1} = a^{-1}a = e$.

That's the whole definition. Notice what's *not* required: $ab = ba$ is not an axiom. Groups where it happens to hold anyway are called **abelian** (after Niels Henrik Abel); the symmetries of the square already showed us it can fail.

The eight symmetries of the square, under composition, form a group — this particular one is called the **dihedral group of order 8**, written $D_4$, and we'll come back to it.

## First consequences of the axioms

Before looking at more examples, it's worth proving a few facts directly from the three axioms — not because they're surprising, but because they show the axioms are already enough to reason rigorously, with no appeal to "well, obviously."

**Claim: the identity is unique.** Suppose $e$ and $e'$ both satisfy the identity axiom. Then

$$e = e e' \quad (\text{since } e' \text{ is an identity}) = e' \quad (\text{since } e \text{ is an identity}).$$

So $e = e'$. There is exactly one identity element, and we're entitled to call it *the* identity.

**Claim: inverses are unique.** Suppose $b$ and $c$ both satisfy $ab = ba = e$ and $ac = ca = e$ (both are inverses of $a$). Then

$$b = be = b(ac) = (ba)c = ec = c.$$

So $b = c$. This justifies writing $a^{-1}$ for *the* inverse of $a$, rather than *an* inverse.

**Claim (cancellation law): if $ab = ac$, then $b = c$; if $ba = ca$, then $b = c$.** For the first, multiply both sides on the left by $a^{-1}$:

$$a^{-1}(ab) = a^{-1}(ac) \;\Longrightarrow\; (a^{-1}a)b = (a^{-1}a)c \;\Longrightarrow\; eb = ec \;\Longrightarrow\; b = c.$$

The second is symmetric, multiplying on the right by $a^{-1}$ instead. Cancellation means the operation table of a finite group has no repeated entries in any row or column — a fact that will resurface.

**Claim: $(ab)^{-1} = b^{-1}a^{-1}$.** (Note the order flips — think of it as "undressing in reverse order.") Check directly:

$$(ab)(b^{-1}a^{-1}) = a(bb^{-1})a^{-1} = aea^{-1} = aa^{-1} = e,$$

and symmetrically $(b^{-1}a^{-1})(ab) = e$. By uniqueness of inverses, $b^{-1}a^{-1}$ *is* $(ab)^{-1}$.

These are small proofs, but they're real ones: every step cites an axiom or a previously proved fact, nothing more.

## Three families of examples

### Cyclic groups

Fix a positive integer $n$. The set $\mathbb{Z}/n\mathbb{Z} = \{0, 1, \dots, n-1\}$ with addition mod $n$ is a group: closure holds because addition mod $n$ always lands back in $\{0,\dots,n-1\}$, associativity is inherited from ordinary integer addition, $0$ is the identity, and the inverse of $k$ is $n-k$ (or $0$ if $k=0$). It has order $n$ (meaning $n$ elements), it's generated by the single element $1$ (every element is a repeated sum of $1$'s), and it's abelian, since ordinary addition commutes.

The picture below is the **Cayley graph** of $\mathbb{Z}/6\mathbb{Z}$: one node per element, one arrow per element showing where adding the generator $1$ sends it. The whole group structure is visible as a single directed cycle.

```tikz
\node[circle,draw,minimum size=0.8cm] (n0) at (0,1.6) {$0$};
\node[circle,draw,minimum size=0.8cm] (n1) at (1.39,0.8) {$1$};
\node[circle,draw,minimum size=0.8cm] (n2) at (1.39,-0.8) {$2$};
\node[circle,draw,minimum size=0.8cm] (n3) at (0,-1.6) {$3$};
\node[circle,draw,minimum size=0.8cm] (n4) at (-1.39,-0.8) {$4$};
\node[circle,draw,minimum size=0.8cm] (n5) at (-1.39,0.8) {$5$};
\draw[->,thick,blue] (n0) -- (n1);
\draw[->,thick,blue] (n1) -- (n2);
\draw[->,thick,blue] (n2) -- (n3);
\draw[->,thick,blue] (n3) -- (n4);
\draw[->,thick,blue] (n4) -- (n5);
\draw[->,thick,blue] (n5) -- (n0);
```

Any group generated by a single element is called **cyclic**, and every cyclic group of order $n$ is, in a precise sense we'll formalize later, "the same as" $\mathbb{Z}/n\mathbb{Z}$.

### The symmetric group

Let $S_n$ be the set of all bijections from $\{1, \dots, n\}$ to itself, with composition as the operation. Composing two bijections gives a bijection, composition of functions is always associative, the identity function is the identity element, and every bijection has an inverse function. So $S_n$ is a group, called the **symmetric group** on $n$ letters, with $|S_n| = n!$ (there are $n!$ bijections of an $n$-element set).

Elements of $S_n$ are usually written in **cycle notation**: $(1\,2\,3)$ means $1 \to 2 \to 3 \to 1$ (and fixes anything not listed); $(1\,2)$ means swap $1$ and $2$. Composition uses the same right-to-left convention as before: $(1\,3)(1\,2)$ means "apply $(1\,2)$ first."

$S_3$, with $3! = 6$ elements, is the smallest non-abelian group. A direct computation shows it: let $a = (1\,3)$ and $b = (1\,2)$. Then $ab$ sends $1 \xrightarrow{b} 2 \xrightarrow{a} 2$, $2 \xrightarrow{b} 1 \xrightarrow{a} 3$, $3 \xrightarrow{b} 3 \xrightarrow{a} 1$, so $ab = (1\,2\,3)$. But $ba$ sends $1 \xrightarrow{a} 3 \xrightarrow{b} 3$, $2 \xrightarrow{a} 2 \xrightarrow{b} 1$, $3 \xrightarrow{a} 1 \xrightarrow{b} 2$, so $ba = (1\,3\,2)$. Since $(1\,2\,3) \neq (1\,3\,2)$, we have $ab \neq ba$. (We'll return to this exact pair, $a=(1\,3)$, $b=(1\,2)$, later — it turns out to illustrate something important about subgroups too.)

### The dihedral group

Generalizing the square, the **dihedral group** $D_n$ is the symmetry group of a regular $n$-gon: $n$ rotations (by multiples of $360°/n$) and $n$ reflections, for $2n$ elements total. It's generated by a rotation $r$ of order $n$ ($r^n = e$) and a reflection $s$ of order $2$ ($s^2 = e$), satisfying the relation

$$srs^{-1} = r^{-1} \quad \Big(\text{equivalently } srs = r^{-1}, \text{ since } s = s^{-1}\Big).$$

Every element of $D_n$ can be written uniquely as $r^i$ or $r^i s$ for $0 \le i < n$. The square's symmetry group is $D_4$ ($n=4$, order $8$), and we already showed directly, corner by corner, that $rs \neq sr$ in $D_4$ — a genuine non-commuting pair, geometrically visible as "the two different diagonal reflections you get depending on whether you rotate-then-reflect or reflect-then-rotate." $D_n$ is abelian only for $n \le 2$; for $n \ge 3$ it never is.

## Subgroups and Lagrange's theorem

A subset $H \subseteq G$ is a **subgroup** (written $H \le G$) if $H$ is itself a group under $G$'s operation — meaning $H$ contains $e$, is closed under the operation, and is closed under inverses.

Checking all of that separately is more work than necessary. Here's a one-step test:

**Subgroup criterion.** A nonempty subset $H \subseteq G$ is a subgroup if and only if $ab^{-1} \in H$ for all $a, b \in H$.

*Proof.* If $H$ is a subgroup, closure and inverses immediately give $ab^{-1} \in H$. Conversely, suppose $H$ is nonempty and closed under $(a,b) \mapsto ab^{-1}$. Pick any $a \in H$ (possible since $H \neq \emptyset$); then $aa^{-1} = e \in H$. Now for any $a \in H$, apply the hypothesis to $e, a \in H$: $ea^{-1} = a^{-1} \in H$, so $H$ is closed under inverses. Finally, for $a, b \in H$, we just showed $b^{-1} \in H$, so applying the hypothesis to $a, b^{-1} \in H$ gives $a(b^{-1})^{-1} = ab \in H$, so $H$ is closed under the operation. Associativity is inherited from $G$. So $H$ is a subgroup. $\blacksquare$

Examples: $n\mathbb{Z} = \{\dots, -n, 0, n, 2n, \dots\}$ is a subgroup of $(\mathbb{Z}, +)$ — for $a, b \in n\mathbb{Z}$, $a - b \in n\mathbb{Z}$ (the additive form of the criterion). Inside $D_n$, the rotations $\{e, r, r^2, \dots, r^{n-1}\}$ form a cyclic subgroup of order $n$; the reflections alone do *not* form a subgroup (the product of two reflections is a rotation, not a reflection — closure fails, and we saw this concretely: in $D_4$, $rs$ and $sr$ are reflections, but $s \cdot s = e$ is a rotation while, e.g., a product of two *different* reflections need not be a reflection at all).

### Lagrange's theorem

Named for Joseph-Louis Lagrange, who studied a special case of this idea (concerning permutations of the roots of polynomials) well before groups were defined abstractly, this is one of the first genuinely satisfying theorems in the subject:

**Theorem (Lagrange).** If $G$ is a finite group and $H \le G$, then $|H|$ divides $|G|$.

*Proof.* For $g \in G$, define the **left coset** $gH = \{gh : h \in H\}$. We'll show the left cosets partition $G$ into equal-sized pieces.

*Every element lies in some coset:* $g = ge \in gH$.

*Two cosets are either identical or disjoint:* suppose $gH \cap g'H \neq \emptyset$, say $gh_1 = g'h_2$ for some $h_1, h_2 \in H$. Then $g' = g h_1 h_2^{-1}$. For any $h \in H$, $g'h = g(h_1h_2^{-1}h) \in gH$ since $h_1h_2^{-1}h \in H$ (closure); so $g'H \subseteq gH$. By the symmetric argument $gH \subseteq g'H$, so $gH = g'H$. Hence distinct cosets never overlap.

*Every coset has exactly $|H|$ elements:* the map $h \mapsto gh$ from $H$ to $gH$ is surjective by definition of $gH$, and injective because $gh = gh' \Rightarrow h = h'$ by left cancellation. So it's a bijection, and $|gH| = |H|$.

Putting this together: $G$ is a disjoint union of left cosets of $H$, say $k$ of them (this $k$ is called the **index** of $H$, written $[G:H]$), each of size $|H|$. So

$$|G| = k \cdot |H|,$$

which means $|H|$ divides $|G|$. $\blacksquare$

This single argument — partition into cosets, show they're equinumerous via a bijection $h \mapsto gh$ — is a template that recurs constantly in group theory; we'll reuse a close cousin of it for Cauchy's theorem at the end.

Here's the subgroup lattice of $\mathbb{Z}/12\mathbb{Z}$, which (because $\mathbb{Z}/12\mathbb{Z}$ is cyclic) matches the divisibility lattice of $12$'s divisors exactly — every subgroup order shown here does indeed divide $12$, as Lagrange's theorem demands, and in this abelian case every divisor is actually achieved:

```tikz
\node[draw,rounded corners,minimum width=1.7cm] (A) at (0,0) {order 1};
\node[draw,rounded corners,minimum width=1.7cm] (B) at (-1.9,1.4) {order 2};
\node[draw,rounded corners,minimum width=1.7cm] (C) at (1.9,1.4) {order 3};
\node[draw,rounded corners,minimum width=1.7cm] (D) at (-1.9,2.8) {order 4};
\node[draw,rounded corners,minimum width=1.7cm] (E) at (1.9,2.8) {order 6};
\node[draw,rounded corners,minimum width=1.7cm] (F) at (0,4.2) {order 12};
\draw (A) -- (B);
\draw (A) -- (C);
\draw (B) -- (D);
\draw (B) -- (E);
\draw (C) -- (E);
\draw (D) -- (F);
\draw (E) -- (F);
```

Worth flagging explicitly: Lagrange's theorem is a one-way street. $|H|$ dividing $|G|$ is *necessary* for $H \le G$ to exist, but not sufficient — $A_4$ (order 12) famously has no subgroup of order 6, even though $6 \mid 12$.

## Homomorphisms and isomorphisms

A **homomorphism** $\varphi: G \to H$ between groups is a function satisfying

$$\varphi(ab) = \varphi(a)\varphi(b) \quad \text{for all } a, b \in G$$

— it respects the group operation, translating products in $G$ into products in $H$. A bijective homomorphism is an **isomorphism**, and we say $G \cong H$ ("isomorphic") when one exists: as far as group structure is concerned, $G$ and $H$ are indistinguishable, just relabeled.

Two concrete examples. First, $\exp: (\mathbb{R}, +) \to (\mathbb{R}_{>0}, \times)$ satisfies $\exp(a+b) = \exp(a)\exp(b)$; it's bijective, so it's an isomorphism — additive and multiplicative structure on those two sets are "the same group" in disguise. Second, the **sign homomorphism** $\mathrm{sgn}: S_n \to \{+1,-1\}$ (the latter a group under multiplication) sends a permutation to $+1$ if it's a product of an even number of transpositions and $-1$ if odd; $\mathrm{sgn}(\sigma\tau) = \mathrm{sgn}(\sigma)\mathrm{sgn}(\tau)$ holds essentially by definition, but $\mathrm{sgn}$ is not injective for $n \ge 2$.

Two quick lemmas we'll need: $\varphi(e_G) = e_H$, since $\varphi(e_G) = \varphi(e_Ge_G) = \varphi(e_G)\varphi(e_G)$, and cancelling one factor of $\varphi(e_G)$ (valid in the group $H$) gives $\varphi(e_G) = e_H$. And $\varphi(a^{-1}) = \varphi(a)^{-1}$, since $\varphi(a)\varphi(a^{-1}) = \varphi(aa^{-1}) = \varphi(e_G) = e_H$, and uniqueness of inverses does the rest.

Define the **kernel** $K = \ker\varphi = \{g \in G : \varphi(g) = e_H\}$ and the **image** $\operatorname{im}\varphi = \{\varphi(g) : g \in G\} \le H$.

**Claim: $\ker\varphi$ is a normal subgroup of $G$.** First, it's a subgroup: $e_G \in K$ by the lemma above; if $a, b \in K$ then $\varphi(ab) = \varphi(a)\varphi(b) = e_He_H = e_H$, so $ab \in K$; if $a \in K$ then $\varphi(a^{-1}) = \varphi(a)^{-1} = e_H^{-1} = e_H$, so $a^{-1} \in K$.

Now normality. For any $g \in G$ and $k \in K$:

$$\varphi(gkg^{-1}) = \varphi(g)\varphi(k)\varphi(g)^{-1} = \varphi(g)\,e_H\,\varphi(g)^{-1} = e_H,$$

so $gkg^{-1} \in K$. This shows $gKg^{-1} \subseteq K$ for *every* $g \in G$ — including $g^{-1}$ in place of $g$, which gives $g^{-1}Kg \subseteq K$, i.e. $K \subseteq gKg^{-1}$. Combined, $gKg^{-1} = K$ for all $g$: exactly the definition of a **normal subgroup**, written $K \trianglelefteq G$. $\blacksquare$

This is the first place normality has shown up, and it's not an accident — it's forced on us the moment we ask "what's the kernel of a homomorphism," and it turns out (next section) to be exactly the property needed to build quotient groups. Assuming that construction for a moment (we justify it fully next section), we can form $G/K$, whose elements are the cosets $gK$, with operation $(gK)(g'K) := (gg')K$.

**Theorem (First Isomorphism Theorem).** $G/\ker\varphi \cong \operatorname{im}\varphi$.

*Proof.* Write $K = \ker\varphi$. Define $\psi: G/K \to \operatorname{im}\varphi$ by $\psi(gK) = \varphi(g)$.

*Well-defined:* we need $\psi$'s output to depend only on the coset $gK$, not the representative $g$. Recall $gK = g'K$ exactly when $g^{-1}g' \in K$ (if $gK = g'K$ then $g' = gk$ for some $k \in K$, so $g^{-1}g' = k \in K$; conversely if $g^{-1}g' = k \in K$ then $g' = gk$, and $g'K = gkK = gK$ since $kK = K$). So suppose $gK = g'K$, i.e. $g^{-1}g' \in K$. Then $\varphi(g^{-1}g') = e_H$, i.e. $\varphi(g)^{-1}\varphi(g') = e_H$, i.e. $\varphi(g) = \varphi(g')$ — so $\psi(gK)$ doesn't depend on the choice of representative.

*Homomorphism:* $\psi\big((gK)(g'K)\big) = \psi(gg'K) = \varphi(gg') = \varphi(g)\varphi(g') = \psi(gK)\psi(g'K)$.

*Injective:* if $\psi(gK) = \psi(g'K)$ then $\varphi(g) = \varphi(g')$, so $\varphi(g)^{-1}\varphi(g') = e_H$, i.e. $\varphi(g^{-1}g') = e_H$, i.e. $g^{-1}g' \in K$, i.e. $gK = g'K$.

*Surjective onto $\operatorname{im}\varphi$:* any element of $\operatorname{im}\varphi$ is $\varphi(g)$ for some $g$, which is $\psi(gK)$.

So $\psi$ is a bijective homomorphism: $G/K \cong \operatorname{im}\varphi$. $\blacksquare$

Informally: a homomorphism's image is what's left of $G$ after you collapse the kernel to a point. Everything that gets sent to $e_H$ is "absorbed," and what remains is a faithful copy of $G$ modulo that absorption.

## Quotient groups: why normality is non-negotiable

We used $G/K$ above, promising to justify it. The definition we want is simple to state: given $N \le G$, let $G/N$ be the set of cosets $\{gN : g \in G\}$, with operation

$$(aN)(bN) := (ab)N.$$

The problem is that a coset $aN$ can be written with many different representatives ($aN = a'N$ whenever $a^{-1}a' \in N$), and the formula above defines the product using *one particular* representative from each coset. For this to be a legitimate operation on cosets (rather than an operation that secretly depends on which representative you happened to pick), the answer must come out the same no matter which representatives you choose. This is exactly where normality earns its keep, and it's worth seeing the failure concretely rather than taking it on faith.

Take $G = S_3$ and $H = \{e, (1\,2)\}$ — order $2$, so $[G:H] = 3$. Using the same composition convention as before (apply the right-hand permutation first), compute:

$$(1\,3)(1\,2) = (1\,2\,3), \qquad (1\,2)(1\,3) = (1\,3\,2).$$

(Check the first: $1 \xrightarrow{(1\,2)} 2 \xrightarrow{(1\,3)} 2$, $2 \xrightarrow{(1\,2)} 1 \xrightarrow{(1\,3)} 3$, $3 \xrightarrow{(1\,2)} 3 \xrightarrow{(1\,3)} 1$ — indeed $(1\,2\,3)$.)

So the left coset $(1\,3)H = \{(1\,3),\ (1\,3)(1\,2)\} = \{(1\,3),\ (1\,2\,3)\}$. In particular, $(1\,2\,3)$ is *also* a valid representative of this same coset: $(1\,2\,3)H = (1\,3)H$.

Now compute the product $\big((1\,3)H\big)\big((2\,3)H\big)$ two ways, using two different representatives of the first coset.

Using representative $(1\,3)$: $(1\,3)(2\,3) = (1\,3\,2)$ (check: $1 \xrightarrow{(2\,3)} 1 \xrightarrow{(1\,3)} 3$, $2 \xrightarrow{(2\,3)} 3 \xrightarrow{(1\,3)} 1$, $3 \xrightarrow{(2\,3)} 2 \xrightarrow{(1\,3)} 2$). And $(2\,3)H = \{(2\,3), (2\,3)(1\,2)\} = \{(2\,3), (1\,3\,2)\}$ (check $(2\,3)(1\,2)$: $1\to2\to1$... working it out gives $(1\,3\,2)$). So $(1\,3\,2)$ lands in the coset $(2\,3)H$ — consistent so far.

Using representative $(1\,2\,3)$ instead (a valid representative of the *same* coset $(1\,3)H$): $(1\,2\,3)(2\,3) = (1\,2)$ (check: $1 \xrightarrow{(2\,3)} 1 \xrightarrow{(1\,2\,3)} 2$, $2 \xrightarrow{(2\,3)} 3 \xrightarrow{(1\,2\,3)} 1$, $3 \xrightarrow{(2\,3)} 2 \xrightarrow{(1\,2\,3)} 3$ — that's $(1\,2)$). But $(1\,2) \in H$, and $H \neq (2\,3)H$ (they're disjoint cosets).

Same two cosets, same intended product, two different representative choices — and the results land in *different* cosets ($(2\,3)H$ versus $H$). The formula $(aH)(bH) := (ab)H$ is simply not a function on cosets when $H$ isn't normal; it gives contradictory answers depending on an arbitrary choice. (Indeed $H = \{e,(1\,2)\}$ is not normal in $S_3$: one can check its left and right cosets by $(1\,3)$ already disagree, $(1\,3)H = \{(1\,3),(1\,2\,3)\}$ versus $H(1\,3) = \{(1\,3),(1\,3\,2)\}$.)

Now see why normality fixes this. Suppose $N \trianglelefteq G$, and suppose $aN = a'N$, $bN = b'N$ — so $a' = an_1$, $b' = bn_2$ for some $n_1, n_2 \in N$. Then

$$a'b' = a n_1 b n_2 = ab\,(b^{-1}n_1b)\,n_2.$$

Because $N$ is normal, $b^{-1}n_1b \in N$ (that's precisely $b^{-1}Nb = N$). Call it $n_3$. Then $a'b' = ab\,(n_3n_2)$ with $n_3n_2 \in N$, so $a'b' \in (ab)N$, hence $a'b'N = (ab)N$. The product doesn't depend on the representatives after all — the earlier disaster is exactly what normality rules out. With that settled, $G/N$ under $(aN)(bN) = (ab)N$ is a genuine group: associativity and inverses ($({aN})^{-1} = a^{-1}N$) follow from the corresponding facts in $G$, and $eN = N$ is the identity.

## A genuinely hard theorem: Cauchy's theorem

Everything so far has been building toward being able to state and *prove* something that isn't immediate from the definitions. Here's one:

**Theorem (Cauchy).** If $G$ is a finite group and $p$ is a prime dividing $|G|$, then $G$ has an element of order $p$.

This is a genuine converse-flavored partner to Lagrange's theorem: Lagrange says element orders and subgroup orders must divide $|G|$; Cauchy says that for prime divisors, an element of that order is actually *guaranteed* to exist (this is generally false for non-prime divisors, as the $A_4$ example above shows). The proof below is a compressed version of an elegant argument usually attributed to J. H. McKay.

*Proof.* Consider the set of $p$-tuples of elements of $G$ whose product is the identity:

$$S = \{(g_1, g_2, \dots, g_p) \in G^p : g_1g_2\cdots g_p = e\}.$$

The first $p-1$ entries can be chosen freely ($|G|^{p-1}$ ways), and the last entry is then forced to be $(g_1\cdots g_{p-1})^{-1}$ to make the product $e$. So $|S| = |G|^{p-1}$. Since $p \mid |G|$, certainly $p \mid |G|^{p-1}$ (as $p - 1 \ge 1$), so

$$p \mid |S|.$$

Now define a "rotate" map $\rho: S \to S$ by $\rho(g_1, \dots, g_p) = (g_2, \dots, g_p, g_1)$. This really lands back in $S$: if $g_1\cdots g_p = e$, then

$$g_2 \cdots g_p g_1 = g_1^{-1}(g_1 g_2 \cdots g_p)g_1 = g_1^{-1}eg_1 = e.$$

Applying $\rho$ exactly $p$ times returns any tuple to itself (a full cyclic rotation of $p$ entries), so $\rho^p = \mathrm{id}$ on $S$.

*A mini-lemma:* for any tuple $t \in S$, let $k$ be the smallest positive integer with $\rho^k(t) = t$. Then $k$ divides $p$. Indeed, since $\rho^p(t) = t$, write $p = qk + r$ with $0 \le r < k$ (division algorithm); then $t = \rho^p(t) = \rho^r\big(\rho^{qk}(t)\big) = \rho^r(t)$ (because $\rho^k(t)=t$ implies $\rho^{qk}(t) = t$), and minimality of $k$ forces $r = 0$. So $k \mid p$. Since $p$ is prime, $k \in \{1, p\}$.

This splits $S$ into "orbits" under repeated rotation, each of size $1$ or $p$ (an orbit of size $k$ consists of $t, \rho(t), \dots, \rho^{k-1}(t)$, all distinct). Since $|S| \equiv 0 \pmod p$ and every orbit contributes either $1$ (if $k=1$) or a multiple of $p$ (if $k=p$) to that total, the number of size-$1$ orbits must itself be $\equiv 0 \pmod p$.

A size-$1$ orbit is a tuple fixed by $\rho$, i.e. $(g_1, \dots, g_p)$ with $g_1 = g_2 = \cdots = g_p$. Writing $x = g_1$, such a tuple lies in $S$ exactly when $x^p = e$. So the count we care about is

$$\#\{x \in G : x^p = e\} \equiv 0 \pmod p.$$

The identity $e$ always satisfies $e^p = e$, so this count is at least $1$ — and since it's a multiple of $p$ and at least $1$, it must be at least $p \ge 2$. So there is some $x \neq e$ with $x^p = e$. The order of $x$ divides $p$ (a standard fact: if $x^p = e$, the same division-algorithm argument as the mini-lemma shows the order of $x$ divides $p$), so the order of $x$ is $1$ or $p$; order $1$ would mean $x = e$, which we excluded. So $x$ has order exactly $p$. $\blacksquare$

This is a real proof of a non-trivial theorem, built entirely out of tools we already had — counting, a symmetry (cyclic rotation) applied to a cleverly chosen set, and the same "orbits divide evenly" idea that powered Lagrange's theorem. It's also, honestly, just one carefully chosen slice of a much bigger and harder body of results (the Sylow theorems) about how the prime factorization of $|G|$ controls what subgroups $G$ must have — the full Sylow theory is out of scope here, and what's above is genuinely the easy case, not a shortcut to the general one.

## What's deliberately left out

This has been a foundations tour, not a complete course, and it's worth being explicit about the size of what's missing. Three deep continuations, each a serious subject on its own:

- **Galois theory**, which uses groups (specifically, groups of symmetries of the roots of a polynomial) to explain exactly which polynomial equations can and cannot be solved by radicals — connecting group theory to field theory in a way that, in the early 19th century, resolved a centuries-old open problem.
- **Representation theory**, which studies groups not as abstract objects but through how they act as symmetries of vector spaces (i.e., via homomorphisms into matrix groups) — an entire parallel toolkit that turns group-theoretic questions into linear algebra.
- **The classification of finite simple groups**, one of the largest collaborative theorems in mathematics, pinning down every finite group that has no proper nontrivial normal subgroups — the "atoms" every finite group is built from. Sylow's theorems, only glimpsed here through Cauchy's special case, are an early tool in that direction.

Each of those is a legitimate next step from everything above; none of them is a quick addendum.
