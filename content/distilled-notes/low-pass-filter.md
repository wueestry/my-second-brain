---
{"publish":true,"title":"Low-Pass Filter","created":"2024-08-08T00:00:00.000Z","modified":"2025-11-03T20:43:47.220+01:00","tags":["engineering/signal-processing/filters/low-pass"],"cssclasses":"center-images"}
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

## Python Implementation

```python
import numpy as np
from scipy import signal
import matplotlib.pyplot as plt

def design_lowpass_filter(cutoff_freq: float,
                         fs: float,
                         order: int = 5,
                         filter_type: str = 'butter') -> tuple:
    """
    Design a digital low-pass filter.

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
        b, a = signal.butter(order, normal_cutoff, btype='low', analog=False)
    elif filter_type == 'cheby1':
        b, a = signal.cheby1(order, 0.5, normal_cutoff, btype='low', analog=False)
    elif filter_type == 'cheby2':
        b, a = signal.cheby2(order, 40, normal_cutoff, btype='low', analog=False)
    elif filter_type == 'ellip':
        b, a = signal.ellip(order, 0.5, 40, normal_cutoff, btype='low', analog=False)
    else:
        raise ValueError(f"Unknown filter type: {filter_type}")

    return b, a

def apply_lowpass_filter(data: np.ndarray,
                        cutoff_freq: float,
                        fs: float,
                        order: int = 5) -> np.ndarray:
    """
    Apply low-pass filter to signal.

    Args:
        data: Input signal
        cutoff_freq: Cut-off frequency in Hz
        fs: Sampling frequency in Hz
        order: Filter order

    Returns:
        Filtered signal
    """
    b, a = design_lowpass_filter(cutoff_freq, fs, order)
    filtered_data = signal.filtfilt(b, a, data)  # Zero-phase filtering
    return filtered_data

def moving_average_filter(data: np.ndarray, window_size: int) -> np.ndarray:
    """
    Simple moving average low-pass filter.

    Args:
        data: Input signal
        window_size: Number of points to average

    Returns:
        Filtered signal
    """
    return np.convolve(data, np.ones(window_size)/window_size, mode='same')

# Example: Remove high-frequency noise
if __name__ == "__main__":
    # Parameters
    fs = 1000  # Sampling frequency (Hz)
    duration = 2  # Duration in seconds
    cutoff = 50  # Cut-off frequency (Hz)

    # Generate test signal: clean signal + high-freq noise
    t = np.linspace(0, duration, int(fs * duration), endpoint=False)
    signal_clean = np.sin(2 * np.pi * 5 * t)  # 5 Hz signal
    noise_high_freq = 0.5 * np.sin(2 * np.pi * 150 * t)  # 150 Hz noise
    signal_noisy = signal_clean + noise_high_freq

    # Apply filters
    signal_filtered_butterworth = apply_lowpass_filter(signal_noisy, cutoff, fs, order=5)
    signal_filtered_ma = moving_average_filter(signal_noisy, window_size=20)

    # Plot results
    fig, axes = plt.subplots(4, 1, figsize=(12, 12))

    axes[0].plot(t[:500], signal_noisy[:500])
    axes[0].set_title('Noisy Signal (with high-frequency noise)')
    axes[0].set_xlabel('Time (s)')
    axes[0].set_ylabel('Amplitude')
    axes[0].grid(True)

    axes[1].plot(t[:500], signal_filtered_butterworth[:500])
    axes[1].set_title('Butterworth Low-Pass Filtered Signal')
    axes[1].set_xlabel('Time (s)')
    axes[1].set_ylabel('Amplitude')
    axes[1].grid(True)

    axes[2].plot(t[:500], signal_filtered_ma[:500])
    axes[2].set_title('Moving Average Filtered Signal')
    axes[2].set_xlabel('Time (s)')
    axes[2].set_ylabel('Amplitude')
    axes[2].grid(True)

    axes[3].plot(t[:500], signal_clean[:500])
    axes[3].set_title('Original Clean Signal')
    axes[3].set_xlabel('Time (s)')
    axes[3].set_ylabel('Amplitude')
    axes[3].grid(True)

    plt.tight_layout()
    plt.show()

    # Frequency response
    b, a = design_lowpass_filter(cutoff, fs, order=5)
    w, h = signal.freqz(b, a, worN=8000, fs=fs)

    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10, 8))

    ax1.plot(w, 20 * np.log10(abs(h)))
    ax1.set_title('Low-Pass Filter Frequency Response')
    ax1.set_xlabel('Frequency (Hz)')
    ax1.set_ylabel('Magnitude (dB)')
    ax1.axvline(cutoff, color='r', linestyle='--', label=f'Cutoff: {cutoff} Hz')
    ax1.axhline(-3, color='g', linestyle='--', label='-3dB point')
    ax1.grid(True)
    ax1.legend()

    ax2.plot(w, np.angle(h))
    ax2.set_xlabel('Frequency (Hz)')
    ax2.set_ylabel('Phase (radians)')
    ax2.grid(True)

    plt.tight_layout()
    plt.show()
```

