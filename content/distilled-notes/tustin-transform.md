---
{"publish":true,"title":"Tustin Transform","created":"2024-08-08T00:00:00.000Z","modified":"2025-10-01T21:17:17.307+02:00","tags":["#control-engineering","#control-systems","#discrete-time","#signal-processing","#transfer-function","#mathematics","#system-response"],"cssclasses":"center-images"}
---


# TUSTIN TRANSFORM

---

The Tustin Transform or Bilinear Approximation yields the best frequency domain match between a continuous time system and it's discrete time counterpart

The conversion of the state space model, the states are not preserved.

## Discrete-time Approximation

The bilinear transform is a first-order Padé approximant of the natural logarithm function (exact mapping from $z$ to $s$ plane)

### Discrete-to-Analog

$$
H(s) = H_d(z') \rightarrow z' = e^{sT_s} = \frac{1+sT_s/2}{1-sT_s/2}
$$

### Analog-to-Discrete

$$
H_d(z) = H(s') \rightarrow s' = \frac{2}{T_s}\frac{z-1}{z+1}
$$

## Frequency Prewarping

If your system has important dynamics at a particular frequency that you want the transformation to preserve, you can use the Tustin method with frequency prewarping. This method ensures a match between the continuous- and discrete-time responses at the prewarp frequency.

The Tustin approximation with frequency prewarping uses the following transformation of variables:

$$
H_d(z) = H(s') \rightarrow s' = \frac{\omega}{tan(\omega T_s/2)}\frac{z-1}{z+1}
$$

Matching ensured because of the following correspondence: $$
H(j\omega)=H_d(e^{j\omega T_s})

$$


---
## References


$$
