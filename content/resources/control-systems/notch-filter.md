---
{"publish":true,"title":"Notch Filter","created":"2024-08-08","tags":["#control-systems","#resource","#term"],"cssclasses":""}
---


# Notch Filter

> [!abstract]
> Filter that weakens signals in a small range of frequencies and allows all other frequencies to pass through unchanged.

Also referred as _band-rejection filter_. Made from a combination of a [[resources/control-systems/high-pass-filter\|high pass filter]] and a [[resources/control-systems/low-pass-filter\|low pass filter]]

## Usage

Effective at removing interfering signals at specific frequencies

- Background hum of electrical grid ($50Hz$ or $60Hz$)
- Interfering FM broadcast signals

## Design

![[resources/control-systems/assets/notch2.png]]

$$
F(s) = \frac{\omega_d^2}{\omega_n^2} \frac{s^2+2 D_n \omega_n s + \omega_n^2}{s^2 + 2 D_d \omega_d s + \omega_d^2}
$$

$$
\omega_i = \text{cut-off frequency in nominator/denominator}
$$

$$
D_i = \text{damping factor in nominator/denominator}
$$
