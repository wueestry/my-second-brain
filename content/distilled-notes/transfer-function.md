---
{"publish":true,"title":"Transfer Function","created":"2024-08-20T00:00:00.000Z","modified":"2025-11-03T20:43:24.481+01:00","tags":["engineering/control-theory/transfer-function"],"cssclasses":"center-images"}
---


# TRANSFER FUNCTION

---

A transfer function models a system's output $y(t)$ in relationship with its input $u(t)$. It characterises the input-output behaviour of a linear time-invariant (LTI) system in the frequency domain.

$$
\text{Continuous Time:} \qquad H(s) = \frac{Y(s)}{U(s)} = \frac{\mathcal{L}\{y(t)\}}{\mathcal{L}\{u(t)\}}
$$

$$
\text{Discrete Time:} \qquad H(z) = \frac{Y(z)}{U(z)} = \frac{\mathcal{Z}\{y[n]\}}{\mathcal{Z}\{u[n]\}}
$$

## General Form

A continuous-time transfer function is typically written as a ratio of polynomials:

$$
H(s) = K\frac{b_ms^m + b_{m-1}s^{m-1} + \cdots + b_1s + b_0}{s^n + a_{n-1}s^{n-1} + \cdots + a_1s + a_0}
$$

where:

- $K$ is the gain
- Numerator zeros: roots of numerator polynomial
- Denominator poles: roots of denominator polynomial
- $n \geq m$ for physical realisability (proper system)

## Pole-Zero Form

$$
H(s) = K\frac{(s-z_1)(s-z_2)\cdots(s-z_m)}{(s-p_1)(s-p_2)\cdots(s-p_n)}
$$

where $z_i$ are zeros and $p_i$ are poles.

## Common Transfer Functions

### First-Order System

$$
H(s) = \frac{K}{\tau s + 1}
$$

- $K$: DC gain
- $\tau$: Time constant
- Pole at $s = -1/\tau$

**Time response to step input:**

$$
y(t) = K(1 - e^{-t/\tau})
$$

### Second-Order System

$$
H(s) = \frac{\omega_n^2}{s^2 + 2\zeta\omega_n s + \omega_n^2}
$$

- $\omega_n$: Natural frequency
- $\zeta$: Damping ratio

**Behaviour:**

- $\zeta > 1$: Overdamped
- $\zeta = 1$: Critically damped
- $0 < \zeta < 1$: Underdamped
- $\zeta = 0$: Undamped

### Integrator

$$
H(s) = \frac{1}{s}
$$

Pure integrator with a pole at the origin.

### Differentiator

$$
H(s) = s
$$

Pure differentiator with a zero at the origin.

## Properties

### DC Gain

The steady-state response to a unit step input:

$$
H(0) = \lim_{s \to 0} H(s)
$$

### Final Value Theorem

$$
\lim_{t \to \infty} y(t) = \lim_{s \to 0} sY(s) = \lim_{s \to 0} sH(s)U(s)
$$

### Stability

A system is stable if all poles have negative real parts (left half of $s$-plane).

## From Differential Equation to Transfer Function

Given a differential equation:

$$
a_2\frac{d^2y}{dt^2} + a_1\frac{dy}{dt} + a_0y = b_1\frac{du}{dt} + b_0u
$$

Apply Laplace transform (assuming zero initial conditions):

$$
a_2s^2Y(s) + a_1sY(s) + a_0Y(s) = b_1sU(s) + b_0U(s)
$$

Transfer function:

$$
H(s) = \frac{Y(s)}{U(s)} = \frac{b_1s + b_0}{a_2s^2 + a_1s + a_0}
$$

## Block Diagram Algebra

### Series Connection

$$
H(s) = H_1(s) \cdot H_2(s)
$$

### Parallel Connection

$$
H(s) = H_1(s) + H_2(s)
$$

### Feedback Connection

$$
H(s) = \frac{G(s)}{1 + G(s)H(s)}
$$

where $G(s)$ is forward path and $H(s)$ is feedback path.

## Python Implementation

```python
import numpy as np
from scipy import signal
import matplotlib.pyplot as plt

# Define transfer function: H(s) = 5/(s^2 + 2s + 5)
num = [5]
den = [1, 2, 5]
sys = signal.TransferFunction(num, den)

# Print transfer function
print(sys)

# Find poles and zeros
zeros = sys.zeros
poles = sys.poles
print(f"Zeros: {zeros}")
print(f"Poles: {poles}")

# Time response
t = np.linspace(0, 10, 1000)
t_step, y_step = signal.step(sys, T=t)

# Frequency response
w, mag, phase = signal.bode(sys)

# Plot
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))

ax1.plot(t_step, y_step)
ax1.set_title('Step Response')
ax1.set_xlabel('Time (s)')
ax1.set_ylabel('Output')
ax1.grid()

ax2.plot(t_step, y_step)
ax2.set_title('Impulse Response')
ax2.grid()

plt.show()
```

## MATLAB Example

```matlab
% Create transfer function
num = [1 2];
den = [1 3 2];
H = tf(num, den);

% Display
disp(H);

% Step response
step(H);

% Bode plot
bode(H);

% Pole-zero map
pzmap(H);
```

## Applications

- **Control system design**: Designing controllers for desired behaviour
- **System identification**: Determining system model from data
- **Frequency analysis**: Understanding frequency response
- **Stability analysis**: Determining if system is stable
- **Filter design**: Designing filters with desired characteristics

---

## References

- [Transfer Functions - MIT OpenCourseWare](https://ocw.mit.edu/)
- [Control System Toolbox - MATLAB](https://www.mathworks.com/help/control/)
- [Transfer Function - Wikipedia](https://en.wikipedia.org/wiki/Transfer_function)
