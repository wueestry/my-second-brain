---
{"publish":true,"title":"Proportional Control","created":"2025-08-06 15:39","modified":"2025-11-03T20:43:24.529+01:00","tags":["engineering/control-theory/pid-control/proportional"],"cssclasses":"center-images"}
---


# PROPORTIONAL CONTROL

---

**Proportional control** means that the feedback control signal is directly and linearly proportional to the system error.
The controller output is given by

$$
u(t) = k_p \cdot e(t)
$$

where $e(t)$ is the error signal

## Advantages

- Reduces steady-state errors as the primary benefit.
- Larger proportional gain $k_p$ leads to a smaller steady-state error for a constant input.
- Provides a quick response to an error signal, affecting the system's [[transient-response\|transient response]].

## Limitations

- Too big increases in proportional feedback gain result in a destabilisation of the system.
- Cannot eliminate steady-state error for constant disturbances

## How It Works

The control output is directly proportional to the error:

$$
u(t) = k_p \cdot e(t) = k_p \cdot (r(t) - y(t))
$$

where:

- $u(t)$ is the control output
- $e(t)$ is the error (difference between setpoint and measurement)
- $r(t)$ is the reference setpoint
- $y(t)$ is the process variable (measured output)

## Effect of Proportional Gain

### Low $k_p$

- Slow response
- Large steady-state error
- Good stability

### Moderate $k_p$

- Faster response
- Reduced steady-state error
- Balanced performance

### High $k_p$

- Fast response
- Small steady-state error
- Risk of oscillations and instability

## Steady-State Error

For a unit step input, the steady-state error with proportional control alone is:

$$
e_{ss} = \frac{1}{1 + k_p K}
$$

where $K$ is the plant DC gain. This shows that:

- Error decreases as $k_p$ increases
- Error never reaches zero with proportional control alone
- Higher plant gain $K$ reduces error

## Example: Temperature Control

```python
class ProportionalController:
    def __init__(self, kp, setpoint):
        self.kp = kp
        self.setpoint = setpoint

    def update(self, measurement):
        """Calculate proportional control output"""
        error = self.setpoint - measurement
        output = self.kp * error
        return output

# Temperature control example
controller = ProportionalController(kp=2.0, setpoint=100)

current_temp = 25  # Start at room temperature
dt = 0.1

for i in range(100):
    # Calculate control signal
    heater_power = controller.update(current_temp)

    # Simulate temperature change (simplified)
    current_temp += heater_power * dt - 0.5  # Heat loss

    print(f"Time: {i*dt:.1f}s, Temp: {current_temp:.1f}°C")
```

## Practical Implementation

### Arduino Example

```cpp
float proportional_control(float setpoint, float measurement, float kp) {
    float error = setpoint - measurement;
    float output = kp * error;

    // Clamp output to actuator limits
    if (output > 255) output = 255;
    if (output < 0) output = 0;

    return output;
}

void loop() {
    float temp = read_temperature();
    float heater = proportional_control(100.0, temp, 2.5);
    analogWrite(HEATER_PIN, (int)heater);
    delay(100);
}
```

## Tuning Guidelines

1. **Start small**: Begin with $k_p = 0.1$ or lower
2. **Increase gradually**: Double $k_p$ until oscillations appear
3. **Reduce by half**: Set $k_p$ to 50% of oscillation threshold
4. **Fine-tune**: Adjust for desired balance of speed and stability

### Rule of Thumb

- Conservative: $k_p = 0.2 \times k_{p,max}$
- Aggressive: $k_p = 0.6 \times k_{p,max}$

where $k_{p,max}$ is the gain at which sustained oscillations occur.

## Effect on System Response

| Property           | Effect of Increasing $k_p$ |
| ------------------ | -------------------------- |
| Rise time          | Decrease                   |
| Overshoot          | Increase                   |
| Settling time      | Small change               |
| Steady-state error | Decrease                   |
| Stability          | Decrease                   |

## Common Applications

- **Simple servo systems**: Where some steady-state error is acceptable
- **First stage of PID**: Before adding I and D terms
- **Bang-bang control**: With very high gain (on/off behaviour)
- **Fast response systems**: Where overshoot is tolerable

## Limitations Requiring I and D

- **Needs integral (I)**: When steady-state error must be zero
- **Needs derivative (D)**: When overshoot must be minimised
- **Needs both**: For optimal performance in most systems

---

## References

- [Proportional Control - Control Tutorials](http://ctms.engin.umich.edu/CTMS/index.php?example=Introduction&section=ControlPID)
- [P Controller Design - MATLAB](https://www.mathworks.com/help/control/ug/proportional-controllers.html)
- [Feedback Control Systems - Åström & Murray](http://www.cds.caltech.edu/~murray/amwiki/index.php/Main_Page)
