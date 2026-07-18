---
title: "Hello, world"
description: "First post — a quick check that math and code render the way they should."
date: 2026-07-18
tags: ["meta"]
---

This blog will mostly cover mathematics, computer science, and AI. As a quick
sanity check, here's some inline math: the eigenvalues of a matrix $A$ satisfy
$\det(A - \lambda I) = 0$.

And a display equation — the softmax function used throughout deep learning:

$$
\text{softmax}(z_i) = \frac{e^{z_i}}{\sum_{j=1}^{K} e^{z_j}}
$$

Code blocks get syntax highlighting for free:

```python
def softmax(z):
    exps = [math.exp(x) for x in z]
    total = sum(exps)
    return [e / total for e in exps]
```

More posts coming soon.
