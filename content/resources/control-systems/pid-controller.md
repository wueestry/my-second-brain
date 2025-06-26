---
{"publish":true,"title":"PID Controller","created":"2024-08-14","tags":["#control-systems","#resource","#term"],"cssclasses":""}
---


# PID Controller

> [!abstract]
> Proportional Integral Derivative Controller.
> Most commonly used control structure in industry

Continuously calculates an error value $e(t)$ as the difference between a desired setpoint (SP) $r(t)$ and a measured process variable (PV) $y(t)$ and applies a correction based on proportional, integral, and derivative terms

## Tuning Methods

### Manual Tuning

| Parameter | Rise time    | Overshoot | Settling time | Steady-state error  | Stability              |
| --------- | ------------ | --------- | ------------- | ------------------- | ---------------------- |
| **$K_p$** | Decrease     | Increase  | Small change  | Decrease            | Degrade                |
| **$K_i$** | Decrease     | Increase  | Increase      | Eliminate           | Degrade                |
| **$K_d$** | Minor change | Decrease  | Decrease      | No effect in theory | Improve if $K_d$ small |

### Automatic Tuning Techniques

- [[resources/control-systems/ziegler-nichols-method\| Ziegler-Nichols Method]]
