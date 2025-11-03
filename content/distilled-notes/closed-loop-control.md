---
{"publish":true,"title":"Closed Loop Control","created":"2028-08-28T00:00:00.000Z","modified":"2025-11-03T20:35:31.297+01:00","tags":["engineering/control-theory/closed-loop-control"],"cssclasses":"center-images"}
---


# CLOSED LOOP CONTROL

---

**Closed-loop control** (also called feedback control) is a control strategy where the system's output is measured and fed back to the controller to adjust the control action. This creates a feedback loop that continuously monitors and corrects the system's behaviour to achieve the desired output.

![[meta/assets/closed-loop-control.png]]

## Key Components

A closed-loop control system consists of:

1. **Reference input (setpoint)**: The desired output value
2. **Controller**: Computes control action based on error
3. **Actuator**: Implements the control action
4. **Plant/Process**: The system being controlled
5. **Sensor**: Measures the actual output
6. **Feedback path**: Returns the output measurement to compare with reference

The **error signal** is the difference between the reference and the measured output: $e(t) = r(t) - y(t)$.

## How It Works

1. The controller receives the desired setpoint
2. The sensor measures the actual output
3. The error is computed (setpoint minus measured output)
4. The controller adjusts the control signal based on the error
5. The actuator applies the control action to the system
6. The process repeats continuously

## Advantages

- **Enhanced Stability**: Feedback can stabilise an otherwise unstable system.
- **Disturbance Rejection**: Closed-loop control can reduce the effect of disturbances on the output.
- **Improved Tracking Accuracy**: Allows the system to accurately track a changing commanded input.
- **Robustness**: Feedback reduces the sensitivity to small variations in the internal system parameters/model inaccuracies.

## Disadvantages

- **Increased complexity**: Requires more components and sophisticated controllers
- **Sensor requirements**: Needs accurate sensors to measure output
- **Potential instability**: Poorly designed feedback can cause oscillations or instability
- **Higher cost**: More expensive than [[distilled-notes/open-loop-control\|open-loop systems]] due to sensors and controllers
- **Time delays**: Sensor and actuator delays can affect performance

## Common Control Strategies

- **[[distilled-notes/pid-control\|PID Control]]**: Proportional-Integral-Derivative controller (most common)
- **[[distilled-notes/model-predictive-control\|Model Predictive Control]]**: Uses system model to predict and optimize
- **State-space control**: Modern control using state feedback
- **Adaptive control**: Adjusts controller parameters based on system changes

## Applications

Closed-loop control is used extensively:

- **Automotive**: Cruise control, anti-lock braking systems (ABS)
- **Aerospace**: Aircraft autopilot, satellite attitude control
- **Industrial**: Temperature control, motor speed regulation
- **Robotics**: Position and trajectory control
- **Home appliances**: Thermostat control, washing machine cycles
- **Medical devices**: Insulin pumps, drug delivery systems

## Comparison with [[distilled-notes/open-loop-control\|Open-Loop Control]]

| Aspect                | Closed-Loop      | Open-Loop        |
| --------------------- | ---------------- | ---------------- |
| Feedback              | Yes              | No               |
| Accuracy              | High             | Low              |
| Disturbance rejection | Good             | Poor             |
| Stability concerns    | Potential issues | Generally stable |
| Complexity            | Higher           | Lower            |
| Cost                  | Higher           | Lower            |
| Sensor required       | Yes              | No               |

---

## References

- Franklin, G. F., Powell, J. D., & Emami-Naeini, A. (2019). _Feedback Control of Dynamic Systems_ (8th ed.). Pearson.
- Ogata, K. (2010). _Modern Control Engineering_ (5th ed.). Prentice Hall.
- Åström, K. J., & Murray, R. M. (2021). _Feedback Systems: An Introduction for Scientists and Engineers_ (2nd ed.). Princeton University Press.
- [Feedback - Wikipedia](https://en.wikipedia.org/wiki/Feedback)
