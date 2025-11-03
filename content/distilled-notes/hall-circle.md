---
{"publish":true,"title":"Hall Circle","created":"2024-08-08T00:00:00.000Z","modified":"2025-11-03T20:27:08.279+01:00","tags":[null],"cssclasses":"center-images"}
---


# HALL CIRCLE

---

Hall circles (also known as **M-circles** and **N-circles**) are a graphical tool used to obtain values of a closed-loop transfer function from a [[distilled-notes/nyquist-plot\|Nyquist plot]] of the associated open-loop transfer function.

![[meta/assets/hall-circle.png]]

Wherever the closed-loop transfer function $G_{cl}$ intersects an $M$ or $N$-circle, we can read the magnitude $|G_{cl}|$ and phase $\angle G_{cl}$ at a given frequency $\omega$

## Construction

### M-circles

Show the constant closed-loop magnitude of an open-loop Nyquist plot. Each circle $M$ can be calculated the following way:

$$
M =|G_{cl}|=\frac{|G(s)|}{|1+G(s)|}
$$

#### Bandwidth

The closed-loop bandwidth can be found by finding the intersection with the $-3dB$ $M$-circle

#### Plotting

The $x$ and $y$ positions of a $M$-circle with the magnitude $M_t$ can be calculated using:

$$
c_t = \frac{-M_t^2}{M_t^2-1} \qquad r_t = \frac{M_t}{M_t^2 -1}
$$

$$
x = c_t + r_t \cdot cos(\theta) \qquad y = r_t \cdot sin(\theta)
$$

### N-circles

Show the constant closed-loop phase of an open-loop Nyquist plot. Each circle $N$ can be calculated by:

