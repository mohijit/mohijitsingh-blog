---
title: "Linear algebra, from vectors to singular values"
description: "Building up vector spaces, linear maps, and eigenstructure from first principles, ending at the singular value decomposition."
date: 2026-06-28
tags: ["math", "algebra"]
---

A single number can describe one measurement. Most things worth describing take
several — a point in space, a set of features, a signal sampled at many times.
The moment you bundle numbers into a list and want to add two such lists, or
scale one, you're already doing linear algebra; the whole subject is what
happens when you take those two operations (adding, scaling) seriously and ask
exactly what structure they support.

## Vector spaces

Geometric vectors in the plane obey some obvious rules: $u+v=v+u$, there's a
zero vector that does nothing, every vector has an opposite, scaling twice is
the same as scaling by the product, and so on. A **vector space** over
$\mathbb{R}$ is any set with an addition and a scalar multiplication satisfying
exactly these rules (associativity and commutativity of addition, existence of
a zero vector and additive inverses, and compatibility of scalar multiplication
with addition and with itself) — abstracted away from any particular picture of
arrows.

The point of abstracting is that other things satisfy the exact same rules.
Polynomials of degree $\le n$ add and scale exactly like vectors do, and so do
$m\times n$ matrices. Anything you prove using only the vector space axioms
automatically holds for all of these at once — that's the payoff for
formalizing what could otherwise feel like an unnecessary relabeling of
$\mathbb{R}^n$.

## Span, independence, basis, dimension

A set of vectors **spans** a space if every vector in the space is some linear
combination of them. A set is **linearly independent** if no vector in it is a
linear combination of the others (equivalently: the only linear combination
equal to zero is the trivial one, all coefficients zero). A **basis** is an
independent spanning set — enough vectors to reach everywhere, none of them
redundant.

A space can have many different bases, but they all have the same size. This
isn't obvious from the definition, and it's worth actually proving, because
"dimension" only makes sense as a single number if this is true.

**Claim.** If $\{v_1,\ldots,v_n\}$ and $\{w_1,\ldots,w_m\}$ are both bases of the
same finite-dimensional vector space, then $n=m$.

