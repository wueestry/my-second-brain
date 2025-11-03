---
{"publish":true,"title":"Open Loop Control","created":"2024-08-20T00:00:00.000Z","modified":"2025-11-03T20:43:36.586+01:00","tags":["engineering/control-theory/open-loop"],"cssclasses":"center-images"}
---


# OPEN LOOP CONTROL

---

An **open-loop control** system is a type of control system where the output has no effect on the control action of the input signal.
It therefore operates independently of the final output and does not use feedback to monitor based on its output (**non-feedback control**).

![[meta/assets/open-loop-control.png]]

## Characteristics

### Advantages

- **Simple design**: No feedback sensors or complex algorithms required
- **Low cost**: Fewer components (no sensors or feedback circuitry)
- **Fast response**: No time delay from feedback processing
- **Easy implementation**: Straightforward programming and operation
- **Stable**: Cannot oscillate or become unstable due to feedback

### Disadvantages

- **No error correction**: Cannot compensate for disturbances
- **Sensitive to variations**: Output affected by system parameter changes
- **Requires calibration**: Needs accurate system model
- **No adaptability**: Cannot adjust to changing conditions
- **Accumulates errors**: Errors compound over time without correction

## Examples

### Everyday Applications

1. **Washing machine**: Runs for fixed time regardless of cleanliness
2. **Toaster**: Timer-based, doesn't measure bread browning
3. **Microwave oven**: Heats for set duration, doesn't monitor food temperature
4. **Traffic lights**: Fixed timing sequence, doesn't adapt to traffic flow
5. **Electric fan**: Set speed, doesn't adjust to room temperature

### Industrial Applications

1. **Stepper motors**: Move fixed number of steps without position feedback
2. **Batch processes**: Fixed recipe execution without monitoring output quality
3. **Sequential machines**: Fixed operation sequence
4. **Time-based controllers**: Execute actions based on timers

## Mathematical Model

For an open-loop system with transfer function $G(s)$:

$$Y(s) = G(s) \cdot U(s)$$

Where:

- $Y(s)$: Output (Laplace transform)
- $U(s)$: Input (Laplace transform)
- $G(s)$: System transfer function

**Key point**: Output depends ONLY on input and system dynamics, NOT on actual output measurement.

## Comparison with Closed-Loop Control

| Aspect                    | Open-Loop     | Closed-Loop              |
| ------------------------- | ------------- | ------------------------ |
| **Feedback**              | No            | Yes                      |
| **Accuracy**              | Low           | High                     |
| **Stability**             | Always stable | Can be unstable          |
| **Cost**                  | Low           | Higher                   |
| **Complexity**            | Simple        | Complex                  |
| **Disturbance rejection** | Poor          | Good                     |
| **Response time**         | Fast          | Slower (due to feedback) |
| **Adaptability**          | None          | Adaptive                 |

## When to Use Open-Loop Control

**Good fit**:

- System behaviour is well-known and predictable
- Disturbances are minimal or negligible
- Cost must be minimized
- Fast response is critical
- Output doesn't need high accuracy
- Simple sequential operations

**Poor fit**:

- System parameters vary significantly
- External disturbances are common
- High accuracy is required
- Safety is critical
- Adaptive behaviour is needed

## Python Simulation Example

