---
{"publish":true,"title":"Zero-Order Hold","created":"2025-08-05 10:53","modified":"2025-11-03T20:42:31.912+01:00","tags":["engineering/signal-processing/zero-order-hold"],"cssclasses":"center-images"}
---


# ZERO-ORDER HOLD

---

The **Zero-Order Hold (ZOH)** is a mathematical model of the practical signal reconstruction performed by a digital-to-analogue converter (DAC). It converts discrete-time signals into continuous-time signals by holding each sample value constant until the next sample arrives.

## Principle of Operation

The ZOH generates a continuous-time signal $u(t)$ by holding each discrete sample $u[k]$ constant over one sampling period:

$$u(t) = u[k], \quad kT_s \leq t < (k+1)T_s$$

Where $T_s$ is the sampling period.

![[meta/assets/zero-order-hold.png]]

**Key characteristics:**

- **Piecewise constant**: Output is a staircase function
- **Causal**: Depends only on current and past samples
- **Simple**: Requires no interpolation or computation
- **Practical**: How most DACs actually work

## Time-Domain Model

The ZOH reconstructs a continuous-time waveform from a discrete sequence $x[n]$:

$$x_{ZOH}(t) = \sum_{n = -\infty}^{\infty} x[n] \cdot \text{rect}\left(\frac{t - T/2 - nT}{T}\right)$$

Where $\text{rect}(t)$ is the rectangular function:

$$
\text{rect}(t) = \begin{cases}
1 & |t| < 1/2 \\
0 & \text{otherwise}
\end{cases}
$$

## Frequency-Domain Model

### Impulse Response

The ZOH can be modelled as an [[distilled-notes/linear-time-invariant-system\|LTI system]] with impulse response:

$$
h(t) = \begin{cases}
1 & 0 \leq t < T_s \\
0 & \text{otherwise}
\end{cases}
$$

### Transfer Function

Taking the Laplace transform of the impulse response:

$$H_{ZOH}(s) = \int_0^{T_s} e^{-st} dt = \frac{1 - e^{-sT_s}}{s}$$

**Alternative form:**
$$H_{ZOH}(s) = \frac{1}{s}(1 - e^{-sT_s}) = e^{-sT_s/2} \cdot \frac{2}{sT_s}\sinh\left(\frac{sT_s}{2}\right)$$

This shows the ZOH has:

- **Gain factor**: $\frac{1 - e^{-sT_s}}{s}$
- **Time delay**: $T_s/2$ (centre of hold interval)

### Frequency Response

Substituting $s = j\omega$:

$$H_{ZOH}(j\omega) = T_s \cdot \frac{\sin(\omega T_s/2)}{\omega T_s/2} \cdot e^{-j\omega T_s/2}$$

$$|H_{ZOH}(j\omega)| = T_s \left|\frac{\sin(\omega T_s/2)}{\omega T_s/2}\right| = T_s \cdot \text{sinc}\left(\frac{\omega T_s}{2\pi}\right)$$

**Characteristics:**

- **Low-pass filter**: Attenuates high frequencies
- **First zero**: At $\omega = 2\pi/T_s$ (sampling frequency)
- **Phase delay**: Linear phase (constant group delay)

## Discrete-to-Continuous Conversion

### State-Space Conversion

Given discrete-time state-space model:

$$
\begin{aligned}
x[k+1] &= A_d x[k] + B_d u[k] \\
y[k] &= C_d x[k] + D_d u[k]
\end{aligned}
$$

The ZOH equivalent continuous-time model:

$$
\begin{aligned}
A_c &= \frac{1}{T_s}\ln(A_d) \\
B_c &= A_c(A_d - I)^{-1}B_d \\
C_c &= C_d \\
D_c &= D_d
\end{aligned}
$$

Where $\ln(A_d)$ is the matrix logarithm.

### Transfer Function Conversion

MATLAB/Python command to convert discrete to continuous with ZOH assumption:

```python
sys_c = signal.cont2discrete(sys_d, Ts, method='zoh')
```

## Python Implementation

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import signal

