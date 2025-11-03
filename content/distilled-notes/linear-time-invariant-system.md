---
{"publish":true,"title":"Linear Time-Invariant System","created":"2024-08-13T00:00:00.000Z","modified":"2025-11-03T20:43:47.232+01:00","tags":["engineering/control-theory/systems/lti"],"cssclasses":"center-images"}
---


# LINEAR TIME-INVARIANT SYSTEM

---

A **linear time-invariant system** is a system that produces an output signal from any input signal subject to the constraints of linearity and time-invariance.

The response of a system $y(t)$ with an arbitrary input $x(t)$ can be computed directly using [[Convolution]] $y(t) = (x*h)(t)$ with $h(t)$ being the impulse response.

## Properties

### Linearity

**Additivity:**

$$
f(x+y) = f(x) + f(y)
$$

**Homogeneity (Scaling):**

$$
f(ax) = a f(x)
$$

**Combined:**

$$
f(ax + by) = af(x) + bf(y)
$$

### Time Invariance

If input $x(t)$ produces output $y(t)$, then delayed input $x(t-\tau)$ produces delayed output $y(t-\tau)$:

$$
y(t - \tau) = H\{x(t - \tau)\}
$$

The system behaviour does not change over time.

## System Representation

### Impulse Response

The impulse response $h(t)$ completely characterises an LTI system. Any output can be computed via convolution:

**Continuous-time:**

$$
y(t) = \int_{-\infty}^{\infty} x(\tau) h(t - \tau) \, d\tau = x(t) * h(t)
$$

**Discrete-time:**

$$
y[n] = \sum_{k=-\infty}^{\infty} x[k] h[n - k] = x[n] * h[n]
$$

### Transfer Function

The [[distilled-notes/laplace-transform\|Laplace transform]] of the impulse response:

$$
H(s) = \mathcal{L}\{h(t)\} = \int_{0}^{\infty} h(t) e^{-st} \, dt
$$

Output in frequency domain:

$$
Y(s) = H(s) X(s)
$$

## Python Implementation

