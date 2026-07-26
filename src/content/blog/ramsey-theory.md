---
title: "The Party Problem: Order Hidden in Every Crowd"
description: "A complete elementary proof that among any six people, three either all know each other or are all mutual strangers — and how that one puzzle opens onto Ramsey theory, a field built on proving order is unavoidable while barely being able to compute it."
date: 2026-07-26
tags: ["math", "combinatorics"]
---

Here's a claim that sounds like it should depend on who's at the party: at any gathering of six people, there are always three who all know each other, or three who are all mutual strangers. Not "usually." Not "if the party is big enough and awkward enough." Always — for every possible party of six, every possible pattern of who knows whom.

It's worth sitting with that for a second, because it isn't obvious. Pick six specific people you know and imagine the tangled web of "knows" and "doesn't know" between every pair — that's fifteen relationships in total. The claim says: no matter how that web is arranged, some triangle of it is monochromatic — either three mutual acquaintances or three mutual strangers. Try to defeat it. Try to design a party of six where every trio has at least one "knows" and one "doesn't know" relationship among them. You can spend a while doodling this on paper before you either find such an arrangement or start suspecting one doesn't exist. (It doesn't.) Try the same thing with five people, though, and you *can* dodge it — there's an arrangement of five people with no such trio at all. Six is the exact threshold. That specific, almost fussy-looking number — six, not five, not seven — is the first sign that something rigid and structural is going on underneath, and it's exactly what we're going to prove.

## Turning a party into a graph

To make "always" provable rather than just plausible, we need to strip the problem down to its combinatorial skeleton. Represent the six people as six points, and draw a line between every pair of them — all $\binom{6}{2} = 15$ pairs. This is the *complete graph on 6 vertices*, written $K_6$: six vertices, every pair joined by an edge, no exceptions.

Now color each edge one of two colors depending on the relationship it represents: red if that pair knows each other, blue if they're strangers. Every possible party of six people corresponds to exactly one red/blue coloring of $K_6$'s edges, and every coloring corresponds to some possible party. The two descriptions are the same object.

A "three people who all know each other" is a **red triangle** — three vertices with all three connecting edges red. A "three mutual strangers" is a **blue triangle**. The informal claim about parties becomes a precise claim about graphs:

> Every 2-coloring of the edges of $K_6$ contains a monochromatic triangle (three vertices whose three connecting edges are all the same color).

This number — the smallest $n$ such that every red/blue coloring of $K_n$ is forced to contain a red or blue triangle — is called the **Ramsey number** $R(3,3)$. The claim above says $R(3,3) \le 6$: six people are *enough* to guarantee the pattern. To pin down $R(3,3)$ exactly we'll also need the other direction — showing five people are *not* enough — but let's prove the easier, more important half first.

## Why six people are enough

The proof is a clean two-step pigeonhole argument, and it's worth walking through in full because every later result in this post is a variation on exactly the same idea.

**Step 1: isolate one vertex.** Pick any one of the six vertices — call it $v$. It has exactly 5 edges leaving it, one to each of the other five vertices, and each of those edges is colored either red or blue.

**Step 2: pigeonhole on those five edges.** Five edges, two colors. By the pigeonhole principle, at least $\lceil 5/2 \rceil = 3$ of them share a color. Say, without loss of generality, that at least three of $v$'s edges are red — call three of the vertices they connect to $a$, $b$, $c$. (If instead at least three were blue, the entire argument below runs identically with red and blue swapped.)

**Step 3: case-check the triangle among $a$, $b$, $c$.** Now look at the three edges *among* $a$, $b$, $c$ themselves — the edge $ab$, the edge $bc$, and the edge $ac$. There are exactly two possibilities:

- **At least one of $ab$, $bc$, $ac$ is red.** Say $ab$ is red. Then $v$-$a$ is red (from Step 2), $v$-$b$ is red (from Step 2), and $a$-$b$ is red (this case) — so $v$, $a$, $b$ form a red triangle.
- **None of $ab$, $bc$, $ac$ is red**, meaning all three are blue. Then $a$, $b$, $c$ themselves form a blue triangle — no need to involve $v$ at all.

Either way, a monochromatic triangle exists. Since $v$ was an arbitrary vertex and the coloring was an arbitrary red/blue coloring, this holds for *every* coloring of $K_6$. That proves $R(3,3) \le 6$.

