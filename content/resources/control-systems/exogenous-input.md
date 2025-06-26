---
{"publish":true,"title":"Exogenous Input","created":"2024-11-08 13:50","tags":["#resource","#system-identification","#term"],"cssclasses":""}
---


# Exogenous Input

> [!abstract]
> Statistical model which represents output based on previous inputs.

## Definition

Type of statistical model that represents an output (dependent on time) as a linear combination of its **external input** variables.

$$
y(t) = c + b_1u(t-1) + b_2u(t-2) + ... + b_qu(t-q) + e(t)
$$
