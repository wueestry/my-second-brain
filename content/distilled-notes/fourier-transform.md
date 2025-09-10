---
{"publish":true,"title":"Fourier Transform","created":"2024-08-28 14:32","modified":"2025-08-18T12:58:14.209+02:00","tags":["#resource"],"cssclasses":"center-images"}
---


# FOURIER TRANSFORM

---

The **Fourier transform** is a method for expressing a function as a sum of periodic components, and for recovering the signal from those components.

![[meta/assets/fourier-transform.png]]

The Fourier transform (FT) is an integral transform that takes a function as input and outputs another function that describes the extent to which various frequencies are present in the original function. The output of the transform is a complex-valued function of frequency.

## Definition

The Fourier transform is an analysis process, decomposing a complex-valued function $f(x)$ into its constituent frequencies and their amplitudes. The inverse process is _synthesis_, which recreates $f(x)$ from its transform.

The Fourier transform is given by:

$$
\hat{f}(x) = \int_{-\infty}^{\infty}f(x)e^{-j2\pi \xi x} dx
$$

It is easy to see, that the integral converges for all real $\xi$ and that the transformed function $\hat{f}$ is also rapidly decreasing.

The inverse transform is given by:

$$
f(x) = \int_{-\infty}^{\infty}\hat{f}(\xi)e^{j2\pi \xi x} d\xi
$$

---

## References
