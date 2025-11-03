---
{"publish":true,"title":"Fourier Transform","created":"2024-08-28 14:32","modified":"2025-11-03T20:27:08.276+01:00","tags":[null],"cssclasses":"center-images"}
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

## Properties

### Linearity

$$
\mathcal{F}\{a f(x) + b g(x)\} = a\hat{f}(\xi) + b\hat{g}(\xi)
$$

### Time Shifting

$$
\mathcal{F}\{f(x - x_0)\} = e^{-j2\pi \xi x_0}\hat{f}(\xi)
$$

### Frequency Shifting

$$
\mathcal{F}\{e^{j2\pi \xi_0 x}f(x)\} = \hat{f}(\xi - \xi_0)
$$

### Scaling

$$
\mathcal{F}\{f(ax)\} = \frac{1}{|a|}\hat{f}\left(\frac{\xi}{a}\right)
$$

### Convolution Theorem

$$
\mathcal{F}\{f * g\} = \hat{f}(\xi) \cdot \hat{g}(\xi)
$$

### Parseval's Theorem

$$
\int_{-\infty}^{\infty}|f(x)|^2 dx = \int_{-\infty}^{\infty}|\hat{f}(\xi)|^2 d\xi
$$

## Discrete Fourier Transform (DFT)

For discrete signals with $N$ samples:

$$
X[k] = \sum_{n=0}^{N-1}x[n]e^{-j2\pi kn/N}, \quad k = 0, 1, ..., N-1
$$

The inverse DFT:

$$
x[n] = \frac{1}{N}\sum_{k=0}^{N-1}X[k]e^{j2\pi kn/N}, \quad n = 0, 1, ..., N-1
$$

## Fast Fourier Transform (FFT)

The FFT is an efficient algorithm to compute the DFT, reducing complexity from $O(N^2)$ to $O(N \log N)$.

### Python Implementation

```python
import numpy as np
import matplotlib.pyplot as plt

# Generate a signal
t = np.linspace(0, 1, 500)
signal = np.sin(2 * np.pi * 50 * t) + 0.5 * np.sin(2 * np.pi * 120 * t)

# Compute FFT
fft_result = np.fft.fft(signal)
frequencies = np.fft.fftfreq(len(signal), t[1] - t[0])

# Plot magnitude spectrum
plt.plot(frequencies[:len(frequencies)//2],
         np.abs(fft_result)[:len(fft_result)//2])
plt.xlabel('Frequency (Hz)')
plt.ylabel('Magnitude')
plt.title('Frequency Spectrum')
plt.show()
```

## Common Transform Pairs

| Time Domain $f(t)$     | Frequency Domain $\hat{f}(\omega)$                            |
| ---------------------- | ------------------------------------------------------------- |
| $\delta(t)$            | $1$                                                           |
| $1$                    | $\delta(\omega)$                                              |
| $e^{-at}u(t)$, $a > 0$ | $\frac{1}{a + j\omega}$                                       |
| $\cos(\omega_0 t)$     | $\pi[\delta(\omega - \omega_0) + \delta(\omega + \omega_0)]$  |
| $\sin(\omega_0 t)$     | $j\pi[\delta(\omega + \omega_0) - \delta(\omega - \omega_0)]$ |
| $e^{-t^2/2}$           | $\sqrt{2\pi}e^{-\omega^2/2}$                                  |

## Applications

- **Signal processing**: Filtering, compression, analysis
- **Image processing**: JPEG compression, edge detection
- **Audio analysis**: Spectral analysis, equalisation
- **Communications**: Modulation, OFDM
- **Quantum mechanics**: Wave function analysis
- **Differential equations**: Solving PDEs
- **Medical imaging**: MRI, CT scans

## Relationship to Laplace Transform

The Fourier transform is a special case of the Laplace transform when $s = j\omega$:

$$
\mathcal{L}\{f(t)\} = \int_0^{\infty}f(t)e^{-st}dt
$$

where setting $s = j\omega$ gives the Fourier transform (for causal signals).

---

## References

- [Fourier Transform - Wikipedia](https://en.wikipedia.org/wiki/Fourier_transform)
- [The Fourier Transform - MIT OpenCourseWare](https://ocw.mit.edu/)
- [Understanding the FFT - DSP Guide](https://www.dspguide.com/)
