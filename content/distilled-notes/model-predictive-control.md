---
{"publish":true,"title":"Model Predictive Control","created":"2025-01-16 13:40","modified":"2025-11-03T20:43:47.201+01:00","tags":["engineering/control-theory/model-predictive-control"],"cssclasses":"center-images"}
---


# MODEL PREDICTIVE CONTROL

---

**Model predictive control (MPC)** is an advanced control method relying on dynamical models to achieve an optimal solution over a finite time horizon.

The models used in MPC are generally intended to represent the behaviour of more complex systems then in a PID controller.

## Theory

MPC is based on iterative, finite-horizon optimisation of a model. At each time step the plant state is sampled and the cost function is minimised over the finite time horizon $[t,t+T]$.
After each executed step of the control strategy, the calculations are repeated from the new current state. For this reason MPC is also called **receding horizon control**.

## Basic Formula

$$
\begin{equation}
\begin{split}
min_{x_i, u_i} & \sum^{N-1}_{i=0} I(x_i, u_i)\\
s.t \qquad & x_{i+1} = f(x_i, u_i) \\
& x_i \in \mathcal{X} \\
& u_i \in \mathcal{U} \\
& x_0 = x(k)
\end{split}
\end{equation}
$$

The problem is defined by:

- **Objective** $I(x,u)$ that is minimised
- Internal **system model** to predict system behaviour
- **Constraints** that have to be satisfied

![[meta/assets/mpc-plant.png]]

## Key Concepts

### Prediction Horizon ($N$)

The number of time steps into the future that the controller predicts. Longer horizons improve optimality but increase computational cost.

### Control Horizon

The number of future control moves that are optimised. Often shorter than the prediction horizon.

### Receding Horizon

After computing the optimal control sequence, only the first control action is applied. The optimisation is then repeated with updated measurements.

### Cost Function Components

1. **Tracking error**: Penalises deviation from reference trajectory
2. **Control effort**: Penalises large or aggressive control actions
3. **Terminal cost**: Ensures stability by penalising final state deviation

## Advantages

- **Handles constraints**: Naturally incorporates input/output constraints
- **Multivariable**: Can control MIMO (multiple-input multiple-output) systems
- **Optimal control**: Minimises cost function over prediction horizon
- **Predictive**: Anticipates future behaviour using system model
- **Flexible**: Can accommodate various objectives and constraints

## Disadvantages

- **Computational cost**: Requires solving optimisation problem at each time step
- **Model dependency**: Performance degrades if model is inaccurate
- **Tuning complexity**: Requires selection of weights, horizons, and constraints
- **Real-time requirements**: May be challenging for fast dynamics

## MPC vs PID

| Aspect        | MPC                            | PID                                 |
| ------------- | ------------------------------ | ----------------------------------- |
| Model         | Requires system model          | Model-free                          |
| Constraints   | Handles constraints explicitly | No constraint handling              |
| Multivariable | Native MIMO capability         | Requires tuning loops independently |
| Prediction    | Predictive control             | Reactive control                    |
| Computation   | High (optimisation)            | Low (algebraic)                     |
| Tuning        | Complex (many parameters)      | Simple (3 gains)                    |

## Python Implementation Example

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy.optimize import minimize

class LinearMPC:
    """Simple linear MPC controller"""

    def __init__(self, A, B, Q, R, N, dt):
        """
        Initialize MPC controller

        Args:
            A: State transition matrix (n x n)
            B: Input matrix (n x m)
            Q: State cost matrix (n x n)
            R: Input cost matrix (m x m)
            N: Prediction horizon
            dt: Time step
        """
        self.A = A
        self.B = B
        self.Q = Q
        self.R = R
        self.N = N
        self.dt = dt

        self.n_states = A.shape[0]
        self.n_inputs = B.shape[1]

    def predict(self, x0, u_sequence):
        """Predict state trajectory given initial state and input sequence"""
        x = x0.copy()
        states = [x]

        for u in u_sequence:
            x = self.A @ x + self.B @ u
            states.append(x)

        return np.array(states)

    def cost_function(self, u_flat, x0, x_ref):
        """
        Compute cost for given input sequence

        Args:
            u_flat: Flattened input sequence (N * m,)
            x0: Initial state (n,)
            x_ref: Reference trajectory (N+1, n)

        Returns:
            Total cost
        """
        # Reshape input sequence
        u_sequence = u_flat.reshape((self.N, self.n_inputs))

        # Predict trajectory
        x_trajectory = self.predict(x0, u_sequence)

        # Compute cost
        cost = 0.0
        for i in range(self.N):
            # State tracking error
            x_error = x_trajectory[i] - x_ref[i]
            cost += x_error.T @ self.Q @ x_error

            # Control effort
            cost += u_sequence[i].T @ self.R @ u_sequence[i]

        # Terminal cost
        x_error = x_trajectory[-1] - x_ref[-1]
        cost += x_error.T @ self.Q @ x_error

        return cost

    def solve(self, x0, x_ref, u_min=None, u_max=None):
        """
        Solve MPC optimisation problem

        Args:
            x0: Current state (n,)
            x_ref: Reference trajectory (N+1, n)
            u_min: Minimum input constraint (m,)
            u_max: Maximum input constraint (m,)

        Returns:
            Optimal input sequence (N, m)
        """
        # Initial guess (zero inputs)
        u0 = np.zeros(self.N * self.n_inputs)

        # Input constraints
        bounds = None
        if u_min is not None and u_max is not None:
            bounds = [(u_min[i % self.n_inputs], u_max[i % self.n_inputs])
                     for i in range(self.N * self.n_inputs)]

        # Solve optimisation
        result = minimize(
            fun=self.cost_function,
            x0=u0,
            args=(x0, x_ref),
            method='SLSQP',
            bounds=bounds
        )

        # Extract optimal input sequence
        u_opt = result.x.reshape((self.N, self.n_inputs))

        return u_opt

