---
{"publish":true,"title":"Notch Filter","created":"2024-08-08T00:00:00.000Z","modified":"2025-10-01T21:17:17.306+02:00","tags":["#control-systems","#filter-design","#signal-processing","#electrical-engineering","#frequency-domain"],"cssclasses":"center-images"}
---


# NOTCH FILTER

---

Filter that weakens signals in a small range of frequencies and allows all other frequencies to pass through unchanged.

Also referred as _band-rejection filter_. Made from a combination of a [[distilled-notes/high-pass-filter\|high pass filter]] and a [[distilled-notes/low-pass-filter\|low pass filter]]

## Usage

Effective at removing interfering signals at specific frequencies

- Background hum of electrical grid ($50Hz$ or $60Hz$)
- Interfering FM broadcast signals

## Design

![[meta/assets/notch2.png]]

$$
F(s) = \frac{\omega_d^2}{\omega_n^2} \frac{s^2+2 D_n \omega_n s + \omega_n^2}{s^2 + 2 D_d \omega_d s + \omega_d^2}
$$

$$
\omega_i = \text{cut-off frequency in nominator/denominator}
$$

$$
D_i = \text{damping factor in nominator/denominator}
$$

---

## References
