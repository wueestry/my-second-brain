---
{"publish":true,"title":"Linear Time-Invariant System","created":"2024-08-13","tags":["#control-systems","#resource","#term"],"cssclasses":""}
---


# Linear Time-Invariant System

> [!abstract]
> System that produces output from any input signal subject to constraints of linearity and time-invariance

Response of system $y(t)$ with an arbitrary input $x(t)$ can be directly using [[Convolution]] $y(t) = (x*h)(t)$ with $h(t)$ being the impulse response

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
