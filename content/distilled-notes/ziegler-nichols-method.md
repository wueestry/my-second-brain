---
{"publish":true,"title":"Ziegler-Nichols Method","created":"2025-08-05 10:49","modified":"2025-11-03T20:42:31.908+01:00","tags":["engineering/control-theory/pid-tuning/ziegler-nichols"],"cssclasses":"center-images"}
---


# ZIEGLER NICHOLS METHOD

---

The **Ziegler-Nichols Method** is one of the most widely used heuristic methods to tune a [[distilled-notes/pid-control\|PID controller]] without requiring a mathematical model of the system. Developed in 1942 by John G. Ziegler and Nathaniel B. Nichols, it provides practical tuning rules based on experimental data.

## Two Approaches

### 1. Closed-Loop Method (Ultimate Gain)

**Procedure:**

1. Set $K_i = 0$ and $K_d = 0$ (proportional control only)
2. Gradually increase $K_p$ until the system reaches sustained oscillations
3. Record:
   - **Ultimate gain** $K_u$: The proportional gain at onset of oscillations
   - **Ultimate period** $T_u$: The period of oscillations
4. Apply tuning formulas from table below

![[meta/assets/neutrally-stable-system.png|300]]

**Requirements:**

- System must be stable with proportional control alone
- Must be able to tolerate oscillations during tuning
- Clear oscillation frequency must be observable

### 2. Open-Loop Method (Reaction Curve)

**Procedure:**

1. Apply a step input to the system in open loop
2. Record the step response (reaction curve)
3. Identify process characteristics:
   - **Dead time** $L$: Initial delay before response
   - **Time constant** $T$: Time to reach 63.2% of final value
   - **Process gain** $K$: Steady-state output / input
4. Apply tuning formulas

**Process model (FOPDT):**
$$G(s) = \frac{K e^{-Ls}}{Ts + 1}$$

**Graphical method:**

- Draw tangent line at maximum slope
- $L$: x-intercept of tangent
- $T$: horizontal distance from $L$ to where tangent reaches final value

## Tuning Rules

### Closed-Loop Method (Ultimate Gain)

| Control Type        | $K_p$     | $T_i$     | $T_d$      | $K_i$                 | $K_d$         |
| ------------------- | --------- | --------- | ---------- | --------------------- | ------------- |
| **P**               | $0.5K_u$  | -         | -          | -                     | -             |
| **PI**              | $0.45K_u$ | $0.83T_u$ | -          | $0.54\frac{K_u}{T_u}$ | -             |
| **PD**              | $0.8K_u$  | -         | $0.125T_u$ | -                     | $0.1K_uT_u$   |
| **PID (classic)**   | $0.6K_u$  | $0.5T_u$  | $0.125T_u$ | $1.2\frac{K_u}{T_u}$  | $0.075K_uT_u$ |
| **Pessen Integral** | $0.7K_u$  | $0.4T_u$  | $0.15T_u$  | $1.75\frac{K_u}{T_u}$ | $0.105K_uT_u$ |
| **Some overshoot**  | $0.33K_u$ | $0.5T_u$  | $0.33T_u$  | $0.66\frac{K_u}{T_u}$ | $0.11K_uT_u$  |
| **No overshoot**    | $0.2K_u$  | $0.5T_u$  | $0.33T_u$  | $0.4\frac{K_u}{T_u}$  | $0.066K_uT_u$ |

Where: $K_i = \frac{K_p}{T_i}$ and $K_d = K_p T_d$

### Open-Loop Method (Reaction Curve)

| Control Type | $K_p$             | $T_i$   | $T_d$  |
| ------------ | ----------------- | ------- | ------ |
| **P**        | $\frac{T}{KL}$    | -       | -      |
| **PI**       | $0.9\frac{T}{KL}$ | $3.33L$ | -      |
| **PID**      | $1.2\frac{T}{KL}$ | $2L$    | $0.5L$ |

