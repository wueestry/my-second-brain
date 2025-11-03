---
{"publish":true,"title":"Exogenous Model","created":"2025-08-05 10:14","modified":"2025-11-03T20:27:08.262+01:00","tags":[null],"cssclasses":"center-images"}
---


# EXOGENOUS MODEL

---

An exogenous model is a statistical model which represents the output based on previous input values. Usually a linear combination of the previous external inputs is used to predict the current output of the model.

$$
y(t) = c + b_1u(t-1) + b_2u(t-2) + ... + b_qu(t-q) + e(t)
$$

where:

- $y(t)$ is the output at time $t$
- $u(t-i)$ are past input values (exogenous variables)
- $b_i$ are model coefficients
- $c$ is a constant term
- $e(t)$ is the error term
- $q$ is the model order

## Exogenous vs Endogenous Variables

- **Exogenous variables**: External inputs determined outside the model (independent)
- **Endogenous variables**: Variables determined within the model (dependent)

## ARX Model

The **AutoRegressive with eXogenous inputs (ARX)** model combines autoregressive terms with exogenous inputs:

$$
y(t) = a_1y(t-1) + ... + a_py(t-p) + b_1u(t-1) + ... + b_qu(t-q) + e(t)
$$

This model includes both past outputs (autoregressive) and past inputs (exogenous).

## ARMAX Model

The **AutoRegressive Moving Average with eXogenous inputs (ARMAX)** extends ARX by adding moving average terms:

$$
y(t) = a_1y(t-1) + ... + a_py(t-p) + b_1u(t-1) + ... + b_qu(t-q) + c_1e(t-1) + ... + c_re(t-r) + e(t)
$$

## Python Example

```python
import numpy as np
from statsmodels.tsa.arima.model import ARIMA

# Generate sample data
np.random.seed(42)
n = 100
u = np.random.randn(n)  # Exogenous input
y = np.zeros(n)

# Generate output based on exogenous model
for t in range(2, n):
    y[t] = 0.5 * u[t-1] + 0.3 * u[t-2] + np.random.randn() * 0.1

# Fit ARX model
model = ARIMA(y, exog=u, order=(0, 0, 0))
results = model.fit()
print(results.summary())
```

## Applications

- **Economic forecasting**: Using external indicators to predict economic variables
- **Control systems**: Modelling system response to external inputs
- **Time series prediction**: Weather forecasting with external variables
- **System identification**: Determining transfer functions from input-output data

## Advantages

- Captures influence of external factors
- More accurate predictions when relevant exogenous variables are included
- Useful for systems with measurable external inputs

## Limitations

- Requires knowledge and measurement of exogenous variables
- Model quality depends on selecting relevant exogenous variables
- Can overfit if too many exogenous variables are included

---

## References

- [ARMAX Models - MathWorks](https://www.mathworks.com/help/ident/ug/what-are-polynomial-models.html)
- [Time Series with Exogenous Variables - Statsmodels](https://www.statsmodels.org/stable/generated/statsmodels.tsa.arima.model.ARIMA.html)
- [System Identification - Ljung](https://www.control.lth.se/research/system-identification/)
