---
{"publish":true,"title":"Cauchy's Argument Principle","created":"2024-08-08","tags":["#control-systems","#resource","#theorem"],"cssclasses":""}
---


# Cauchy's Argument Principle

> [!abstract]
> Theorem relating difference between the number of zeros and poles of a function to a contour integral of the functions logarithmic derivative.

![[resources/control-systems/assets/cauchy-argument-principle.png|400]]

## Formulation

With **Z** and **P** denoting the number of zeros and poles of $f(z)$ inside the contour $C$ respectively and each zero and pole counted as many times as its multiplicity and order.

$$
\frac{1}{2\pi j}\oint_C \frac{f'(z)}{f(z)} dz = Z - P
$$

More generally, with a summation of all zeros $a$ and poles $p$ counted with their orders.

$$
\frac{1}{2\pi j}\oint_C \frac{f'(z)}{f(z)} = \sum_a n(C, a) - \sum_b n(C, b)
$$
