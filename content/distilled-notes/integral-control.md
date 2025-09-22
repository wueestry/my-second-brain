---
{"publish":true,"title":"Integral control","created":"2025-08-06 16:36","modified":"2025-09-22T10:32:04.940+02:00","tags":["#control-engineering","#control-systems","#derivative-control","#proportional-control","#integral-control","#pid-control","#error-correction"],"cssclasses":"center-images"}
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

---

## References