class ZeroOrderHold:
    """Zero-order hold signal reconstruction."""

    def __init__(self, Ts: float):
        """
        Initialize ZOH.

        Args:
            Ts: Sampling period
        """
        self.Ts = Ts

    def reconstruct(self, t_samples: np.ndarray,
                   x_samples: np.ndarray,
                   t_continuous: np.ndarray) -> np.ndarray:
        """
        Reconstruct continuous signal from samples.

        Args:
            t_samples: Sample times
            x_samples: Sample values
            t_continuous: Continuous time points for reconstruction

        Returns:
            Reconstructed continuous signal
        """
        x_continuous = np.zeros_like(t_continuous)

        for i, t in enumerate(t_continuous):
            # Find most recent sample
            idx = np.searchsorted(t_samples, t, side='right') - 1

            if idx >= 0 and idx < len(x_samples):
                x_continuous[i] = x_samples[idx]
            elif idx >= len(x_samples):
                x_continuous[i] = x_samples[-1]

        return x_continuous

    def frequency_response(self, frequencies: np.ndarray) -> np.ndarray:
        """
        Calculate frequency response of ZOH.

        Args:
            frequencies: Frequency array (Hz)

        Returns:
            Complex frequency response
        """
        omega = 2 * np.pi * frequencies

        # Avoid division by zero
        with np.errstate(divide='ignore', invalid='ignore'):
            H = self.Ts * np.sinc(omega * self.Ts / (2 * np.pi)) * \
                np.exp(-1j * omega * self.Ts / 2)
            H[omega == 0] = self.Ts  # Limit as omega -> 0

        return H

def demonstrate_zoh():
    """Demonstrate zero-order hold reconstruction."""
    # Original continuous signal
    t_cont = np.linspace(0, 2, 1000)
    x_cont = np.sin(2*np.pi*3*t_cont) + 0.5*np.sin(2*np.pi*7*t_cont)

    # Sample the signal
    Ts = 0.05  # 20 Hz sampling
    t_samples = np.arange(0, 2, Ts)
    x_samples = np.sin(2*np.pi*3*t_samples) + 0.5*np.sin(2*np.pi*7*t_samples)

    # ZOH reconstruction
    zoh = ZeroOrderHold(Ts)
    x_recon = zoh.reconstruct(t_samples, x_samples, t_cont)

    # Plot
    fig, axes = plt.subplots(2, 1, figsize=(12, 10))

    # Time domain
    axes[0].plot(t_cont, x_cont, 'b-', linewidth=2, label='Original', alpha=0.7)
    axes[0].plot(t_cont, x_recon, 'r-', linewidth=1.5, label='ZOH Reconstruction')
    axes[0].stem(t_samples, x_samples, linefmt='k:', markerfmt='ko',
                 basefmt=' ', label='Samples')
    axes[0].set_xlabel('Time (s)')
    axes[0].set_ylabel('Amplitude')
    axes[0].set_title(f'Zero-Order Hold Reconstruction (Ts = {Ts}s, fs = {1/Ts} Hz)')
    axes[0].legend()
    axes[0].grid(True, alpha=0.3)
    axes[0].set_xlim([0, 1])

    # Frequency domain
    frequencies = np.linspace(0, 30, 1000)
    H_zoh = zoh.frequency_response(frequencies)

    axes[1].plot(frequencies, 20*np.log10(np.abs(H_zoh) + 1e-10), 'b-', linewidth=2)
    axes[1].axvline(1/Ts, color='r', linestyle='--', linewidth=2,
                    label=f'Sampling freq ({1/Ts} Hz)')
    axes[1].axhline(-3, color='gray', linestyle=':', alpha=0.5, label='-3 dB')
    axes[1].set_xlabel('Frequency (Hz)')
    axes[1].set_ylabel('Magnitude (dB)')
    axes[1].set_title('Zero-Order Hold Frequency Response')
    axes[1].legend()
    axes[1].grid(True, alpha=0.3)
    axes[1].set_xlim([0, 30])
    axes[1].set_ylim([-40, 5])

    plt.tight_layout()
    plt.savefig('zoh_demonstration.png', dpi=150, bbox_inches='tight')
    print("Saved demonstration plot to zoh_demonstration.png")