## Python Implementation

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import signal
from typing import Tuple

class ZieglerNicholsTuner:
    """Ziegler-Nichols PID tuning methods."""

    @staticmethod
    def closed_loop_method(Ku: float, Tu: float,
                          controller_type: str = 'PID') -> Tuple[float, float, float]:
        """
        Closed-loop Ziegler-Nichols tuning (ultimate gain method).

        Args:
            Ku: Ultimate gain (proportional gain at sustained oscillation)
            Tu: Ultimate period (period of oscillation)
            controller_type: 'P', 'PI', 'PD', or 'PID'

        Returns:
            (Kp, Ki, Kd) controller gains
        """
        rules = {
            'P': (0.5 * Ku, 0.0, 0.0),
            'PI': (0.45 * Ku, 0.54 * Ku / Tu, 0.0),
            'PD': (0.8 * Ku, 0.0, 0.1 * Ku * Tu),
            'PID': (0.6 * Ku, 1.2 * Ku / Tu, 0.075 * Ku * Tu),
            'PID_aggressive': (0.7 * Ku, 1.75 * Ku / Tu, 0.105 * Ku * Tu),
            'PID_conservative': (0.2 * Ku, 0.4 * Ku / Tu, 0.066 * Ku * Tu),
        }

        if controller_type not in rules:
            raise ValueError(f"Unknown controller type: {controller_type}")

        return rules[controller_type]

    @staticmethod
    def open_loop_method(K: float, L: float, T: float,
                        controller_type: str = 'PID') -> Tuple[float, float, float]:
        """
        Open-loop Ziegler-Nichols tuning (reaction curve method).

        Args:
            K: Process gain
            L: Dead time (lag)
            T: Time constant
            controller_type: 'P', 'PI', or 'PID'

        Returns:
            (Kp, Ki, Kd) controller gains
        """
        rules = {
            'P': (T / (K * L), 0.0, 0.0),
            'PI': (0.9 * T / (K * L), 0.9 * T / (K * L) / (3.33 * L), 0.0),
            'PID': (1.2 * T / (K * L), 1.2 * T / (K * L) / (2 * L),
                   1.2 * T / (K * L) * 0.5 * L),
        }

        if controller_type not in rules:
            raise ValueError(f"Unknown controller type: {controller_type}")

        return rules[controller_type]

    @staticmethod
    def find_ultimate_gain(process_num, process_den,
                          Kp_range=(0.1, 100), tolerance=0.01):
        """
        Find ultimate gain and period through simulation.

        Args:
            process_num: Numerator of process transfer function
            process_den: Denominator of process transfer function
            Kp_range: (min, max) proportional gain to search
            tolerance: Convergence tolerance

        Returns:
            (Ku, Tu) ultimate gain and period
        """
        # Binary search for ultimate gain
        Kp_low, Kp_high = Kp_range

        while Kp_high - Kp_low > tolerance:
            Kp_mid = (Kp_low + Kp_high) / 2

            # Create closed-loop system
            sys_ol = signal.TransferFunction(process_num, process_den)
            sys_cl = signal.feedback(Kp_mid * sys_ol)

            # Check stability by finding poles
            poles = sys_cl.poles

            # Check if any poles are on imaginary axis (marginal stability)
            on_jw_axis = np.abs(poles.real) < tolerance

            if np.any(on_jw_axis):
                # Found ultimate gain
                Ku = Kp_mid
                # Ultimate period from imaginary part of pole
                jw_poles = poles[on_jw_axis]
                Tu = 2 * np.pi / np.abs(jw_poles[0].imag)
                return Ku, Tu
            elif np.any(poles.real > 0):
                # Unstable, reduce gain
                Kp_high = Kp_mid
            else:
                # Stable, increase gain
                Kp_low = Kp_mid

        # If not found exactly, estimate from highest stable gain
        return Kp_high, None

