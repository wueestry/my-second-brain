---
{"publish":true,"title":"Laplace Transform","created":"2024-08-12T00:00:00.000Z","modified":"2025-09-17T12:43:49.842+02:00","tags":["resource","integral-transform","signal-processing","mathematical-modeling","science","computer-science","mathematics","laplace-transform"],"cssclasses":"center-images"}
---


# LAPLACE TRANSFORM

---

Integral transform to convert a function from the time domain to the frequency domain

Often used to convert integral and differential equations into algebraic equations using only multiplication and division.

## Definition

$$
\mathcal{L}\{f\}(s) = \int^{\infty}_{0} f(x) e^{-st} dt
$$

The transform is related to many other transforms ([[distilled-notes/fourier-transform\|Fourier Transform]], [[Mellin Transform]])

The Laplace transform we defined is sometimes called the **one-sided Laplace transform**.

### Properties of Laplace Transform

If $f_1(t) \leftrightarrow F_1(s)$ and $f_2(t) \leftrightarrow F_2(s)$, then

- Linearity Property: $Af_1(t)+Bf_2(t) \leftrightarrow AF_1(s) + BF_2(s)$
- Frequency Shifting Property: $e^{s_0t}f_1(t) \leftrightarrow F(s-s_0)$
- Integration: $\int_0^t f(\lambda)d\lambda \leftrightarrow \frac{1}{s}F(s)$
- Multiplication by Time: $Tf(t) \leftrightarrow -\frac{d}{ds}F(s)$
- Complex Shift Property: $f(t)e^{-at} \leftrightarrow F(s-a)$
- Time Reversal Property: $f(-t) \leftrightarrow F(-s)$
- Time Scaling Property: $f(\frac{t}{a}) \leftrightarrow aF(as)$

---

## References
