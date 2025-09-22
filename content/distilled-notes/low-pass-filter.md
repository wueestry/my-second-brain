---
{"publish":true,"title":"Low-Pass Filter","created":"2024-08-08T00:00:00.000Z","modified":"2025-09-22T10:32:15.033+02:00","tags":["#control-systems","#filter-design","#signal-processing","#electronics","#circuit-design","#frequency-response"],"cssclasses":"center-images"}
---


# LOW-PASS FILTER

---

A **low-pass filter** is a filter that passes signals with a frequency lower than a selected cut-off frequency and attenuates signals with a higher frequency.

## Usage

Often used for the following cases:

- Cleaning up signals
- Removing noise
- Creating a smoothing effect
- Performing data averaging
- Design of decimators and interpolators

## Advantages

- Produces slow changes in output values to see trends easier
- Boosts overall Signal-to-Noise Ratio with minimal signal degradation

## Design

### First Order Filter

![[meta/assets/lowpass1.png]]

$$
F(s) = \frac{\omega_d}{s + \omega_d} \qquad \omega_d = \text{cut-off frequency}
$$

### Second Order filter

![[meta/assets/lowpass2.png]]

$$
F(s) = \frac{\omega_d^2}{s^2 + 2 D_d \omega_d s + \omega_d^2} \qquad \omega_d = \text{cut-off frequency} \qquad D_d = \text{damping factor}
$$

---

## References