*Proof sketch (exchange argument).* Suppose $m<n$. Since $\{w_1,\ldots,w_m\}$
spans the space, write $v_1 = \sum c_i w_i$; some $c_i\neq0$ (else $v_1=0$,
contradicting independence of the $v$'s), so we can solve for that $w_i$ in
terms of $v_1$ and the other $w$'s, and swap it in: $\{v_1,w_1,\ldots,\widehat
{w_i},\ldots,w_m\}$ still spans the space. Repeat, bringing in $v_2$ next and
eliminating some remaining $w_j$ (always possible, because a set that already
spans can absorb one more independent vector by ejecting some old spanning
vector it's now linearly dependent with) — after $m$ such swaps every $w$ has
been replaced by a $v$, and the set $\{v_1,\ldots,v_m\}$ spans the whole space.
But then $v_{m+1}$ (which exists since $m<n$) would be a linear combination of
$v_1,\ldots,v_m$, contradicting the independence of $\{v_1,\ldots,v_n\}$. So
$m\ge n$, and by the symmetric argument $n\ge m$; hence $n=m$. $\blacksquare$

So **dimension** — the common size of every basis — is well-defined. This one
proof is what makes every later statement of the form "an $n$-dimensional space"
meaningful rather than dependent on an arbitrary choice of basis.

## Linear maps and matrices

A **linear map** $T$ satisfies $T(u+v)=T(u)+T(v)$ and $T(cv)=cT(v)$. Here's the
key structural fact: once you fix a basis $\{v_1,\ldots,v_n\}$ of the domain,
$T$ is completely determined by the values $T(v_1),\ldots,T(v_n)$, because any
vector $x=\sum c_iv_i$ has

$$
T(x) = T\left(\sum c_iv_i\right) = \sum c_i\,T(v_i)
$$

by linearity — no other information about $T$ is needed. Writing each
$T(v_j)$ in coordinates with respect to a basis of the codomain, and stacking
those coordinate vectors as the columns of a table, gives exactly a **matrix**
$A$; the formula above says computing $T(x)$ in coordinates is computing
$Ac$ where $c$ is $x$'s coordinate vector. A matrix isn't an arbitrary grid of
numbers with a strange multiplication rule bolted on — it's a linear map,
written down relative to a choice of basis.

This also explains *why* matrix multiplication is defined the way it is.
Composing two linear maps, $T$ then $S$, should correspond to some combined
matrix. If $A$ represents $T$ (columns $T(v_j)$) and $B$ represents $S$, then
$(S\circ T)(v_j) = S(T(v_j)) = S(\text{the }j\text{-th column of }A)$, and
applying $S$ via its matrix $B$ gives $B$ times that column. So the $j$-th
column of the matrix representing $S\circ T$ is
$B$ times the $j$-th column of $A$ — which is exactly the row-times-column rule
for computing $BA$. Matrix multiplication *is* function composition, written in
coordinates; it isn't an independent definition you separately have to
memorize.

## Systems of equations, rank, and rank–nullity

Solving $Ax=b$ is asking: is $b$ in the image of the linear map $A$, and if so,
which $x$ map to it? Gaussian elimination is the mechanical procedure for
answering this, and the language that organizes what it tells you is **rank**:
the dimension of $A$'s column space (equivalently, its image).

**Rank–nullity theorem.** For a linear map $T:V\to W$ with $V$ finite-dimensional,

$$
\dim(\ker T) + \dim(\operatorname{im} T) = \dim V.
$$

*Proof.* Let $\{u_1,\ldots,u_k\}$ be a basis of $\ker T$ (dimension $k$). Extend
it to a basis $\{u_1,\ldots,u_k,v_1,\ldots,v_{n-k}\}$ of $V$ (any independent
set can be extended to a basis of a finite-dimensional space — an application of
the same exchange-style reasoning as above). I claim $\{T(v_1),\ldots,T(v_{n-k})\}$
is a basis of $\operatorname{im}T$. *Spans:* any $T(x)$ for $x=\sum a_iu_i+\sum
b_jv_j$ equals $\sum a_iT(u_i)+\sum b_jT(v_j) = \sum b_jT(v_j)$ since each
$T(u_i)=0$. *Independent:* if $\sum b_jT(v_j)=0$ then $T(\sum b_jv_j)=0$, so
$\sum b_jv_j\in\ker T$, meaning $\sum b_jv_j = \sum a_iu_i$ for some $a_i$; but
$\{u_i\}\cup\{v_j\}$ is independent, so this forces every $b_j=0$. Hence
$\operatorname{im}T$ has dimension exactly $n-k$, giving $k+(n-k)=n=\dim V$.
$\blacksquare$

This single theorem is why, for a square matrix, "no nontrivial kernel" and
"surjective" and "invertible" all turn out to be the same condition — they're
just the two sides of rank–nullity forced together when $\dim V=\dim W$.

## Determinants

Geometrically, $\det(A)$ is the signed factor by which $A$ scales volume: the
unit square (or cube, or hypercube) maps to a parallelepiped of volume
$|\det A|$, with the sign flipping when $A$ reverses orientation. Defined via
cofactor expansion, the two properties that matter most are:

- **Multiplicativity**: $\det(AB)=\det(A)\det(B)$. This isn't a coincidence —
  it has to hold, because applying $A$ then $B$ scales volume by $\det(A)$ then
  by $\det(B)$, and the combined map $BA$ scales volume by the product.
- **$\det(A)=0 \iff A$ is singular.** If $A$'s columns are linearly dependent,
  the parallelepiped they span is flattened into a lower-dimensional set, which
  has zero volume in the ambient dimension — hence $\det=0$. Conversely a
  nonzero determinant means genuine full-dimensional volume, which requires the
  columns to be independent, i.e. $A$ invertible.

## Eigenvalues and eigenvectors

Most directions get rotated or sheared by a linear map. An **eigenvector** is a
direction that doesn't: $Av=\lambda v$ for some scalar $\lambda$ (the
**eigenvalue**) — the map merely stretches or shrinks it. Rearranging,
$(A-\lambda I)v=0$ has a nonzero solution $v$ exactly when $A-\lambda I$ is
singular, i.e.

$$
\det(A-\lambda I)=0,
$$

the **characteristic equation**, whose roots are $A$'s eigenvalues.

**Worked example.** Let $A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$. The
characteristic polynomial is

$$
\det\begin{pmatrix}2-\lambda&1\\1&2-\lambda\end{pmatrix} = (2-\lambda)^2-1 = \lambda^2-4\lambda+3=(\lambda-1)(\lambda-3),
$$

so $\lambda=1$ or $\lambda=3$. For $\lambda=1$: $(A-I)v=0$ gives
$\begin{pmatrix}1&1\\1&1\end{pmatrix}v=0$, so $v_1+v_2=0$, e.g. $v=(1,-1)$. For
$\lambda=3$: $(A-3I)v=0$ gives $\begin{pmatrix}-1&1\\1&-1\end{pmatrix}v=0$, so
$v_1=v_2$, e.g. $v=(1,1)$. Check: $A(1,-1)=(1,-1)=1\cdot(1,-1)$ ✓, and
$A(1,1)=(3,3)=3\cdot(1,1)$ ✓.

