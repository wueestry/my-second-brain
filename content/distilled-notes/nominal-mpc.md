---
{"publish":true,"title":"Nominal MPC","created":"2025-04-01 16:24","modified":"2025-10-01T21:17:17.305+02:00","tags":["#control-engineering","#control-systems","#optimization","#algorithms","#mathematics","#model-predictive-control","#linear-systems"],"cssclasses":"center-images"}
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

---

## References
