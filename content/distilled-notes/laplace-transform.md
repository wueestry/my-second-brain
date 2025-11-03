---
{"publish":true,"title":"Laplace Transform","created":"2024-08-12T00:00:00.000Z","modified":"2025-11-03T20:43:47.240+01:00","tags":["mathematics/transforms/laplace"],"cssclasses":"center-images"}
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
- Differentiation: $\frac{d}{dt}f(t) \leftrightarrow sF(s) - f(0)$
- Convolution: $f_1(t) * f_2(t) \leftrightarrow F_1(s) \cdot F_2(s)$

## Common Transform Pairs

| Time Domain $f(t)$      | Laplace Domain $F(s)$             | ROC                 |
| ----------------------- | --------------------------------- | ------------------- |
| $\delta(t)$             | $1$                               | All $s$             |
| $u(t)$ (unit step)      | $\frac{1}{s}$                     | $\text{Re}(s) > 0$  |
| $t$                     | $\frac{1}{s^2}$                   | $\text{Re}(s) > 0$  |
| $t^n$                   | $\frac{n!}{s^{n+1}}$              | $\text{Re}(s) > 0$  |
| $e^{-at}$               | $\frac{1}{s+a}$                   | $\text{Re}(s) > -a$ |
| $te^{-at}$              | $\frac{1}{(s+a)^2}$               | $\text{Re}(s) > -a$ |
| $\sin(\omega t)$        | $\frac{\omega}{s^2+\omega^2}$     | $\text{Re}(s) > 0$  |
| $\cos(\omega t)$        | $\frac{s}{s^2+\omega^2}$          | $\text{Re}(s) > 0$  |
| $e^{-at}\sin(\omega t)$ | $\frac{\omega}{(s+a)^2+\omega^2}$ | $\text{Re}(s) > -a$ |
| $e^{-at}\cos(\omega t)$ | $\frac{s+a}{(s+a)^2+\omega^2}$    | $\text{Re}(s) > -a$ |

## Inverse Laplace Transform

The inverse Laplace transform is given by:

$$
f(t) = \mathcal{L}^{-1}\{F(s)\} = \frac{1}{2\pi j}\int_{\gamma - j\infty}^{\gamma + j\infty}F(s)e^{st}ds
$$

In practice, we use **partial fraction decomposition** to find inverse transforms.

### Partial Fraction Example

$$
F(s) = \frac{s+3}{s^2+3s+2} = \frac{s+3}{(s+1)(s+2)}
$$

Decompose:

$$
F(s) = \frac{A}{s+1} + \frac{B}{s+2}
$$

Solving: $A = 2$, $B = -1$

Therefore:

$$
f(t) = 2e^{-t} - e^{-2t}
$$

## Applications

### Solving Differential Equations

Transform the ODE:

$$
\frac{d^2y}{dt^2} + 3\frac{dy}{dt} + 2y = u(t), \quad y(0) = 0, y'(0) = 0
$$

Apply Laplace transform:

$$
s^2Y(s) + 3sY(s) + 2Y(s) = \frac{1}{s}
$$

Solve for $Y(s)$:

$$
Y(s) = \frac{1}{s(s^2+3s+2)} = \frac{1}{s(s+1)(s+2)}
$$

Use partial fractions and inverse transform to get $y(t)$.

### Transfer Functions

For a linear system, the transfer function is:

$$
H(s) = \frac{Y(s)}{U(s)}
$$

This represents the system behaviour in the frequency domain.

## Python Implementation

```python
import numpy as np
from scipy import signal
import matplotlib.pyplot as plt

# Define a transfer function: H(s) = 1/(s^2 + 2s + 1)
num = [1]
den = [1, 2, 1]
system = signal.TransferFunction(num, den)

# Time vector
t = np.linspace(0, 10, 1000)

# Step response
t_step, y_step = signal.step(system, T=t)

# Impulse response
t_impulse, y_impulse = signal.impulse(system, T=t)

# Plot
plt.figure(figsize=(12, 5))
plt.subplot(1, 2, 1)
plt.plot(t_step, y_step)
plt.title('Step Response')
plt.xlabel('Time')
plt.ylabel('Output')
plt.grid()

plt.subplot(1, 2, 2)
plt.plot(t_impulse, y_impulse)
plt.title('Impulse Response')
plt.xlabel('Time')
plt.ylabel('Output')
plt.grid()

plt.show()
```

## Relationship to Fourier Transform

The Laplace transform generalises the Fourier transform:

- Set $s = j\omega$ to get the Fourier transform
- Laplace works for a wider class of functions (including growing signals)
- Fourier is restricted to functions in $L^2$ (square-integrable)

## Advantages

- **Solves differential equations**: Converts to algebraic equations
- **Handles initial conditions**: Naturally incorporates initial values
- **System analysis**: Poles and zeros reveal system behaviour
- **Stability analysis**: From pole locations in $s$-plane
- **Control design**: Design controllers in frequency domain

## Stability Analysis

System is stable if all poles have negative real parts:

- Poles in left half-plane: Stable
- Poles on imaginary axis: Marginally stable
- Poles in right half-plane: Unstable

---

## References

- [Laplace Transform - Wikipedia](https://en.wikipedia.org/wiki/Laplace_transform)
- [Laplace Transform Tables - MIT](https://web.mit.edu/2.151/www/Handouts/Laplace.pdf)
- [System Analysis using Laplace - Control Tutorials](http://ctms.engin.umich.edu/CTMS/index.php?aux=Basics_Laplace)
