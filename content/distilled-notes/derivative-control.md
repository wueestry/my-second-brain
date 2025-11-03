---
{"publish":true,"title":"Derivative control","created":"2025-08-06 16:47","modified":"2025-11-03T20:40:05.095+01:00","tags":["engineering/control-theory/pid-control/derivative"],"cssclasses":"center-images"}
---


# DERIVATIVE CONTROL

---

Derivative control (D) introduces a term proportional to the rate of change of the error signal, typically represented as $k_Ds$ in a transfer function or in the time domain as:

$$
u_D(t) = k_D \frac{de(t)}{dt}
$$

where $k_D$ is the derivative gain.

## Objective

The main objective of adding derivative control is to make a system better damped and more stable, as it provides a sharp response to suddenly changing signals.

While a pure derivative term ($k_Ds$) makes the transfer function non-proper and impractical, it is often approximated in practice by adding a high-frequency pole or through lead compensation.

## Considerations

A designer might choose to put the derivative term in the feedback path rather than the error path. This avoids differentiating the reference signal, which can lead to undesirable responses to sudden changes in the command input.

## Advantages

- **Anticipatory action**: Responds to the rate of change, predicting future error
- **Improved stability**: Increases damping and reduces overshoot
- **Faster response**: Speeds up the system's response to disturbances
- **Reduced oscillations**: Dampens oscillatory behaviour

## Disadvantages

- **Noise amplification**: High sensitivity to measurement noise
- **Non-proper transfer function**: Pure derivative is not physically realisable
- **Limited low-frequency effect**: Only effective for changing signals

## Practical Implementation

In practice, derivative control is implemented with a low-pass filter to limit noise amplification:

$$
D(s) = \frac{k_D s}{\tau s + 1}
$$

where $\tau$ is the filter time constant, typically $\tau = \frac{k_D}{8}$ to $\frac{k_D}{20}$.

### Discrete-Time Implementation

For digital implementation, the derivative is approximated using finite differences:

$$
u_D[k] = k_D \frac{e[k] - e[k-1]}{T_s}
$$

where $T_s$ is the sampling period.

## Example

Consider a second-order system with transfer function:

$$
G(s) = \frac{1}{s^2 + 2s + 1}
$$

Adding derivative control with $k_D = 2$:

$$
G_{closed}(s) = \frac{1}{s^2 + (2 + 2k_D)s + 1} = \frac{1}{s^2 + 6s + 1}
$$

This increases the damping coefficient, reducing overshoot and settling time.

---

## References

- [PID Controller - Wikipedia](https://en.wikipedia.org/wiki/PID_controller#Derivative_term)
- [Derivative Control - Control Tutorials](http://ctms.engin.umich.edu/CTMS/index.php?example=Introduction&section=ControlPID)
- [Understanding PID Control - Wescott Design Services](http://www.wescottdesign.com/articles/pid/pidWithoutAPhd.pdf)
