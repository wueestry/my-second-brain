---
{"publish":true,"title":"Proportional Control","created":"2025-08-06 15:39","modified":"2025-08-18T12:58:14.317+02:00","tags":["#resource"],"cssclasses":"center-images"}
---


# PROPORTIONAL CONTROL

---

**Proportional control** means that the feedback control signal is directly and linearly proportional to the system error.
The controller output is given by

$$
u(t) = k_p \cdot e(t)
$$

where $e(t)$ is the error signal

## Advantages

- Reduces steady-state errors as the primary benefit.
- Larger proportional gain $k_p$ leads to a smaller steady-state error for a constant input.
- Provides a quick response to an error signal, affecting the system's [[transient-response\|transient response]].

## Limitations

- Too big increases in proportional feedback gain result in a destabilisation of the system.

---

## References
