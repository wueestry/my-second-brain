---
{"publish":true,"title":"Settling Time","created":"2024-08-09T00:00:00.000Z","modified":"2025-11-03T20:43:24.494+01:00","tags":["engineering/control-theory/step-response/settling-time"],"cssclasses":"center-images"}
---


# SETTLING TIME

---

The **settling time** ($T_s$) is the time elapsed from the application of a step input to the time at which the system output has entered and remained within a specified error band (typically ±2% or ±5% of the final value).

![[meta/assets/settling-time.png|500]]

The settling time includes [[Propagation Delay]], plus the time required for the output to settle within acceptable bounds of the final value.

## Definition

For a step response $y(t)$ with final value $y_{ss}$, the settling time is:

$$T_s = \min\{t : |y(\tau) - y_{ss}| \leq \epsilon \cdot y_{ss}, \, \forall \tau \geq t\}$$

Where $\epsilon$ is the tolerance band (0.02 for 2%, 0.05 for 5%).

## Tolerance Bands

| Tolerance | Typical Use          | Description                                    |
| --------- | -------------------- | ---------------------------------------------- |
| **±2%**   | Precision systems    | Stricter requirement, longer settling time     |
| **±5%**   | General applications | More relaxed, commonly used in control systems |
| **±1%**   | High-precision       | Very demanding, rare in practice               |

## Settling Time for Common Systems

### First-Order System

Transfer function: $G(s) = \frac{K}{\tau s + 1}$

**Settling time:**
$$T_s \approx 3\tau \quad (\text{5\% band})$$
$$T_s \approx 4\tau \quad (\text{2\% band})$$

**Derivation:**
Step response: $y(t) = K(1 - e^{-t/\tau})$

For 5% band: $e^{-T_s/\tau} = 0.05 \Rightarrow T_s = -\tau \ln(0.05) \approx 3\tau$

### Second-Order System

Transfer function: $G(s) = \frac{\omega_n^2}{s^2 + 2\zeta\omega_n s + \omega_n^2}$

**Settling time (2% band):**
$$T_s \approx \frac{4}{\zeta \omega_n} \quad (\text{for } \zeta < 0.7)$$

**Settling time (5% band):**
$$T_s \approx \frac{3}{\zeta \omega_n} \quad (\text{for } \zeta < 0.7)$$

Where:

- $\zeta$: Damping ratio
- $\omega_n$: Natural frequency
- $\zeta \omega_n$: Time constant of envelope decay

**Effect of damping ratio:**

- $\zeta < 0.7$ (underdamped): Oscillatory, settling time increases with more oscillations
- $\zeta = 0.7$ (critical damping): Near-optimal settling time
- $\zeta > 0.7$ (overdamped): No overshoot but slower to settle

### Higher-Order Systems

For systems with dominant poles (poles closest to imaginary axis):

$$T_s \approx \frac{4}{|\text{Re}(\text{dominant pole})|} \quad (\text{2\% band})$$

## Factors Affecting Settling Time

### 1. System Poles

- **Location**: Poles further left in s-plane → faster settling
- **Real part**: $T_s \propto 1/|\text{Re}(s)|$
- **Complex poles**: Oscillations extend settling time

### 2. Damping Ratio

- Low damping ($\zeta < 0.4$): Long settling due to oscillations
- Optimal damping ($\zeta \approx 0.7$): Fastest settling without overshoot
- High damping ($\zeta > 1$): Slow settling, no oscillations

### 3. Zeros

- **Left half-plane zeros**: Can improve settling time
- **Right half-plane zeros (non-minimum phase)**: Increase settling time with undershoot

### 4. Controller Design

- **PID tuning**: Trade-off between rise time and settling time
- **Aggressive tuning**: Fast rise but long settling (oscillations)
- **Conservative tuning**: Slower rise but quicker settling

## Python Implementation

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import signal

def calculate_settling_time(t: np.ndarray, y: np.ndarray,
                           tolerance: float = 0.02) -> float:
    """
    Calculate settling time for step response.

    Args:
        t: Time array
        y: Response array
        tolerance: Settling band (0.02 for 2%, 0.05 for 5%)

    Returns:
        Settling time in same units as t
    """
    # Final value (average of last 10% of response)
    final_idx = int(0.9 * len(y))
    y_final = np.mean(y[final_idx:])

    # Error band
    upper_bound = y_final * (1 + tolerance)
    lower_bound = y_final * (1 - tolerance)

    # Find last time outside bounds
    outside_bounds = (y > upper_bound) | (y < lower_bound)

    if not np.any(outside_bounds):
        return 0.0  # Already settled

    last_outside_idx = np.where(outside_bounds)[0][-1]

    if last_outside_idx == len(t) - 1:
        return np.nan  # Not settled within time window

    return t[last_outside_idx + 1]

