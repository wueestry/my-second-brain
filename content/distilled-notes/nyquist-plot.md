---
{"publish":true,"title":"Nyquist Plot","created":"2024-08-08T00:00:00.000Z","modified":"2025-11-03T20:43:36.600+01:00","tags":["engineering/control-theory/frequency-response/nyquist-plot"],"cssclasses":"center-images"}
---


# NYQUIST PLOT

---

A **Nyquist plot** is a parametric plot of a frequency response most commonly used for assessing the stability of a system.

![[meta/assets/nyquist-plot.png|500]]

## Construction

Each point on the Nyquist plot reflects the complex value of the transfer function at that frequency, by plotting the real part of the transfer function on the $X$-axis, while the $Y$-axis displays the imaginary part of the transfer function.

### Steps to Create Nyquist Plot

1. **Evaluate transfer function**: Compute $G(j\omega)$ for $\omega = 0$ to $\omega = \infty$
2. **Extract real and imaginary parts**: $G(j\omega) = \text{Re}(G) + j\cdot\text{Im}(G)$
3. **Plot parametric curve**: Plot $(\text{Re}(G), \text{Im}(G))$ as $\omega$ varies
4. **Complete the contour**: Mirror the plot for negative frequencies (symmetric about real axis)

### Key Features

- **Low frequencies** ($\omega \rightarrow 0$): Starting point of the plot
- **High frequencies** ($\omega \rightarrow \infty$): Ending point (often at origin)
- **Critical point** $(-1, 0)$: Used for stability analysis via [[distilled-notes/nyquist-stability-criterion]]
- **Arrows**: Indicate direction of increasing frequency

## Interpretation

### Gain and Phase

At any point on the Nyquist plot:

- **Distance from origin**: Magnitude $|G(j\omega)|$ at frequency $\omega$
- **Angle from positive real axis**: Phase $\angle G(j\omega)$ at frequency $\omega$

### Stability Analysis

The [[distilled-notes/nyquist-stability-criterion]] uses the Nyquist plot to determine closed-loop stability:

- Count encirclements of the critical point $(-1, 0)$
- Relates open-loop frequency response to closed-loop stability
- Can handle systems with poles in the right half-plane

## Common Transfer Functions

### First-Order System

$$G(s) = \frac{K}{\tau s + 1}$$

Nyquist plot: Semi-circle in left half-plane starting at $K$ (real axis) and ending at origin.

### Second-Order System

$$G(s) = \frac{\omega_n^2}{s^2 + 2\zeta\omega_n s + \omega_n^2}$$

Nyquist plot: More complex curve, shape depends on damping ratio $\zeta$.

### Integrator

$$G(s) = \frac{K}{s}$$

Nyquist plot: Vertical line along negative imaginary axis (starts at $-j\infty$ for $\omega \rightarrow 0^+$).

## Python Implementation

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import signal
import control as ct

class NyquistPlotter:
    """Create and analyze Nyquist plots"""

    @staticmethod
    def plot_nyquist(num, den, omega=None, title="Nyquist Plot"):
        """
        Plot Nyquist diagram for a transfer function

        Args:
            num: Numerator coefficients
            den: Denominator coefficients
            omega: Frequency range (rad/s), auto-generated if None
            title: Plot title
        """
        # Create transfer function
        sys = signal.TransferFunction(num, den)

        # Generate frequency range if not provided
        if omega is None:
            omega = np.logspace(-2, 2, 1000)

        # Compute frequency response
        w, h = signal.freqs(num, den, omega)

        # Extract real and imaginary parts
        real = np.real(h)
        imag = np.imag(h)

        # Create plot
        fig, ax = plt.subplots(figsize=(10, 10))

        # Plot Nyquist curve for positive frequencies
        ax.plot(real, imag, 'b-', linewidth=2, label='$\omega > 0$')

        # Plot mirror for negative frequencies
        ax.plot(real, -imag, 'r--', linewidth=1, alpha=0.5, label='$\omega < 0$')

        # Mark special points
        ax.plot(real[0], imag[0], 'go', markersize=10, label=f'$\omega$ = {w[0]:.2f}')
        ax.plot(real[-1], imag[-1], 'ro', markersize=10, label=f'$\omega$ = {w[-1]:.2f}')

        # Mark critical point (-1, 0)
        ax.plot(-1, 0, 'kx', markersize=15, markeredgewidth=3, label='Critical point')
        ax.plot(0, 0, 'k+', markersize=15, markeredgewidth=2)

        # Add unit circle for reference
        theta = np.linspace(0, 2*np.pi, 100)
        ax.plot(np.cos(theta), np.sin(theta), 'k:', alpha=0.3, linewidth=1)

        # Formatting
        ax.axhline(y=0, color='k', linewidth=0.5)
        ax.axvline(x=0, color='k', linewidth=0.5)
        ax.grid(True, alpha=0.3)
        ax.set_xlabel('Real Part', fontsize=12)
        ax.set_ylabel('Imaginary Part', fontsize=12)
        ax.set_title(title, fontsize=14)
        ax.legend(fontsize=10)
        ax.axis('equal')

        # Add arrows to show direction
        n_arrows = 5
        arrow_indices = np.linspace(0, len(real)-1, n_arrows, dtype=int)[:-1]
        for i in arrow_indices:
            dx = real[i+1] - real[i]
            dy = imag[i+1] - imag[i]
            ax.arrow(real[i], imag[i], dx*0.3, dy*0.3,
                    head_width=0.1, head_length=0.1, fc='blue', ec='blue')

        plt.tight_layout()
        plt.show()

    @staticmethod
    def analyze_stability(num, den, omega=None):
        """
        Analyze stability using Nyquist criterion

        Args:
            num: Numerator coefficients
            den: Denominator coefficients
            omega: Frequency range

        Returns:
            Dictionary with stability information
        """
        if omega is None:
            omega = np.logspace(-3, 3, 2000)

        # Compute frequency response
        w, h = signal.freqs(num, den, omega)

        # Calculate distance to critical point
        distance = np.abs(h + 1)
        min_distance = np.min(distance)
        min_freq_idx = np.argmin(distance)
        min_freq = w[min_freq_idx]

        # Gain and phase margins (approximation)
        magnitude = np.abs(h)
        phase = np.angle(h)

        # Phase margin: phase when |G| = 1
        crossover_idx = np.argmin(np.abs(magnitude - 1))
        phase_margin = 180 + np.degrees(phase[crossover_idx])

        # Gain margin: 1/|G| when phase = -180°
        phase_180_idx = np.argmin(np.abs(phase + np.pi))
        gain_margin = 1.0 / magnitude[phase_180_idx]
        gain_margin_db = 20 * np.log10(gain_margin)

        return {
            'min_distance_to_critical': min_distance,
            'frequency_at_min_distance': min_freq,
            'phase_margin_deg': phase_margin,
            'gain_margin_db': gain_margin_db,
            'stable': gain_margin_db > 0 and phase_margin > 0
        }

