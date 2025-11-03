---
{"publish":true,"title":"Notch Filter","created":"2024-08-08T00:00:00.000Z","modified":"2025-11-03T20:43:36.606+01:00","tags":["engineering/signal-processing/filters/notch"],"cssclasses":"center-images"}
---


# NOTCH FILTER

---

Filter that weakens signals in a small range of frequencies and allows all other frequencies to pass through unchanged.

Also referred as _band-rejection filter_. Made from a combination of a [[distilled-notes/high-pass-filter\|high pass filter]] and a [[distilled-notes/low-pass-filter\|low pass filter]]

## Usage

Effective at removing interfering signals at specific frequencies

- Background hum of electrical grid ($50Hz$ or $60Hz$)
- Interfering FM broadcast signals

## Design

![[meta/assets/notch2.png]]

$$
F(s) = \frac{\omega_d^2}{\omega_n^2} \frac{s^2+2 D_n \omega_n s + \omega_n^2}{s^2 + 2 D_d \omega_d s + \omega_d^2}
$$

$$
\omega_i = \text{cut-off frequency in nominator/denominator}
$$

$$
D_i = \text{damping factor in nominator/denominator}
$$

## Parameters

- **$\omega_n$**: Notch frequency (frequency to attenuate)
- **$\omega_d$**: Bandwidth frequency (affects width of notch)
- **$D_n$**: Numerator damping (controls notch depth, typically small: 0.01-0.1)
- **$D_d$**: Denominator damping (controls bandwidth, typically larger: 0.5-2.0)
- **Quality Factor $Q$**: Ratio $\frac{\omega_n}{\text{bandwidth}}$ (higher Q = narrower notch)

## Design Procedure

1. **Identify interference frequency**: Measure the unwanted frequency component
2. **Set notch frequency**: $\omega_n$ = interference frequency (rad/s)
3. **Choose quality factor**: Higher Q for narrower rejection
4. **Select damping ratios**:
   - Small $D_n$ for deep notch
   - Larger $D_d$ for stability
5. **Verify performance**: Check frequency response

## Python Implementation

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import signal

class NotchFilter:
    """Design and simulate notch filters"""

    @staticmethod
    def design_notch(f_notch, Q, fs):
        """
        Design a digital notch filter

        Args:
            f_notch: Notch frequency (Hz)
            Q: Quality factor (higher = narrower notch)
            fs: Sampling frequency (Hz)

        Returns:
            b, a: Filter coefficients (numerator, denominator)
        """
        # Normalised frequency
        w0 = f_notch / (fs / 2)

        # Design notch filter
        b, a = signal.iirnotch(w0, Q, fs=fs)

        return b, a

    @staticmethod
    def design_notch_continuous(omega_n, D_n, D_d, omega_d=None):
        """
        Design continuous-time notch filter using transfer function form

        Args:
            omega_n: Notch frequency (rad/s)
            D_n: Numerator damping
            D_d: Denominator damping
            omega_d: Denominator frequency (default: omega_n)

        Returns:
            num, den: Transfer function coefficients
        """
        if omega_d is None:
            omega_d = omega_n

        # Numerator: s^2 + 2*D_n*omega_n*s + omega_n^2
        num = [1, 2*D_n*omega_n, omega_n**2]

        # Denominator: s^2 + 2*D_d*omega_d*s + omega_d^2
        den = [1, 2*D_d*omega_d, omega_d**2]

        # Scale to match DC gain
        num = [c * (omega_d**2 / omega_n**2) for c in num]

        return num, den

    @staticmethod
    def plot_frequency_response(b, a, fs, title="Notch Filter"):
        """Plot magnitude and phase response"""
        w, h = signal.freqz(b, a, worN=8000, fs=fs)

        fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(12, 10))

        # Magnitude response
        ax1.plot(w, 20 * np.log10(abs(h)), 'b', linewidth=2)
        ax1.set_ylabel('Magnitude (dB)', fontsize=12)
        ax1.set_title(title, fontsize=14)
        ax1.grid(True, alpha=0.3)
        ax1.set_xlim([0, fs/2])

        # Phase response
        angles = np.unwrap(np.angle(h))
        ax2.plot(w, np.degrees(angles), 'g', linewidth=2)
        ax2.set_xlabel('Frequency (Hz)', fontsize=12)
        ax2.set_ylabel('Phase (degrees)', fontsize=12)
        ax2.grid(True, alpha=0.3)
        ax2.set_xlim([0, fs/2])

        plt.tight_layout()
        plt.show()

    @staticmethod
    def apply_filter(signal_data, b, a):
        """Apply notch filter to signal"""
        return signal.filtfilt(b, a, signal_data)

