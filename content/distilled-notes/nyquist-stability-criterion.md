---
{"publish":true,"title":"Nyquist Stability Criterion","created":"2024-08-08T00:00:00.000Z","modified":"2025-11-03T20:43:36.596+01:00","tags":["engineering/control-theory/stability/nyquist-criterion"],"cssclasses":"center-images"}
---


# NYQUIST STABILITY CRITERION

---

Criterion to get the number of poles and zeros in the right half-plane based on the encirclements of -1 of a Nyquist contour.

## Nyquist Contour

To construct a Nyquist contour that encompasses the right-half of the complex plane, we first construct:

- A path traveling up the $j\omega$ axis from $0 - j\infty$ to $0 + j\infty$
- A semi-circular arc with radius $r \rightarrow \infty$, that starts at $0 + j\infty$ and travels clock-wise to $0 - j\infty$

The Nyquist contour creates a plot of $1 + G(s)$ in the complex plane. Using [[distilled-notes/cauchys-argument-principle\|Cauchy's Argument Principle]], the number of clockwise encirclements of the origin must be the number of zeros of $1+G(s)$ in the right-half complex plane.
By counting the number of encirclements of $-1$, we find the difference between the number of poles and zeros in the right-half complex plane.

- By mapping $G(s)$ instead of $1 + G(s)$ we receive the [[distilled-notes/nyquist-plot\|Nyquist plot]]
- The zeros of $1+G(s)$ are the poles of the closed-loop system, while poles of $1+G(s)$ are the same as $G(s)$

## Theorem

> [!theorem] Nyquist Stability Criterion
> Given a Nyquist contour $\Gamma_s$, let $P$ be the number of poles of $G(s)$ encircled by $\Gamma_s$, and $Z$ be the number of zeros of $1+G(s)$ encircled by $\Gamma_s$.
> Alternatively, and more importantly, if $Z$ is the number of poles of the closed loop system in the right half plane, and $P$ is the number of poles of the open-loop transfer function $G(s)$ in the right half plane, the resultant contour in the $G(s)$-plane, $\Gamma_{G(s)}$ shall encircle (clockwise) the point $(-1 + j0)$ $N$ times such that $N=Z-P$

## Stability Conditions

For a closed-loop system to be stable:

1. **$Z = 0$**: No closed-loop poles in the right half-plane
2. **$N = -P$**: Number of counter-clockwise encirclements equals number of open-loop unstable poles
3. If $P = 0$ (open-loop stable), then $N = 0$ (no encirclements of $-1$)

## Step-by-Step Application

1. **Identify open-loop poles**: Count poles of $G(s)$ in RHP → $P$
2. **Draw Nyquist plot**: Plot $G(j\omega)$ for $\omega: 0 \rightarrow \infty$
3. **Count encirclements**: Count clockwise encirclements of $(-1, 0)$ → $N$
4. **Calculate closed-loop poles**: $Z = N + P$
5. **Determine stability**: Stable if $Z = 0$

## Practical Interpretation

### Stable System

- If $P = 0$ (open-loop stable): Nyquist plot should NOT encircle $(-1, 0)$
- Plot stays away from critical point $(-1, 0)$

### Unstable System

- Nyquist plot encircles $(-1, 0)$ when $P = 0$
- Or: Wrong number of encirclements when $P > 0$

### Gain and Phase Margins

The distance from the Nyquist plot to $(-1, 0)$ indicates robustness:

**Gain Margin (GM)**: How much gain can increase before instability
$$GM = \frac{1}{|G(j\omega_{180})|} \quad \text{where} \quad \angle G(j\omega_{180}) = -180°$$

**Phase Margin (PM)**: How much phase lag can be tolerated
$$PM = 180° + \angle G(j\omega_c) \quad \text{where} \quad |G(j\omega_c)| = 1$$

## Examples

### Example 1: First-Order System

$$G(s) = \frac{K}{s+1}$$

- **Open-loop poles**: $s = -1$ (LHP) → $P = 0$
- **Nyquist plot**: Starts at $K$, ends at origin, stays in left half-plane
- **Encirclements**: $N = 0$
- **Closed-loop stability**: $Z = N + P = 0$ → **Stable for all $K > 0$**

### Example 2: System with Integrator

$$G(s) = \frac{K}{s(s+1)}$$

- **Open-loop poles**: $s = 0, -1$ (one at origin) → $P = 0$
- **Nyquist plot**: Starts at $-j\infty$, crosses real axis, ends at origin
- **Critical gain**: System becomes unstable when plot passes through $(-1, 0)$
- **Stability**: Stable for $0 < K < 1$

### Example 3: Unstable Open-Loop System

$$G(s) = \frac{K}{(s-1)(s+2)}$$

- **Open-loop poles**: $s = 1$ (RHP) → $P = 1$
- **For stability**: Need $N = -1$ (one counter-clockwise encirclement)
- **Nyquist plot must encircle** $(-1, 0)$ once counter-clockwise

## Python Implementation

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import signal

class NyquistStabilityCriterion:
    """Analyze stability using Nyquist criterion"""

    @staticmethod
    def count_rhp_poles(den):
        """
        Count right half-plane poles

        Args:
            den: Denominator coefficients

        Returns:
            Number of poles in RHP
        """
        roots = np.roots(den)
        return np.sum(np.real(roots) > 0)

    @staticmethod
    def count_encirclements(real, imag, point=(-1, 0)):
        """
        Count clockwise encirclements of a point

        Args:
            real: Real part of contour
            imag: Imaginary part of contour
            point: Point to check encirclement (default: -1+0j)

        Returns:
            Number of clockwise encirclements (negative = counter-clockwise)
        """
        # Translate contour so point is at origin
        x = real - point[0]
        y = imag - point[1]

        # Calculate cumulative angle change
        angles = np.arctan2(y, x)

        # Unwrap angles to handle 2π discontinuities
        angles_unwrapped = np.unwrap(angles)

        # Total angle change divided by 2π gives encirclements
        # Positive = clockwise, negative = counter-clockwise
        total_angle = angles_unwrapped[-1] - angles_unwrapped[0]
        encirclements = -int(np.round(total_angle / (2 * np.pi)))

        return encirclements

    @staticmethod
    def analyze_stability(num, den, omega=None):
        """
        Perform complete Nyquist stability analysis

        Args:
            num: Numerator coefficients
            den: Denominator coefficients
            omega: Frequency range (rad/s)

        Returns:
            Dictionary with stability analysis results
        """
        # Count open-loop RHP poles
        P = NyquistStabilityCriterion.count_rhp_poles(den)

        # Generate frequency response
        if omega is None:
            omega = np.logspace(-3, 3, 2000)

        w, h = signal.freqs(num, den, omega)
        real = np.real(h)
        imag = np.imag(h)

        # Count encirclements of (-1, 0)
        N = NyquistStabilityCriterion.count_encirclements(real, imag, (-1, 0))

        # Calculate closed-loop RHP poles
        Z = N + P

        # Determine stability
        stable = (Z == 0)

        # Calculate margins
        magnitude = np.abs(h)
        phase = np.angle(h)

        # Gain margin
        phase_180_idx = np.argmin(np.abs(phase + np.pi))
        gain_crossover_freq = w[phase_180_idx]
        gain_margin_linear = 1.0 / magnitude[phase_180_idx]
        gain_margin_db = 20 * np.log10(gain_margin_linear)

        # Phase margin
        unity_gain_idx = np.argmin(np.abs(magnitude - 1))
        phase_crossover_freq = w[unity_gain_idx]
        phase_margin = 180 + np.degrees(phase[unity_gain_idx])

        return {
            'P': P,
            'N': N,
            'Z': Z,
            'stable': stable,
            'gain_margin_db': gain_margin_db,
            'gain_crossover_freq': gain_crossover_freq,
            'phase_margin_deg': phase_margin,
            'phase_crossover_freq': phase_crossover_freq
        }

    @staticmethod
    def plot_with_analysis(num, den, title="Nyquist Stability Analysis"):
        """Plot Nyquist diagram with stability analysis"""
        omega = np.logspace(-3, 3, 2000)
        w, h = signal.freqs(num, den, omega)

        real = np.real(h)
        imag = np.imag(h)

        # Perform analysis
        analysis = NyquistStabilityCriterion.analyze_stability(num, den, omega)

        # Create plot
        fig, ax = plt.subplots(figsize=(10, 10))

        # Plot Nyquist curve
        ax.plot(real, imag, 'b-', linewidth=2, label='Nyquist plot')
        ax.plot(real, -imag, 'b--', linewidth=1, alpha=0.5)

        # Mark critical point
        ax.plot(-1, 0, 'rx', markersize=15, markeredgewidth=3, label='Critical point (-1, 0)')
        ax.plot(0, 0, 'k+', markersize=15, markeredgewidth=2)

        # Add unit circle
        theta = np.linspace(0, 2*np.pi, 100)
        ax.plot(np.cos(theta), np.sin(theta), 'k:', alpha=0.3)

        # Formatting
        ax.axhline(y=0, color='k', linewidth=0.5)
        ax.axvline(x=0, color='k', linewidth=0.5)
        ax.grid(True, alpha=0.3)
        ax.set_xlabel('Real Part', fontsize=12)
        ax.set_ylabel('Imaginary Part', fontsize=12)
        ax.axis('equal')

        # Add analysis text
        stability_text = f"""Stability Analysis:
P (RHP poles): {analysis['P']}
N (encirclements): {analysis['N']}
Z (closed-loop RHP poles): {analysis['Z']}
Status: {'STABLE' if analysis['stable'] else 'UNSTABLE'}

Gain Margin: {analysis['gain_margin_db']:.2f} dB
Phase Margin: {analysis['phase_margin_deg']:.2f}°"""

        ax.text(0.02, 0.98, stability_text,
               transform=ax.transAxes,
               fontsize=10,
               verticalalignment='top',
               bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.8))

        ax.set_title(title, fontsize=14)
        ax.legend(fontsize=10)

        plt.tight_layout()
        plt.show()

        return analysis

# Examples
def example_stable_system():
    """Example: Stable first-order system"""
    K = 2
    num = [K]
    den = [1, 1]  # G(s) = K/(s+1)

    print("Example 1: First-Order System G(s) = 2/(s+1)")
    analysis = NyquistStabilityCriterion.plot_with_analysis(
        num, den, "Stable System: $G(s) = \\frac{2}{s+1}$")

    print(f"Open-loop RHP poles (P): {analysis['P']}")
    print(f"Encirclements (N): {analysis['N']}")
    print(f"Closed-loop RHP poles (Z): {analysis['Z']}")
    print(f"Stable: {analysis['stable']}\n")

def example_marginally_stable():
    """Example: System at stability boundary"""
    K = 8
    num = [K]
    den = [1, 2, 10]  # G(s) = K/(s²+2s+10)

    print("Example 2: System near stability limit")
    analysis = NyquistStabilityCriterion.plot_with_analysis(
        num, den, "Near Stability Boundary")

    print(f"Gain Margin: {analysis['gain_margin_db']:.2f} dB")
    print(f"Phase Margin: {analysis['phase_margin_deg']:.2f}°\n")

def example_unstable_openloop():
    """Example: Unstable open-loop system"""
    K = 3
    num = [K]
    den = [1, -1, -2]  # G(s) = K/((s-1)(s+2))

    print("Example 3: Unstable open-loop system")
    analysis = NyquistStabilityCriterion.plot_with_analysis(
        num, den, "Unstable Open-Loop: $G(s) = \\frac{3}{(s-1)(s+2)}$")

    print(f"Open-loop RHP poles (P): {analysis['P']}")
    print(f"Encirclements (N): {analysis['N']}")
    print(f"For stability, need N = -P = {-analysis['P']}")
    print(f"Actual N = {analysis['N']}")
    print(f"Stable: {analysis['stable']}\n")

if __name__ == "__main__":
    example_stable_system()
    example_marginally_stable()
    example_unstable_openloop()
```

## Applications

- **Control system design**: Verify stability of feedback systems
- **Robustness analysis**: Assess sensitivity to parameter variations
- **Gain scheduling**: Determine stable operating ranges
- **Compensator design**: Design controllers to achieve desired margins
- **Multi-loop systems**: Analyze complex feedback structures

## Advantages and Limitations

### Advantages

- Works for systems with RHP poles (unlike Routh-Hurwitz)
- Provides gain and phase margin information
- Visual representation aids intuition
- Can handle time delays
- Applicable to MIMO systems (generalized Nyquist)

### Limitations

- Requires frequency response data
- Can be complex to interpret for high-order systems
- Doesn't provide pole locations directly
- May require special handling for poles on imaginary axis

---

## References

- [Nyquist Stability Criterion - Control Tutorials for MATLAB](https://ctms.engin.umich.edu/CTMS/index.php?example=Introduction&section=ControlFrequency)
- [Feedback Control of Dynamic Systems - Franklin, Powell & Emami-Naeini](https://www.pearson.com/)
- [Modern Control Engineering - Ogata](https://www.pearson.com/)
- [Automatic Control Systems - Golnaraghi & Kuo](https://www.wiley.com/)