# Example systems
def demo_first_order():
    """First-order system Nyquist plot"""
    K = 5
    tau = 1
    num = [K]
    den = [tau, 1]

    NyquistPlotter.plot_nyquist(num, den, title="First-Order System: $G(s) = \\frac{5}{s+1}$")

    stability = NyquistPlotter.analyze_stability(num, den)
    print("First-Order System Stability Analysis:")
    print(f"  Minimum distance to (-1,0): {stability['min_distance_to_critical']:.3f}")
    print(f"  Phase margin: {stability['phase_margin_deg']:.2f}°")
    print(f"  Gain margin: {stability['gain_margin_db']:.2f} dB")
    print(f"  Stable: {stability['stable']}")

def demo_second_order():
    """Second-order system Nyquist plot"""
    wn = 1.0
    zeta = 0.3
    num = [wn**2]
    den = [1, 2*zeta*wn, wn**2]

    NyquistPlotter.plot_nyquist(num, den,
                                title=f"Second-Order System: $\\omega_n={wn}$, $\\zeta={zeta}$")

    stability = NyquistPlotter.analyze_stability(num, den)
    print("\nSecond-Order System Stability Analysis:")
    print(f"  Minimum distance to (-1,0): {stability['min_distance_to_critical']:.3f}")
    print(f"  Phase margin: {stability['phase_margin_deg']:.2f}°")
    print(f"  Gain margin: {stability['gain_margin_db']:.2f} dB")
    print(f"  Stable: {stability['stable']}")

def demo_marginally_stable():
    """System near stability boundary"""
    num = [10]
    den = [1, 2, 10]

    NyquistPlotter.plot_nyquist(num, den,
                                title="Near Stability Limit: $G(s) = \\frac{10}{s^2+2s+10}$")

    stability = NyquistPlotter.analyze_stability(num, den)
    print("\nMarginally Stable System Analysis:")
    print(f"  Minimum distance to (-1,0): {stability['min_distance_to_critical']:.3f}")
    print(f"  Phase margin: {stability['phase_margin_deg']:.2f}°")
    print(f"  Gain margin: {stability['gain_margin_db']:.2f} dB")
    print(f"  Stable: {stability['stable']}")

def demo_with_integrator():
    """System with integrator"""
    K = 2
    num = [K]
    den = [1, 1, 0]  # s(s+1)

    omega = np.logspace(-2, 2, 2000)
    NyquistPlotter.plot_nyquist(num, den, omega=omega,
                                title="System with Integrator: $G(s) = \\frac{2}{s(s+1)}$")

if __name__ == "__main__":
    demo_first_order()
    demo_second_order()
    demo_marginally_stable()
    demo_with_integrator()
```

## Advantages

- **Visual representation**: Easy to see frequency response at a glance
- **Stability assessment**: Encirclement of $(-1, 0)$ indicates instability
- **Gain/phase margins**: Can estimate from distance to critical point
- **Robustness**: Shows how close system is to instability
- **Handles complex systems**: Works for systems with RHP poles

## Comparison with Other Plots

| Plot Type      | Information                        | Advantages                     | Disadvantages               |
| -------------- | ---------------------------------- | ------------------------------ | --------------------------- |
| **Nyquist**    | Frequency response (complex plane) | Stability analysis, robustness | Can be complex to interpret |
| **Bode**       | Magnitude and phase vs frequency   | Clear frequency information    | Separate plots needed       |
| **Root Locus** | Pole locations vs parameter        | Shows pole movement            | Parameter-specific          |
| **Nichols**    | Magnitude vs phase                 | Closed-loop properties         | Less intuitive              |

## Applications

- **Control system design**: Assess stability and margins
- **Robustness analysis**: Determine sensitivity to parameter variations
- **Filter design**: Visualise frequency selectivity
- **Communication systems**: Analyze feedback loops
- **Power systems**: Study oscillatory behaviour

---

## References

- [Nyquist Stability Criterion - MIT OpenCourseWare](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/)
- [Frequency Response Methods - Åström & Murray](http://www.cds.caltech.edu/~murray/books/AM08/pdf/fbs-frequency_24Jul2020.pdf)
- [Control System Design - Dorf & Bishop](https://www.pearson.com/store/)
- [Python Control Systems Library](https://python-control.readthedocs.io/)
