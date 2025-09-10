---
{"publish":true,"title":"Maxwell's Equations","created":"2025-03-25 12:39","modified":"2025-08-18T12:58:14.255+02:00","tags":["#resource"],"cssclasses":"center-images"}
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

---

## References
