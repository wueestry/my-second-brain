---
{"publish":true,"title":"Z-Transform","created":"2025-08-05 11:02","modified":"2025-08-05T11:04:06.723+02:00","tags":["resource"],"cssclasses":"center-images"}
---


# Z TRANSFORM
---

>[!abstract]
>The Z-Transform is a technique to convert a discrete-time signal to a complex frequency domain representation.

[[inbox/laplace-transform\|Laplace transform]] for discrete-time signals.
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




---
## References


---
## Child Files

| File | Created |
| ---- | ------- |



## Parent Files

| File | Created |
| ---- | ------- |

