---
{"publish":true,"title":"PID Control","created":"2024-08-14T00:00:00.000Z","modified":"2025-10-01T21:17:17.306+02:00","tags":["#control-engineering","#control-systems","#derivative-control","#integral-control","#proportional-control","#pid-control","#transfer-function"],"cssclasses":"center-images"}
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

---
## References
