---
{"publish":true,"title":"Maxwell's Equations","created":"2025-03-25 12:39","modified":"2025-11-03T20:43:47.212+01:00","tags":["physics/electromagnetism/maxwells-equations"],"cssclasses":"center-images"}
---


# MAXWELL'S EQUATIONS

---

Maxwell's equations, or Maxwell–Heaviside equations, are a set of coupled partial differential equations that, together with the Lorentz force law, form the foundation of classical electromagnetism, classical optics, electric and magnetic circuits.

![[meta/assets/electromagnetism.png]]

## Equations

### Gauss's Law

$$
\nabla E = \frac{\rho}{\epsilon_0} \qquad \oint_{\delta \Omega} E \,dS = \frac{1}{\epsilon_0} \iiint_{\Omega} \rho \,dV
$$

### Gauss's Law of Electromagnetism

$$
\nabla B = 0 \qquad \oint_{\delta \Omega}B \,dS = 0
$$

### Maxwell - Faraday Equation

$$
\nabla \times E = - \frac{\delta B}{\delta t} \qquad \oint_{\delta \Sigma} E dl = - \frac{d}{dt}\iint_{\Sigma}B \,dS
$$

### Ampère - Maxwell Law

$$
\nabla \times B = \mu_0 (J+\epsilon_0 \frac{\delta E}{\delta t}) \qquad \oint_{\delta \Sigma}B \,dl = \mu_0 ( \iint_{\Sigma}J \,dS + \epsilon_0 \frac{d}{dt}\iint_{\Sigma}E \,dS)
$$

#### Variants

- Microscopic equations
  - Universal applicability but unwieldy for common calculations
  - Relate the electric and magnetic fields to total charge and total current, including the complicated charges and currents in materials at the atomic scale
- Macroscopic equations
  - Defines two new auxiliary fields that describe the large-scale behaviour of matter without having to consider atomic-scale charges and quantum phenomena like spins
  - Requires experimentally determined parameters for a phenomenological description of the electromagnetic response of materials

## Physical Interpretation

### Gauss's Law

Electric field lines originate from positive charges and terminate at negative charges. The total electric flux through a closed surface is proportional to the enclosed charge.

**Example**: A point charge $Q$ produces an electric field $E = \frac{Q}{4\pi\epsilon_0 r^2}$.

### Gauss's Law for Magnetism

Magnetic field lines always form closed loops (no magnetic monopoles exist). The total magnetic flux through any closed surface is zero.

**Example**: A bar magnet always has both north and south poles; you cannot isolate one pole.

### Faraday's Law

A changing magnetic field induces an electric field. This is the principle behind electrical generators and transformers.

**Example**: Moving a magnet through a coil of wire induces a voltage: $\mathcal{E} = -N\frac{d\Phi_B}{dt}$.

### Ampère-Maxwell Law

Magnetic fields are produced by electric currents and by changing electric fields. Maxwell's addition of the displacement current term unified the equations.

**Example**: Current in a wire produces a circular magnetic field: $B = \frac{\mu_0 I}{2\pi r}$.

## Applications

- **Electromagnetic waves**: Light, radio waves, X-rays all satisfy the wave equation derived from Maxwell's equations
- **Wireless communication**: Antenna design based on Maxwell's equations
- **Optics**: Reflection, refraction, and diffraction explained by electromagnetic theory
- **Electrical engineering**: Circuit theory, transformers, motors, generators
- **Plasma physics**: Behaviour of charged particles in electromagnetic fields

## Python Visualization Example

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import FancyArrowPatch
from mpl_toolkits.mplot3d import proj3d

class Arrow3D(FancyArrowPatch):
    def __init__(self, xs, ys, zs, *args, **kwargs):
        super().__init__((0,0), (0,0), *args, **kwargs)
        self._verts3d = xs, ys, zs

    def do_3d_projection(self, renderer=None):
        xs3d, ys3d, zs3d = self._verts3d
        xs, ys, zs = proj3d.proj_transform(xs3d, ys3d, zs3d, self.axes.M)
        self.set_positions((xs[0], ys[0]), (xs[1], ys[1]))
        return np.min(zs)

def plot_electric_dipole():
    """Visualize electric field of a dipole (Gauss's Law)"""
    fig, ax = plt.subplots(figsize=(10, 8))

    # Create grid
    x = np.linspace(-3, 3, 20)
    y = np.linspace(-3, 3, 20)
    X, Y = np.meshgrid(x, y)

    # Dipole positions
    q1_pos = np.array([-1, 0])  # positive charge
    q2_pos = np.array([1, 0])   # negative charge

    # Calculate electric field
    Ex = np.zeros_like(X)
    Ey = np.zeros_like(Y)

    for i in range(X.shape[0]):
        for j in range(X.shape[1]):
            r_pos = np.array([X[i,j], Y[i,j]])

            # Field from positive charge
            r1 = r_pos - q1_pos
            r1_mag = np.linalg.norm(r1)
            if r1_mag > 0.2:
                E1 = r1 / r1_mag**3

            # Field from negative charge
            r2 = r_pos - q2_pos
            r2_mag = np.linalg.norm(r2)
            if r2_mag > 0.2:
                E2 = -r2 / r2_mag**3

            Ex[i,j] = E1[0] + E2[0]
            Ey[i,j] = E1[1] + E2[1]

    # Plot field lines
    ax.streamplot(X, Y, Ex, Ey, color='blue', density=1.5, linewidth=1,
                  arrowsize=1.5, arrowstyle='->')

    # Plot charges
    ax.plot(*q1_pos, 'ro', markersize=15, label='Positive charge')
    ax.plot(*q2_pos, 'bo', markersize=15, label='Negative charge')

    ax.set_xlabel('x')
    ax.set_ylabel('y')
    ax.set_title("Electric Field of a Dipole (Gauss's Law)")
    ax.legend()
    ax.grid(True, alpha=0.3)
    ax.set_aspect('equal')
    plt.show()

