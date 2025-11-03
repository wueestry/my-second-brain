---
{"publish":true,"title":"Kalman Filter","created":"2024-08-30T00:00:00.000Z","modified":"2025-11-03T20:43:47.240+01:00","tags":["engineering/control-theory/estimation/kalman"],"cssclasses":"center-images"}
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

## Intuitive Understanding

The Kalman filter combines two sources of information:

1. **Prediction**: What we expect based on the system model
2. **Measurement**: What we observe from sensors

The **Kalman gain** $K_k$ determines how much to trust the measurement vs the prediction:

- $K_k \approx 0$: Trust the prediction (noisy measurements)
- $K_k \approx 1$: Trust the measurement (uncertain prediction)

## Python Implementation

```python
import numpy as np

class KalmanFilter:
    def __init__(self, F, H, Q, R, x0, P0, B=None):
        """
        F: State transition matrix
        H: Observation matrix
        Q: Process noise covariance
        R: Measurement noise covariance
        x0: Initial state estimate
        P0: Initial covariance estimate
        B: Control input matrix (optional)
        """
        self.F = F
        self.H = H
        self.Q = Q
        self.R = R
        self.x = x0
        self.P = P0
        self.B = B

    def predict(self, u=None):
        """Prediction step"""
        if u is not None and self.B is not None:
            self.x = self.F @ self.x + self.B @ u
        else:
            self.x = self.F @ self.x

        self.P = self.F @ self.P @ self.F.T + self.Q
        return self.x

    def update(self, z):
        """Update step"""
        y = z - self.H @ self.x  # Innovation (residual)
        S = self.H @ self.P @ self.H.T + self.R  # Innovation covariance
        K = self.P @ self.H.T @ np.linalg.inv(S)  # Kalman gain

        self.x = self.x + K @ y
        I = np.eye(self.P.shape[0])
        self.P = (I - K @ self.H) @ self.P

        return self.x
```

## Example: Tracking a Moving Object

```python
import numpy as np
import matplotlib.pyplot as plt

# System model: constant velocity in 2D
# State: [x, y, vx, vy]
dt = 0.1
F = np.array([[1, 0, dt, 0],
              [0, 1, 0, dt],
              [0, 0, 1, 0],
              [0, 0, 0, 1]])

# Observation model: measure position only
H = np.array([[1, 0, 0, 0],
              [0, 1, 0, 0]])

# Process noise
Q = np.eye(4) * 0.1

# Measurement noise
R = np.eye(2) * 1.0

# Initial state
x0 = np.array([0., 0., 1., 1.])
P0 = np.eye(4) * 1.0

# Create Kalman filter
kf = KalmanFilter(F, H, Q, R, x0, P0)

# Simulate tracking
true_states = []
measurements = []
estimates = []

x_true = np.array([0., 0., 1., 0.5])

for _ in range(100):
    # True state evolution
    x_true = F @ x_true + np.random.multivariate_normal([0, 0, 0, 0], Q)
    true_states.append(x_true[:2])

    # Noisy measurement
    z = H @ x_true + np.random.multivariate_normal([0, 0], R)
    measurements.append(z)

    # Kalman filter
    kf.predict()
    x_est = kf.update(z)
    estimates.append(x_est[:2])

# Plot results
true_states = np.array(true_states)
measurements = np.array(measurements)
estimates = np.array(estimates)

plt.figure(figsize=(10, 6))
plt.plot(true_states[:, 0], true_states[:, 1], 'g-', label='True')
plt.plot(measurements[:, 0], measurements[:, 1], 'r.', label='Measurements')
plt.plot(estimates[:, 0], estimates[:, 1], 'b-', label='Kalman Filter')
plt.legend()
plt.xlabel('X Position')
plt.ylabel('Y Position')
plt.title('Kalman Filter Tracking')
plt.show()
```

## Advantages

- **Optimal**: Minimises mean squared error for linear Gaussian systems
- **Recursive**: Only requires current measurement and previous estimate
- **Efficient**: Computationally lightweight
- **Real-time capable**: Suitable for online applications

## Limitations

- **Linearity assumption**: Only optimal for linear systems
- **Gaussian noise assumption**: Performance degrades with non-Gaussian noise
- **Model accuracy**: Requires accurate system model
- **Matrix inversion**: Can be numerically unstable

## Applications

- **GPS navigation**: Position and velocity estimation
- **Sensor fusion**: Combining multiple sensor readings
- **Target tracking**: Radar and sonar tracking
- **Economic forecasting**: Time series prediction
- **Robot localisation**: Estimating robot pose
- **Spacecraft navigation**: Attitude and position estimation

## Variants

- **Extended Kalman Filter (EKF)**: For nonlinear systems
- **Unscented Kalman Filter (UKF)**: Better nonlinear approximation
- **Information Filter**: Inverse covariance form
- **Square-Root Filter**: Numerical stability improvement
- **Ensemble Kalman Filter**: For high-dimensional systems

---

## References

- [Kalman Filter - Wikipedia](https://en.wikipedia.org/wiki/Kalman_filter)
- [Understanding the Kalman Filter - MATLAB](https://www.mathworks.com/videos/understanding-kalman-filters-part-1-why-use-kalman-filters--1485813028675.html)
- [Kalman Filter Tutorial - Bilgin's Blog](http://bilgin.esme.org/BitsAndBytes/KalmanFilterforDummies)
