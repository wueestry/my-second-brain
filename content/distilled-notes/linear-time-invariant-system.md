---
{"publish":true,"title":"Linear Time-Invariant System","created":"2024-08-13T00:00:00.000Z","modified":"2025-09-22T10:32:10.139+02:00","tags":["#mathematics","#control-engineering","#signal-processing","#system-identification","#linear-systems","#convolution","#impulse-response"],"cssclasses":"center-images"}
---


# LINEAR TIME-INVARIANT SYSTEM

---

A **linear time-invariant system** is a system that produces an output signal from any input signal subject to the constraints of linearity and time-invariance.

The response of a system $y(t)$ with an arbitrary input $x(t)$ can be directly using [[Convolution]] $y(t) = (x*h)(t)$ with $h(t)$ being the impulse response

## Properties

- **Linearity**
  - Additivity
    $$
    f(x+y) = f(x) + f(y)
    $$
  - Homogeneity
    $$
    f(ax) = a f(x)
    $$
- **Time invariance**
  $$
  y(t - \tau) = (H(x))(t - \tau)
  $$

---

## References
