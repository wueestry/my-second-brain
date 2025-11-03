---
{"publish":true,"title":"PID Control","created":"2024-08-14T00:00:00.000Z","modified":"2025-11-03T20:43:36.567+01:00","tags":["engineering/control-theory/pid-control"],"cssclasses":"center-images"}
---


# PID CONTROL

---

The **Proportional-Integral-Derivative (PID) controller** is a widely used control method that adjusts a system's control signal based on three types of error terms: proportional, integral, and derivative.
The controller output in the time domain is typically represented by the equation

$$
u(t) = k_pe(t) + k_I ∫t_0 e(\tau) d\tau + k_D \frac{\delta e(t)}{\delta t}
$$ In the Laplace domain, the transfer function for a PID controller is commonly given as
$$

T(s) = k_p + \frac{k_I}{s} + k_Ds

$$

where
- $k_p$ represents the [[distilled-notes/proportional-control\|proportional term]]
- $k_I$ represents the [[distilled-notes/integral-control\|integral term]]
- $k_D$ represents the [[distilled-notes/derivative-control\|derivative term]]


This structure allows the controller to combine the strengths of each term to achieve desired system performance, such as reducing steady-state errors, improving stability, and shaping dynamic response.

## How Each Term Works

### Proportional (P)
- Responds to **current error**
- Output proportional to error magnitude
- **Effect**: Faster response, but leaves steady-state error
- **Too high**: Overshoot and oscillations
- **Too low**: Slow response

### Integral (I)
- Responds to **accumulated error** over time
- Eliminates steady-state error
- **Effect**: Drives error to zero in steady state
- **Too high**: Slow response, overshoot, instability
- **Too low**: Persistent steady-state error

### Derivative (D)
- Responds to **rate of change** of error
- Anticipates future error
- **Effect**: Reduces overshoot, improves stability
- **Too high**: Noise amplification
- **Too low**: Increased overshoot

## Block Diagram

```
         +----+     +-------+     +------+
r(t) -->-| Σ  |---->| PID   |---->| Plant|----> y(t)
    ^    +----+ e(t)+-------+ u(t)+------+      |
    |                                            |
    +--------------------------------------------+
```

## Practical Implementation

### Discrete-Time PID

For digital implementation with sampling period $T_s$:


$$

u[k] = k*p e[k] + k_I T_s \sum*{i=0}^{k} e[i] + k_D \frac{e[k] - e[k-1]}{T_s}

$$

### Python Implementation

```python
class PIDController:
    def __init__(self, kp, ki, kd, setpoint=0):
        self.kp = kp
        self.ki = ki
        self.kd = kd
        self.setpoint = setpoint

        self.integral = 0
        self.previous_error = 0

    def update(self, measurement, dt):
        """Calculate PID control output"""
        error = self.setpoint - measurement

        # Proportional term
        p_term = self.kp * error

        # Integral term
        self.integral += error * dt
        i_term = self.ki * self.integral

        # Derivative term
        derivative = (error - self.previous_error) / dt
        d_term = self.kd * derivative

        # Update previous error
        self.previous_error = error

        # Calculate output
        output = p_term + i_term + d_term
        return output

    def reset(self):
        """Reset integral and previous error"""
        self.integral = 0
        self.previous_error = 0

# Example usage
pid = PIDController(kp=1.0, ki=0.1, kd=0.05, setpoint=100)

current_value = 0
dt = 0.1

for _ in range(100):
    control_signal = pid.update(current_value, dt)
    # Apply control signal to system
    current_value += control_signal * dt
```

### Arduino Example

```cpp
class PID {
private:
    float kp, ki, kd;
    float setpoint;
    float integral;
    float previousError;
    unsigned long previousTime;

public:
    PID(float _kp, float _ki, float _kd, float _setpoint)
        : kp(_kp), ki(_ki), kd(_kd), setpoint(_setpoint),
          integral(0), previousError(0), previousTime(0) {}

    float compute(float measurement) {
        unsigned long currentTime = millis();
        float dt = (currentTime - previousTime) / 1000.0;

        if (dt > 0) {
            float error = setpoint - measurement;

            integral += error * dt;
            float derivative = (error - previousError) / dt;

            float output = kp * error + ki * integral + kd * derivative;

            previousError = error;
            previousTime = currentTime;

            return output;
        }
        return 0;
    }
};
```

## Improvements and Variants

### Anti-Windup
Prevents integral term from accumulating when output is saturated:

```python
# Clamp integral term
self.integral = max(min(self.integral, integral_max), integral_min)
```

### Derivative on Measurement
Avoids derivative kick from setpoint changes:

```python
d_term = -self.kd * (measurement - self.previous_measurement) / dt
```

### Low-Pass Filter on Derivative
Reduces noise sensitivity:

```python
alpha = 0.1  # Filter coefficient
filtered_derivative = alpha * derivative + (1 - alpha) * previous_derivative
```

## Tuning Methods

- **Ziegler-Nichols**: Classical method based on ultimate gain
- **Cohen-Coon**: Good for first-order plus dead-time systems
- **Manual tuning**: Start with P, add I, then add D
- **Software tools**: Auto-tuning algorithms

## Applications

- **Temperature control**: Ovens, refrigerators, HVAC systems
- **Motor speed control**: DC motors, servo systems
- **Flight control**: Aircraft autopilot, drone stabilisation
- **Process control**: Chemical reactors, distillation columns
- **Robotics**: Joint position control, mobile robot navigation
- **Cruise control**: Vehicle speed regulation

## Common Issues

- **Integral windup**: Integral grows too large during saturation
- **Derivative kick**: Sudden change in setpoint causes large derivative
- **Noise amplification**: Derivative term amplifies measurement noise
- **Tuning difficulty**: Finding optimal gains can be challenging

---

## References

- [PID Controller - Wikipedia](https://en.wikipedia.org/wiki/PID_controller)
- [PID Without a PhD - Wescott Design](http://www.wescottdesign.com/articles/pid/pidWithoutAPhd.pdf)
- [PID Tutorial - MATLAB](https://www.mathworks.com/discovery/pid-control.html)
$$
