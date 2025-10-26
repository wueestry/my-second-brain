---
{"publish":true,"title":"Zero-Order Hold","created":"2025-08-05 10:53","modified":"2025-10-01T21:17:17.308+02:00","tags":["#linear-time-invariant-system","#z-transform","#control-engineering","#control-systems","#mathematics","#signal-processing","#transfer-function"],"cssclasses":"center-images"}
---


# ZERO-ORDER HOLD

---

The zero-order hold (ZOH) is a mathematical model of the practical signal reconstruction done by a digital-to-analog converter.

- Provides an exact match between the continuous- and discrete-time systems in the time domain for staircase inputs
- Block generates the continuous time input signal $u(t)$ by holding each sample value $u(k)$ constant over one sample period:
  $$
  u(t) = u[k] \rightarrow kT_s \leq t \leq (k+1)T_s
  $$

![[meta/assets/zero-order-hold.png]]

## Time-domain Model

Reconstructs the continuous-time waveform from a sample sequence $x[n]$, assuming one sample per time interval $T$

$$
x_{ZOH}(t) = \sum_{n = -\infty}^{\infty} x[n] \cdot rect(\frac{t-T/2-nT}{T})
$$

where $rect(.)$ is the rectangular function.

## Frequency-domain Model

Equation can also be modelled as the output of a linear time-invariant filter with impulse response equal to a rect function.

In this method, a sequence of Dirac impulses, $x_s(t)$, representing the discrete samples, $x[n]$, is low-pass filtered to recover a continuous-time signal, $x(t)$.

Begin by defining a continuous-time signal from the sample values, as above but using delta functions instead of rect functions:

$$
x_s(t) = \sum_{n=-\infty}^{\infty} x[n] \cdot \delta(\frac{t-nT}{T})= T \sum_{n = -\infty}^{\infty} x[n] \cdot \delta(t - nT)
$$

## Limitations

- Can not convert [[distilled-notes/linear-time-invariant-system\|Linear Time Invariant System]] (LTI) models with poles at $z = 0$
- Discrete-time LTI models having negative real poles, ZOH produces a continuous system with higher order

---

## References
