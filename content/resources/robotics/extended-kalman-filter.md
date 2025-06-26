---
{"publish":true,"title":"Extended Kalman Filter","created":"2024-11-27 13:48","tags":["#algorithm","#control-systems","#resource","#robotics","#state-estimation","#term"],"cssclasses":""}
---


# Extended Kalman Filter

> [!abstract]
> The extended Kalman Filter (EKF) is the **nonlinear** version of the Kalman filter.

## Formulation

The state transition and observation models don't have to be linear functions of the state, as it is the case with the general Kalman filter, but may instead be differentiable functions.

$$
x_k = f(x_{k-1}, u_{k-1}) + w_{k-1}
$$

$$
z_k = h(x_k) + v_k
$$

With $w_k$ and $v_k$ being the process and observation noises with are both assumed to have zero mean multivariate Gaussian noises with covariance $Q_k$ and $R_k$ respectively.

## Algorithm

### Prediction Step

$$
\hat{x}_{k|k-1} = f(\hat{x}_{k-1|k-1}, u_{k-1})
$$

$$
P_{k|k-1} = F_kP_{k-1|k-1}F_k^T+Q_{k-1}
$$

### Update Step

$$
\tilde{y}_k = z_k + h(\hat{x}_{k|k-1})
$$

$$
S_k = H_kP_{k|k-1}H_k^T+R_k
$$

$$
K_k = P_{k|k-1}H_k^TS_k^{-1}
$$

$$
\hat{x}_{k|k} = \hat{x}_{k|k-1}+K_k \tilde{y}_k
$$

$$
P_{k|k} = (I-K_kH_k)P_{k|k-1}
$$

where the state transition and observation matrices are defined by the following Jacobians

$$
F_k = \frac{\delta f}{\delta x}|_{\hat{x}_{k-1|k-1}, u_k}
$$

$$
H_k = \frac{\delta h}{\delta x}|_{\hat{x}_{k|k-1}}
$$
