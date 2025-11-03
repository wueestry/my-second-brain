---
{"publish":true,"title":"Doppler Velocity Log (DVL)","created":"2025-04-15 10:40","modified":"2025-11-03T20:27:08.258+01:00","tags":[null],"cssclasses":"center-images"}
---


# DOPPLER VELOCITY LOG (DVL)

---

A doppler velocity log (DVL) is a sensor used to precisely measure the velocity of a vehicle relative to the seafloor (or the water column). It operates based on the Doppler effect, which occurs when there is relative motion between the source of sound waves and their receiver. The change in frequency of these waves indicates the speed at which the object is moving through the water.

## Functionality

DVLs emit acoustic signals that bounce off particles in the water. By analysing the Doppler shift— the difference between the emitted and received frequencies—the sensor calculates the vessel's velocity relative to the water column. This data is crucial for inertial navigation systems (INS), especially underwater where GPS signals are unavailable.

## Advantages

1. **Operational Conditions:** DVLs function effectively in varying conditions, including deep waters and murky environments, as sound travels well through water.
2. **Accuracy:** They provide precise velocity measurements that are less affected by external factors like ocean currents compared to other methods.
3. **Real-Time Data:** Continuous measurement of velocity aids in accurate navigation without relying on external reference points.

## Disadvantages

1. **Signal Blockage:** The acoustic path can be obstructed by sediment, bubbles, or other particles, reducing accuracy.
2. **Low-Velocity Limitations:** At very low speeds, the Doppler shift is minimal, leading to less accurate measurements.
3. **Altitude Limitations:** Bottom-tracking DVLs require proximity to the seafloor (typically within 200m).
4. **Cost:** High-quality DVL systems are expensive compared to other velocity sensors.

## Operating Modes

### Bottom Track Mode

Measures velocity relative to the seafloor by bouncing acoustic beams off the bottom.

$$
v = \frac{f_r - f_t}{f_t} \cdot \frac{c}{2}
$$

where $v$ is velocity, $f_r$ is received frequency, $f_t$ is transmitted frequency, and $c$ is the speed of sound in water.

### Water Track Mode

Measures velocity relative to particles in the water column when the seafloor is out of range.

## Technical Specifications

**Typical Parameters:**

- **Frequency:** 75 kHz to 1200 kHz (higher frequency = shorter range, better precision)
- **Range:** 0.5m to 500m altitude (depending on frequency)
- **Accuracy:** ±0.2% of velocity ±0.2 cm/s
- **Update rate:** 1-15 Hz
- **Beam configuration:** 3 or 4 beams (Janus configuration common)

## Integration with Navigation Systems

DVLs are commonly integrated with:

- **Inertial Navigation Systems (INS)**: Provides velocity updates to reduce drift
- **Extended Kalman Filters (EKF)**: Fuses DVL data with IMU measurements
- **SLAM systems**: Enables underwater mapping and localisation

```python
# Example: Simple DVL velocity integration
import numpy as np

class DVLNavigator:
    def __init__(self):
        self.position = np.array([0.0, 0.0, 0.0])

    def update(self, velocity, heading, dt):
        """Update position based on DVL velocity measurements"""
        # Convert velocity from body frame to world frame
        vx = velocity[0] * np.cos(heading) - velocity[1] * np.sin(heading)
        vy = velocity[0] * np.sin(heading) + velocity[1] * np.cos(heading)
        vz = velocity[2]

        # Integrate velocity to get position
        self.position[0] += vx * dt
        self.position[1] += vy * dt
        self.position[2] += vz * dt

        return self.position
```

## Applications

- **Autonomous underwater vehicles (AUVs)**: Primary navigation sensor
- **Remotely operated vehicles (ROVs)**: Position tracking and station-keeping
- **Submarine navigation**: Dead reckoning when GPS unavailable
- **Oceanographic research**: Current profiling and velocity measurements
- **Offshore construction**: Precise positioning of underwater equipment

---

## References

- [Doppler Velocity Logs - Teledyne RDI](https://www.teledynemarine.com/brands/rdi)
- [DVL Technology Overview - Nortek](https://www.nortekgroup.com/knowledge-center/wiki/doppler-velocity-logs)
- [Underwater Vehicle Navigation - MIT Sea Grant](https://seagrant.mit.edu/)
