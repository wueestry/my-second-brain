---
{"publish":true,"title":"Z-Transform","created":"2025-08-05 11:02","modified":"2025-11-03T20:42:31.917+01:00","tags":["engineering/signal-processing/z-transform"],"cssclasses":"center-images"}
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

## Properties

The Z-Transform has several important properties that make it useful for analysis:

1. **Linearity**: $\mathcal{Z}\{ax_1[n] + bx_2[n]\} = aX_1(z) + bX_2(z)$
2. **Time Shifting**: $\mathcal{Z}\{x[n-k]\} = z^{-k}X(z)$
3. **Convolution**: $\mathcal{Z}\{x[n] * h[n]\} = X(z) \cdot H(z)$
4. **Initial Value Theorem**: $x[0] = \lim_{z \to \infty} X(z)$
5. **Final Value Theorem**: $\lim_{n \to \infty} x[n] = \lim_{z \to 1} (z-1)X(z)$ (if the limit exists)

## Common Transform Pairs

| Time Domain $x[n]$ | Z-Domain $X(z)$      | Region of Convergence |
| ------------------ | -------------------- | --------------------- |
| $\delta[n]$        | $1$                  | All $z$               |
| $u[n]$             | $\frac{z}{z-1}$      | $\|z\| > 1$           |
| $a^n u[n]$         | $\frac{z}{z-a}$      | $\|z\| > \|a\|$       |
| $-a^n u[-n-1]$     | $\frac{z}{z-a}$      | $\|z\| < \|a\|$       |
| $n \cdot a^n u[n]$ | $\frac{az}{(z-a)^2}$ | $\|z\| > \|a\|$       |

## Python Implementation

```python
import numpy as np
from scipy import signal
import matplotlib.pyplot as plt

def compute_z_transform_response(numerator, denominator, num_samples=50):
    """
    Analyse a discrete-time system using Z-transform representation.

    Args:
        numerator: Coefficients of numerator polynomial
        denominator: Coefficients of denominator polynomial
        num_samples: Number of samples for impulse response

    Returns:
        Impulse response, frequency response
    """
    # Create discrete-time transfer function
    system = signal.TransferFunction(numerator, denominator, dt=1)

    # Compute impulse response
    t, y = signal.dimpulse(system, n=num_samples)

    # Compute frequency response
    w, h = signal.dfreqresp(system)

    return t, y, w, h

# Example: First-order system H(z) = 1 / (1 - 0.5z^-1)
num = [1]
den = [1, -0.5]

t, impulse_resp, w, freq_resp = compute_z_transform_response(num, den)

# Plot impulse response
plt.figure(figsize=(12, 8))

plt.subplot(3, 1, 1)
plt.stem(t[0], impulse_resp[0].flatten())
plt.title('Impulse Response')
plt.xlabel('Sample n')
plt.ylabel('Amplitude')
plt.grid(True)

# Plot magnitude response
plt.subplot(3, 1, 2)
plt.plot(w/np.pi, 20*np.log10(abs(freq_resp)))
plt.title('Magnitude Response')
plt.xlabel('Normalised Frequency (×π rad/sample)')
plt.ylabel('Magnitude (dB)')
plt.grid(True)

# Plot phase response
plt.subplot(3, 1, 3)
plt.plot(w/np.pi, np.angle(freq_resp))
plt.title('Phase Response')
plt.xlabel('Normalised Frequency (×π rad/sample)')
plt.ylabel('Phase (radians)')
plt.grid(True)

plt.tight_layout()
plt.show()
```

## Practical Applications

- **Digital Filter Design**: Design and analyse IIR and FIR filters in the z-domain
- **Control Systems**: Analyse stability and design discrete-time controllers
- **Signal Processing**: Understand frequency response of discrete-time systems
- **System Identification**: Model systems from input-output data
- **Communication Systems**: Design equalizers and adaptive filters

## Relationship to Other Transforms

The Z-transform is intimately related to other important transforms:

- **Laplace Transform**: When $z = e^{sT}$ where $T$ is the sampling period and $s$ is the Laplace variable
- **Fourier Transform**: When $z = e^{j\omega}$ (evaluating on the unit circle in the z-plane)
- **Discrete-Time Fourier Transform**: Special case when $z$ is restricted to the unit circle

---

## References

- [Z-transform - Wikipedia](https://en.wikipedia.org/wiki/Z-transform)
- [SciPy Signal Processing Tutorial](https://docs.scipy.org/doc/scipy/tutorial/signal.html)
- [The Scientist and Engineer's Guide to DSP](http://www.dspguide.com/)
