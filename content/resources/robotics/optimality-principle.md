---
{"publish":true,"title":"Optimality Principle","created":"2024-10-15 14:29","tags":["#mathematics","#resource","#theorem"],"cssclasses":""}
---


# Optimality Principle

> [!abstract]
> Optimal paths are made of optimal (sub-)paths. Hence, we can construct long optimal paths by putting together shorter optimal paths.

## Idea

- Let $P = (s, ..., v, ..., g)$ be an optimal path from $s$ to $g$. Then for any $v \in P$:
  - The sub-path $P_v = (v, ..., g)$ is itself an optimal path (from $v$ to $g$).
  - The cost of the sub-path $P_v$ is equal to the optimal cost to go from $v$ to $g$, $h^*(v)$
  - If $v$ and $v'$ are two consecutive states on the optimal path, then
    $$
    h^*(v) = min_{(v,a,v')}[w(v,a,v') + h^*(v')]
    $$
- Since we know that $h^*(g) = 0$, we can reconstruct $h^*$ for all other states working backwards from the goal. Eventually we will be able to compute $h^*$ for the initial state, and hence reconstruct the whole path
