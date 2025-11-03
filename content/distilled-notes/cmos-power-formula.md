---
{"publish":true,"title":"CMOS Power Formula","created":"2025-08-28 11:05","modified":"2025-11-03T20:35:39.296+01:00","tags":["engineering/electronics/cmos-power-formula"],"cssclasses":"center-images"}
---


# CMOS POWER FORMULA

---

The total power dissipation in a CMOS (Complementary Metal-Oxide-Semiconductor) circuit consists of static and dynamic components. Understanding these power components is crucial for designing energy-efficient digital circuits and managing thermal constraints in integrated circuits.

$$
P_{total} = P_{static} + P_{dynamic}
$$

## Dynamic Power Dissipation

Dynamic power is the dominant component in CMOS circuits, arising from charging and discharging load capacitances during switching events (logic transitions):

$$
P_{dynamic} = \alpha C_{EFF} V_{DD}^2 f_{CLK}
$$

Where:

- $\alpha$ is the **switching activity factor** (0 to 1, proportion of clock cycles with transitions)
- $C_{EFF}$ is the **effective switched capacitance** (total load capacitance being switched)
- $V_{DD}$ is the **supply voltage**
- $f_{CLK}$ is the **clock frequency**

### Key Insights

- Power scales **quadratically** with supply voltage ($V_{DD}^2$)
- Power scales **linearly** with frequency and capacitance
- Reducing $V_{DD}$ is the most effective way to reduce dynamic power
- Lower clock frequency also reduces power but affects performance

## Static Power Dissipation

Static power is dissipated due to leakage currents when the circuit is in a steady state (not switching). It is independent of switching frequency:

$$
P_{static} = I_{static} V_{DD}
$$

Where:

- $I_{static}$ is the **static supply current** (total leakage current)
- $V_{DD}$ is the **supply voltage**

### Leakage Components

Static power includes multiple leakage mechanisms:

1. **Sub-threshold leakage**: Current when transistor is "off" but not completely
2. **Gate leakage**: Current through thin gate oxide
3. **Junction leakage**: Reverse-bias current through PN junctions
4. **Gate-induced drain leakage (GIDL)**: High-field effect at drain

### Importance in Modern Circuits

- Increasingly significant as transistors shrink (smaller feature sizes)
- Can dominate in low-activity circuits or idle states
- Temperature-dependent (increases with temperature)
- Critical concern for battery-powered devices

## Power Optimization Strategies

### Reducing Dynamic Power

- **Voltage scaling**: Reduce $V_{DD}$ (most effective)
- **Clock gating**: Disable clock to inactive circuits
- **Frequency scaling**: Lower $f_{CLK}$ when high performance not needed
- **Capacitance reduction**: Minimize wire lengths and gate sizes

### Reducing Static Power

- **Power gating**: Shut off power to unused circuit blocks
- **Multi-threshold CMOS**: Use high-$V_t$ transistors to reduce leakage
- **Body biasing**: Adjust substrate voltage to reduce leakage
- **Optimal sizing**: Balance performance and leakage

## Applications

Understanding CMOS power is critical for:

- Mobile device battery life optimization
- Data center energy efficiency
- Thermal management in processors
- Low-power IoT device design
- High-performance computing power budgets

---

## References

- Rabaey, J. M., Chandrakasan, A. P., & Nikolić, B. (2003). _Digital Integrated Circuits: A Design Perspective_ (2nd ed.). Prentice Hall.
- Weste, N. H. E., & Harris, D. (2010). _CMOS VLSI Design: A Circuits and Systems Perspective_ (4th ed.). Addison-Wesley.
- [CMOS - Wikipedia](https://en.wikipedia.org/wiki/CMOS)
- Roy, K., & Prasad, S. C. (2009). _Low-Power CMOS VLSI Circuit Design_. Wiley.
