---
{"publish":true,"title":"High-Pass Filter","created":"2024-08-08T00:00:00.000Z","modified":"2025-11-03T20:27:08.298+01:00","tags":[null],"cssclasses":"center-images"}
---


# HIGH-PASS FILTER

---

A **high-pass filter** that lets signals with a higher frequency then its cut-off frequency pass, while attenuating signals with a lower frequency.

## Usage

Often used in the following cases

- Cleaning up low frequency noise
- Removing humming sounds in audio signals
- Redirecting higher frequency signals to the appropriate devices
- Removing low frequency trends from time-series data

## Design

### First Order Filter

![[meta/assets/highpass1.png]]

$$
F(s) = \frac{s}{s+\omega_d} \qquad \omega_d = \text{cut-off frequency [rad/s]}
$$

### Second Order Filter

![[meta/assets/highpass2.png]]

$$
F(s) = \frac{s^2}{s^2 + 2 D_d \omega_d s + \omega_d^2} \qquad \omega_d = \text{cut-off frequency [rad/s]} \qquad D_d = \text{damping factor}
$$

## Python Implementation

```python
import numpy as np
from scipy import signal
import matplotlib.pyplot as plt

def design_highpass_filter(cutoff_freq: float,
                          fs: float,
                          order: int = 5,
                          filter_type: str = 'butter') -> tuple:
    """
    Design a digital high-pass filter.

    Args:
        cutoff_freq: Cut-off frequency in Hz
        fs: Sampling frequency in Hz
        order: Filter order
        filter_type: 'butter', 'cheby1', 'cheby2', or 'ellip'

    Returns:
        Filter coefficients (b, a)
    """
    nyquist = fs / 2
    normal_cutoff = cutoff_freq / nyquist

    if filter_type == 'butter':
        b, a = signal.butter(order, normal_cutoff, btype='high', analog=False)
    elif filter_type == 'cheby1':
        b, a = signal.cheby1(order, 0.5, normal_cutoff, btype='high', analog=False)
    elif filter_type == 'cheby2':
        b, a = signal.cheby2(order, 40, normal_cutoff, btype='high', analog=False)
    elif filter_type == 'ellip':
        b, a = signal.ellip(order, 0.5, 40, normal_cutoff, btype='high', analog=False)
    else:
        raise ValueError(f"Unknown filter type: {filter_type}")

    return b, a

def apply_highpass_filter(data: np.ndarray,
                         cutoff_freq: float,
                         fs: float,
                         order: int = 5) -> np.ndarray:
    """
    Apply high-pass filter to signal.

    Args:
        data: Input signal
        cutoff_freq: Cut-off frequency in Hz
        fs: Sampling frequency in Hz
        order: Filter order

    Returns:
        Filtered signal
    """
    b, a = design_highpass_filter(cutoff_freq, fs, order)
    filtered_data = signal.filtfilt(b, a, data)
    return filtered_data

def plot_filter_response(b, a, fs):
    """Plot frequency response of filter"""
    w, h = signal.freqz(b, a, worN=8000, fs=fs)

    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10, 8))

    # Magnitude response
    ax1.plot(w, 20 * np.log10(abs(h)))
    ax1.set_title('High-Pass Filter Frequency Response')
    ax1.set_xlabel('Frequency (Hz)')
    ax1.set_ylabel('Magnitude (dB)')
    ax1.grid(True)
    ax1.axhline(-3, color='r', linestyle='--', label='-3dB point')
    ax1.legend()

    # Phase response
    ax2.plot(w, np.angle(h))
    ax2.set_xlabel('Frequency (Hz)')
    ax2.set_ylabel('Phase (radians)')
    ax2.grid(True)

    plt.tight_layout()
    return fig

# Example: Remove low-frequency noise
if __name__ == "__main__":
    # Parameters
    fs = 1000  # Sampling frequency (Hz)
    duration = 2  # Duration in seconds
    cutoff = 50  # Cut-off frequency (Hz)

    # Generate test signal: high-freq signal + low-freq noise
    t = np.linspace(0, duration, int(fs * duration), endpoint=False)
    signal_clean = np.sin(2 * np.pi * 150 * t)  # 150 Hz signal
    noise_low_freq = 0.5 * np.sin(2 * np.pi * 5 * t)  # 5 Hz noise
    signal_noisy = signal_clean + noise_low_freq

    # Design and apply filter
    b, a = design_highpass_filter(cutoff, fs, order=5)
    signal_filtered = apply_highpass_filter(signal_noisy, cutoff, fs)

    # Plot results
    fig, axes = plt.subplots(3, 1, figsize=(12, 10))

    axes[0].plot(t[:500], signal_noisy[:500])
    axes[0].set_title('Noisy Signal (with low-frequency component)')
    axes[0].set_xlabel('Time (s)')
    axes[0].set_ylabel('Amplitude')
    axes[0].grid(True)

    axes[1].plot(t[:500], signal_filtered[:500])
    axes[1].set_title('Filtered Signal (low frequencies removed)')
    axes[1].set_xlabel('Time (s)')
    axes[1].set_ylabel('Amplitude')
    axes[1].grid(True)

    axes[2].plot(t[:500], signal_clean[:500])
    axes[2].set_title('Original Clean Signal')
    axes[2].set_xlabel('Time (s)')
    axes[2].set_ylabel('Amplitude')
    axes[2].grid(True)

    plt.tight_layout()
    plt.show()

    # Show frequency response
    plot_filter_response(b, a, fs)
    plt.show()
```

