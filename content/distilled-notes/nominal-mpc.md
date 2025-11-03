---
{"publish":true,"title":"Nominal MPC","created":"2025-04-01 16:24","modified":"2025-11-03T20:43:36.616+01:00","tags":["engineering/control-theory/model-predictive-control/nominal"],"cssclasses":"center-images"}
---


# NOMINAL MODEL-PREDICTIVE CONTROL

---

Nominal MPC is a foundational type of [[distilled-notes/model-predictive-control\|Model Predictive Control]] that uses a simplified, **linear and time-invariant (LTI)** model of the system to predict future behaviour and optimize control actions. It’s called "nominal" because it's based on a "nominal" or average system model – often ignoring nonlinearities, disturbances, and uncertainties for simplicity.

## What it is:

Imagine you're trying to steer a car. Nominal MPC creates a basic "model" of the car (how it responds to steering and acceleration) based on assumptions. It then uses this model to predict where the car will be a few steps into the future, based on different possible steering and acceleration inputs. The controller chooses the inputs that keep the car closest to the desired path, while also respecting any limits on steering and acceleration. This is done over a limited "prediction horizon". Only the first control action is applied, then the process repeats using updated measurements.

## Usage:

- **Process Control:** Widely used in chemical plants, refineries, and other industrial processes where tight control is needed.
- **Robotics:** Can be used for trajectory tracking and control of robotic arms.
- **Automotive:** Serves as a starting point for more advanced MPC implementations in autonomous driving.
- **Simulations:** Allows for testing and development of more complex control strategies.

## General Formula:

The core of nominal MPC involves solving an optimisation problem at each time step `k`:

$$
\min_{u(k)} J(x(k), u(k)) = \sum_{i=1}^{N} \left[ (x(i) - r(i))^T Q (x(i) - r(i)) + u(i)^T R u(i) \right]
$$

subject to.

$$
x(i+1) = A x(i) + B u(i)
$$

$$
u(i) \in U
$$

Where:

- $x(k)$: State vector at time step `k`
- $u(k)$: Input (control) vector at time step `k`
- $r(i)$: Reference (desired) state vector at time step `i`
- $A$: System matrix (representing the dynamics of the system).
- $B$: Input matrix (describes, how inputs affect the state).
- $Q$: State weighting matrix (positive semi-definite). Penalises deviations from the desired state.
- $R$: Input weighting matrix (positive definite). Penalises large control efforts.
- $U$: Set of admissible input values (input constraints).
- $i$: Time index within the prediction horizon.
- $\sum$ : Summation over the prediction horizon

## Important Notes:

- This is a simplified form. Real-world MPC implementations often include more complex constraints, cost functions, and constraints.
- The `A` and `B` matrices are derived from the linearised system model.
- Nominal MPC's performance is heavily reliant on the accuracy of the model. If the model is significantly different from the actual system, performance can suffer. More advanced MPC techniques (e.g., robust MPC, nonlinear MPC) address these limitations.

## Assumptions and Limitations

### Assumptions

1. **Linear system**: Dynamics can be approximated by linear equations
2. **Time-invariant**: System parameters don't change over time
3. **Perfect model**: The model accurately represents the real system
4. **No disturbances**: External disturbances are not explicitly modelled
5. **Full state measurement**: All states are measurable or observable

### Limitations

1. **Model mismatch**: Performance degrades with modelling errors
2. **Disturbance rejection**: Poor handling of unmeasured disturbances
3. **Nonlinear systems**: May require frequent re-linearisation
4. **Constraint violation**: No robustness guarantees for constraints
5. **Computational cost**: Real-time optimisation may be challenging

## When to Use Nominal MPC

**Good fit**:

- Systems with well-understood linear dynamics
- Slow processes with sufficient computation time
- Applications where constraints are critical
- Multi-variable control problems
- When feedforward prediction is beneficial

**Poor fit**:

- Highly nonlinear systems
- Systems with significant uncertainties
- Fast dynamics requiring rapid control updates
- Safety-critical systems without robustness guarantees
- Simple control problems better suited for PID

## Python Implementation Example

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy.linalg import solve_discrete_are
from scipy.optimize import minimize