def compare_settling_times():
    """Compare settling times for different damping ratios."""
    t = np.linspace(0, 20, 1000)
    wn = 1.0  # Natural frequency

    damping_ratios = [0.3, 0.5, 0.7, 1.0, 1.5]

    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(12, 10))

    results = []

    for zeta in damping_ratios:
        # Create second-order system
        num = [wn**2]
        den = [1, 2*zeta*wn, wn**2]
        sys = signal.TransferFunction(num, den)

        # Step response
        t_resp, y_resp = signal.step(sys, T=t)

        # Calculate settling times
        ts_2 = calculate_settling_time(t_resp, y_resp, tolerance=0.02)
        ts_5 = calculate_settling_time(t_resp, y_resp, tolerance=0.05)

        # Theoretical settling time (2%)
        if zeta > 0:
            ts_theoretical = 4 / (zeta * wn)
        else:
            ts_theoretical = np.inf

        results.append({
            'zeta': zeta,
            'ts_2%': ts_2,
            'ts_5%': ts_5,
            'theoretical': ts_theoretical
        })

        # Plot response
        ax1.plot(t_resp, y_resp, label=f'ζ = {zeta}', linewidth=2)

        # Plot settling time markers
        if not np.isnan(ts_2):
            ax1.axvline(ts_2, color='gray', linestyle='--', alpha=0.3)

    # Plot settling bands
    ax1.axhline(1.02, color='red', linestyle=':', alpha=0.5, label='±2% band')
    ax1.axhline(0.98, color='red', linestyle=':', alpha=0.5)
    ax1.axhline(1.05, color='orange', linestyle=':', alpha=0.5, label='±5% band')
    ax1.axhline(0.95, color='orange', linestyle=':', alpha=0.5)

    ax1.set_xlabel('Time (s)')
    ax1.set_ylabel('Response')
    ax1.set_title('Step Response for Different Damping Ratios (ωₙ = 1.0 rad/s)')
    ax1.legend()
    ax1.grid(True, alpha=0.3)
    ax1.set_xlim([0, 20])
    ax1.set_ylim([0, 1.8])

    # Plot settling time vs damping ratio
    zetas = [r['zeta'] for r in results]
    ts_2_values = [r['ts_2%'] for r in results]
    ts_5_values = [r['ts_5%'] for r in results]
    ts_theory = [r['theoretical'] for r in results]

    ax2.plot(zetas, ts_2_values, 'o-', linewidth=2, markersize=8, label='Measured (2%)')
    ax2.plot(zetas, ts_5_values, 's-', linewidth=2, markersize=8, label='Measured (5%)')
    ax2.plot(zetas, ts_theory, '--', linewidth=2, label='Theoretical (4/ζωₙ)')

    ax2.set_xlabel('Damping Ratio (ζ)')
    ax2.set_ylabel('Settling Time (s)')
    ax2.set_title('Settling Time vs Damping Ratio')
    ax2.legend()
    ax2.grid(True, alpha=0.3)
    ax2.set_xlim([0.2, 1.6])
    ax2.set_ylim([0, 25])

    plt.tight_layout()
    plt.savefig('settling_time_comparison.png', dpi=150, bbox_inches='tight')
    print("Saved plot to settling_time_comparison.png")

    # Print results table
    print("\n=== Settling Time Results ===")
    print(f"{'ζ':>6} {'Ts(2%)':>10} {'Ts(5%)':>10} {'Theory':>10}")
    print("-" * 40)
    for r in results:
        print(f"{r['zeta']:>6.1f} {r['ts_2%']:>10.2f} {r['ts_5%']:>10.2f} {r['theoretical']:>10.2f}")

if __name__ == "__main__":
    compare_settling_times()
```

## Practical Implications

### Controller Design

- **PID tuning**: Balance between fast response and acceptable settling
- **Overshoot vs settling**: Aggressive control → overshoot → longer settling
- **Derivative action**: Can reduce settling time by damping oscillations

### Performance Specifications

- **Servo systems**: Tight settling time requirements (< 0.5s)
- **Process control**: More relaxed (several seconds acceptable)
- **High-frequency systems**: Fast settling critical (< 10ms)

### Trade-offs

- **Settling time vs rise time**: Often inversely related
- **Settling time vs overshoot**: Reducing overshoot may increase settling time
- **Settling time vs robustness**: Aggressive tuning sacrifices robustness

## Related Metrics

- **[[rise-time]]**: Time to reach final value (90% or 100%)
- **[[overshoot]]**: Peak deviation beyond final value
- **[[Propagation Delay]]**: Initial delay before response begins
- **[[steady-state-error]]**: Final error after settling

---

## References

- [Control Systems Engineering - Norman Nise (7th Edition)](https://www.wiley.com/en-us/Control+Systems+Engineering%2C+7th+Edition-p-9781118170519)
- [Settling Time - Control Tutorials for MATLAB](https://ctms.engin.umich.edu/CTMS/index.php?example=Introduction&section=ControlStateSpace)
- [Step Response Characteristics - MathWorks](https://www.mathworks.com/help/control/ref/stepinfo.html)
- [Time Response Analysis - Electronics Tutorials](https://www.electronics-tutorials.ws/systems/time-response.html)
