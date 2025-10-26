---
{"publish":true,"title":"Hall Circle","created":"2024-08-08T00:00:00.000Z","modified":"2025-10-01T21:17:17.307+02:00","tags":["#graph-theory","#control-engineering","#control-systems","#mathematical-modeling","#science","#computer-science","#graph-traversal"],"cssclasses":"center-images"}
---


# HALL CIRCLE

---

Hall circles (also known as **M-circles** and **N-circles**) are a graphical tool used to obtain values of a closed-loop transfer function from a [[distilled-notes/nyquist-plot\|Nyquist plot]] of the associated open-loop transfer function.

![[meta/assets/hall-circle.png]]

Wherever the closed-loop transfer function $G_{cl}$ intersects an $M$ or $N$-circle, we can read the magnitude $|G_{cl}|$ and phase $\angle G_{cl}$ at a given frequency $\omega$

## Construction

### M-circles

Show the constant closed-loop magnitude of an open-loop Nyquist plot. Each circle $M$ can be calculated the following way:

$$
M =|G_{cl}|=\frac{|G(s)|}{|1+G(s)|}
$$

#### Bandwidth

The closed-loop bandwidth can be found by finding the intersection with the $-3dB$ $M$-circle

#### Plotting

The $x$ and $y$ positions of a $M$-circle with the magnitude $M_t$ can be calculated using:

$$
c_t = \frac{-M_t^2}{M_t^2-1} \qquad r_t = \frac{M_t}{M_t^2 -1}
$$

$$
x = c_t + r_t \cdot cos(\theta) \qquad y = r_t \cdot sin(\theta)
$$

### N-circles

Show the constant closed-loop phase of an open-loop Nyquist plot. Each circle $N$ can be calculated by:

$$
N = arg[ \frac{G(s)}{1+ G(s)}] = arg[(G(s)] - arg[1+ G(s)]
$$

#### Plotting

The $x$ and $y$ positions of a $N$-circle with the magnitude $M_s$ can be calculated using:

$$
x = -1 + \frac{cos(\theta)}{M_s} \qquad y = \frac{sin(\theta)}{M_s}
$$

---

## References