class NominalMPC:
    """Nominal MPC controller for linear systems"""

    def __init__(self, A, B, Q, R, N, x_min=None, x_max=None,
                 u_min=None, u_max=None):
        """
        Initialize Nominal MPC controller

        Args:
            A: State matrix (n x n)
            B: Input matrix (n x m)
            Q: State cost matrix (n x n)
            R: Input cost matrix (m x m)
            N: Prediction horizon
            x_min: State lower bounds (n,)
            x_max: State upper bounds (n,)
            u_min: Input lower bounds (m,)
            u_max: Input upper bounds (m,)
        """
        self.A = A
        self.B = B
        self.Q = Q
        self.R = R
        self.N = N

        self.n = A.shape[0]  # number of states
        self.m = B.shape[1]  # number of inputs

        self.x_min = x_min if x_min is not None else -np.inf * np.ones(self.n)
        self.x_max = x_max if x_max is not None else np.inf * np.ones(self.n)
        self.u_min = u_min if u_min is not None else -np.inf * np.ones(self.m)
        self.u_max = u_max if u_max is not None else np.inf * np.ones(self.m)

        # Compute terminal cost matrix (infinite horizon LQR)
        self.P = solve_discrete_are(A, B, Q, R)

    def objective(self, u_vec, x0, r):
        """
        Compute MPC objective function

        Args:
            u_vec: Flattened control sequence (N*m,)
            x0: Initial state (n,)
            r: Reference state (n,)

        Returns:
            Cost value
        """
        U = u_vec.reshape((self.N, self.m))

        x = x0
        cost = 0.0

        for k in range(self.N):
            u = U[k]

            # Stage cost
            x_error = x - r
            cost += x_error @ self.Q @ x_error + u @ self.R @ u

            # Predict next state
            x = self.A @ x + self.B @ u

        # Terminal cost
        x_error = x - r
        cost += x_error @ self.P @ x_error

        return cost

    def state_constraints(self, u_vec, x0):
        """
        Compute state constraint violations

        Args:
            u_vec: Flattened control sequence
            x0: Initial state

        Returns:
            Constraint violation array
        """
        U = u_vec.reshape((self.N, self.m))

        x = x0
        constraints = []

        for k in range(self.N):
            u = U[k]

            # Predict next state
            x = self.A @ x + self.B @ u

            # State constraints: x_min <= x <= x_max
            constraints.extend(x - self.x_min)  # x >= x_min
            constraints.extend(self.x_max - x)  # x <= x_max

        return np.array(constraints)

    def solve(self, x0, r, u_init=None):
        """
        Solve MPC optimisation problem

        Args:
            x0: Current state (n,)
            r: Reference state (n,)
            u_init: Initial guess for control sequence (N, m)

        Returns:
            Optimal control input (m,)
        """
        # Initial guess
        if u_init is None:
            u_init = np.zeros((self.N, self.m))
        u_vec0 = u_init.flatten()

        # Input bounds
        bounds = []
        for k in range(self.N):
            for i in range(self.m):
                bounds.append((self.u_min[i], self.u_max[i]))

        # State constraints
        constraints = []
        if np.all(np.isfinite(self.x_min)) or np.all(np.isfinite(self.x_max)):
            constraints.append({
                'type': 'ineq',
                'fun': lambda u: self.state_constraints(u, x0)
            })

        # Solve optimisation
        result = minimize(
            fun=lambda u: self.objective(u, x0, r),
            x0=u_vec0,
            method='SLSQP',
            bounds=bounds,
            constraints=constraints,
            options={'maxiter': 100, 'ftol': 1e-6}
        )

        if not result.success:
            print(f"Warning: Optimisation failed: {result.message}")

        # Extract first control input
        U_opt = result.x.reshape((self.N, self.m))
        return U_opt[0]