# Example applications
def demo_power_line_filter():
    """Remove 50 Hz power line interference"""

    # Parameters
    fs = 1000  # Sampling frequency (Hz)
    T = 5.0    # Duration (s)
    t = np.arange(0, T, 1/fs)

    # Generate signal: 10 Hz sine wave + 50 Hz interference
    signal_clean = np.sin(2 * np.pi * 10 * t)
    interference = 0.5 * np.sin(2 * np.pi * 50 * t)
    signal_noisy = signal_clean + interference

    # Design notch filter for 50 Hz
    f_notch = 50  # Hz
    Q = 30        # Quality factor
    b, a = NotchFilter.design_notch(f_notch, Q, fs)

    # Apply filter
    signal_filtered = NotchFilter.apply_filter(signal_noisy, b, a)

    # Plot results
    fig, axes = plt.subplots(4, 1, figsize=(14, 12))

    # Time domain
    t_plot = t[:500]  # First 0.5 seconds
    axes[0].plot(t_plot, signal_clean[:500], 'g-', linewidth=2, label='Clean signal')
    axes[0].set_ylabel('Amplitude', fontsize=12)
    axes[0].set_title('50 Hz Power Line Interference Removal', fontsize=14)
    axes[0].grid(True, alpha=0.3)
    axes[0].legend(fontsize=10)

    axes[1].plot(t_plot, signal_noisy[:500], 'r-', linewidth=1, alpha=0.7, label='Noisy signal')
    axes[1].set_ylabel('Amplitude', fontsize=12)
    axes[1].grid(True, alpha=0.3)
    axes[1].legend(fontsize=10)

    axes[2].plot(t_plot, signal_filtered[:500], 'b-', linewidth=2, label='Filtered signal')
    axes[2].set_xlabel('Time (s)', fontsize=12)
    axes[2].set_ylabel('Amplitude', fontsize=12)
    axes[2].grid(True, alpha=0.3)
    axes[2].legend(fontsize=10)

    # Frequency domain
    freq_clean = np.fft.rfftfreq(len(t), 1/fs)
    fft_noisy = np.abs(np.fft.rfft(signal_noisy))
    fft_filtered = np.abs(np.fft.rfft(signal_filtered))

    axes[3].plot(freq_clean, fft_noisy, 'r-', linewidth=1, alpha=0.7, label='Noisy spectrum')
    axes[3].plot(freq_clean, fft_filtered, 'b-', linewidth=2, label='Filtered spectrum')
    axes[3].set_xlabel('Frequency (Hz)', fontsize=12)
    axes[3].set_ylabel('Magnitude', fontsize=12)
    axes[3].set_xlim([0, 100])
    axes[3].grid(True, alpha=0.3)
    axes[3].legend(fontsize=10)

    plt.tight_layout()
    plt.show()

    # Show frequency response
    NotchFilter.plot_frequency_response(b, a, fs, "50 Hz Notch Filter")

