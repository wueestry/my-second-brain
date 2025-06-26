---
{"publish":true,"title":"Nyquist Stability Criterion","created":"2024-08-08","tags":["#control-systems","#resource","#theorem"],"cssclasses":""}
---


# Nyquist Stability Criterion

> [!abstract]
> Criterion to get the number of poles and zeros in the right half-plane based on the encirclements of -1 of a Nyquist contour.

## Nyquist Contour

To construct a Nyquist contour that encompasses the right-half of the complex plane, we first construct:

- A path traveling up the $j\omega$ axis from $0 - j\infty$ to $0 + j\infty$
- A semi-circular arc with radius $r \rightarrow \infty$, that starts at $0 + j\infty$ and travels clock-wise to $0 - j\infty$

The Nyquist contour creates a plot of $1 + G(s)$ in the complex plane. Using [[resources/control-systems/cauchys-argument-principle\|Cauchy's Argument Principle]], the number of clockwise encirclements of the origin must be the number of zeros of $1+G(s)$ in the right-half complex plane.
By counting the number of encirclements of $-1$, we find the difference between the number of poles and zeros in the right-half complex plane.

- By mapping $G(s)$ instead of $1 + G(s)$ we receive the [[resources/control-systems/nyquist-plot\|Nyquist plot]]
- The zeros of $1+G(s)$ are the poles of the closed-loop system, while poles of $1+G(s)$ are the same as $G(s)$

## Theorem

> [!theorem] Nyquist Stability Criterion
> Given a Nyquist contour $\Gamma_s$, let $P$ be the number of poles of $G(s)$ encircled by $\Gamma_s$, and $Z$ be the number of zeros of $1+G(s)$ encircled by $\Gamma_s$.
> Alternatively, and more importantly, if $Z$ is the number of poles of the closed loop system in the right half plane, and $P$ is the number of poles of the open-loop transfer function $G(s)$ in the right half plane, the resultant contour in the $G(s)$-plane, $\Gamma_{G(s)}$ shall encircle (clockwise) the point $(-1 + j0)$ $N$ times such that $N=Z-P$
