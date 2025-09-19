---
{"publish":true,"title":"Model Predictive Control","created":"2025-01-16 13:40","modified":"2025-09-17T12:43:49.842+02:00","tags":["control-systems","control-engineering","mathematics","optimization","algorithms","model-predictive-control","receding-horizon-control","dynamic-systems"],"cssclasses":"center-images"}
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

---

## References
