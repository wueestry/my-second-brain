---
{"publish":true,"title":"PID Tuning","created":"2025-08-06 15:21","modified":"2025-11-03T20:43:36.559+01:00","tags":["engineering/control-theory/pid-control/tuning"],"cssclasses":"center-images"}
---


# PID TUNING

---

Tuning a control loop is the adjustment of its control parameters to the optimum values for the desired control response.
Stability is a requirement, but beyond that, different systems have different behaviour, different applications have different requirements, and requirements may conflict with one another.

## Parameter Effects

| Parameter | Rise time    | Overshoot | Settling time | Steady-state error  | Stability              |
| --------- | ------------ | --------- | ------------- | ------------------- | ---------------------- |
| **$K_p$** | Decrease     | Increase  | Small change  | Decrease            | Degrade                |
| **$K_i$** | Decrease     | Increase  | Increase      | Eliminate           | Degrade                |
| **$K_d$** | Minor change | Decrease  | Decrease      | No effect in theory | Improve if $K_d$ small |

## Tuning Methods

### 1. Manual Tuning

**Basic procedure:**

1. Set $K_i = 0$ and $K_d = 0$
2. Increase $K_p$ until system oscillates
3. Reduce $K_p$ to 50% of oscillation value
4. Increase $K_i$ to eliminate steady-state error
5. Increase $K_d$ to reduce overshoot and improve stability

**Advantages:**

- No mathematical model required
- Intuitive understanding of system behaviour
- Can be done in real-time on actual system

**Disadvantages:**

- Time-consuming
- Requires experience
- May not find optimal parameters

### 2. Ziegler-Nichols Method

See [[distilled-notes/ziegler-nichols-method]] for detailed explanation.

**Two approaches:**

- **Open-loop method**: Based on step response (reaction curve)
- **Closed-loop method**: Based on ultimate gain $K_u$ and period $T_u$

### 3. Cohen-Coon Method

Based on open-loop step response, better for systems with large dead time.

**Process parameters:**

- $K$: Process gain
- $\tau$: Time constant
- $\theta$: Dead time

**Tuning rules:**

| Controller | $K_p$                                                                | $T_i$                                               | $T_d$                               |
| ---------- | -------------------------------------------------------------------- | --------------------------------------------------- | ----------------------------------- |
| P          | $\frac{1}{K}\frac{\tau}{\theta}(1 + \frac{\theta}{3\tau})$           | -                                                   | -                                   |
| PI         | $\frac{1}{K}\frac{\tau}{\theta}(0.9 + \frac{\theta}{12\tau})$        | $\theta\frac{30 + 3\theta/\tau}{9 + 20\theta/\tau}$ | -                                   |
| PID        | $\frac{1}{K}\frac{\tau}{\theta}(\frac{4}{3} + \frac{\theta}{4\tau})$ | $\theta\frac{32 + 6\theta/\tau}{13 + 8\theta/\tau}$ | $\theta\frac{4}{11 + 2\theta/\tau}$ |

### 4. Lambda Tuning (IMC)

Internal Model Control (IMC) method that allows specification of desired closed-loop time constant $\lambda$.

**For first-order plus dead time (FOPDT) model:**

$$K_p = \frac{\tau}{K(\lambda + \theta)}, \quad T_i = \tau, \quad T_d = 0$$

**Characteristics:**

- $\lambda$ is the tuning parameter (closed-loop time constant)
- Smaller $\lambda$ → faster response, more aggressive
- Larger $\lambda$ → slower response, more robust
- Rule of thumb: $\lambda = \theta$ to $5\theta$

### 5. Relay Auto-Tuning

Automatically determines ultimate gain and period using relay feedback.

**Procedure:**

1. Replace controller with relay (on/off control)
2. System oscillates at natural frequency
3. Measure oscillation amplitude $a$ and period $T_u$
4. Calculate: $K_u = \frac{4d}{\pi a}$ (where $d$ is relay amplitude)
5. Apply Ziegler-Nichols rules

## Python Implementation