# Example: Double integrator system
def simulate_double_integrator():
    """Simulate nominal MPC for double integrator"""

    # System: double integrator (position and velocity)
    # x = [position, velocity]
    # u = [acceleration]
    dt = 0.1
    A = np.array([[1, dt],
                  [0, 1]])
    B = np.array([[0.5 * dt**2],
                  [dt]])

    # MPC parameters
    Q = np.diag([10.0, 1.0])   # State weights
    R = np.array([[0.1]])       # Input weight
    N = 20                      # Prediction horizon

    # Constraints
    x_min = np.array([-10, -5])
    x_max = np.array([10, 5])
    u_min = np.array([-2])
    u_max = np.array([2])

    # Create controller
    mpc = NominalMPC(A, B, Q, R, N, x_min, x_max, u_min, u_max)

    # Simulation
    T = 10.0
    t = np.arange(0, T, dt)
    n_steps = len(t)

    # Reference trajectory (step input)
    r = np.array([5.0, 0.0])

    # Initial state
    x = np.array([0.0, 0.0])

    # Storage
    x_hist = [x.copy()]
    u_hist = []

    # Simulation loop
    for i in range(n_steps - 1):
        # Compute control
        u = mpc.solve(x, r)
        u_hist.append(u.copy())

        # Apply control (with some noise)
        noise = np.random.normal(0, 0.01, size=A.shape[0])
        x = A @ x + B @ u + noise

        # Enforce state constraints (physical limits)
        x = np.clip(x, x_min, x_max)

        x_hist.append(x.copy())

    # Convert to arrays
    x_hist = np.array(x_hist)
    u_hist = np.array(u_hist)

    # Plot results
    fig, axes = plt.subplots(3, 1, figsize=(12, 10))

    # Position
    axes[0].plot(t, x_hist[:, 0], 'b-', linewidth=2, label='Position')
    axes[0].axhline(r[0], color='r', linestyle='--', label='Reference')
    axes[0].axhline(x_max[0], color='k', linestyle=':', alpha=0.5)
    axes[0].axhline(x_min[0], color='k', linestyle=':', alpha=0.5)
    axes[0].set_ylabel('Position (m)', fontsize=12)
    axes[0].set_title('Nominal MPC: Double Integrator', fontsize=14)
    axes[0].grid(True, alpha=0.3)
    axes[0].legend(fontsize=10)

    # Velocity
    axes[1].plot(t, x_hist[:, 1], 'g-', linewidth=2, label='Velocity')
    axes[1].axhline(x_max[1], color='k', linestyle=':', alpha=0.5, label='Constraints')
    axes[1].axhline(x_min[1], color='k', linestyle=':', alpha=0.5)
    axes[1].set_ylabel('Velocity (m/s)', fontsize=12)
    axes[1].grid(True, alpha=0.3)
    axes[1].legend(fontsize=10)

    # Control input
    axes[2].plot(t[:-1], u_hist, 'r-', linewidth=2, label='Acceleration')
    axes[2].axhline(u_max[0], color='k', linestyle='--', alpha=0.5, label='Limits')
    axes[2].axhline(u_min[0], color='k', linestyle='--', alpha=0.5)
    axes[2].set_xlabel('Time (s)', fontsize=12)
    axes[2].set_ylabel('Acceleration (m/s²)', fontsize=12)
    axes[2].grid(True, alpha=0.3)
    axes[2].legend(fontsize=10)

    plt.tight_layout()
    plt.show()

if __name__ == "__main__":
    simulate_double_integrator()
```

## Comparison with Advanced MPC Variants

| Feature      | Nominal MPC           | Robust MPC              | Nonlinear MPC     |
| ------------ | --------------------- | ----------------------- | ----------------- |
| Model        | Linear, nominal       | Linear with uncertainty | Nonlinear         |
| Constraints  | Hard constraints      | Soft/probabilistic      | Hard constraints  |
| Disturbances | Ignored               | Explicitly modelled     | Can be included   |
| Complexity   | Low                   | Medium                  | High              |
| Guarantees   | Nominal stability     | Robust stability        | Depends on method |
| Applications | Well-modelled systems | Uncertain systems       | Nonlinear systems |

---

## References

- [Nominal MPC - ETH Zurich Lecture Notes](https://control.ee.ethz.ch/)
- [Model Predictive Control: Theory and Design - Rawlings et al.](https://sites.engineering.ucsb.edu/~jbraw/mpc/)
- [Linear Model Predictive Control - MATLAB Documentation](https://www.mathworks.com/help/mpc/linear-mpc.html)
- [Introduction to Model Predictive Control - IEEE Control Systems](https://ieeexplore.ieee.org/document/845037)
