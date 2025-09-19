---
{"publish":true,"title":"Ziegler-Nichols Method","created":"2025-08-05 10:49","modified":"2025-09-17T12:38:24.083+02:00","tags":["pid-control","control-engineering","control-systems","tuning","control-loop","transfer-function","mathematics","resource"],"cssclasses":"center-images"}
---


# ZIEGLER NICHOLS METHOD

---

The **Ziegler-Nichols Method** is, one of the most widely used methods to tune a PID controller in a heuristic way, without the need of a mathematical model of the system.

## Steps

1. Set $I$ (integral) and $D$ (derivative) term to zero
2. Increase $P$ (proportional) gain $K_p$ until it reaches ultimate gain $K_u$ (stable output and consistent oscillation)
3. Use $K_u$ and $T_u$ ($\frac{1}{P_u}$) to set $P, I, D$ gains depending on the type of controller.

![[meta/assets/neutrally-stable-system.png|300]]

| Control Type             | $K_p$     | $T_i$     | $T_d$      | $K_i$                 | $K_d$         |
| ------------------------ | --------- | --------- | ---------- | --------------------- | ------------- |
| P                        | $0.5K_u$  | -         | -          | -                     | -             |
| PI                       | $0.45K_u$ | $0.83T_u$ | -          | $0.54\frac{K_u}{T_u}$ | -             |
| PD                       | $0.8K_u$  | -         | $0.125T_u$ | -                     | $0.1K_uT_u$   |
| classic PID              | $0.6K_u$  | $0.5T_u$  | $0.125T_u$ | $1.2\frac{K_u}{T_u}$  | $0.075K_uT_u$ |
| [[Pessen Integral Rule]] | $0.7K_u$  | $0.4T_u$  | $0.15T_u$  | $1.75\frac{K_u}{T_u}$ | $0.105K_uT_u$ |
| some overshoot           | $0.33K_u$ | $0.5T_u$  | $0.33T_u$  | $0.66\frac{K_u}{T_u}$ | $0.11K_uT_u$  |
| no overshoot             | $0.2K_u$  | $0.5T_u$  | $0.33T_u$  | $0.4\frac{K_u}{T_u}$  | $0.066K_uT_u$ |

With the ultimate gain $K_u$ being defined as $\frac{1}{M}$, where $M=$ the amplitude ratio, $K_i = \frac{K_p}{T_i}$ and $K_d = K_pT_d$.

---

## References
