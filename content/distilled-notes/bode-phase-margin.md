---
{"publish":true,"title":"Phase Margin","created":"2025-08-07 11:37","modified":"2025-11-03T20:31:27.785+01:00","tags":["electrical-engineering/bode-plot/bode-maginitude-plot"],"cssclasses":"center-images"}
---


# PHASE MARGIN (PM)

---

The **Phase Margin** (PM) is a stability measure in control systems that indicates how much additional phase lag can be tolerated before the closed-loop system becomes unstable. It is one of the [[distilled-notes/bode-stability-margins\|stability margins]] derived from the [[distilled-notes/bode-plot\|Bode plot]].

## Definition

Phase margin is measured at the **gain crossover frequency** ($\omega_{gc}$), which is the frequency where the open-loop magnitude equals unity (0 dB):

$$
\text{PM} = 180° + \angle G(j\omega_{gc})
$$

Where:

- $G(j\omega)$ is the open-loop transfer function
- $\omega_{gc}$ is the gain crossover frequency where $|G(j\omega_{gc})| = 1$ (or 0 dB)
- $\angle G(j\omega_{gc})$ is the phase angle at the gain crossover frequency

## Graphical Interpretation

![[meta/assets/gain-phase-margin.png]]

On the [[distilled-notes/bode-phase-plot\|Bode phase plot]], the phase margin is the vertical distance from the phase curve to the $-180°$ line at the gain crossover frequency.

## Stability Criteria

- **PM > 0°**: System is stable; has phase margin
- **PM = 0°**: System is marginally stable; on the edge of instability
- **PM < 0°**: System is unstable

## Practical Guidelines

For robust control system design:

- **Minimum recommended PM**: 30°
- **Good design target**: 45°-60°
- **Excellent robustness**: 60°-90°

Phase margin directly affects:

- **Overshoot**: Lower PM → higher overshoot in step response
- **[[distilled-notes/settling-time\|Settling time]]**: Lower PM → longer settling time
- **Robustness**: Higher PM → greater tolerance to parameter variations

## Relationship to Damping

Phase margin is approximately related to the damping ratio $\zeta$ of a second-order system:

$$
\text{PM} \approx 100\zeta \quad \text{(for } \zeta < 0.6\text{)}
$$

For example:

- PM = 45° corresponds to $\zeta \approx 0.45$ (moderate damping)
- PM = 60° corresponds to $\zeta \approx 0.6$ (good damping)

## Physical Meaning

The phase margin answers: "How much more phase lag can the system tolerate before it oscillates or becomes unstable?" A higher PM indicates a more stable system with better transient response characteristics.

---

## References

- Franklin, G. F., Powell, J. D., & Emami-Naeini, A. (2019). _Feedback Control of Dynamic Systems_ (8th ed.). Pearson.
- Ogata, K. (2010). _Modern Control Engineering_ (5th ed.). Prentice Hall.
- [Phase margin - Wikipedia](https://en.wikipedia.org/wiki/Gain_margin_and_phase_margin)