def compare_holds():
    """Compare zero-order, first-order, and ideal reconstruction."""
    # Original signal
    t_cont = np.linspace(0, 1, 1000)
    x_cont = np.sin(2*np.pi*5*t_cont)

    # Sampling
    Ts = 0.08
    t_samples = np.arange(0, 1, Ts)
    x_samples = np.sin(2*np.pi*5*t_samples)

    # Zero-order hold
    zoh = ZeroOrderHold(Ts)
    x_zoh = zoh.reconstruct(t_samples, x_samples, t_cont)

    # First-order hold (linear interpolation)
    x_foh = np.interp(t_cont, t_samples, x_samples)

    # Plot comparison
    plt.figure(figsize=(12, 6))
    plt.plot(t_cont, x_cont, 'k-', linewidth=3, label='Original', alpha=0.5)
    plt.plot(t_cont, x_zoh, 'r-', linewidth=2, label='Zero-Order Hold (ZOH)')
    plt.plot(t_cont, x_foh, 'b-', linewidth=2, label='First-Order Hold (FOH)')
    plt.stem(t_samples, x_samples, linefmt='k:', markerfmt='ko',
             basefmt=' ', label='Samples')

    plt.xlabel('Time (s)')
    plt.ylabel('Amplitude')
    plt.title('Comparison of Hold Methods')
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.xlim([0, 0.5])

    plt.savefig('zoh_comparison.png', dpi=150, bbox_inches='tight')
    print("Saved comparison plot to zoh_comparison.png")

if __name__ == "__main__":
    demonstrate_zoh()
    compare_holds()
```

## Advantages

1. **Simple implementation**: No computation required, just hold value
2. **Causal**: No look-ahead needed
3. **Exact time-domain match**: For staircase inputs
4. **Practical**: Models actual DAC behaviour
5. **Stability preservation**: Stable discrete systems remain stable

## Disadvantages

1. **Staircase artefacts**: Visible steps in output
2. **High-frequency attenuation**: Sinc frequency response rolls off
3. **Imaging**: Spectral copies at multiples of sampling frequency
4. **Not smooth**: Discontinuous derivatives at sample boundaries

## Comparison with Other Holds

| Method               | Continuity             | Smoothness          | Complexity | Use Case               |
| -------------------- | ---------------------- | ------------------- | ---------- | ---------------------- |
| **Zero-Order Hold**  | C⁰ (continuous)        | Piecewise constant  | Very low   | Standard DACs, control |
| **First-Order Hold** | C¹ (smooth)            | Linear segments     | Low        | Smooth reconstruction  |
| **Ideal (sinc)**     | C∞ (infinitely smooth) | Perfect bandlimited | Infinite   | Theoretical only       |

## Applications

### Digital Control Systems

- **D/A conversion**: Convert digital controller output to analogue actuator signal
- **Discretisation**: Model continuous plants in digital controllers
- **Simulation**: Simulate analogue systems on digital computers

### Signal Processing

- **Audio playback**: DACs in audio systems use ZOH (with post-filtering)
- **Video display**: Pixel values held constant during frame display
- **Waveform generation**: Function generators, arbitrary waveform generators

## Limitations

### Cannot Convert Systems With:

1. **Poles at $z = 0$**: Pure delays cannot be represented in continuous time
2. **Negative real poles**: ZOH may produce higher-order continuous system
3. **Very fast sampling**: Numerical issues with matrix logarithm

### When ZOH Model Breaks Down:

- **Non-uniform sampling**: ZOH assumes constant $T_s$
- **Multi-rate systems**: Different sampling rates in system
- **Quantization**: ZOH assumes infinite precision

---

## References

- [Digital Control System Analysis and Design - Phillips & Nagle (4th Edition)](https://www.pearson.com/en-us/subject-catalog/p/digital-control-system-analysis-and-design/P200000003283)
- [Zero-Order Hold - MathWorks Documentation](https://www.mathworks.com/help/control/ref/c2d.html)
- [Discrete-Time Signal Processing - Oppenheim & Schafer](https://www.pearson.com/en-us/subject-catalog/p/discrete-time-signal-processing/P200000003283)
- [Sample-and-Hold Circuit - Wikipedia](https://en.wikipedia.org/wiki/Sample_and_hold)
