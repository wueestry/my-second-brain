---
{"publish":true,"title":"Extended Kalman Filter","created":"2024-11-27 13:48","modified":"2025-11-03T20:27:08.267+01:00","tags":[null],"cssclasses":"center-images"}
---


# EXTENDED KALMAN FILTER

---

The **extended Kalman Filter (EKF)** is the _nonlinear_ version of the [[distilled-notes/kalman-filter\|Kalman Filter]].

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

## Key Differences from Standard Kalman Filter

| Feature          | Kalman Filter              | Extended Kalman Filter    |
| ---------------- | -------------------------- | ------------------------- |
| System model     | Linear                     | Nonlinear                 |
| State transition | $x_k = Ax_{k-1} + Bu_k$    | $x_k = f(x_{k-1}, u_k)$   |
| Observation      | $z_k = Hx_k$               | $z_k = h(x_k)$            |
| Linearisation    | Not required               | Uses Jacobian matrices    |
| Optimality       | Optimal for linear systems | Approximate for nonlinear |

## Limitations

- **Linearisation errors**: First-order Taylor expansion may be inaccurate for highly nonlinear systems
- **Jacobian computation**: Requires derivatives of nonlinear functions
- **Divergence risk**: Can diverge if linearisation is poor
- **Computational cost**: More expensive than linear KF due to Jacobian calculations

## Python Implementation

```python
import numpy as np

class ExtendedKalmanFilter:
    def __init__(self, f, h, F_jacobian, H_jacobian, Q, R, x0, P0):
        """
        f: state transition function
        h: observation function
        F_jacobian: Jacobian of f
        H_jacobian: Jacobian of h
        Q: process noise covariance
        R: measurement noise covariance
        """
        self.f = f
        self.h = h
        self.F_jacobian = F_jacobian
        self.H_jacobian = H_jacobian
        self.Q = Q
        self.R = R
        self.x = x0
        self.P = P0

    def predict(self, u=None):
        """Prediction step"""
        self.x = self.f(self.x, u)
        F = self.F_jacobian(self.x, u)
        self.P = F @ self.P @ F.T + self.Q

    def update(self, z):
        """Update step"""
        H = self.H_jacobian(self.x)
        y = z - self.h(self.x)  # Innovation
        S = H @ self.P @ H.T + self.R  # Innovation covariance
        K = self.P @ H.T @ np.linalg.inv(S)  # Kalman gain

        self.x = self.x + K @ y
        self.P = (np.eye(len(self.x)) - K @ H) @ self.P
```

## Example: Tracking a Moving Object

```python
import numpy as np

# State: [x, y, vx, vy]
def f(x, u, dt=0.1):
    """State transition: constant velocity model"""
    F = np.array([[1, 0, dt, 0],
                  [0, 1, 0, dt],
                  [0, 0, 1, 0],
                  [0, 0, 0, 1]])
    return F @ x

def h(x):
    """Observation: range and bearing"""
    px, py = x[0], x[1]
    r = np.sqrt(px**2 + py**2)
    theta = np.arctan2(py, px)
    return np.array([r, theta])

def F_jacobian(x, u):
    dt = 0.1
    return np.array([[1, 0, dt, 0],
                     [0, 1, 0, dt],
                     [0, 0, 1, 0],
                     [0, 0, 0, 1]])

def H_jacobian(x):
    px, py = x[0], x[1]
    r = np.sqrt(px**2 + py**2)
    return np.array([[px/r, py/r, 0, 0],
                     [-py/r**2, px/r**2, 0, 0]])

# Initialize EKF
Q = np.eye(4) * 0.1
R = np.diag([0.5, 0.01])
x0 = np.array([1.0, 1.0, 0.1, 0.1])
P0 = np.eye(4)

ekf = ExtendedKalmanFilter(f, h, F_jacobian, H_jacobian, Q, R, x0, P0)
```

## Applications

- **Robot localisation**: Estimating robot pose from sensor data
- **GPS/INS fusion**: Combining GPS and inertial measurements
- **SLAM**: Simultaneous localisation and mapping
- **Target tracking**: Tracking moving objects with nonlinear dynamics
- **Attitude estimation**: Estimating orientation from gyroscopes and accelerometers

## Alternatives

- **Unscented Kalman Filter (UKF)**: Uses sigma points instead of linearisation
- **Particle Filter**: Monte Carlo approach for highly nonlinear systems
- **Cubature Kalman Filter**: Uses cubature rules for integration

---

## References

- [Extended Kalman Filter - Wikipedia](https://en.wikipedia.org/wiki/Extended_Kalman_filter)
- [EKF Tutorial - MIT OpenCourseWare](https://ocw.mit.edu/)
- [State Estimation for Robotics - Barfoot](http://asrl.utias.utoronto.ca/~tdb/bib/barfoot_ser17.pdf)