```python
import numpy as np
import matplotlib.pyplot as plt

class OpenLoopSystem:
    """Simulate open-loop control system"""

    def __init__(self, transfer_function_coeffs):
        """
        Initialize open-loop system

        Args:
            transfer_function_coeffs: (num, den) coefficients
        """
        self.num, self.den = transfer_function_coeffs
        self.state = 0.0

    def step_response(self, duration, dt=0.01, disturbance=None):
        """
        Simulate step response

        Args:
            duration: Simulation time
            dt: Time step
            disturbance: Disturbance function f(t) or None

        Returns:
            t, y: Time and output arrays
        """
        t = np.arange(0, duration, dt)
        y = np.zeros_like(t)

        # Simple first-order system: dy/dt = -a*y + b*u + d
        # where a = den[1]/den[0], b = num[0]/den[0]
        a = self.den[1] / self.den[0] if len(self.den) > 1 else 0
        b = self.num[0] / self.den[0]

        y[0] = self.state

        for i in range(1, len(t)):
            u = 1.0  # Step input
            d = disturbance(t[i]) if disturbance else 0.0

            # Euler integration
            dydt = -a * y[i-1] + b * u + d
            y[i] = y[i-1] + dydt * dt

        return t, y

def demo_open_loop():
    """Demonstrate open-loop control with disturbances"""

    # System: G(s) = 1/(s+1) - first order system
    num = [1.0]
    den = [1.0, 1.0]

    system = OpenLoopSystem((num, den))

    # Case 1: No disturbance
    t1, y1 = system.step_response(duration=10, dt=0.01, disturbance=None)

    # Case 2: Constant disturbance
    t2, y2 = system.step_response(duration=10, dt=0.01,
                                   disturbance=lambda t: 0.3)

    # Case 3: Time-varying disturbance
    t3, y3 = system.step_response(duration=10, dt=0.01,
                                   disturbance=lambda t: 0.2 * np.sin(2*t))

    # Plot results
    fig, axes = plt.subplots(3, 1, figsize=(12, 10))

    # No disturbance
    axes[0].plot(t1, y1, 'b-', linewidth=2, label='Output')
    axes[0].axhline(y=1.0, color='r', linestyle='--', label='Desired')
    axes[0].set_ylabel('Output', fontsize=12)
    axes[0].set_title('Open-Loop Control: No Disturbance', fontsize=14)
    axes[0].grid(True, alpha=0.3)
    axes[0].legend(fontsize=10)

    # Constant disturbance
    axes[1].plot(t2, y2, 'b-', linewidth=2, label='Output')
    axes[1].axhline(y=1.0, color='r', linestyle='--', label='Desired')
    axes[1].axhline(y=1.3, color='g', linestyle=':', alpha=0.5, label='Actual steady-state')
    axes[1].set_ylabel('Output', fontsize=12)
    axes[1].set_title('Open-Loop Control: Constant Disturbance (+0.3)', fontsize=14)
    axes[1].grid(True, alpha=0.3)
    axes[1].legend(fontsize=10)
    axes[1].text(7, 1.35, 'Error cannot be corrected!', fontsize=10,
                bbox=dict(boxstyle='round', facecolor='yellow', alpha=0.7))

    # Time-varying disturbance
    axes[2].plot(t3, y3, 'b-', linewidth=2, label='Output')
    axes[2].axhline(y=1.0, color='r', linestyle='--', label='Desired')
    axes[2].set_xlabel('Time (s)', fontsize=12)
    axes[2].set_ylabel('Output', fontsize=12)
    axes[2].set_title('Open-Loop Control: Sinusoidal Disturbance', fontsize=14)
    axes[2].grid(True, alpha=0.3)
    axes[2].legend(fontsize=10)
    axes[2].text(7, 1.3, 'Output oscillates with disturbance', fontsize=10,
                bbox=dict(boxstyle='round', facecolor='yellow', alpha=0.7))

    plt.tight_layout()
    plt.show()

def demo_washing_machine():
    """Simulate washing machine as open-loop system"""

    # Washing machine program: fixed sequence
    phases = [
        ("Fill", 2),
        ("Wash", 10),
        ("Drain", 3),
        ("Rinse", 5),
        ("Spin", 5)
    ]

    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(12, 8))

    # Timeline
    current_time = 0
    times = []
    activities = []

    for phase, duration in phases:
        times.append(current_time)
        activities.append(phase)
        current_time += duration
    times.append(current_time)
    activities.append("Complete")

    # Plot program sequence
    y_pos = range(len(activities))
    colors = ['blue', 'green', 'red', 'cyan', 'orange', 'gray']

    for i in range(len(phases)):
        ax1.barh(i, phases[i][1], left=sum([p[1] for p in phases[:i]]),
                color=colors[i], alpha=0.7, label=phases[i][0])

    ax1.set_xlabel('Time (minutes)', fontsize=12)
    ax1.set_yticks(range(len(phases)))
    ax1.set_yticklabels([p[0] for p in phases])
    ax1.set_title('Open-Loop Control: Washing Machine Program', fontsize=14)
    ax1.grid(True, alpha=0.3, axis='x')
    ax1.set_xlim([0, current_time])

    # Simulate output quality (random, no feedback)
    actual_cleanliness = [50, 65, 70, 85, 90]  # Simulated values
    desired_cleanliness = 95

    ax2.plot(range(len(actual_cleanliness)), actual_cleanliness,
            'bo-', linewidth=2, markersize=8, label='Actual cleanliness')
    ax2.axhline(y=desired_cleanliness, color='r', linestyle='--',
               linewidth=2, label='Desired cleanliness')
    ax2.fill_between(range(len(actual_cleanliness)), actual_cleanliness,
                     desired_cleanliness, alpha=0.3, color='red')
    ax2.set_xlabel('Wash Cycle Phase', fontsize=12)
    ax2.set_ylabel('Cleanliness (%)', fontsize=12)
    ax2.set_title('No Feedback: Final Quality May Vary', fontsize=14)
    ax2.set_xticks(range(len(phases)))
    ax2.set_xticklabels([p[0] for p in phases])
    ax2.grid(True, alpha=0.3)
    ax2.legend(fontsize=10)
    ax2.set_ylim([0, 100])

    plt.tight_layout()
    plt.show()

if __name__ == "__main__":
    demo_open_loop()
    demo_washing_machine()
```

## Arduino Example

```cpp
// Open-loop motor control
const int MOTOR_PIN = 9;
const int SPEED = 128;  // Fixed speed (0-255)

void setup() {
    pinMode(MOTOR_PIN, OUTPUT);
}

void loop() {
    // Run motor at fixed speed for fixed time
    // No feedback from motor position or speed

    analogWrite(MOTOR_PIN, SPEED);
    delay(5000);  // Run for 5 seconds

    analogWrite(MOTOR_PIN, 0);
    delay(2000);  // Stop for 2 seconds
}
```

---

## References

- [Open-Loop vs Closed-Loop Control - Control Tutorials](https://ctms.engin.umich.edu/CTMS/index.php?example=Introduction&section=ControlStateSpace)
- [Control Systems Engineering - Nise](https://www.wiley.com/en-us/Control+Systems+Engineering)
- [Automatic Control Systems - Golnaraghi & Kuo](https://www.wiley.com/)
- [Introduction to Control Systems - MIT OpenCourseWare](https://ocw.mit.edu/)