def demo_multiple_notches():
    """Demonstrate multiple notch filters in series"""

    fs = 1000
    T = 2.0
    t = np.arange(0, T, 1/fs)

    # Signal with multiple interference frequencies
    signal_clean = np.sin(2 * np.pi * 5 * t)
    interference1 = 0.3 * np.sin(2 * np.pi * 50 * t)
    interference2 = 0.2 * np.sin(2 * np.pi * 100 * t)
    signal_noisy = signal_clean + interference1 + interference2

    # Design multiple notch filters
    Q = 30
    b1, a1 = NotchFilter.design_notch(50, Q, fs)
    b2, a2 = NotchFilter.design_notch(100, Q, fs)

    # Apply filters in series
    signal_filtered = NotchFilter.apply_filter(signal_noisy, b1, a1)
    signal_filtered = NotchFilter.apply_filter(signal_filtered, b2, a2)

    # Plot comparison
    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(14, 10))

    # Time domain
    t_plot = t[:200]
    ax1.plot(t_plot, signal_noisy[:200], 'r-', alpha=0.5, label='Noisy')
    ax1.plot(t_plot, signal_filtered[:200], 'b-', linewidth=2, label='Filtered')
    ax1.plot(t_plot, signal_clean[:200], 'g--', linewidth=1, label='Original')
    ax1.set_xlabel('Time (s)', fontsize=12)
    ax1.set_ylabel('Amplitude', fontsize=12)
    ax1.set_title('Multiple Notch Filters (50 Hz + 100 Hz)', fontsize=14)
    ax1.grid(True, alpha=0.3)
    ax1.legend(fontsize=10)

    # Frequency domain
    freq = np.fft.rfftfreq(len(t), 1/fs)
    fft_noisy = np.abs(np.fft.rfft(signal_noisy))
    fft_filtered = np.abs(np.fft.rfft(signal_filtered))

    ax2.plot(freq, fft_noisy, 'r-', alpha=0.7, label='Noisy')
    ax2.plot(freq, fft_filtered, 'b-', linewidth=2, label='Filtered')
    ax2.set_xlabel('Frequency (Hz)', fontsize=12)
    ax2.set_ylabel('Magnitude', fontsize=12)
    ax2.set_xlim([0, 150])
    ax2.grid(True, alpha=0.3)
    ax2.legend(fontsize=10)

    plt.tight_layout()
    plt.show()

if __name__ == "__main__":
    demo_power_line_filter()
    demo_multiple_notches()
```

## Arduino Implementation

```cpp
// Simple notch filter for Arduino
class NotchFilter {
private:
    float a1, a2, b0, b1, b2;
    float x1, x2, y1, y2;

public:
    NotchFilter(float frequency, float sampleRate, float Q) {
        // Calculate coefficients for digital notch filter
        float omega = 2.0 * PI * frequency / sampleRate;
        float alpha = sin(omega) / (2.0 * Q);

        float a0 = 1.0 + alpha;
        b0 = 1.0 / a0;
        b1 = -2.0 * cos(omega) / a0;
        b2 = 1.0 / a0;
        a1 = -2.0 * cos(omega) / a0;
        a2 = (1.0 - alpha) / a0;

        // Initialize state
        x1 = x2 = y1 = y2 = 0;
    }

    float update(float input) {
        // Apply difference equation
        float output = b0 * input + b1 * x1 + b2 * x2
                      - a1 * y1 - a2 * y2;

        // Update state
        x2 = x1;
        x1 = input;
        y2 = y1;
        y1 = output;

        return output;
    }

    void reset() {
        x1 = x2 = y1 = y2 = 0;
    }
};

// Example: Remove 50 Hz from analog input
NotchFilter notch50Hz(50.0, 1000.0, 30.0);

void setup() {
    Serial.begin(115200);
}

void loop() {
    // Read analog input
    int rawValue = analogRead(A0);
    float input = rawValue * (5.0 / 1023.0);

    // Apply notch filter
    float filtered = notch50Hz.update(input);

    // Output result
    Serial.print(input);
    Serial.print(",");
    Serial.println(filtered);

    delay(1);  // 1 kHz sampling rate
}
```

## Applications

- **Audio processing**: Remove hum from recordings (50/60 Hz)
- **Medical devices**: Remove power line interference from ECG/EEG
- **Communication systems**: Eliminate carrier leak and spurious signals
- **Control systems**: Attenuate resonance frequencies
- **Instrumentation**: Remove periodic interference from measurements
- **Vibration analysis**: Filter out known excitation frequencies

---

## References

- [Notch Filter Design - Analog Devices](https://www.analog.com/en/design-center/design-tools-and-calculators.html)
- [Digital Filter Design - scipy.signal Documentation](https://docs.scipy.org/doc/scipy/reference/signal.html)
- [Active Notch Filter Circuits - Texas Instruments](https://www.ti.com/lit/an/sloa049b/sloa049b.pdf)
- [IIR Filter Design - dspguide.com](http://www.dspguide.com/)
