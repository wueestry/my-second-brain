---
{"publish":true,"title":"Magnitude Plot","created":"2025-08-07 11:14","modified":"2025-11-03T20:34:33.022+01:00","tags":["engineering/control-theory/frequency-response/bode/magnitude-plot"],"cssclasses":"center-images"}
---


# MAGNITUDE PLOT

---

The **magnitude plot** (also known as the amplitude or gain plot) is one component of a [[distilled-notes/bode-plot\|Bode plot]] that displays the magnitude of a system's frequency response. It shows how the system amplifies or attenuates signals at different frequencies.

## Mathematical Representation

The magnitude is plotted in decibels (dB) against frequency on a logarithmic scale:

$$
G_{dB}(\omega) = 20\log_{10}|H(j\omega)| = 20\log_{10}\sqrt{\text{Re}^2\{H(j\omega)\} + \text{Im}^2\{H(j\omega)\}}
$$

Where:

- $H(j\omega)$ is the transfer function evaluated at frequency $\omega$
- $|H(j\omega)|$ is the magnitude of the complex transfer function
- $\omega$ is the angular frequency in rad/s
- $G_{dB}(\omega)$ is the gain in decibels

## Key Features

### Logarithmic Scales

Both axes use logarithmic scales:

- **Horizontal axis**: Frequency $\omega$ (logarithmic), typically in rad/s or Hz
- **Vertical axis**: Magnitude in dB (logarithmic representation of linear gain)

**Benefits**:

- Wide range of frequencies can be displayed on a single plot
- Multiplicative effects become additive (easier to analyse cascaded systems)
- Asymptotic approximations become straight lines

### Decibel Scale

The decibel scale provides intuitive interpretation:

- **0 dB**: Unity gain (no amplification or attenuation)
- **+20 dB**: Gain of 10 (output is 10× input)
- **-20 dB**: Gain of 0.1 (output is 10% of input)
- **-3 dB**: Half-power point (magnitude reduced to $1/\sqrt{2} \approx 0.707$)

## Interpretation

The magnitude plot reveals:

- **DC gain**: Magnitude at very low frequencies
- **Bandwidth**: Frequency range where the system effectively passes signals
- **Cutoff frequency**: Frequency at -3 dB point
- **Roll-off rate**: Slope of magnitude decrease (in dB/decade or dB/octave)
- **Resonant peaks**: Frequencies where amplification is maximum

## Applications

Used in:

- Filter design ([[distilled-notes/low-pass-filter\|low-pass]], [[distilled-notes/high-pass-filter\|high-pass]], [[distilled-notes/notch-filter\|notch]] filters)
- Control system stability analysis (with [[distilled-notes/bode-stability-margins\|stability margins]])
- Audio and signal processing
- Communication system design

---

## References

- Franklin, G. F., Powell, J. D., & Emami-Naeini, A. (2019). _Feedback Control of Dynamic Systems_ (8th ed.). Pearson.
- Ogata, K. (2010). _Modern Control Engineering_ (5th ed.). Prentice Hall.
- [Bode plot - Wikipedia](https://en.wikipedia.org/wiki/Bode_plot)
