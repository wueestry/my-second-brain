---
{"publish":true,"title":"Autoregressive Model","created":"2025-07-31 13:30","modified":"2025-11-03T20:33:40.646+01:00","tags":["statistics/time-series/autoregressive-model"],"cssclasses":"center-images"}
---


# AUTOREGRESSIVE MODEL

---

An autoregressive (AR) model is a statistical model used in time series analysis that predicts future values based on a linear combination of past values. The model assumes that the current output depends on its own previous values plus some random noise.

## Mathematical Formulation

The general AR model of order $p$, denoted as AR($p$), is defined as:

$$
y(t) = c + a_1y(t-1) + a_2y(t-2) + \cdots + a_py(t-p) + e(t)
$$

Where:

- $y(t)$ is the value at time $t$
- $c$ is a constant (intercept)
- $a_1, a_2, \ldots, a_p$ are the autoregressive coefficients
- $p$ is the order of the model (number of lagged terms)
- $e(t)$ is white noise (random error term with mean zero)

## Properties

- **Stationarity**: For an AR model to be stable, the time series must be stationary (constant mean and variance over time)
- **Memory**: The model has "memory" of past $p$ time steps
- **Order selection**: The order $p$ is typically chosen using criteria like AIC (Akaike Information Criterion) or BIC (Bayesian Information Criterion)

## Estimation

AR model coefficients are commonly estimated using:

- **Least squares regression**: Minimising the sum of squared errors
- **Yule-Walker equations**: System of linear equations derived from autocorrelation
- **Maximum likelihood estimation**: For more complex scenarios

## Applications

- **Economic forecasting**: Stock prices, GDP, inflation rates
- **Signal processing**: Audio and speech analysis
- **Climate science**: Temperature and weather prediction
- **Neuroscience**: Brain signal (EEG) analysis
- **Engineering**: Control systems and vibration analysis

## Related Models

- **[[distilled-notes/arx-model\|ARX Model]]**: Adds exogenous (external) input variables
- **ARMA Model**: Combines autoregressive and moving average components
- **ARIMA Model**: AR model extended for non-stationary data with differencing

---

## References

- Box, G. E. P., Jenkins, G. M., Reinsel, G. C., & Ljung, G. M. (2015). _Time Series Analysis: Forecasting and Control_ (5th ed.). Wiley.
- [Autoregressive model - Wikipedia](https://en.wikipedia.org/wiki/Autoregressive_model)
- Brockwell, P. J., & Davis, R. A. (2016). _Introduction to Time Series and Forecasting_ (3rd ed.). Springer.
- [[meta/references/ARX Time Series Model]]