## Arduino Implementation

```cpp
// Simple first-order low-pass filter for Arduino
class LowPassFilter {
private:
    float alpha;       // Smoothing factor (0 < alpha < 1)
    float filtered_value;

public:
    LowPassFilter(float cutoff_freq, float sample_rate) {
        float RC = 1.0 / (2.0 * PI * cutoff_freq);
        float dt = 1.0 / sample_rate;
        alpha = dt / (RC + dt);
        filtered_value = 0;
    }

    // Alternative constructor with direct alpha
    LowPassFilter(float smoothing_factor) {
        alpha = smoothing_factor;
        filtered_value = 0;
    }

    float update(float input) {
        filtered_value = alpha * input + (1 - alpha) * filtered_value;
        return filtered_value;
    }

    void reset(float value = 0) {
        filtered_value = value;
    }

    float get_value() {
        return filtered_value;
    }
};

// Example usage for sensor smoothing
LowPassFilter sensor_filter(10.0, 100.0);  // 10 Hz cutoff, 100 Hz sample rate

void setup() {
    Serial.begin(9600);
}

void loop() {
    float raw_sensor_value = analogRead(A0);
    float filtered_value = sensor_filter.update(raw_sensor_value);

    Serial.print("Raw: ");
    Serial.print(raw_sensor_value);
    Serial.print(" Filtered: ");
    Serial.println(filtered_value);

    delay(10);  // 100 Hz sampling (10ms)
}
```

## Filter Types Comparison

| Filter Type      | Passband Ripple | Stopband Ripple | Transition | Phase      |
| ---------------- | --------------- | --------------- | ---------- | ---------- |
| **Butterworth**  | Flat            | Monotonic       | Moderate   | Smooth     |
| **Chebyshev I**  | Ripple          | Monotonic       | Sharp      | Non-linear |
| **Chebyshev II** | Flat            | Ripple          | Sharp      | Non-linear |
| **Elliptic**     | Ripple          | Ripple          | Sharpest   | Non-linear |
| **Bessel**       | Flat            | Slow roll-off   | Gentle     | Linear     |

## Common Applications

### Audio Processing

- **Bass boost**: Enhance low frequencies
- **Noise reduction**: Remove hiss and high-frequency artifacts
- **Anti-aliasing**: Prevent aliasing before downsampling

### Control Systems

- **Sensor smoothing**: Reduce measurement noise
- **Actuator commands**: Smooth control signals
- **State estimation**: Filter noisy measurements

### Signal Processing

- **Decimation**: Reduce sample rate after filtering
- **Trend extraction**: Remove high-frequency variations
- **Data smoothing**: General-purpose noise reduction

## Practical Considerations

- **Cut-off Frequency**: Choose based on highest frequency to preserve
- **Filter Order**: Higher order = sharper transition, more computation, potential instability
- **Phase Distortion**: Use `filtfilt()` for zero-phase filtering (processes forward and backward)
- **Transient Response**: Higher-order filters may ring or overshoot
- **Real-time Constraints**: Simple filters (moving average, first-order) better for embedded systems

---

## References

- [Low-Pass Filter - Wikipedia](https://en.wikipedia.org/wiki/Low-pass_filter)
- [SciPy Signal Processing](https://docs.scipy.org/doc/scipy/reference/signal.html)
- [Digital Filters - MATLAB](https://www.mathworks.com/help/signal/filter-design.html)