```python
import numpy as np
from scipy import signal
import matplotlib.pyplot as plt

class LTISystem:
    """Linear Time-Invariant system simulator"""

    def __init__(self, num, den):
        """
        Initialise LTI system.

        Args:
            num: Numerator coefficients of transfer function
            den: Denominator coefficients of transfer function
        """
        self.system = signal.TransferFunction(num, den)
        self.num = num
        self.den = den

    def impulse_response(self, t=None, N=100):
        """
        Compute impulse response.

        Args:
            t: Time vector (optional)
            N: Number of time points if t not provided

        Returns:
            Time vector and impulse response
        """
        if t is None:
            t = np.linspace(0, 10, N)

        t, y = signal.impulse(self.system, T=t)
        return t, y

    def step_response(self, t=None, N=100):
        """Compute step response"""
        if t is None:
            t = np.linspace(0, 10, N)

        t, y = signal.step(self.system, T=t)
        return t, y

    def frequency_response(self, w=None):
        """
        Compute frequency response.

        Args:
            w: Frequency vector in rad/s

        Returns:
            Frequencies, complex frequency response
        """
        if w is None:
            w = np.logspace(-2, 2, 1000)

        w, H = signal.freqs(self.num, self.den, worN=w)
        return w, H

    def simulate(self, u, t):
        """
        Simulate system with arbitrary input.

        Args:
            u: Input signal
            t: Time vector

        Returns:
            Output signal
        """
        t, y, x = signal.lsim(self.system, u, t)
        return y

def demonstrate_linearity():
    """Demonstrate linearity property"""
    # Create an LTI system: H(s) = 1/(s+1)
    sys = LTISystem([1], [1, 1])

    # Time vector
    t = np.linspace(0, 10, 1000)

    # Two input signals
    u1 = np.sin(2 * np.pi * 0.5 * t)
    u2 = np.cos(2 * np.pi * 1.0 * t)

    # Individual responses
    y1 = sys.simulate(u1, t)
    y2 = sys.simulate(u2, t)

    # Combined input and response
    u_combined = u1 + u2
    y_combined = sys.simulate(u_combined, t)

    # Verify linearity: y(u1+u2) should equal y(u1) + y(u2)
    y_sum = y1 + y2

    plt.figure(figsize=(12, 8))

    plt.subplot(3, 1, 1)
    plt.plot(t, y1, label='y₁(t)')
    plt.plot(t, y2, label='y₂(t)')
    plt.title('Individual Responses')
    plt.legend()
    plt.grid(True)

    plt.subplot(3, 1, 2)
    plt.plot(t, y_sum, label='y₁(t) + y₂(t)')
    plt.title('Sum of Individual Responses')
    plt.legend()
    plt.grid(True)

    plt.subplot(3, 1, 3)
    plt.plot(t, y_combined, label='y(u₁+u₂)', linestyle='--')
    plt.plot(t, y_sum, label='y₁+y₂', alpha=0.7)
    plt.title('Comparison (should overlap)')
    plt.legend()
    plt.grid(True)

    plt.tight_layout()
    plt.show()

    # Check numerical difference
    error = np.max(np.abs(y_combined - y_sum))
    print(f"Maximum difference (should be ~0): {error:.2e}")

def demonstrate_time_invariance():
    """Demonstrate time invariance property"""
    sys = LTISystem([1], [1, 1])

    t = np.linspace(0, 10, 1000)
    u = np.sin(2 * np.pi * 0.5 * t)

    # Original response
    y = sys.simulate(u, t)

    # Delayed input
    delay = 2  # seconds
    delay_samples = int(delay * len(t) / t[-1])
    u_delayed = np.concatenate([np.zeros(delay_samples), u[:-delay_samples]])

    # Response to delayed input
    y_delayed = sys.simulate(u_delayed, t)

    # Manually delayed response
    y_shifted = np.concatenate([np.zeros(delay_samples), y[:-delay_samples]])

    plt.figure(figsize=(12, 6))

    plt.subplot(2, 1, 1)
    plt.plot(t, u, label='Original input')
    plt.plot(t, u_delayed, label='Delayed input', linestyle='--')
    plt.title('Inputs')
    plt.legend()
    plt.grid(True)

    plt.subplot(2, 1, 2)
    plt.plot(t, y_delayed, label='Response to delayed input')
    plt.plot(t, y_shifted, label='Delayed response', linestyle='--', alpha=0.7)
    plt.title('Outputs (should overlap)')
    plt.legend()
    plt.grid(True)

    plt.tight_layout()
    plt.show()

# Example usage
if __name__ == "__main__":
    # Create a second-order system
    # H(s) = 10 / (s² + 2s + 10)
    sys = LTISystem([10], [1, 2, 10])

    # Plot impulse and step responses
    fig, axes = plt.subplots(2, 2, figsize=(12, 10))

    # Impulse response
    t, y = sys.impulse_response()
    axes[0, 0].plot(t, y)
    axes[0, 0].set_title('Impulse Response')
    axes[0, 0].set_xlabel('Time (s)')
    axes[0, 0].set_ylabel('Amplitude')
    axes[0, 0].grid(True)

    # Step response
    t, y = sys.step_response()
    axes[0, 1].plot(t, y)
    axes[0, 1].set_title('Step Response')
    axes[0, 1].set_xlabel('Time (s)')
    axes[0, 1].set_ylabel('Amplitude')
    axes[0, 1].grid(True)

    # Frequency response (magnitude)
    w, H = sys.frequency_response()
    axes[1, 0].semilogx(w, 20*np.log10(abs(H)))
    axes[1, 0].set_title('Magnitude Response')
    axes[1, 0].set_xlabel('Frequency (rad/s)')
    axes[1, 0].set_ylabel('Magnitude (dB)')
    axes[1, 0].grid(True)

    # Frequency response (phase)
    axes[1, 1].semilogx(w, np.angle(H, deg=True))
    axes[1, 1].set_title('Phase Response')
    axes[1, 1].set_xlabel('Frequency (rad/s)')
    axes[1, 1].set_ylabel('Phase (degrees)')
    axes[1, 1].grid(True)

    plt.tight_layout()
    plt.show()

    # Demonstrate properties
    demonstrate_linearity()
    demonstrate_time_invariance()
```

## Applications

- **Signal Processing**: Audio processing, image filtering, communications
- **Control Systems**: System analysis, controller design, stability analysis
- **Circuit Analysis**: Analysing electrical circuits with resistors, capacitors, inductors
- **Mechanical Systems**: Vibration analysis, structural dynamics
- **Economics**: Time-series analysis, econometric modelling

## Advantages of LTI Systems

1. **Superposition applies**: Can analyse complex inputs by breaking into simpler components
2. **Frequency domain analysis**: Can use Fourier/Laplace transforms
3. **Well-understood theory**: Extensive mathematical tools available
4. **Easy to analyse**: Transfer functions, Bode plots, root locus
5. **Predictable behaviour**: Output depends only on input and system characteristics

---

## References

- [Linear Time-Invariant System - Wikipedia](https://en.wikipedia.org/wiki/Linear_time-invariant_system)
- [SciPy Signal Processing](https://docs.scipy.org/doc/scipy/reference/signal.html)
- [Signals and Systems - Oppenheim & Willsky](https://www.pearson.com/en-us/subject-catalog/p/signals-and-systems/P200000003301)
