---
{"publish":true,"title":"ARX Model","created":"2025-07-30 16:32","modified":"2025-11-03T20:33:29.480+01:00","tags":["engineering/system-identification/arx-model"],"cssclasses":"center-images"}
---


# ARX MODEL

---

An ARX (Autoregressive with eXogenous inputs) model is a linear discrete-time representation used in [[system-identification]] to model dynamic systems. It combines the output's past values (autoregressive component) with past input values (exogenous component) to predict future outputs.

## Equations

The ARX model combines an [[distilled-notes/autoregressive-model\|autoregressive]] component with an [[distilled-notes/exogenous-model\|exogenous input]] component:

$$
y(t) = c + a_1y(t-1) + a_2y(t-2) + \cdots + a_py(t-p) + b_1u(t-1) + b_2u(t-2) + \cdots + b_qu(t-q) + e(t)
$$

Where:

- $y(t)$ is the output at time $t$
- $u(t)$ is the input at time $t$
- $a_i$ are autoregressive coefficients
- $b_i$ are input coefficients
- $c$ is a constant offset
- $e(t)$ is white noise (measurement error)
- $p$ is the autoregressive order (number of past outputs)
- $q$ is the input order (number of past inputs)

In discrete-time notation:

$$
y[k] = \sum_{i=1}^{n_a}a_iy[k-i] + \sum_{i=1}^{n_b}b_iu[k-i]
$$

## Characteristics

- **Linear model**: Assumes linear relationships between inputs and outputs
- **Discrete-time**: Operates on sampled data at fixed time intervals
- **Parametric**: Defined by a finite set of coefficients ($a_i$, $b_i$)
- **Order selection**: The orders $n_a$ and $n_b$ must be chosen (often via cross-validation or information criteria like AIC/BIC)

## Applications

- Control system design and analysis
- Economic forecasting and time series analysis
- Signal processing and filtering
- Prediction of dynamic system behaviour
- Model-based control strategies

## Example

![[meta/assets/arx-sysid.png]]

---

## References

- Ljung, L. (1999). _System Identification: Theory for the User_ (2nd ed.). Prentice Hall.
- [ARX Models - MATLAB Documentation](https://www.mathworks.com/help/ident/ug/what-are-polynomial-models.html)
- [[meta/references/ARX Time Series Model]]