```python
import numpy as np
import matplotlib.pyplot as plt
from dataclasses import dataclass
from typing import Callable

@dataclass
class PIDParams:
    """PID controller parameters."""
    Kp: float
    Ki: float
    Kd: float

class PIDAutoTuner:
    """Automatic PID tuning methods."""

    @staticmethod
    def ziegler_nichols_reaction_curve(
        t: np.ndarray,
        y: np.ndarray
    ) -> PIDParams:
        """
        Ziegler-Nichols open-loop method (reaction curve).

        Args:
            t: Time array from step response
            y: Output array from step response (normalized 0 to 1)
        """
        # Find inflection point (maximum slope)
        dy = np.gradient(y, t)
        idx_max_slope = np.argmax(dy)
        max_slope = dy[idx_max_slope]

        # Draw tangent line at inflection point
        # y = max_slope * (t - t_inflection) + y_inflection
        t_inflection = t[idx_max_slope]
        y_inflection = y[idx_max_slope]

        # Find intercepts
        # Dead time (L): x-intercept of tangent
        L = t_inflection - y_inflection / max_slope

        # Time constant (T): time from L to 63.2% of final value
        # Using tangent line to final value
        T = (1.0 - y_inflection) / max_slope

        # Ziegler-Nichols rules for PID
        Kp = 1.2 * T / L
        Ti = 2.0 * L
        Td = 0.5 * L

        Ki = Kp / Ti
        Kd = Kp * Td

        return PIDParams(Kp, Ki, Kd)

    @staticmethod
    def cohen_coon(K: float, tau: float, theta: float) -> PIDParams:
        """
        Cohen-Coon tuning method.

        Args:
            K: Process gain
            tau: Time constant
            theta: Dead time
        """
        ratio = theta / tau

        Kp = (1/K) * (tau/theta) * (4/3 + ratio/4)
        Ti = theta * (32 + 6*ratio) / (13 + 8*ratio)
        Td = theta * 4 / (11 + 2*ratio)

        Ki = Kp / Ti
        Kd = Kp * Td

        return PIDParams(Kp, Ki, Kd)

    @staticmethod
    def lambda_tuning(K: float, tau: float, theta: float,
                      lambda_factor: float = 1.5) -> PIDParams:
        """
        Lambda (IMC) tuning method.

        Args:
            K: Process gain
            tau: Time constant
            theta: Dead time
            lambda_factor: Multiplier for dead time (typically 1-5)
        """
        lambda_cl = lambda_factor * theta

        Kp = tau / (K * (lambda_cl + theta))
        Ti = tau
        Td = 0.0

        Ki = Kp / Ti if Ti > 0 else 0
        Kd = Kp * Td

        return PIDParams(Kp, Ki, Kd)

def simulate_tuning_comparison():
    """Compare different tuning methods on a FOPDT process."""
    # Process parameters
    K = 2.0      # Gain
    tau = 5.0    # Time constant
    theta = 1.0  # Dead time

    # Transfer function: G(s) = K / (tau*s + 1) * exp(-theta*s)
    # Approximated using first-order Padé for dead time

    dt = 0.01
    t = np.arange(0, 30, dt)

    def fopdt_process(u_history: np.ndarray, y: float) -> float:
        """First-order plus dead time process."""
        delay_steps = int(theta / dt)
        if len(u_history) < delay_steps:
            u_delayed = 0
        else:
            u_delayed = u_history[-delay_steps]

        # First-order dynamics: dy/dt = (K*u - y) / tau
        dydt = (K * u_delayed - y) / tau
        return y + dydt * dt

    # Get tuning parameters from different methods
    # For ZN reaction curve, we need step response
    # Simulate open-loop step response first
    y_step = [0]
    u_history_step = [0] * int(theta/dt)
    for i in range(1, len(t)):
        u_history_step.append(1.0)
        y_step.append(fopdt_process(u_history_step, y_step[-1]))

    y_step = np.array(y_step)
    y_step_norm = y_step / y_step[-1]  # Normalize

    tuning_methods = {
        'Ziegler-Nichols': PIDAutoTuner.ziegler_nichols_reaction_curve(t, y_step_norm),
        'Cohen-Coon': PIDAutoTuner.cohen_coon(K, tau, theta),
        'Lambda (λ=1.5θ)': PIDAutoTuner.lambda_tuning(K, tau, theta, 1.5),
        'Lambda (λ=3θ)': PIDAutoTuner.lambda_tuning(K, tau, theta, 3.0),
    }

    # Simulate closed-loop for each method
    fig, axes = plt.subplots(2, 2, figsize=(14, 10))
    axes = axes.flatten()

    for idx, (name, params) in enumerate(tuning_methods.items()):
        y = [0]
        u_history = [0] * int(theta/dt)
        e_integral = 0
        e_prev = 0
        setpoint = 1.0

        control_signals = []

        for i in range(1, len(t)):
            # PID control
            error = setpoint - y[-1]
            e_integral += error * dt
            e_derivative = (error - e_prev) / dt

            u = params.Kp * error + params.Ki * e_integral + params.Kd * e_derivative
            u = np.clip(u, -10, 10)  # Saturation

            u_history.append(u)
            control_signals.append(u)

            # Process
            y.append(fopdt_process(u_history, y[-1]))
            e_prev = error

        # Plot
        ax = axes[idx]
        ax.plot(t, [setpoint]*len(t), 'r--', label='Setpoint', linewidth=2)
        ax.plot(t, y, 'b-', label='Output', linewidth=2)
        ax.grid(True, alpha=0.3)
        ax.set_xlabel('Time (s)')
        ax.set_ylabel('Output')
        ax.set_title(f'{name}\nKp={params.Kp:.2f}, Ki={params.Ki:.2f}, Kd={params.Kd:.2f}')
        ax.legend()
        ax.set_ylim([-0.2, 1.6])

    plt.tight_layout()
    plt.savefig('pid_tuning_comparison.png', dpi=150, bbox_inches='tight')
    print("Saved comparison plot to pid_tuning_comparison.png")

if __name__ == "__main__":
    simulate_tuning_comparison()
```