A matrix is **diagonalizable** exactly when it has a full basis of $n$
independent eigenvectors (then $A=PDP^{-1}$ with $D$ diagonal and $P$'s columns
the eigenvectors — directly from $AP=PD$, which just restates $Av_i=\lambda_iv_i$
column by column). Not every matrix qualifies: $\begin{pmatrix}0&1\\0&0\end{pmatrix}$
has characteristic polynomial $\lambda^2$, so its only eigenvalue is $0$ with
multiplicity $2$, but $(A-0I)v=0$ gives only the one-dimensional solution space
$v=(v_1,0)$ — there's no second independent eigenvector to complete a basis.
This matrix (a Jordan block) is a genuine, unavoidable obstruction, not an edge
case that better bookkeeping removes.

## The capstone: singular value decomposition

Eigendecomposition is elegant but fragile — it requires enough eigenvectors to
form a basis, and even when it exists, eigenvectors of a non-symmetric matrix
aren't generally orthogonal, and $A$ needn't even be square. The **singular
value decomposition** fixes all of this at once, for *any* $m\times n$ matrix:

$$
A = U\Sigma V^T,
$$

with $U$ ($m\times m$) and $V$ ($n\times n$) orthogonal, and $\Sigma$
($m\times n$) diagonal with non-negative entries $\sigma_1\ge\sigma_2\ge\cdots\ge0$
(the **singular values**).

Where do $U,V,\Sigma$ come from? Consider $A^TA$, an $n\times n$ **symmetric**
matrix. Symmetric matrices are always diagonalizable by an orthogonal matrix
(the spectral theorem — I'll state this rather than prove it here, but it's the
one fact this whole construction leans on), so $A^TA = V\Lambda V^T$ with $V$
orthogonal and $\Lambda$ diagonal. Since $A^TA$ is also positive semidefinite
($x^TA^TAx = \|Ax\|^2\ge0$ for every $x$), its eigenvalues are $\ge0$; write
$\Lambda=\Sigma^2$, i.e. $\sigma_i=\sqrt{\lambda_i}$. Now define $u_i =
\frac1{\sigma_i}Av_i$ for each $v_i$ with $\sigma_i>0$ — these turn out to be
orthonormal:

$$
u_i^Tu_j = \frac1{\sigma_i\sigma_j}v_i^TA^TAv_j = \frac1{\sigma_i\sigma_j}v_i^T(\sigma_j^2v_j) = \frac{\sigma_j}{\sigma_i}v_i^Tv_j,
$$

which is $0$ for $i\neq j$ (since $v_i\perp v_j$) and $1$ for $i=j$ (since
$\sigma_i/\sigma_i=1$ and $v_i^Tv_i=1$). Collect these $u_i$ as columns of $U$
(extended to a full orthogonal basis if $m>$ the number of nonzero $\sigma_i$),
and $Av_i=\sigma_iu_i$ for every $i$ is exactly the statement $AV=U\Sigma$, i.e.
$A=U\Sigma V^T$. So $V$'s columns are eigenvectors of $A^TA$, $U$'s are (scaled)
images of those under $A$ — equivalently eigenvectors of $AA^T$ — and $\Sigma$'s
entries are square roots of the shared eigenvalues.

Two things this buys you, stated briefly and honestly rather than fully
derived: the **best rank-$k$ approximation** to $A$ (in the sense of minimizing
approximation error) is obtained by keeping only the $k$ largest singular
values and their vectors — truncating the SVD — which is the Eckart–Young
theorem; and **PCA**, a workhorse of applied statistics, is exactly the SVD
applied to a (mean-centered) data matrix, with the top singular vectors giving
the directions of greatest variance in the data. Both are substantial results
in their own right that I'm naming rather than proving here.

## What's left out

This covers real, finite-dimensional linear algebra fairly thoroughly, but
several real continuations are deliberately out of scope: general inner
product spaces beyond $\mathbb{R}^n$ (complex spaces, function spaces), the
Jordan normal form in full generality (the honest fix for non-diagonalizable
matrices, sketched above but not built out), and the numerical-analysis side of
the subject (how these computations actually get done in floating point, where
naive Gaussian elimination or direct eigenvalue computation can be numerically
unstable in ways the pure algebra above says nothing about).