$$
N = arg[ \frac{G(s)}{1+ G(s)}] = arg[(G(s)] - arg[1+ G(s)]
$$

#### Plotting

The $x$ and $y$ positions of a $N$-circle with the magnitude $M_s$ can be calculated using:

$$
x = -1 + \frac{cos(\theta)}{M_s} \qquad y = \frac{sin(\theta)}{M_s}
$$

## Python Implementation

```python
import numpy as np
import matplotlib.pyplot as plt

def plot_m_circles(M_values, theta_range=np.linspace(0, 2*np.pi, 500)):
    """
    Plot M-circles for constant closed-loop magnitude.

    Args:
        M_values: List of magnitude values to plot
        theta_range: Angular range for circle plotting
    """
    plt.figure(figsize=(10, 10))

    for M in M_values:
        if M == 1:
            # M=1 is a vertical line at x=-0.5
            plt.axvline(x=-0.5, color='r', linestyle='--',
                       label=f'M = {M} dB')
        else:
            # Calculate circle parameters
            c_t = -M**2 / (M**2 - 1)
            r_t = abs(M / (M**2 - 1))

            # Generate circle points
            x = c_t + r_t * np.cos(theta_range)
            y = r_t * np.sin(theta_range)

            M_dB = 20 * np.log10(M) if M > 0 else -np.inf
            plt.plot(x, y, label=f'M = {M_dB:.1f} dB')

    plt.axhline(y=0, color='k', linestyle='-', linewidth=0.5)
    plt.axvline(x=0, color='k', linestyle='-', linewidth=0.5)
    plt.axvline(x=-1, color='r', linestyle='--', linewidth=1,
               label='Critical point')

    plt.xlabel('Real Part')
    plt.ylabel('Imaginary Part')
    plt.title('M-Circles (Constant Magnitude)')
    plt.grid(True, alpha=0.3)
    plt.axis('equal')
    plt.legend()
    plt.xlim(-3, 1)
    plt.ylim(-2, 2)

    return plt

def plot_n_circles(N_values_deg, theta_range=np.linspace(0, 2*np.pi, 500)):
    """
    Plot N-circles for constant closed-loop phase.

    Args:
        N_values_deg: List of phase values in degrees
        theta_range: Angular range for circle plotting
    """
    plt.figure(figsize=(10, 10))

    for N_deg in N_values_deg:
        N_rad = np.radians(N_deg)
        M_s = np.tan(N_rad)

        if abs(M_s) < 1e-6:
            # N=0 or ±180 degrees
            plt.axhline(y=0, color='b', linestyle='--')
        else:
            # Generate circle points
            x = -0.5 + 0.5 * np.cos(theta_range)
            y = (1 / (2 * M_s)) + (1 / (2 * M_s)) * np.cos(theta_range)

            plt.plot(x, y, label=f'N = {N_deg}°')

    plt.axhline(y=0, color='k', linestyle='-', linewidth=0.5)
    plt.axvline(x=0, color='k', linestyle='-', linewidth=0.5)
    plt.axvline(x=-1, color='r', linestyle='--', linewidth=1,
               label='Critical point')

    plt.xlabel('Real Part')
    plt.ylabel('Imaginary Part')
    plt.title('N-Circles (Constant Phase)')
    plt.grid(True, alpha=0.3)
    plt.axis('equal')
    plt.legend()
    plt.xlim(-2, 1)
    plt.ylim(-2, 2)

    return plt

def plot_hall_circles_with_nyquist(num, den, M_vals, N_vals):
    """
    Plot Hall circles overlaid with Nyquist plot.

    Args:
        num: Transfer function numerator coefficients
        den: Transfer function denominator coefficients
        M_vals: M-circle magnitude values
        N_vals: N-circle phase values (degrees)
    """
    from scipy import signal

    # Create transfer function
    sys = signal.TransferFunction(num, den)

    # Compute frequency response
    w = np.logspace(-2, 2, 1000)
    w, H = signal.freqresp(sys, w)

    plt.figure(figsize=(12, 10))

    # Plot M-circles
    theta = np.linspace(0, 2*np.pi, 500)
    for M in M_vals:
        if M != 1:
            c_t = -M**2 / (M**2 - 1)
            r_t = abs(M / (M**2 - 1))
            x = c_t + r_t * np.cos(theta)
            y = r_t * np.sin(theta)
            plt.plot(x, y, 'b--', alpha=0.3, linewidth=1)

    # Plot N-circles
    for N_deg in N_vals:
        N_rad = np.radians(N_deg)
        M_s = np.tan(N_rad)
        if abs(M_s) > 1e-6:
            x = -0.5 + 0.5 * np.cos(theta)
            y = (1 / (2 * M_s)) + (1 / (2 * M_s)) * np.cos(theta)
            plt.plot(x, y, 'g--', alpha=0.3, linewidth=1)

    # Plot Nyquist plot
    plt.plot(H.real, H.imag, 'r-', linewidth=2, label='Nyquist Plot')
    plt.plot(H.real, -H.imag, 'r--', linewidth=2)

    # Mark critical point
    plt.plot(-1, 0, 'kx', markersize=15, markeredgewidth=3,
            label='Critical Point (-1, 0)')

    plt.axhline(y=0, color='k', linestyle='-', linewidth=0.5)
    plt.axvline(x=0, color='k', linestyle='-', linewidth=0.5)
    plt.xlabel('Real Part')
    plt.ylabel('Imaginary Part')
    plt.title('Hall Circles with Nyquist Plot')
    plt.grid(True, alpha=0.3)
    plt.axis('equal')
    plt.legend()
    plt.xlim(-3, 1)
    plt.ylim(-2, 2)

    return plt

# Example usage
if __name__ == "__main__":
    # Plot M-circles for various magnitude values
    M_values = [0.5, 0.707, 1.0, 1.5, 2.0]  # 0.707 is -3dB bandwidth
    plot_m_circles(M_values)
    plt.show()

    # Plot N-circles for various phase values
    N_values = [-90, -45, -30, 0, 30, 45, 90]
    plot_n_circles(N_values)
    plt.show()

    # Example system: G(s) = 1/(s^2 + 0.5s + 1)
    num = [1]
    den = [1, 0.5, 1]
    plot_hall_circles_with_nyquist(num, den, [0.707, 1.0, 1.5], [-45, 0, 45])
    plt.show()
```

## Applications

- **Bandwidth Determination**: Find closed-loop bandwidth by locating -3dB M-circle intersection
- **Gain Margin Analysis**: Visualise how close the Nyquist plot comes to critical circles
- **Phase Margin Analysis**: Determine phase margin using N-circle intersections
- **Closed-Loop Performance**: Predict magnitude and phase response without computing closed-loop transfer function
- **Robust Control Design**: Assess stability margins and performance trade-offs

---

## References

- [Nichols Plot and Hall Circles - Wikipedia](https://en.wikipedia.org/wiki/Nichols_plot)
- [Control Systems Engineering - Nise](https://www.wiley.com/en-us/Control+Systems+Engineering)
