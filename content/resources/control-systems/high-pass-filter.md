---
{"publish":true,"title":"High-Pass Filter","created":"2024-08-08","tags":["#control-systems","#resource","#term"],"cssclasses":""}
---


# High-Pass Filter

> [!abstract]
> A high-pass filter that lets signals with a higher frequency then its cut-off frequency pass, while attenuating signals with a lower frequency.

## Usage

Often used in the following cases

- Cleaning up low frequency noise
- Removing humming sounds in audio signals
- Redirecting higher frequency signals to the appropriate devices
- Removing low frequency trends from time-series data

## Design

### First Order Filter

![[resources/control-systems/assets/highpass1.png]]

$$
F(s) = \frac{s}{s+\omega_d} \qquad \omega_d = \text{cut-off frequency [rad/s]}
$$

### Second Order Filter

![[resources/control-systems/assets/highpass2.png]]

$$
F(s) = \frac{s^2}{s^2 + 2 D_d \omega_d s + \omega_d^2} \qquad \omega_d = \text{cut-off frequency [rad/s]} \qquad D_d = \text{damping factor}
$$