## Arduino Implementation

```cpp
// Simple first-order high-pass filter for Arduino
class HighPassFilter {
private:
    float alpha;        // Filter coefficient
    float previous_input;
    float previous_output;

public:
    HighPassFilter(float cutoff_freq, float sample_rate) {
        float RC = 1.0 / (2.0 * PI * cutoff_freq);
        float dt = 1.0 / sample_rate;
        alpha = RC / (RC + dt);
        previous_input = 0;
        previous_output = 0;
    }

    float update(float input) {
        float output = alpha * (previous_output + input - previous_input);
        previous_input = input;
        previous_output = output;
        return output;
    }

    void reset() {
        previous_input = 0;
        previous_output = 0;
    }
};

// Example usage
HighPassFilter hpf(50.0, 1000.0);  // 50 Hz cutoff, 1kHz sample rate

void setup() {
    Serial.begin(9600);
}

void loop() {
    float sensor_value = analogRead(A0);
    float filtered_value = hpf.update(sensor_value);

    Serial.print("Raw: ");
    Serial.print(sensor_value);
    Serial.print(" Filtered: ");
    Serial.println(filtered_value);

    delay(1);  // 1ms delay for 1kHz sampling
}
```

## Comparison with Low-Pass Filter

| Aspect           | High-Pass Filter                | Low-Pass Filter            |
| ---------------- | ------------------------------- | -------------------------- |
| **Passes**       | High frequencies                | Low frequencies            |
| **Blocks**       | Low frequencies                 | High frequencies           |
| **Used for**     | Removing DC offset, trends      | Noise reduction, smoothing |
| **Phase shift**  | Leads at low freq               | Lags at high freq          |
| **Applications** | Audio treble boost, AC coupling | Anti-aliasing, decimation  |

## Practical Considerations

- **DC Blocking**: High-pass filters remove DC components (0 Hz)
- **Transient Response**: May introduce ringing for high-order filters
- **Phase Distortion**: Non-linear phase can distort signals
- **Cut-off Selection**: Choose based on lowest frequency to preserve
- **Filter Order**: Higher order = sharper transition, more computation

---

## References

- [High-Pass Filter - Wikipedia](https://en.wikipedia.org/wiki/High-pass_filter)
- [SciPy Signal Processing](https://docs.scipy.org/doc/scipy/reference/signal.html)
- [Digital Filter Design - MATLAB](https://www.mathworks.com/help/signal/ref/butter.html)
