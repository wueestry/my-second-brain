---
{"publish":true,"title":"Gain Margin","created":"2025-08-07 11:31","modified":"2025-11-03T20:33:46.484+01:00","tags":["engineering/control-theory/frequency-response/bode/gain-margin"],"cssclasses":"center-images"}
---


# GAIN MARGIN (GM)

---

The **Gain Margin** (GM) is a stability measure in control systems that indicates how much the system gain can be increased before the closed-loop system becomes unstable. It is one of the [[distilled-notes/bode-stability-margins\|stability margins]] derived from the [[distilled-notes/bode-plot\|Bode plot]].

## Definition

Gain margin is measured at the **phase crossover frequency** ($\omega_{pc}$), which is the frequency where the phase angle equals $-180°$:

$$
\text{GM} = \frac{1}{|G(j\omega_{pc})|}
$$

In decibels:

$$
\text{GM}_{dB} = -20\log_{10}|G(j\omega_{pc})|
$$

Where:

- $G(j\omega)$ is the open-loop transfer function
- $\omega_{pc}$ is the phase crossover frequency where $\angle G(j\omega_{pc}) = -180°$
- $|G(j\omega_{pc})|$ is the magnitude at the phase crossover frequency

## Graphical Interpretation

![[meta/assets/gain-phase-margin.png]]

On the [[distilled-notes/bode-magnitude-plot\|Bode magnitude plot]], the gain margin is the vertical distance (in dB) from the magnitude curve to the 0 dB line at the phase crossover frequency.

## Stability Criteria

- **GM > 1** (or **GM > 0 dB**): System has gain margin; typically stable
- **GM = 1** (or **GM = 0 dB**): System is marginally stable; on the edge of instability
- **GM < 1** (or **GM < 0 dB**): System is unstable or has negative gain margin

## Practical Guidelines

For robust control system design:

- **Minimum recommended GM**: 6 dB (factor of 2)
- **Typical design target**: 10-20 dB
- Higher gain margin provides greater robustness to parameter variations and modeling uncertainties

## Physical Meaning

The gain margin answers: "By what factor can we amplify the loop gain before the system becomes unstable?" For example, a GM of 10 dB means the gain can be increased by approximately 3.16 times before instability occurs.

---

## References

- Franklin, G. F., Powell, J. D., & Emami-Naeini, A. (2019). _Feedback Control of Dynamic Systems_ (8th ed.). Pearson.
- Ogata, K. (2010). _Modern Control Engineering_ (5th ed.). Prentice Hall.
- [Gain margin - Wikipedia](https://en.wikipedia.org/wiki/Gain_margin_and_phase_margin)