def plot_faraday_induction():
    """Visualize electromagnetic induction (Faraday's Law)"""
    t = np.linspace(0, 4*np.pi, 1000)

    # Changing magnetic flux
    B = np.sin(t)

    # Induced EMF (Faraday's Law: EMF = -dΦ/dt)
    emf = -np.cos(t)

    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(12, 8))

    # Plot magnetic flux
    ax1.plot(t, B, 'b-', linewidth=2, label='Magnetic Flux Φ(t)')
    ax1.set_ylabel('Magnetic Flux (Wb)', fontsize=12)
    ax1.set_title("Faraday's Law: Electromagnetic Induction", fontsize=14)
    ax1.grid(True, alpha=0.3)
    ax1.legend(fontsize=10)

    # Plot induced EMF
    ax2.plot(t, emf, 'r-', linewidth=2, label='Induced EMF = -dΦ/dt')
    ax2.set_xlabel('Time (s)', fontsize=12)
    ax2.set_ylabel('Induced EMF (V)', fontsize=12)
    ax2.grid(True, alpha=0.3)
    ax2.legend(fontsize=10)

    plt.tight_layout()
    plt.show()

def plot_wave_propagation():
    """Visualize electromagnetic wave (derived from Maxwell's equations)"""
    z = np.linspace(0, 10, 100)
    t = 0  # snapshot at t=0

    # Wavelength and wave number
    wavelength = 2
    k = 2 * np.pi / wavelength
    omega = k  # for simplicity, c=1

    # Electric and magnetic fields
    E = np.sin(k * z - omega * t)
    B = np.sin(k * z - omega * t)

    fig = plt.figure(figsize=(14, 6))
    ax = fig.add_subplot(111, projection='3d')

    # Plot electric field (oscillates in x-direction)
    ax.plot(z, E, np.zeros_like(z), 'b-', linewidth=2, label='Electric Field')

    # Plot magnetic field (oscillates in y-direction)
    ax.plot(z, np.zeros_like(z), B, 'r-', linewidth=2, label='Magnetic Field')

    # Add arrows to show field directions at specific points
    for i in range(0, len(z), 10):
        if abs(E[i]) > 0.1:
            arrow = Arrow3D([z[i], z[i]], [0, E[i]], [0, 0],
                          mutation_scale=20, lw=1, arrowstyle='-|>',
                          color='blue', alpha=0.6)
            ax.add_artist(arrow)

        if abs(B[i]) > 0.1:
            arrow = Arrow3D([z[i], z[i]], [0, 0], [0, B[i]],
                          mutation_scale=20, lw=1, arrowstyle='-|>',
                          color='red', alpha=0.6)
            ax.add_artist(arrow)

    ax.set_xlabel('Propagation Direction (z)', fontsize=12)
    ax.set_ylabel('Electric Field (x)', fontsize=12)
    ax.set_zlabel('Magnetic Field (y)', fontsize=12)
    ax.set_title('Electromagnetic Wave Propagation', fontsize=14)
    ax.legend(fontsize=10)
    plt.show()

# Run visualizations
if __name__ == "__main__":
    plot_electric_dipole()
    plot_faraday_induction()
    plot_wave_propagation()
```

## Derivation of Wave Equation

From Maxwell's equations in vacuum ($\rho = 0$, $J = 0$):

1. Take curl of Faraday's Law:
   $$\nabla \times (\nabla \times E) = -\nabla \times \frac{\partial B}{\partial t}$$

2. Use vector identity $\nabla \times (\nabla \times E) = \nabla(\nabla \cdot E) - \nabla^2 E$:
   $$\nabla^2 E = \nabla \times \frac{\partial B}{\partial t}$$

3. Substitute Ampère-Maxwell Law:
   $$\nabla^2 E = \mu_0 \epsilon_0 \frac{\partial^2 E}{\partial t^2}$$

4. This gives the wave equation with wave speed $c = \frac{1}{\sqrt{\mu_0 \epsilon_0}} \approx 3 \times 10^8$ m/s.

---

## References

- [Maxwell's Equations - MIT OpenCourseWare](https://ocw.mit.edu/courses/physics/)
- [Electromagnetic Theory - Stanford University](https://ee.stanford.edu/)
- [The Feynman Lectures on Physics Vol. II](https://www.feynmanlectures.caltech.edu/)
- [Electromagnetism - Khan Academy](https://www.khanacademy.org/science/physics/electric-charge-electric-force-and-voltage)
