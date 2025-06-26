---
{"publish":true,"title":"Hall Circle","created":"2024-08-08","tags":["#control-systems","#resource","#term"],"cssclasses":""}
---


# Hall Circle

> [!abstact]
> Hall circles (also known as **M-circles** and **N-circles**) are a graphical tool used to obtain values of a closed-loop transfer function from a Nyquist Plot of the associated open-loop transfer function.

![[resources/control-systems/assets/hall-circle.png]]

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