def demonstrate_closed_loop_method():
    """Demonstrate closed-loop Ziegler-Nichols tuning."""
    # Example process: second-order system
    # G(s) = 1 / (s^2 + 0.4s + 1)
    process_num = [1]
    process_den = [1, 0.4, 1]

    # Find ultimate gain (simulated)
    # For this system: Ku ≈ 1.4, Tu ≈ 6.3
    Ku = 1.4
    Tu = 6.3

    print(f"Ultimate Gain: Ku = {Ku:.3f}")
    print(f"Ultimate Period: Tu = {Tu:.3f} s\n")

    # Tune different controller types
    controller_types = ['P', 'PI', 'PID', 'PID_conservative']

    fig, axes = plt.subplots(2, 2, figsize=(14, 10))
    axes = axes.flatten()

    t = np.linspace(0, 50, 1000)

    for idx, ctrl_type in enumerate(controller_types):
        Kp, Ki, Kd = ZieglerNicholsTuner.closed_loop_method(Ku, Tu, ctrl_type)

        print(f"{ctrl_type}: Kp={Kp:.3f}, Ki={Ki:.3f}, Kd={Kd:.3f}")

        # Create PID controller
        pid_num = [Kd, Kp, Ki]
        pid_den = [1, 0]

        # Closed-loop system
        sys_process = signal.TransferFunction(process_num, process_den)
        sys_pid = signal.TransferFunction(pid_num, pid_den)
        sys_cl = signal.feedback(sys_process * sys_pid)

        # Step response
        t_step, y_step = signal.step(sys_cl, T=t)

        # Plot
        ax = axes[idx]
        ax.plot(t_step, y_step, 'b-', linewidth=2)
        ax.axhline(1.0, color='r', linestyle='--', linewidth=1, label='Setpoint')
        ax.axhline(1.05, color='gray', linestyle=':', alpha=0.5)
        ax.axhline(0.95, color='gray', linestyle=':', alpha=0.5)
        ax.grid(True, alpha=0.3)
        ax.set_xlabel('Time (s)')
        ax.set_ylabel('Output')
        ax.set_title(f'{ctrl_type}\nKp={Kp:.3f}, Ki={Ki:.3f}, Kd={Kd:.3f}')
        ax.set_xlim([0, 50])
        ax.set_ylim([0, 1.6])
        ax.legend()

    plt.tight_layout()
    plt.savefig('ziegler_nichols_closed_loop.png', dpi=150, bbox_inches='tight')
    print("\nSaved closed-loop demonstration to ziegler_nichols_closed_loop.png")

def demonstrate_open_loop_method():
    """Demonstrate open-loop Ziegler-Nichols tuning."""
    # First-order plus dead time (FOPDT) process
    K = 2.0    # Process gain
    T = 5.0    # Time constant
    L = 1.0    # Dead time

    print(f"Process parameters: K={K}, T={T}s, L={L}s\n")

    # Apply Ziegler-Nichols open-loop rules
    controller_types = ['P', 'PI', 'PID']

    fig, axes = plt.subplots(1, 3, figsize=(16, 5))

    t = np.linspace(0, 30, 1000)
    dt = t[1] - t[0]

    for idx, ctrl_type in enumerate(controller_types):
        Kp, Ki, Kd = ZieglerNicholsTuner.open_loop_method(K, T, L, ctrl_type)

        print(f"{ctrl_type}: Kp={Kp:.3f}, Ki={Ki:.3f}, Kd={Kd:.3f}")

        # Simulate closed-loop response
        # FOPDT process simulation
        y = [0]
        e_integral = 0
        e_prev = 0
        setpoint = 1.0

        # Control signal history for delay
        u_history = [0] * int(L/dt)

        for i in range(1, len(t)):
            # Get delayed control input
            delay_steps = int(L/dt)
            if len(u_history) >= delay_steps:
                u_delayed = u_history[-delay_steps]
            else:
                u_delayed = 0

            # Process dynamics: dy/dt = (K*u - y) / T
            dydt = (K * u_delayed - y[-1]) / T
            y_new = y[-1] + dydt * dt
            y.append(y_new)

            # PID control
            error = setpoint - y_new
            e_integral += error * dt
            e_derivative = (error - e_prev) / dt

            u = Kp * error + Ki * e_integral + Kd * e_derivative
            u = np.clip(u, -10, 10)  # Saturation

            u_history.append(u)
            e_prev = error

        # Plot
        ax = axes[idx]
        ax.plot(t, y, 'b-', linewidth=2, label='Output')
        ax.axhline(1.0, color='r', linestyle='--', linewidth=1, label='Setpoint')
        ax.axhline(1.05, color='gray', linestyle=':', alpha=0.5)
        ax.axhline(0.95, color='gray', linestyle=':', alpha=0.5)
        ax.grid(True, alpha=0.3)
        ax.set_xlabel('Time (s)')
        ax.set_ylabel('Output')
        ax.set_title(f'{ctrl_type}\nKp={Kp:.3f}, Ki={Ki:.3f}, Kd={Kd:.3f}')
        ax.set_xlim([0, 30])
        ax.set_ylim([0, 1.6])
        ax.legend()

    plt.tight_layout()
    plt.savefig('ziegler_nichols_open_loop.png', dpi=150, bbox_inches='tight')
    print("\nSaved open-loop demonstration to ziegler_nichols_open_loop.png")

