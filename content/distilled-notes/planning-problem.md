---
{"publish":true,"title":"Planning Problem","created":"2024-09-17 13:18","modified":"2025-08-18T12:58:14.305+02:00","tags":["#resource"],"cssclasses":"center-images"}
---


# PLANNING PROBLEM

---

A **Planning Problem** is used to determine where a robot should move to on a longer time-horizon.

## Planning vs. Control

- Mission Planning: What to do, objectives, constraints, priorities
- Motion Planning: How to reach the objective, satisfying the constraints and priorities
- Control: Fine tuning, noise/disturbance rejection

| (roughly)        | Time horizon | Distance   | Rate      | Search               |
| ---------------- | ------------ | ---------- | --------- | -------------------- |
| Mission Planning | > 100 s      | > 100 m    | < 0.1 Hz  | Exegenous            |
| Motion Planning  | 1 - 10 s     | 10 - 100 m | 1 - 10 Hz | Global/Combinatorial |
| Control          | 1 s          | < 10 m     | > 10 Hz   | Local/Continuous     |

## Elements of a Planning Problem

- A [[State Space]]
- A [[Transition System]] describing over actions changes in the state over time, generating a plan.
- An [[Objective]] or [[Goal]], i.e., something that we would like to eventually happen.
- A set of [[Constraints]], i.e., something that we would like to never happen.
- A way to decide which solutions (plans reaching the objective while satisfying the constraints) are better than others. Often described by a [[Cost Function]] or [[Reward Function]]

---

## References
