---
{"publish":true,"title":"Kalman Filter","created":"2024-08-30T00:00:00.000Z","modified":"2025-09-22T10:32:06.605+02:00","tags":["#recursive","#mathematical-modeling","#data-structures","#algorithms","#statistical-model","#control-engineering","#dynamic-systems"],"cssclasses":"center-images"}
---


# KALMAN FILTER

---

A **Kalman filter** is an optimal state estimator that considers linearity and Gaussian noise, allowing for the prediction and correction of real values based on observed states. It iteratively explores changes in unobserved states by comparing predicted and observed states to improve results.

![[meta/assets/kalman-filtering.png]]

## Dynamic System Model

Kalman filtering is based on linear dynamic systems discretised in the time domain. They are modelled on a [[Markov Chain]] built on linear operators perturbed by errors that may include [[Gaussian]] noise.

In order to use the Kalman filter to estimate the internal state of a process given only a sequence of noisy observations, one must model the process in accordance with the following framework. This means specifying the matrices, for each time-step k, following:

- $F_k$: state-transition model
- $H_k$: observation model
- $Q_k$: covariance of the process noise
- $R_k$: covariance of the observation noise
- $B_k$: control-input model (**optional**)

The Kalman filter model assumes the true state at time $k$ is evolved from the state at $k-1$ according to

$$
x_k = F_kx_{k-1}+B_ku_k+w_k
$$

with $w_k \sim \mathcal{N}(0, Q_k)$

At time $k$ an observation (or measurement) $z_k$ of the true state $x_k$ is made according to

$$
z_k = H_kx_k+v_k
$$

with $v_k \sim \mathcal{N}(0, R_k)$

The initial state, and the noise vectors at each step are assumed to be mutually independent.

## Algorithm

The Kalman filter is a [[Recursive]] estimator.
The state of the filter is represented by two variables.

- $\hat{x}_{k|k}$: the _a posteriori_ state estimate mean at time $k$
- $P_{k|k}$: the _a posteriori_ estimate covariance matrix

### Prediction Step

$$
\hat{x}_{k|k-1} = F_k\hat{x}_{k-1|k-1} + B_ku_{k-1}
$$

$$
P_{k|k-1} = F_kP_{k-1|k-1}F_k^T+Q_{k-1}
$$

### Update Step

$$
K_k = P_{k|k-1}H_k^T(H_kP_{k|k-1}H_k^T + R_k)^{-1}
$$

$$
\hat{x}_{k|k} = \hat{x}_{k|k-1} + K_k(z_k - H_k\hat{x}_{k|k-1})
$$

$$
P_{k|k} = (I-K_kH_k)P_{k|k-1}(I-K_kH_k)^T + K_kR_kK_k^T
$$

---

## References
