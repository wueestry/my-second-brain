---
{"publish":true,"title":"Bode Plot","created":"2025-07-31 16:23","modified":"2025-11-03T20:34:44.719+01:00","tags":["engineering/control-theory/frequency-response/bode"],"cssclasses":"center-images"}
---


# BODE PLOT

---

A **Bode plot** is a graphical tool used in control systems and signal processing to visualise the frequency response of a linear time-invariant system. Named after Hendrik Wade Bode, it consists of two complementary plots that together characterise how a system responds to sinusoidal inputs across a range of frequencies.

![[meta/assets/bode-plot.png]]

## Components

A Bode plot comprises two separate graphs sharing a common logarithmic frequency axis:

1. **[[distilled-notes/bode-magnitude-plot\|Magnitude Plot]]**: Shows gain (in dB) vs. frequency
2. **[[distilled-notes/bode-phase-plot\|Phase Plot]]**: Shows phase angle (in degrees) vs. frequency

Both plots use a logarithmic frequency scale, which allows wide frequency ranges to be displayed efficiently and makes asymptotic approximations straightforward.

## Purpose and Applications

Bode plots are used to:

- **Analyse system stability**: Evaluate [[distilled-notes/bode-stability-margins\|stability margins]] (gain and phase margins)
- **Design controllers**: Tune [[distilled-notes/pid-control\|PID controllers]] and design compensators
- **Filter design**: Specify cutoff frequencies and roll-off rates for [[distilled-notes/low-pass-filter\|low-pass]], [[distilled-notes/high-pass-filter\|high-pass]], and [[distilled-notes/notch-filter\|notch filters]]
- **Assess frequency response**: Determine bandwidth, resonant frequencies, and DC gain
- **Compare systems**: Visualise effects of parameter changes or different designs

## Stability Analysis

Determining the stability of a feedback system using a Bode plot involves analysing the open-loop transfer function's frequency response. The analysis assesses how close the system is to the conditions for marginal stability (closed-loop poles on the imaginary axis).

### Stability Margins

[[distilled-notes/bode-stability-margins\|Stability margins]] quantify the system's robustness:

- **[[distilled-notes/bode-gain-margin\|Gain Margin (GM)]]**: How much gain can increase before instability
- **[[distilled-notes/bode-phase-margin\|Phase Margin (PM)]]**: How much additional phase lag can be tolerated before instability

These margins provide quantitative measures of stability and are standard metrics in control system design.

### Limitations

While powerful, Bode plot stability analysis has limitations:

- **Simple systems**: First- or second-order systems may never cross $-180°$ phase, giving infinite gain margin (not useful for stability assessment)
- **Multiple crossings**: Higher-order systems may have multiple gain crossover or phase crossover frequencies, requiring careful interpretation (typically use the minimum phase margin for conservative design)
- **Non-minimum phase systems**: Systems with right half-plane zeros or time delays require special consideration
- **Nonlinear systems**: Bode analysis is limited to linear or linearised systems

## Advantages

- Logarithmic scales compress wide frequency ranges
- Multiplicative effects become additive (series systems combine by adding Bode plots)
- Asymptotic approximations simplify hand sketching
- Direct visualisation of stability margins
- Industry-standard tool with widespread software support

---

## References

- Bode, H. W. (1945). _Network Analysis and Feedback Amplifier Design_. Van Nostrand.
- Franklin, G. F., Powell, J. D., & Emami-Naeini, A. (2019). _Feedback Control of Dynamic Systems_ (8th ed.). Pearson.
- Ogata, K. (2010). _Modern Control Engineering_ (5th ed.). Prentice Hall.
- [Bode plot - Wikipedia](https://en.wikipedia.org/wiki/Bode_plot)
