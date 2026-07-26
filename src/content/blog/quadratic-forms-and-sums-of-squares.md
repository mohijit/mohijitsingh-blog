---
title: "Which primes are a sum of two squares?"
description: "From an elementary congruence check to Gaussian integers, class groups, and quadratic reciprocity."
date: 2026-05-31
tags: ["math", "number-theory"]
---

$x^2+y^2$ looks like about the simplest expression you could write down. So here's
a simple-looking question: which primes can be written as a sum of two squares?

Try a few. $5 = 1^2+2^2$. $13 = 2^2+3^2$. $17=1^2+4^2$. $29=2^2+5^2$. But $7$? No
combination of two squares gives $7$. Neither does $11$, $19$, or $23$. Something
is sorting the primes into two piles, and if you list enough of them the pattern
jumps out:

$$
\underbrace{5, 13, 17, 29, 37, 41, \ldots}_{\text{sums of two squares}} \qquad
\underbrace{3, 7, 11, 19, 23, 31, \ldots}_{\text{not}}
$$

The first list is exactly the primes congruent to $1 \bmod 4$; the second is
exactly the primes congruent to $3 \bmod 4$ (setting $p=2=1^2+1^2$ aside as the
one even prime). That such a clean congruence condition governs a question about
sums of squares is not obvious at all, and chasing down *why* it's true is a
genuine on-ramp into a large piece of number theory: congruences, a new number
system, unique factorization in that system, and eventually the machinery
(class groups, quadratic reciprocity) needed to handle harder versions of the
same question.

## The easy half: primes $\equiv 3 \pmod 4$ never work

This direction is a clean congruence argument. Look at squares modulo 4. Every
integer is $0,1,2,$ or $3 \pmod 4$, and squaring gives:

$$
0^2\equiv 0,\quad 1^2\equiv 1,\quad 2^2\equiv 0,\quad 3^2\equiv 1 \pmod 4.
$$

So a perfect square is always $0$ or $1 \pmod 4$ — never $2$ or $3$. Now suppose
$p = x^2+y^2$. Each of $x^2,y^2$ is $0$ or $1 \pmod 4$, so their sum is $0,1,$ or
$2 \pmod 4$. It is *never* $3 \pmod 4$. Hence no prime $p\equiv 3\pmod4$ (indeed
no integer $\equiv 3\pmod4$) can be a sum of two squares. Done — completely
elementary, no gaps.

That leaves the real question: why does *every* prime $p\equiv1\pmod4$ succeed?

## Fermat's two-square theorem

**Claim.** An odd prime $p$ is a sum of two squares if and only if $p\equiv1\pmod4$.

We've proved the "only if." For the "if" direction we need two ingredients.

**Ingredient 1: $-1$ is a quadratic residue mod $p$ exactly when $p\equiv1\pmod4$.**

