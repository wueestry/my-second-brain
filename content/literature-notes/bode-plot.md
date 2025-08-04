---
{"publish":true,"title":"Bode Plot","created":"2025-07-31 16:23","modified":"2025-08-04T09:31:14.256+02:00","tags":["resource"],"cssclasses":"center-images"}
---


# BODE PLOT
---

>[!abstract]
>A bode plot displays the frequency response of a system. It includes two semi-logarithmic scaled plots, displaying the magnitude and the phase of the response.

![[meta/assets/bode-plot.png]]

## Bode Magnitude (Gain) Plot

Graph of the magnitude of a given transfer function $H(j\omega)$ as a function of frequency (usually given in $dB$).

The gain at a specific frequency $\omega$ can be calculated as:

$$
G_{vdB}(\omega) = 20log_{10}|H(j\omega)| = 20log_{10}\sqrt{Re^2\{H(j\omega)\} + Im^2\{H(j\omega\}j}
$$


## Bode Phase Plot

Graph of in phase of a given transfer function $H(j\omega)$ as a function of frequency.

The phase at a specific frequency $\omega$ can be calculated as:

$$
\phi(\omega) = \angle H(j\omega) = arctan(\frac{Im\{H(j\omega)\}}{Re\{H(j\omega)\}})
$$


## Determine Stability using Bode Plot

![[meta/assets/gain-phase-margin.png]]

### Gain Cross-Over Frequency

Frequency $\omega_{gc}$, where the gain plot crosses the $0dB$ line (magnitude is unity).

$$
H(j\omega_{gc}) = 1 \Rightarrow A_{vdB} = 20log_{10}|H(j\omega)| = 0dB
$$


### Phase Cross-Over Frequency

Frequency $\omega_{pc}$ where the phase angle crosses $-180°$.

$$
\phi(\omega_{cp}) = \angle H(j\omega_{cp}) = -180°
$$


### Gain Margin

Indicates how much the open loop gain can be increased before the system becomes unstable.

$$
\text{GM} = \frac{1}{|H(j\omega_{cp})|}
$$


### Phase Margin

Indicates how much more phase shift can be added to the open loop transfer function until the system becomes unstable.

$$
\text{PM} = \phi(\omega_{gc})- (-180°)
$$


### Stability Criterion

- $\omega_{pc} > \omega_{gc}$ –> **Stable**
- $\omega_{pc} = \omega_{gc}$ –> **Marginally Stable**
- $\omega_{pc} < \omega_{gc}$ –> **Unstable**


---
## References


---
## Child Files

| File | Created |
| ---- | ------- |



## Parent Files

| File | Created |
| ---- | ------- |

