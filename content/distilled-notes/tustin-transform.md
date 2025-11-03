---
{"publish":true,"title":"Tustin Transform","created":"2024-08-08T00:00:00.000Z","modified":"2025-11-03T20:42:31.922+01:00","tags":["engineering/control-theory/tustin-transform"],"cssclasses":"center-images"}
---


# TUSTIN TRANSFORM

---

The **Tustin Transform** (also called **Bilinear Transform**) is a method for converting continuous-time systems to discrete-time equivalents. It yields the best frequency domain match between a continuous-time system and its discrete-time counterpart, making it superior to simpler methods like forward or backward Euler.

## Mathematical Foundation

The bilinear transform is a **first-order Padé approximant** of the matrix exponential function that maps the s-plane to the z-plane.

**Key mapping:**
$$s = \frac{2}{T_s}\frac{z-1}{z+1}$$

Where $T_s$ is the sampling period.

**Inverse mapping:**
$$z = \frac{1 + sT_s/2}{1 - sT_s/2}$$

## Analog-to-Discrete Conversion

**Given continuous-time transfer function:**
$$H(s) = \frac{b_ms^m + b_{m-1}s^{m-1} + \cdots + b_0}{a_ns^n + a_{n-1}s^{n-1} + \cdots + a_0}$$

**Discrete-time equivalent:**
$$H_d(z) = H(s)\bigg|_{s = \frac{2}{T_s}\frac{z-1}{z+1}}$$

### Example: First-Order System

**Continuous:** $H(s) = \frac{1}{s + a}$

**Substitution:**
$$H_d(z) = \frac{1}{\frac{2}{T_s}\frac{z-1}{z+1} + a}$$

**Simplify:**
$$H_d(z) = \frac{T_s(z+1)}{2(z-1) + aT_s(z+1)} = \frac{T_s(z+1)}{(2+aT_s)z + (aT_s-2)}$$

**Standard form:**
$$H_d(z) = \frac{T_s}{2+aT_s} \cdot \frac{z+1}{z - \frac{2-aT_s}{2+aT_s}}$$

## Properties

### Stability Preservation

- **Left half s-plane (stable)** → **Inside unit circle in z-plane (stable)**
- **Right half s-plane (unstable)** → **Outside unit circle in z-plane (unstable)**
- **Imaginary axis** → **Unit circle**

This ensures that stable continuous systems remain stable when discretised.

### Frequency Mapping

The entire imaginary axis ($s = j\omega$) in the s-plane maps to the unit circle ($z = e^{j\omega T_s}$) in the z-plane, but with **frequency warping**:

$$\omega_d = \frac{2}{T_s}\tan\left(\frac{\omega T_s}{2}\right)$$

Where:

- $\omega$: Continuous-time frequency
- $\omega_d$: Corresponding discrete-time frequency

**Warping effect:**

- Low frequencies ($\omega \ll \frac{2}{T_s}$): $\omega_d \approx \omega$ (minimal distortion)
- High frequencies ($\omega \to \infty$): $\omega_d \to \frac{2}{T_s}$ (severe compression)

## Frequency Prewarping

If your system has important dynamics at a specific frequency $\omega_0$ that you want the transformation to preserve exactly, use **frequency prewarping**.

**Modified substitution:**
$$s = \frac{\omega_0}{\tan(\omega_0 T_s/2)} \cdot \frac{z-1}{z+1}$$

**Matching ensured:**
$$H(j\omega_0) = H_d(e^{j\omega_0 T_s})$$

The discrete-time system exactly matches the continuous-time system at frequency $\omega_0$.

**When to use:**

- **Lowpass filters**: Prewarp at cutoff frequency
- **Notch filters**: Prewarp at notch frequency
- **Controllers**: Prewarp at crossover frequency

## Python Implementation

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import signal

def tustin_transform(num_c, den_c, Ts, prewarp_freq=None):
    """
    Convert continuous transfer function to discrete using Tustin.

    Args:
        num_c: Numerator coefficients of H(s)
        den_c: Denominator coefficients of H(s)
        Ts: Sampling period
        prewarp_freq: Optional frequency to prewarp (rad/s)

    Returns:
        num_d, den_d: Discrete transfer function coefficients
    """
    sys_c = signal.TransferFunction(num_c, den_c)

    if prewarp_freq is not None:
        # Use frequency prewarping
        sys_d = signal.cont2discrete((num_c, den_c), Ts,
                                     method='bilinear',
                                     alpha=prewarp_freq/(2/Ts))
    else:
        # Standard Tustin transform
        sys_d = signal.cont2discrete((num_c, den_c), Ts,
                                     method='bilinear')

    return sys_d[0], sys_d[1]

