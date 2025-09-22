---
{"publish":true,"title":"Z-Transform","created":"2025-08-05 11:02","modified":"2025-09-22T10:32:57.001+02:00","tags":["#mathematics","#signal-processing","#fourier-transform","#laplace-transform","#z-transform","#discrete-time","#complex-analysis"],"cssclasses":"center-images"}
---


# Z TRANSFORM

---

The **Z-Transform** is a mathematical technique used to convert a discrete-time signal into a complex-valued frequency-domain representation.
It serves as the discrete-time equivalent to the [[distilled-notes/laplace-transform\|Laplace transform]] and is a generalisation of the [[Discrete Fourier Transform]].

## Method

### Time to Frequency Domain

$$
X(z) = \mathcal{Z}\{x[n]\} = \sum^{\infty}_{n=-\infty} x[n]z^{-n}
$$

### Frequency to Time Domain

$$
x[n] = \mathcal{Z}^{-1}\{X(z)\} = \frac{1}{2 \pi} \int^{\pi}_{-\pi} X(e^{j \omega})e^{j \omega n}
$$

---

## References