Here's the argument made concrete, on one particular coloring of $K_6$. Vertex 1 plays the role of $v$: its edges to 2, 3, and 4 are red (the pigeonholed majority), its edges to 5 and 6 are blue. Among $\{2,3,4\}$, all three edges happen to be blue in this example — landing us in the second case of Step 3, so $2$, $3$, $4$ form a blue triangle on their own (drawn extra-thick below). The remaining edges, not needed by the argument, are colored red just to complete the picture:

```tikz
\node[circle,draw,minimum size=0.7cm] (v1) at (90:2) {1};
\node[circle,draw,minimum size=0.7cm] (v2) at (30:2) {2};
\node[circle,draw,minimum size=0.7cm] (v3) at (-30:2) {3};
\node[circle,draw,minimum size=0.7cm] (v4) at (-90:2) {4};
\node[circle,draw,minimum size=0.7cm] (v5) at (-150:2) {5};
\node[circle,draw,minimum size=0.7cm] (v6) at (150:2) {6};

\draw[red,thick] (v1) -- (v2);
\draw[red,thick] (v1) -- (v3);
\draw[red,thick] (v1) -- (v4);
\draw[blue] (v1) -- (v5);
\draw[blue] (v1) -- (v6);

\draw[blue,ultra thick] (v2) -- (v3);
\draw[blue,ultra thick] (v3) -- (v4);
\draw[blue,ultra thick] (v2) -- (v4);

\draw[red] (v5) -- (v6);
\draw[red] (v2) -- (v5);
\draw[red] (v2) -- (v6);
\draw[red] (v3) -- (v5);
\draw[red] (v3) -- (v6);
\draw[red] (v4) -- (v5);
\draw[red] (v4) -- (v6);
```

Change what happens among $\{2,3,4\}$ — make even one of those three edges red instead — and the case flips: that red edge closes a red triangle with vertex 1 instead. Either way, the moment three of $v$'s edges land on the same color, a monochromatic triangle is no longer avoidable; the only freedom left in the coloring is *which* triangle it turns out to be.

Notice how little the argument actually used: five edges out of a vertex, pigeonholed into a majority color, then one more pigeonhole (this time an exhaustive two-case split) on the triangle those three edges expose. No case was skipped, and no case was left ambiguous — either the triangle among $a,b,c$ has a red edge (closing a red triangle through $v$) or it has none (closing a blue triangle on its own). That completeness is what makes it a proof and not just a strong hunch.

## Why five people are not enough

Six works. Does five? To show $R(3,3) > 5$ we need the opposite kind of evidence from a pure existence proof — not an argument that *every* coloring of $K_5$ has a monochromatic triangle, but a single concrete coloring that provably has *none*. One explicit counterexample settles it.

Here is the standard one. Arrange five vertices, labeled $0, 1, 2, 3, 4$, around a pentagon, and define the *distance* between two labels $i$ and $j$ as the shorter way around the 5-cycle: $\min(|i-j|,\, 5 - |i-j|)$, which is always either 1 or 2. Color a pair red if its distance is 1 (i.e., the pair is adjacent on the pentagon), and blue if its distance is 2 (i.e., the pair is a "skip-one" diagonal). Concretely:

