---
{"publish":true,"title":"Integral control","created":"2025-08-06 16:36","modified":"2025-11-03T20:43:47.325+01:00","tags":["engineering/control-theory/pid-control/integral"],"cssclasses":"center-images"}
---


# INTEGRAL CONTROL

---

**Integral control** (I) adds an integral term to the controller, typically represented as $\frac{k_I}{s}$ in a transfer function, while in the time domain it is given as:

$$
u_I(t) = k_I \int_{t_0}^{t} e(\tau) d\tau
$$

where $k_I$ is the integral gain.

## Objective

The primary objective of introducing integral control is to make the error to a constant input go to zero, thereby eliminating any bias offset.

## Issues

A common issue associated with integral control, especially when the actuator saturates, is [[integrator windup]].

## How It Works

The integral term accumulates error over time:

- **Positive error**: Integral increases, pushing output upward
- **Negative error**: Integral decreases, pushing output downward
- **Zero error**: Integral stops changing (maintains current value)

## Advantages

- **Eliminates steady-state error**: Forces error to zero in steady state
- **Compensates for disturbances**: Adapts to constant external forces
- **No bias offset**: Corrects systematic errors

## Disadvantages

- **Slower response**: Can make system sluggish
- **Overshoot**: May cause excessive overshoot
- **Integrator windup**: Accumulates during saturation
- **Phase lag**: Adds −90° phase lag, reducing stability margin

## Example

Consider a temperature control system with a constant heat loss:

Without integral control:

```
Setpoint: 100°C
Steady-state: 95°C (5°C steady-state error due to heat loss)
```

With integral control:

```
Setpoint: 100°C
Steady-state: 100°C (integral term compensates for heat loss)
```

## Mathematical Analysis

In the frequency domain, integral control has the transfer function:

$$
C_I(s) = \frac{k_I}{s}
$$

At steady state ($s \to 0$), the gain approaches infinity, forcing the error to zero.

## Discrete-Time Implementation

```python
class IntegralController:
    def __init__(self, ki):
        self.ki = ki
        self.integral = 0

    def update(self, error, dt):
        """Update integral controller"""
        self.integral += error * dt
        output = self.ki * self.integral
        return output

    def reset(self):
        """Reset integral term"""
        self.integral = 0
```

## Anti-Windup Techniques

### Clamping

Limit the integral accumulation:

```python
if self.integral > integral_max:
    self.integral = integral_max
elif self.integral < integral_min:
    self.integral = integral_min
```

### Back-Calculation

Reduce integral when output saturates:

```python
if output > output_max:
    # Reduce integral proportionally
    excess = output - output_max
    self.integral -= excess / self.ki
```

### Conditional Integration

Stop integrating during saturation:

```python
if not output_saturated:
    self.integral += error * dt
```

## Tuning Guidelines

- Start with $k_I = 0$ and increase gradually
- Typical range: $k_I = 0.1$ to $10$ times $k_P$
- Too high: Overshoot and oscillations
- Too low: Slow elimination of steady-state error

## Effect on System Response

| Property           | Effect of Increasing $k_I$ |
| ------------------ | -------------------------- |
| Rise time          | Decrease                   |
| Overshoot          | Increase                   |
| Settling time      | Increase                   |
| Steady-state error | Eliminate                  |
| Stability          | Decrease                   |

---

## References

- [Integral Control - Control Tutorials](http://ctms.engin.umich.edu/CTMS/index.php?example=Introduction&section=ControlPID)
- [Anti-Windup Techniques - MATLAB](https://www.mathworks.com/help/control/ug/anti-windup-control-using-a-pid-controller.html)
- [PID Control - Wescott Design](http://www.wescottdesign.com/articles/pid/pidWithoutAPhd.pdf)