def compare_discretization_methods():
    """Compare Tustin with other discretization methods."""
    # Continuous-time lowpass filter: H(s) = 1 / (s + 1)
    num_c = [1]
    den_c = [1, 1]

    # Sampling period
    Ts = 0.5

    # Frequency range
    w = np.logspace(-2, 2, 500)

    # Continuous system
    sys_c = signal.TransferFunction(num_c, den_c)
    w_c, H_c = signal.freqs(num_c, den_c, worN=w)

    # Discretization methods
    methods = {
        'Tustin (Bilinear)': 'bilinear',
        'Zero-Order Hold': 'zoh',
        'Forward Euler': 'forward_diff',
        'Backward Euler': 'backward_diff'
    }

    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(12, 10))

    # Plot continuous response
    ax1.semilogx(w_c, 20*np.log10(np.abs(H_c)), 'k-', linewidth=3,
                 label='Continuous', alpha=0.7)
    ax2.semilogx(w_c, np.angle(H_c)*180/np.pi, 'k-', linewidth=3,
                 label='Continuous', alpha=0.7)

    colors = ['blue', 'red', 'green', 'orange']

    for (name, method), color in zip(methods.items(), colors):
        # Discretize
        sys_d = signal.cont2discrete((num_c, den_c), Ts, method=method)
        num_d, den_d = sys_d[0], sys_d[1]

        # Frequency response
        w_d, H_d = signal.freqz(num_d.flatten(), den_d, worN=w*Ts)
        w_d = w_d / Ts  # Convert to rad/s

        ax1.semilogx(w_d, 20*np.log10(np.abs(H_d)), '--', color=color,
                     linewidth=2, label=name)
        ax2.semilogx(w_d, np.angle(H_d)*180/np.pi, '--', color=color,
                     linewidth=2, label=name)

    ax1.set_ylabel('Magnitude (dB)')
    ax1.set_title(f'Frequency Response Comparison (Ts = {Ts}s)')
    ax1.legend()
    ax1.grid(True, alpha=0.3)
    ax1.set_xlim([w[0], w[-1]])

    ax2.set_xlabel('Frequency (rad/s)')
    ax2.set_ylabel('Phase (degrees)')
    ax2.legend()
    ax2.grid(True, alpha=0.3)
    ax2.set_xlim([w[0], w[-1]])

    plt.tight_layout()
    plt.savefig('tustin_comparison.png', dpi=150, bbox_inches='tight')
    print("Saved comparison plot to tustin_comparison.png")

def demonstrate_frequency_warping():
    """Demonstrate frequency warping effect."""
    Ts = 0.1

    # True frequencies
    w_true = np.linspace(0, 10/Ts, 1000)

    # Warped frequencies
    w_warped = (2/Ts) * np.tan(w_true * Ts / 2)

    plt.figure(figsize=(10, 6))
    plt.plot(w_true, w_warped, 'b-', linewidth=2, label='Warped')
    plt.plot(w_true, w_true, 'r--', linewidth=2, label='Ideal (no warping)')

    # Nyquist frequency
    plt.axvline(np.pi/Ts, color='green', linestyle=':', linewidth=2,
                label=f'Nyquist (π/Ts = {np.pi/Ts:.2f} rad/s)')

    plt.xlabel('Digital Frequency ω (rad/s)')
    plt.ylabel('Analog Frequency ω_analog (rad/s)')
    plt.title(f'Frequency Warping in Tustin Transform (Ts = {Ts}s)')
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.xlim([0, 2*np.pi/Ts])
    plt.ylim([0, 100])

    plt.savefig('tustin_warping.png', dpi=150, bbox_inches='tight')
    print("Saved warping plot to tustin_warping.png")

