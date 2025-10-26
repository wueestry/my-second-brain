---
{"publish":true,"title":"Derivative control","created":"2025-08-06 16:47","modified":"2025-10-01T21:17:17.308+02:00","tags":["#control-engineering","#dynamic-systems","#feedback-systems","#stability","#control-systems","#derivative-control","#pid-control"],"cssclasses":"center-images"}
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

---

## References
