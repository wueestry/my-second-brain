---
{"publish":true,"title":"PID Tuning","created":"2025-08-06 15:21","modified":"2025-08-18T12:58:14.302+02:00","tags":["resource"],"cssclasses":"center-images"}
---


# PID TUNING

---

Tuning a control loop is the adjustment of its control parameters to the optimum values for the desired control response.
Stability is a requirement, but beyond that, different systems have different behaviour, different applications have different requirements, and requirements may conflict with one another.

## Tuning Methods

### Manual Tuning

| Parameter | Rise time    | Overshoot | Settling time | Steady-state error  | Stability              |
| --------- | ------------ | --------- | ------------- | ------------------- | ---------------------- |
| **$K_p$** | Decrease     | Increase  | Small change  | Decrease            | Degrade                |
| **$K_i$** | Decrease     | Increase  | Increase      | Eliminate           | Degrade                |
| **$K_d$** | Minor change | Decrease  | Decrease      | No effect in theory | Improve if $K_d$ small |

### Automatic Tuning Techniques

- [[distilled-notes/ziegler-nichols-method\| Ziegler-Nichols Method]]