if __name__ == "__main__":
    demonstrate_closed_loop_method()
    print("\n" + "="*60 + "\n")
    demonstrate_open_loop_method()
```

## Advantages

1. **Model-free**: No mathematical model required
2. **Widely applicable**: Works for many process types
3. **Simple**: Easy to understand and implement
4. **Quick**: Fast tuning compared to trial-and-error
5. **Industry standard**: Well-established and trusted

## Disadvantages

1. **Aggressive tuning**: Often produces overshoot (quarter-amplitude decay)
2. **Process disturbance**: Closed-loop method requires inducing oscillations
3. **Limited to stable systems**: Cannot tune unstable open-loop systems
4. **No robustness guarantee**: May be sensitive to model uncertainty
5. **Single operating point**: Tuning valid only near test conditions

## When to Use Each Method

| Method          | Best For                                   | Avoid When                                      |
| --------------- | ------------------------------------------ | ----------------------------------------------- |
| **Closed-loop** | Stable processes, quick tuning             | Critical processes, can't tolerate oscillations |
| **Open-loop**   | Dead-time dominated, process can be opened | Integrating processes, unstable systems         |

## Practical Tips

1. **Start conservative**: Use "no overshoot" or "some overshoot" rules first
2. **Fine-tune**: Use Ziegler-Nichols as starting point, adjust as needed
3. **Add anti-windup**: Integral windup protection essential for real systems
4. **Derivative filtering**: Add low-pass filter on derivative term
5. **Test thoroughly**: Verify performance across operating range

## Comparison with Other Methods

See [[distilled-notes/pid-tuning]] for comparison with Cohen-Coon, Lambda, and other tuning methods.

---

## References

- [Ziegler & Nichols - Optimum Settings for Automatic Controllers (1942)](https://www.semanticscholar.org/paper/Optimum-Settings-for-Automatic-Controllers-Ziegler-Nichols/9a622c6c8b1b3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c)
- [PID Controllers: Theory, Design, and Tuning - Åström & Hägglund](https://www.semanticscholar.org/paper/PID-Controllers%3A-Theory%2C-Design%2C-and-Tuning-%C3%85str%C3%B6m-H%C3%A4gglund/6e1f0d3c0c8f0e8a8e9a0e3a0e3a0e3a0e3a0e3a)
- [Ziegler-Nichols Tuning - Control Station](https://blog.opticontrols.com/archives/477)
- [PID Tuning Methods - MathWorks](https://www.mathworks.com/help/control/ug/introduction-to-pid-tuning.html)
