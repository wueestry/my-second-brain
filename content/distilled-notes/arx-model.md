---
{"publish":true,"title":"ARX Model","created":"2025-07-30 16:32","modified":"2025-08-18T12:58:14.122+02:00","tags":["resource"],"cssclasses":"center-images"}
---


# ARX MODEL

---

An ARX (Autoregressive with Exogenous inputs) model is a linear representation of a dynamic system in discrete time used to model and analyse the behaviour of dynamic systems.

## Equations

Combination of both an autoregressive model and an exogenous input model

$$
y(t) = c + a_1y(t-1) + a_2y(t-2) + ... +a_py(t-p) + b_1u(t-1) + b_2u(t-2) + ... + b_qu(t-q) + e(t)
$$

or more compactly in discrete time

$$
y[k] = \sum_{i=1}^{n_a}a_iy[k-i+1] + \sum_{i=1}^{n_b}b_iu[k-i+1]
$$

## Example

![[meta/assets/arx-sysid.png]]

---

## References

[[meta/references/ARX Time Series Model]]
