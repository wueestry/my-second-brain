---
{"publish":true,"title":"Cauchy's Argument Principle","created":"2025-08-05 09:42","modified":"2025-08-18T12:58:14.161+02:00","tags":["#resource"],"cssclasses":"center-images"}
---


# CAUCHY'S ARGUMENT PRINCIPLE

---

Cauchy's Argument Principle is a theorem relating the difference between the number of zeros and poles of a function to a contour integral of the functions logarithmic derivative.

![[meta/assets/cauchy-argument-principle.png|500]]

## Formulation

> [!theorem]
> If *f* is a meromorphic function inside and on some closed contour *C*, and *f* has no zeros or poles on *C*, then
>
> $$
> \frac{1}{2\pi j}\oint_C \frac{f'(z)}{f(z)} dz = Z - P
> $$
>
> With **Z** and **P** denoting the number of zeros and poles of $f(z)$ inside the contour $C$ respectively and each zero and pole counted as many times as its multiplicity and order.

More generally, with a summation of all zeros $a$ and poles $p$ counted with their orders, the theorem can be written as:

$$
\frac{1}{2\pi j}\oint_C \frac{f'(z)}{f(z)} = \sum_a n(C, a) - \sum_b n(C, b)
$$

---

## References