The multiplicative group $(\mathbb{Z}/p\mathbb{Z})^\times$ is cyclic of order
$p-1$ (a standard fact about the nonzero residues modulo a prime — every finite
subgroup of the multiplicative group of a field is cyclic). Let $g$ be a
generator. Every nonzero residue is $g^k$ for some $k$, and $g^k$ is a square
iff $k$ is even (since $g^{2j}=(g^j)^2$, and conversely if $g^k=(g^m)^2=g^{2m}$
then $k\equiv 2m \pmod{p-1}$, which forces $k$ even when $p-1$ is even — true
since $p$ is odd). Now, $-1$ has order exactly $2$ in this group (it squares to
$1$ and isn't $1$ itself, for $p>2$), and in a cyclic group of order $p-1$, the
*unique* element of order $2$ is $g^{(p-1)/2}$. So $-1 = g^{(p-1)/2}$, and $-1$
is a square iff $(p-1)/2$ is even, i.e. iff $p\equiv1\pmod4$.

(This is a special case of **Euler's criterion**: for $a$ coprime to $p$, $a$ is
a quadratic residue mod $p$ iff $a^{(p-1)/2}\equiv1\pmod p$. Plugging in $a=-1$
and using $(-1)^{(p-1)/2} = \pm1$ recovers exactly the parity statement above.)

So when $p\equiv1\pmod4$, there is an integer $m$ with

$$
m^2 \equiv -1 \pmod p, \qquad\text{i.e.}\qquad p \mid m^2+1.
$$

**Ingredient 2: turning that divisibility into an actual representation.**

Knowing $p\mid m^2+1$ doesn't yet hand you $x,y$ with $p=x^2+y^2$ — it just says
$p$ divides *something* of that shape. The bridge is a pigeonhole argument
usually credited to Thue.

Consider all pairs $(a,b)$ with $0\le a,b\le\lfloor\sqrt p\rfloor$. There are
$(\lfloor\sqrt p\rfloor+1)^2 > p$ such pairs (squaring the floor-plus-one strictly
exceeds $p$). Look at the values $a - mb \bmod p$ over all these pairs. Since
there are more than $p$ pairs and only $p$ residues mod $p$, two different pairs
$(a_1,b_1)\neq(a_2,b_2)$ must give the same residue:

$$
a_1 - m b_1 \equiv a_2 - m b_2 \pmod p.
$$

Set $x = a_1-a_2$ and $y=b_1-b_2$ (not both zero, since the pairs are distinct).
Then $x \equiv my \pmod p$, so

$$
x^2 \equiv m^2y^2 \equiv -y^2 \pmod p
\quad\Longrightarrow\quad
p \mid x^2+y^2.
$$

Now bound the size: since $0\le a_i,b_i\le\lfloor\sqrt p\rfloor$, we have
$|x|,|y| \le \lfloor\sqrt p\rfloor < \sqrt p$, so

$$
0 < x^2+y^2 < 2p
$$

(it's strictly positive because $x,y$ aren't both zero). A positive multiple of
$p$ that's less than $2p$ must equal $p$ itself. Hence

$$
x^2+y^2 = p.
$$

That's the whole proof, and every step is elementary: cyclic group structure,
pigeonhole, and a size bound. No case is swept under the rug.

## Reframing it algebraically: the Gaussian integers

The proof above works, but it doesn't yet explain *why* $1\bmod4$ is the natural
dividing line, beyond "that's what the group-order computation says." A cleaner
conceptual picture comes from moving into a bigger number system: the
**Gaussian integers**

$$
\mathbb{Z}[i] = \{a+bi : a,b\in\mathbb{Z}\}, \qquad i^2=-1.
$$

Define the **norm** $N(a+bi) = a^2+b^2$ (literally the squared length of $a+bi$
as a point in the plane). The norm is multiplicative:

$$
N(zw) = N(z)N(w)
$$

for $z,w\in\mathbb{Z}[i]$. This is a one-line check: if $z=a+bi$, $w=c+di$, then
$zw = (ac-bd)+(ad+bc)i$, so

$$
N(zw) = (ac-bd)^2+(ad+bc)^2.
$$

Expand both sides:

$$
\begin{aligned}
(ac-bd)^2+(ad+bc)^2 &= a^2c^2-2abcd+b^2d^2+a^2d^2+2abcd+b^2c^2\\
&= a^2c^2+b^2d^2+a^2d^2+b^2c^2\\
&= (a^2+b^2)(c^2+d^2) = N(z)N(w).
\end{aligned}
$$

Now the question "$p=x^2+y^2$?" becomes "does $p$ *factor* in $\mathbb{Z}[i]$?"
Indeed, $p=x^2+y^2$ is exactly $p = (x+iy)(x-iy) = N(x+iy)$. So $p$ being a sum of
two squares means $p$ is the norm of a Gaussian integer, which is the same as
saying $p$ splits into two (conjugate) factors in $\mathbb{Z}[i]$ instead of
staying prime there.

This reframes Ingredient 1 exactly: if $m^2\equiv-1\pmod p$, then $p \mid
(m+i)(m-i)$ in $\mathbb{Z}[i]$. But $p$ does **not** divide $m+i$ or $m-i$
individually (their ratio $\frac{m+i}{m-i} = \frac{(m+i)^2}{m^2+1}$ is not a
Gaussian integer, since $m^2+1$ has magnitude comparable to $m$, not divisible
cleanly). So $p$ divides a product without dividing either factor — which is
impossible if $p$ is *prime* in $\mathbb{Z}[i]$ the same way ordinary primes
behave (Euclid's lemma). The only way out is that $p$ isn't prime in
$\mathbb{Z}[i]$ after all: it must factor, $p = \pi\bar\pi$, and taking norms
gives $p^2 = N(\pi)N(\bar\pi)$, forcing $N(\pi)=N(\bar\pi)=p$ — which is exactly
a representation $p=x^2+y^2$.

For this "Euclid's lemma" step to be legitimate, $\mathbb{Z}[i]$ needs to be a
unique factorization domain (UFD) — and it is, because it's a **Euclidean
domain** under the norm (you can always divide with a remainder of strictly
smaller norm, the same mechanism that makes ordinary long division work for
$\mathbb{Z}$), and Euclidean domains are always UFDs. I won't reprove that
general algebra fact here, but it's the honest linchpin holding the whole
"Gaussian integers" reframing together — take it as a standard, checkable
result about Euclidean domains rather than something specific to $\mathbb{Z}[i]$
that needs a bespoke argument.

So the clean statement is: **an odd prime $p$ splits in $\mathbb{Z}[i]$ iff
$p\equiv1\pmod4$; it stays prime (inert) iff $p\equiv3\pmod4$.** Congruence
conditions controlling how primes split in a larger ring of integers — this
turns out to be a completely general phenomenon, and $x^2+y^2$ is the first
example anyone meets.

## What happens for $x^2+ny^2$?

The brief, elementary story above is special to $n=1$. Ask the same question for
$x^2+5y^2$: which primes does it represent? You might hope for another single
congruence condition, and you'd be disappointed. It turns out (I'll state this
without reproving it — the argument requires more machinery than fits here)
that:

$$
p = x^2+5y^2 \iff p\equiv 1,9 \pmod{20},
$$

but there's a *second* class of primes, $p\equiv3,7\pmod{20}$, which are
represented not by $x^2+5y^2$ itself but by the different-looking form
$2x^2+2xy+3y^2$ — a form of the *same discriminant* ($-20$) that is genuinely
inequivalent to $x^2+5y^2$ (no integer change of variables turns one into the
other), yet plays an analogous role.

This is the extra layer of complexity the single-prime, single-form case hides:
for a fixed discriminant, there can be more than one genuinely inequivalent
binary quadratic form, and a prime's congruence class only tells you it's
represented by *one of them* — you need to know *which*. Gauss's theory of
binary quadratic forms organizes this by defining a group structure (composition
of forms) on the equivalence classes of forms of a given discriminant — the
**class group**. Its size, the **class number**, measures exactly how much
"extra choice" there is: when the class number is $1$ (as it is for
discriminant $-4$, corresponding to $x^2+y^2$), there's only one form and you get
a clean single congruence condition, which is exactly the lucky case Fermat's
theorem lives in. When the class number is bigger than $1$ (discriminant $-20$
has class number $2$), the representability question splits across multiple
forms and a single congruence no longer suffices. I'm not deriving class group
composition here — it's a real piece of 19th-century algebra in its own right —
but naming what it measures is enough to see why $x^2+y^2$ was the easy case,
not the typical one.

## Quadratic reciprocity: the general machine

The congruence conditions above (mod 4, mod 20, ...) are not arbitrary; they're
all instances of a single, much more general law. For odd primes $p,q$, define
the **Legendre symbol** $\left(\frac pq\right)$ to be $+1$ if $p$ is a quadratic
residue mod $q$, $-1$ if it's a non-residue. **Gauss's law of quadratic
reciprocity** states:

$$
\left(\frac pq\right)\left(\frac qp\right) = (-1)^{\frac{p-1}{2}\cdot\frac{q-1}2}.
$$

In words: whether $p$ is a square mod $q$ and whether $q$ is a square mod $p$
are almost always the same question, except when both $p$ and $q$ are
$3\bmod4$, in which case the answers flip. This is exactly the kind of tool that
generates congruence conditions like "$p\equiv1\pmod4$" from an underlying
question about which primes divide values of a quadratic form — it's the
general engine; Fermat's two-square theorem is one small, especially clean gear
in it. Proving reciprocity itself is a substantial undertaking on its own (Gauss
gave several different proofs across his life), and I'm not attempting it
here — only placing it as the general law that the mod-4 condition above is a
tiny special case of.

## Where this really leads

The honest arc of this post is: one clean theorem, proved completely
(Fermat/Euler/Thue on $x^2+y^2$), then a widening set of honest sketches of why
the general question is harder (class groups for $x^2+ny^2$, reciprocity as the
underlying machine). The natural home for all of this, if you keep going, is
**algebraic number theory**: rings of integers of general number fields, and the
question of how a prime $p$ splits in such a ring — into two factors, staying
inert, or (in bad cases) ramifying. $\mathbb{Z}[i]$ and $\mathbb{Z}$ adjoin a
root of $x^2+5$ are the first, smallest examples of number rings; the general
theory of prime splitting in number fields is exactly the generalization that
Fermat's two-square theorem was a two-thousand-year head start on, without
anyone in the 17th century having the words for it yet.
