---
{"publish":true,"title":"CMOS Power Formula","created":"2025-08-28 11:05","modified":"2025-09-17T12:43:49.879+02:00","tags":["resource","computer-science","electrical-engineering","science","cmos","power-dissipation","circuit-design","semiconductors"],"cssclasses":"center-images"}
---


# CMOS POWER FORMULA

---

The total power dissipation in a CMOS circuit is the sum of its static and dynamic power components

$$
P_{total} = P_{static} + P_{dynamic}
$$

## Dynamic Power Dissipation

- The dominant component in [[CMOS]] circuits
- Arises from charging and discharging load capacities during switching events

$$
P_{dynamic} = \alpha C_{EFF} V_{DD}^2 f_{CLK}
$$

where $\alpha$ is the switching activity factor, $C_{EFF}$ the effective switched capacitance, $V_{DD}$ the supply voltage and $f_{CLK}$ the system clock frequency.

## Static Power Dissipation

- Due to leakage currents, when the circuit is in steady state
- Independent of switching frequency

$$
P_{static} = I_{static}V_{DD}
$$

with $I_{static}$ being the static supply current (including leakage currents through reverse-biased PN-junctions and sub-threshold leakage)

---

## References