- **Red edges** (distance 1, the pentagon's sides): $01, 12, 23, 34, 40$.
- **Blue edges** (distance 2, the pentagon's diagonals): $02, 13, 24, 30, 41$.

That's a red 5-cycle laid on top of a blue 5-cycle (a pentagram), together covering all $\binom{5}{2}=10$ edges exactly once.

```tikz
\node[circle,draw,minimum size=0.7cm] (p0) at (90:2) {0};
\node[circle,draw,minimum size=0.7cm] (p1) at (18:2) {1};
\node[circle,draw,minimum size=0.7cm] (p2) at (-54:2) {2};
\node[circle,draw,minimum size=0.7cm] (p3) at (-126:2) {3};
\node[circle,draw,minimum size=0.7cm] (p4) at (-198:2) {4};

\draw[red,thick] (p0) -- (p1);
\draw[red,thick] (p1) -- (p2);
\draw[red,thick] (p2) -- (p3);
\draw[red,thick] (p3) -- (p4);
\draw[red,thick] (p4) -- (p0);

\draw[blue,thick] (p0) -- (p2);
\draw[blue,thick] (p2) -- (p4);
\draw[blue,thick] (p4) -- (p1);
\draw[blue,thick] (p1) -- (p3);
\draw[blue,thick] (p3) -- (p0);
```

Does this coloring really avoid a monochromatic triangle? We can check it two ways.

**By symmetry.** The coloring is invariant under rotation (shifting every label by 1 mod 5 sends red edges to red edges and blue edges to blue edges), so we only need to check one representative triangle from each "shape," where the shape of a triple $\{i,j,k\}$ on a 5-cycle is the multiset of gaps between consecutive chosen labels going around the circle. Three gaps summing to 5, each at least 1, only split as $1+1+3$ or $1+2+2$ — every other-looking triple is a rotation of one of these two.

- *Shape $1,1,3$*, e.g. $\{0,1,2\}$: edges $01$ (distance 1, red), $12$ (distance 1, red), $02$ (distance 2, blue). Colors red, red, blue — not monochromatic.
- *Shape $1,2,2$*, e.g. $\{0,1,3\}$: edges $01$ (distance 1, red), $13$ (distance 2, blue), $03$ (distance $\min(3,2)=2$, blue). Colors red, blue, blue — not monochromatic.

Both shapes fail to be monochromatic, and every triple is a rotation of one of them, so no triple anywhere in the coloring is monochromatic.

**By brute force**, as a sanity check on the symmetry argument: there are exactly $\binom{5}{3} = 10$ triples, and listing all of them by their edge colors —

$$
\begin{aligned}
\{0,1,2\} &: R,R,B \qquad \{0,1,3\} : R,B,B \qquad \{0,1,4\} : R,B,R \\
\{0,2,3\} &: B,R,B \qquad \{0,2,4\} : B,B,R \qquad \{0,3,4\} : B,R,R \\
\{1,2,3\} &: R,R,B \qquad \{1,2,4\} : R,B,B \qquad \{1,3,4\} : B,R,B \\
\{2,3,4\} &: R,R,B
\end{aligned}
$$

— confirms it directly: every one of the ten triples has at least one red and at least one blue edge among its three. None is monochromatic. This coloring of $K_5$ is a genuine, verified counterexample, so $R(3,3) > 5$.

Combined with the pigeonhole argument above, this pins the number down exactly:

$$
R(3,3) = 6.
$$

Six is not an arbitrary-looking threshold after all — it's the precise point where the pigeonhole argument's "5 edges, 2 colors, pigeonhole into 3" stops being escapable. One fewer person, and the pentagon-plus-pentagram coloring slips through every gap.

## Generalizing: the Ramsey number $R(s,t)$

The 3-versus-3 case is really a special case of a much broader question, and it's worth stating it in full generality now that the machinery is warmed up.

**Definition.** For positive integers $s, t \ge 2$, the Ramsey number $R(s,t)$ is the smallest $n$ such that *every* red/blue coloring of the edges of $K_n$ contains either a red $K_s$ (a set of $s$ vertices with all connecting edges red) or a blue $K_t$ (a set of $t$ vertices with all connecting edges blue).

$R(3,3)=6$ is the case $s=t=3$. But the definition makes sense for any sizes — $R(3,4)$ asks for the smallest party guaranteeing either 3 mutual acquaintances or 4 mutual strangers, $R(4,4)$ asks for either a 4-clique of acquaintances or a 4-clique of strangers, and so on. The immediate question is whether $R(s,t)$ is even always a *finite* number — maybe for large enough $s$ and $t$, you could keep dodging both patterns forever, no matter how many people you add. It turns out you can't, and the proof that you can't is one of the genuinely elegant arguments in combinatorics.

## Ramsey's theorem: $R(s,t)$ is always finite

**Theorem (Ramsey, 1930).** For every pair of integers $s,t \ge 2$, $R(s,t)$ exists and is finite.

**Base cases.** $R(s,2) = s$ for every $s$: in any coloring of $K_s$, either some edge is blue — giving a blue $K_2$ immediately, since a single blue edge already *is* a blue 2-clique — or every edge is red, in which case all $s$ vertices form a red $K_s$. By the same reasoning with colors swapped, $R(2,t) = t$.

**Inductive step.** Assume, for induction, that $R(s-1,t)$ and $R(s,t-1)$ both exist and are finite. We claim

$$
R(s,t) \;\le\; R(s-1,t) + R(s,t-1),
$$

which is enough to finish the proof: it expresses a bound for $(s,t)$ purely in terms of two strictly smaller cases (smaller in $s+t$), so induction on $s+t$, anchored at the base cases above, shows every $R(s,t)$ is finite.

To prove the inequality, let $n = R(s-1,t) + R(s,t-1)$ and take *any* red/blue coloring of $K_n$. Pick a vertex $v$. It has $n - 1$ edges leaving it, each red or blue; split the other vertices into $A$ = red-neighbors of $v$ and $B$ = blue-neighbors of $v$, so $|A| + |B| = n - 1 = R(s-1,t) + R(s,t-1) - 1$.

This is exactly the same pigeonhole move as before, just with two possibly-uneven piles instead of a fixed split into five. If both $|A| < R(s-1,t)$ and $|B| < R(s,t-1)$ held simultaneously, then

$$
|A| + |B| \;\le\; \bigl(R(s-1,t) - 1\bigr) + \bigl(R(s,t-1) - 1\bigr) \;=\; n - 2,
$$

contradicting $|A|+|B| = n-1$. So at least one of the two must fail — either $|A| \ge R(s-1,t)$ or $|B| \ge R(s,t-1)$.

- **If $|A| \ge R(s-1,t)$:** by the inductive hypothesis, the coloring restricted to $A$ (with at least $R(s-1,t)$ vertices) contains either a blue $K_t$ — done, that's exactly what we wanted — or a red $K_{s-1}$ within $A$. In the latter case, every vertex of that red $K_{s-1}$ is connected to $v$ by a red edge, by definition of $A$; adding $v$ to it turns the red $K_{s-1}$ into a red $K_s$. Done either way.
- **If $|B| \ge R(s,t-1)$:** symmetrically, $B$ contains either a red $K_s$ (done) or a blue $K_{t-1}$, which together with $v$ (blue-connected to all of $B$) becomes a blue $K_t$. Done either way.

Every branch terminates in a red $K_s$ or a blue $K_t$, so $K_n$ is guaranteed to contain one or the other — establishing $R(s,t) \le R(s-1,t) + R(s,t-1)$ and completing the induction. $\blacksquare$

Sanity-check it against what we already proved by hand: $R(3,3) \le R(2,3) + R(3,2) = 3 + 3 = 6$, matching the direct pigeonhole argument exactly — and indeed, the recursive proof *is* that same pigeonhole argument, just abstracted to handle uneven splits and arbitrary clique sizes instead of two fixed triangles.

## What we can prove exists, and what we actually know

This is where Ramsey theory turns from a satisfying proof into a genuinely strange corner of mathematics. The induction above shows $R(s,t)$ is *always* a finite number, for every pair $s,t$, no exceptions — a clean, constructive, fully general existence theorem. And yet the actual numerical values of $R(s,t)$ are, for almost every pair beyond the smallest cases, unknown.

We know $R(3,3) = 6$, proved above from scratch. We also know $R(4,4) = 18$ — the analogous statement that among 18 people there must be 4 mutual acquaintances or 4 mutual strangers, and that 17 is not enough. That's already a serious computation (verifying no monochromatic $K_4$-free coloring of $K_{17}$ exists is well beyond hand-checking), but it is known exactly.

$R(5,5)$ is where the honesty has to kick in. It is *not* known exactly. What's known is a range: a lower bound established by exhibiting a specific coloring of a smaller complete graph with no monochromatic 5-clique of either color, and an upper bound established by a (much harder) argument in the style of the induction above, refined with heavier casework. The best published bounds for years have pinned $R(5,5)$ somewhere between 43 and 48 — a gap of five between "provably avoidable" and "provably unavoidable," for a number that is a single specific finite integer with one true value. Nobody currently knows which of 43 through 48 it is. (I'd flag this particular range as the one number in this post I'm least certain is the exact current record — bounds like this do occasionally get nudged by new computer search results, so treat "43 to 48" as indicative of the situation rather than as a value pulled from a live leaderboard.)

This is the real shape of the field: existence is cheap, in the sense that one clean inductive argument settles it for every $s,t$ simultaneously, forever. Exact values are expensive — each new pair $(s,t)$ has historically demanded its own dedicated, often computer-assisted assault, and the difficulty explodes so fast that we've only ever pinned down a small handful of cases exactly. Paul Erdős is supposed to have remarked, in essence, that if aliens demanded we compute $R(5,5)$ or they'd destroy Earth, humanity should marshal every computer and mathematician available — but if they demanded $R(6,6)$, we should attack first, because it's further out of reach than any war could buy us time for. That's not really an exaggeration of the situation; it's a fairly accurate summary of it.

## A different tool: the probabilistic method (a sketch)

Everything above — both the upper bounds (numbers are eventually forced to exist) and the specific $K_5$ counterexample — used direct, constructive arguments: pigeonhole, and one explicit hand-built coloring. There's a second major technique in Ramsey theory worth knowing about, used specifically for *lower* bounds, and it works by a completely different kind of argument: instead of constructing one coloring by hand, show that a *random* coloring is unlikely to fail, and conclude some coloring — you don't need to know which one — must succeed.

Here's the flavor, due to Erdős (1947), stated loosely and without full derivation. Color each edge of $K_n$ red or blue independently at random, each with probability $1/2$. For any fixed set of $s$ vertices, the probability that all $\binom{s}{2}$ edges among them happen to be the same color is $2 \cdot (1/2)^{\binom{s}{2}}$ (a factor of 2 for "all red" or "all blue"). There are $\binom{n}{s}$ possible sets of $s$ vertices, so the *expected* number of monochromatic $K_s$'s across the whole random coloring is

$$
\mathbb{E}[X] = \binom{n}{s} \cdot 2^{\,1-\binom{s}{2}}.
$$

The trick is purely about that expectation: if $n$ is chosen small enough that $\mathbb{E}[X] < 1$, then it's *impossible* for every coloring to have at least one monochromatic $K_s$ — an average that's below 1 forces at least one coloring in the underlying sample space to score a 0, since you can't average to below 1 if every single outcome is $\ge 1$. That is, some actual 2-coloring of $K_n$ has zero monochromatic $K_s$'s of either color, which means $R(s,s) > n$ for that $n$.

Working out exactly how large $n$ can be while keeping $\mathbb{E}[X]$ under 1 involves some estimation of binomial coefficients that I won't carry out in full here, but the punchline is qualitative and worth knowing: it gives a lower bound on $R(s,s)$ that grows *exponentially* in $s$ (on the order of $2^{s/2}$), which is a genuinely different regime from the tiny handful of exact values anyone has ever pinned down by direct construction. It's a good example of how the probabilistic method proves existence — here, of a good coloring — without ever producing the coloring itself, mirroring the same "existence without access" theme that runs through the exact-value gap above.

## The payoff: disorder has a shelf life

Step back from the specific numbers, and a single shape emerges from everything above. $R(3,3)=6$ says: no matter how you arrange the "knows/doesn't know" relationships among six people, a fully ordered trio — a clique or an anti-clique — is unavoidable. Ramsey's theorem says the same is true, without exception, for *any* target clique sizes $s$ and $t$, given enough people: total, edge-by-edge randomness in how a graph is colored is only possible up to a certain size, and past that size, some sizable chunk of perfect order is guaranteed to be sitting inside it, whether you wanted it there or not.

That's the actual content behind the informal-sounding claim that "true randomness is impossible in a big enough structure." It isn't mysticism about crowds or coincidences — it's a theorem, with a full elementary proof, about colorings of complete graphs, and it generalizes far past graphs. Ramsey theory as a field is built from a whole family of theorems with exactly this shape: given a structure large enough — arithmetic progressions in the integers, colorings of the edges of hypergraphs, points in geometric configurations — and any way of partitioning it into finitely many classes, some highly regular, highly ordered substructure is forced to appear in one of the classes. The specific pattern changes from theorem to theorem; the structural inevitability doesn't.

And the second half of the story — that we can prove all of this exists via one clean induction, while barely being able to *compute* the actual thresholds even for cliques as small as five — isn't a footnote to that idea, it's the same idea seen from another angle. The pigeonhole argument doesn't care how big $s$ and $t$ get; it grinds out finiteness uniformly, for free, for every pair at once. But turning "finite" into "exactly this number" requires understanding the fine combinatorial structure of each specific case, and that resists the same uniform trick. Order is cheap to prove inevitable. Finding out exactly how much order, and exactly when it kicks in, is one of the harder problems mathematics has ever set for itself — and for all but a few small cases, it's a problem we still haven't solved.
