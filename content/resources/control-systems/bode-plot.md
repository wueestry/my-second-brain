---
{"publish":true,"title":"Bode Plot","created":"2024-08-07","tags":["#control-systems","#resource","#term"],"cssclasses":""}
---


# Bode Plot

> [!abstract]
> Graph of the frequency response of a system.
> Includes two semi-logarithmic scaled plots
>
> - Bode magnitude plot
> - Bode phase plot

![[resources/control-systems/assets/bode-plot.png]]

## Gain plot

Graph of the magnitude of a given transfer function $H(j\omega)$ as a function of frequency (usually given in $dB$).

The gain at a specific frequency $\omega$ can be calculated as:

$$
G_{vdB}(\omega) = 20log_{10}|H(j\omega)| = 20log_{10}\sqrt{Re^2\{H(j\omega)\} + Im^2\{H(j\omega\}j}
$$

## Phase plot

Graph of in phase of a given transfer function $H(j\omega)$ as a function of frequency.

The phase at a specific frequency $\omega$ can be calculated as:

$$
\phi(\omega) = \angle H(j\omega) = arctan(\frac{Im\{H(j\omega)\}}{Re\{H(j\omega)\}})
$$

## Phase and Gain Margins

![[resources/control-systems/assets/gain-phase-margin.png]]

### Gain Cross-Over Frequency

Frequency $\omega_{gc}$, where the gain plot crosses the $0dB$ line (magnitude is unity).

$$
H(j\omega_{gc}) = 1 \Rightarrow A_{vdB} = 20log_{10}|H(j\omega)| = 0dB
$$

### Phase Margin

Indicates how much more phase shift can be added to the open loop transfer function until the system becomes unstable.

$$
\text{PM} = \phi(\omega_{gc})- (-180°)
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

### Stability Conditions

- $\omega_{pc} > \omega_{gc}$ –> **Stable**
- $\omega_{pc} = \omega_{gc}$ –> **Marginally Stable**
- $\omega_{pc} < \omega_{gc}$ –> **Unstable**