# Example: Mass-spring-damper system
def simulate_mpc():
    """Simulate MPC control of a mass-spring-damper system"""

    # System parameters
    m = 1.0    # mass
    k = 1.0    # spring constant
    c = 0.5    # damping coefficient
    dt = 0.1   # time step

    # Continuous-time state-space model
    # x = [position, velocity]
    # dx/dt = [velocity, -k/m * position - c/m * velocity + 1/m * force]
    A_cont = np.array([
        [0, 1],
        [-k/m, -c/m]
    ])
    B_cont = np.array([
        [0],
        [1/m]
    ])

    # Discretise using zero-order hold
    A = np.eye(2) + A_cont * dt
    B = B_cont * dt

    # MPC parameters
    Q = np.diag([10.0, 1.0])  # State weights
    R = np.array([[0.1]])      # Input weight
    N = 20                     # Prediction horizon

    # Create MPC controller
    mpc = LinearMPC(A, B, Q, R, N, dt)

    # Simulation parameters
    T = 10.0
    t = np.arange(0, T, dt)
    n_steps = len(t)

    # Reference trajectory (step response)
    x_ref = np.zeros((N+1, 2))
    x_ref[:, 0] = 1.0  # Desired position = 1.0

    # Initial state
    x = np.array([0.0, 0.0])

    # Input constraints
    u_min = np.array([-5.0])
    u_max = np.array([5.0])

    # Storage
    x_history = [x]
    u_history = []

    # Simulation loop
    for i in range(n_steps - 1):
        # Solve MPC
        u_opt = mpc.solve(x, x_ref, u_min, u_max)

        # Apply first control action
        u = u_opt[0]
        u_history.append(u)

        # Simulate system
        x = A @ x + B @ u
        x_history.append(x)

    # Convert to arrays
    x_history = np.array(x_history)
    u_history = np.array(u_history)

    # Plot results
    fig, (ax1, ax2, ax3) = plt.subplots(3, 1, figsize=(12, 10))

    # Position
    ax1.plot(t, x_history[:, 0], 'b-', linewidth=2, label='Position')
    ax1.axhline(y=1.0, color='r', linestyle='--', label='Reference')
    ax1.set_ylabel('Position (m)', fontsize=12)
    ax1.set_title('MPC Control of Mass-Spring-Damper System', fontsize=14)
    ax1.grid(True, alpha=0.3)
    ax1.legend(fontsize=10)

    # Velocity
    ax2.plot(t, x_history[:, 1], 'g-', linewidth=2, label='Velocity')
    ax2.set_ylabel('Velocity (m/s)', fontsize=12)
    ax2.grid(True, alpha=0.3)
    ax2.legend(fontsize=10)

    # Control input
    ax3.plot(t[:-1], u_history[:, 0], 'r-', linewidth=2, label='Force')
    ax3.axhline(y=u_max[0], color='k', linestyle='--', alpha=0.5, label='Constraints')
    ax3.axhline(y=u_min[0], color='k', linestyle='--', alpha=0.5)
    ax3.set_xlabel('Time (s)', fontsize=12)
    ax3.set_ylabel('Force (N)', fontsize=12)
    ax3.grid(True, alpha=0.3)
    ax3.legend(fontsize=10)

    plt.tight_layout()
    plt.show()

if __name__ == "__main__":
    simulate_mpc()
```

## Applications

- **Chemical process control**: Refineries, distillation columns, reactors
- **Automotive**: Adaptive cruise control, lane keeping, engine control
- **Aerospace**: Flight control, trajectory optimisation
- **Robotics**: Manipulation, trajectory tracking, motion planning
- **Power systems**: Grid control, renewable energy integration
- **Building HVAC**: Temperature and energy optimisation

---

## References

- [Model Predictive Control - MIT OpenCourseWare](https://ocw.mit.edu/courses/mechanical-engineering/)
- [MPC Tutorial - IEEE Control Systems Magazine](https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=37)
- [Introduction to Model Predictive Control](https://www.mathworks.com/help/mpc/)
- [Predictive Control for Linear and Hybrid Systems - Cambridge University Press](https://www.cambridge.org/)
