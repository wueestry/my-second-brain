---
{"publish":true,"title":"Z-Transform","created":"2024-08-13","tags":["#control-systems","#resource","#term"],"cssclasses":""}
---


# Z-Transform

> [!abstract]
> Technique to convert a discrete-time signal to a complex frequency domain representation.

[[resources/control-systems/laplace-transform\|Laplace transform]] for discrete-time signals.
Generalisation of the [[Discrete Fourier Transform]]

## Method

### Time to Frequency Domain

$$
X(z) = \mathcal{Z}\{x[n]\} = \sum^{\infty}_{n=-\infty} x[n]z^{-n}
$$

### Frequency to Time Domain

$$
x[n] = \mathcal{Z}^{-1}\{X(z)\} = \frac{1}{2 \pi} \int^{\pi}_{-\pi} X(e^{j \omega})e^{j \omega n}
$$
