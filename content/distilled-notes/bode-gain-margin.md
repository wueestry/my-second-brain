---
{"publish":true,"title":"Gain Margin","created":"2025-08-07 11:31","modified":"2025-09-22T10:29:58.542+02:00","tags":["#control-systems","#stability","#bode-plot","#signal-processing","#feedback-systems"],"cssclasses":"center-images"}
---


# GAIN MARGIN (GM)

---

The **Gain Margin** indicates the factor by which the gain can be increased before the system becomes unstable.

![[meta/assets/gain-phase-margin.png]]

It is determined by measuring the vertical distance (in $dB$) on the Bode plot between the $|KG(j\omega)|$ curve and the 0 dB line at the **phase crossover frequency** ($\omega_{cg}$), which is the frequency where the phase $\angle G(j\omega)$ is $-180°$.

$$
\text{GM} = \frac{1}{|H(j\omega_{cp})|}
$$

A GM **greater than 1 (or 0 dB)** typically signifies a stable system.
Conversely, a GM **less than 1 (or < 0 dB)** suggests an unstable system, in cases where increasing gain leads to instability.

---

## References
