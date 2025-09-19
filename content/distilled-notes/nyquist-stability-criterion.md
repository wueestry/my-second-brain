---
{"publish":true,"title":"Nyquist Stability Criterion","created":"2024-08-08T00:00:00.000Z","modified":"2025-09-17T12:35:45.761+02:00","tags":["resource","transfer-function","control-engineering","control-systems","mathematics","signal-processing","stability","complex-analysis"],"cssclasses":"center-images"}
---


# NYQUIST STABILITY CRITERION

---

Criterion to get the number of poles and zeros in the right half-plane based on the encirclements of -1 of a Nyquist contour.

## Nyquist Contour

To construct a Nyquist contour that encompasses the right-half of the complex plane, we first construct:

- A path traveling up the $j\omega$ axis from $0 - j\infty$ to $0 + j\infty$
- A semi-circular arc with radius $r \rightarrow \infty$, that starts at $0 + j\infty$ and travels clock-wise to $0 - j\infty$

The Nyquist contour creates a plot of $1 + G(s)$ in the complex plane. Using [[distilled-notes/cauchys-argument-principle\|Cauchy's Argument Principle]], the number of clockwise encirclements of the origin must be the number of zeros of $1+G(s)$ in the right-half complex plane.
By counting the number of encirclements of $-1$, we find the difference between the number of poles and zeros in the right-half complex plane.

- By mapping $G(s)$ instead of $1 + G(s)$ we receive the [[distilled-notes/nyquist-plot\|Nyquist plot]]
- The zeros of $1+G(s)$ are the poles of the closed-loop system, while poles of $1+G(s)$ are the same as $G(s)$

## Theorem

> [!theorem] Nyquist Stability Criterion
> Given a Nyquist contour $\Gamma_s$, let $P$ be the number of poles of $G(s)$ encircled by $\Gamma_s$, and $Z$ be the number of zeros of $1+G(s)$ encircled by $\Gamma_s$.
> Alternatively, and more importantly, if $Z$ is the number of poles of the closed loop system in the right half plane, and $P$ is the number of poles of the open-loop transfer function $G(s)$ in the right half plane, the resultant contour in the $G(s)$-plane, $\Gamma_{G(s)}$ shall encircle (clockwise) the point $(-1 + j0)$ $N$ times such that $N=Z-P$

---

## References