def prewarp_example():
    """Demonstrate frequency prewarping for a notch filter."""
    # Notch filter at 10 Hz
    w0 = 2 * np.pi * 10  # 10 Hz
    Q = 5  # Quality factor

    # Continuous notch filter
    num_c = [1, 0, w0**2]
    den_c = [1, w0/Q, w0**2]

    Ts = 0.01  # 100 Hz sampling

    # Standard Tustin
    sys_d_standard = signal.cont2discrete((num_c, den_c), Ts, method='bilinear')

    # Tustin with prewarping at notch frequency
    sys_d_prewarp = signal.cont2discrete((num_c, den_c), Ts, method='bilinear',
                                         alpha=w0/(2/Ts))

    # Frequency response
    w = np.logspace(0, 3, 1000)

    sys_c = signal.TransferFunction(num_c, den_c)
    w_c, H_c = signal.freqs(num_c, den_c, worN=w)

    w_d1, H_d1 = signal.freqz(sys_d_standard[0].flatten(),
                               sys_d_standard[1], worN=w*Ts)
    w_d2, H_d2 = signal.freqz(sys_d_prewarp[0].flatten(),
                               sys_d_prewarp[1], worN=w*Ts)

    w_d1 = w_d1 / Ts
    w_d2 = w_d2 / Ts

    plt.figure(figsize=(10, 6))
    plt.semilogx(w_c, 20*np.log10(np.abs(H_c)), 'k-', linewidth=3,
                 label='Continuous', alpha=0.7)
    plt.semilogx(w_d1, 20*np.log10(np.abs(H_d1)), 'b--', linewidth=2,
                 label='Tustin (standard)')
    plt.semilogx(w_d2, 20*np.log10(np.abs(H_d2)), 'r--', linewidth=2,
                 label='Tustin (prewarped)')

    plt.axvline(w0, color='green', linestyle=':', linewidth=2,
                label=f'Notch frequency ({w0/(2*np.pi):.1f} Hz)')

    plt.xlabel('Frequency (rad/s)')
    plt.ylabel('Magnitude (dB)')
    plt.title('Notch Filter: Effect of Frequency Prewarping')
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.ylim([-60, 5])

    plt.savefig('tustin_prewarp_notch.png', dpi=150, bbox_inches='tight')
    print("Saved prewarping example to tustin_prewarp_notch.png")

if __name__ == "__main__":
    compare_discretization_methods()
    demonstrate_frequency_warping()
    prewarp_example()
```

## Advantages

1. **Stability preservation**: Stable continuous systems remain stable
2. **Frequency domain accuracy**: Good match across wide frequency range
3. **No aliasing**: Maps entire s-plane to z-plane without folding
4. **Well-established**: Widely used and understood

## Disadvantages

1. **Frequency warping**: High frequencies compressed (use prewarping if critical)
2. **State preservation**: States not preserved in state-space conversion
3. **Algebraic complexity**: More complex than forward/backward Euler
4. **Sampling rate dependent**: Warping effect increases with larger $T_s$

## Comparison with Other Methods

| Method                | Stability     | Frequency Match              | Complexity | Best For                 |
| --------------------- | ------------- | ---------------------------- | ---------- | ------------------------ |
| **Tustin**            | Preserved     | Excellent                    | Moderate   | General purpose, filters |
| **ZOH**               | Preserved     | Good (time domain)           | Low        | Step responses, control  |
| **Forward Euler**     | Not preserved | Poor                         | Low        | Simulation only          |
| **Backward Euler**    | Preserved     | Poor at high freq            | Low        | Stiff systems            |
| **Matched pole-zero** | Preserved     | Excellent at specific points | High       | Specific applications    |

---

## References

- [Discrete-Time Signal Processing - Oppenheim & Schafer (3rd Edition)](https://www.pearson.com/en-us/subject-catalog/p/discrete-time-signal-processing/P200000003283)
- [Digital Control System Analysis and Design - Phillips & Nagle](https://www.pearson.com/en-us/subject-catalog/p/digital-control-system-analysis-and-design/P200000003283)
- [Bilinear Transform - MathWorks Documentation](https://www.mathworks.com/help/signal/ref/bilinear.html)
- [Tustin's Method - Control Tutorials for MATLAB](https://ctms.engin.umich.edu/CTMS/index.php?example=Introduction&section=ControlDigital)