## Practical Considerations

### Anti-Windup

When actuator saturates, integral term can "wind up" causing overshoot:

- **Back-calculation**: Reduce integral when output saturates
- **Conditional integration**: Stop integrating when saturated
- **Clamping**: Limit integral term directly

### Derivative Kick

Step changes in setpoint cause large derivative spikes:

- **Solution**: Calculate derivative on process variable, not error
- `derivative = Kd * d(PV)/dt` instead of `Kd * d(error)/dt`

### Sample Time Selection

- Choose sample time 10-20× faster than desired closed-loop response
- Too fast: noise amplification, computational burden
- Too slow: poor performance, instability

### Filtering

- Low-pass filter on derivative term reduces noise sensitivity
- Typical cutoff: 1/10 of control bandwidth

## When to Use Each Method

| Method              | Best For                    | Advantages                 | Disadvantages                    |
| ------------------- | --------------------------- | -------------------------- | -------------------------------- |
| **Manual**          | Simple systems, prototyping | Intuitive, no model needed | Time-consuming, suboptimal       |
| **Ziegler-Nichols** | General purpose             | Quick, widely used         | Can be aggressive, assumes FOPDT |
| **Cohen-Coon**      | High dead time systems      | Better for θ/τ > 0.2       | Requires model identification    |
| **Lambda**          | Desired response time known | Intuitive tuning parameter | Requires accurate model          |
| **Relay**           | Online tuning               | Automatic, model-free      | Disturbs process during tuning   |

---

## References

- [PID Controller Tuning: A Short Tutorial - Jinghua Zhong](https://www.academia.edu/23261081/PID_Controller_Tuning_A_Short_Tutorial)
- [PID Tuning Guide - Control Guru](http://www.controlguru.com/pid-tuning/)
- [Åström & Hägglund - PID Controllers: Theory, Design, and Tuning (2nd Edition)](https://www.semanticscholar.org/paper/PID-Controllers%3A-Theory%2C-Design%2C-and-Tuning-%C3%85str%C3%B6m-H%C3%A4gglund/6e1f0d3c0c8f0e8a8e9a0e3a0e3a0e3a0e3a0e3a)
- [Lambda Tuning - Control Station](https://blog.opticontrols.com/archives/344)
