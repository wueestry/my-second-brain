---
{"publish":true,"title":"Phase Plot","created":"2025-08-07 11:18","modified":"2025-11-03T20:33:52.208+01:00","tags":["engineering/control-theory/frequency-response/bode/phase-plot"],"cssclasses":"center-images"}
---


# PHASE PLOT

---

The **phase plot** is one component of a [[distilled-notes/bode-plot\|Bode plot]] that displays the phase angle of a system's frequency response as a function of frequency. It reveals how the system shifts the phase of sinusoidal input signals at different frequencies.

## Mathematical Representation

The phase angle is plotted in degrees (or radians) against frequency on a logarithmic scale:

$$
\phi(\omega) = \angle H(j\omega) = \arctan\left(\frac{\text{Im}\{H(j\omega)\}}{\text{Re}\{H(j\omega)\}}\right)
$$

Where:

- $H(j\omega)$ is the transfer function evaluated at frequency $\omega$
- $\phi(\omega)$ is the phase angle in degrees or radians
- $\omega$ is the angular frequency in rad/s
- $\text{Im}\{H(j\omega)\}$ and $\text{Re}\{H(j\omega)\}$ are the imaginary and real parts

## Scaling

- **Horizontal axis**: Frequency $\omega$ (logarithmic scale)
- **Vertical axis**: Phase angle $\phi$ (linear scale), typically in degrees

The logarithmic frequency scale allows wide frequency ranges to be displayed, while the linear phase scale directly shows the phase shift.

## Key Features

The phase plot reveals:

- **Phase lag/lead**: Negative values indicate lag (output delayed), positive values indicate lead (output advanced)
- **Phase crossover frequency**: Frequency where phase equals $-180°$ (critical for [[distilled-notes/bode-phase-margin\|phase margin]])
- **Phase contribution**: How different poles and zeros affect overall system phase
- **Minimum phase behaviour**: Whether the system has all poles and zeros in the left half-plane

## Typical Phase Characteristics

- **Low-pass systems**: Phase decreases from 0° toward $-90°$ per pole
- **High-pass systems**: Phase increases from 0° toward $+90°$ per zero
- **Time delays**: Contribute linearly increasing phase lag with frequency
- **Resonant systems**: Show rapid phase changes near resonant frequencies

## Interpretation

Phase plot is used to:

- Determine [[distilled-notes/bode-phase-margin\|phase margin]] for stability analysis
- Assess system time delay and phase lag
- Design compensation networks (lead, lag, lead-lag compensators)
- Analyse cascaded system behaviour (phases add for series connections)

## Applications

- Control system stability analysis
- Filter design and analysis
- Audio and signal processing
- Communication system phase response

---

## References

- Franklin, G. F., Powell, J. D., & Emami-Naeini, A. (2019). _Feedback Control of Dynamic Systems_ (8th ed.). Pearson.
- Ogata, K. (2010). _Modern Control Engineering_ (5th ed.). Prentice Hall.
- [Bode plot - Wikipedia](https://en.wikipedia.org/wiki/Bode_plot)
