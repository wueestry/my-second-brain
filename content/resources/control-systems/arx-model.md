---
{"publish":true,"title":"ARX Model","created":"2024-11-08 13:32","tags":["#resource","#system-identification","#term"],"cssclasses":""}
---


# ARX Model

> [!abstract]
> ARX models are a powerful tool for modelling and analysing the behaviour of dynamic systems.

An ARX model is a combination of an autoregressive model (AR) and an exogenous input model (X).
It is used to represent the dynamics of a system.

## Autoregressive Model

## Definition

Type of statistical model that represents an output (dependent on time) as a linear combination of its **previous values** and an additional stochastic process.

$$
y(t) = c + a_1y(t-1) + a_2y(t-2) + ...+a_py(t-p) + e(t)
$$


## Exogeneous Input

## Definition

Type of statistical model that represents an output (dependent on time) as a linear combination of its **external input** variables.

$$
y(t) = c + b_1u(t-1) + b_2u(t-2) + ... + b_qu(t-q) + e(t)
$$


## ARX Model

Combination of both an autoregressive model and an exogenous input model

$$
y(t) = c + a_1y(t-1) + a_2y(t-2) + ... +a_py(t-p) + b_1u(t-1) + b_2u(t-2) + ... + b_qu(t-q) + e(t)
$$

or more compactly in discrete time

$$
y[k] = \sum_{i=1}^{n_a}a_iy[k-i+1] + \sum_{i=1}^{n_b}b_iu[k-i+1]
$$

### Example

![[resources/control-systems/assets/arx-sysid.png]]

#### Code

```python
from gekko import GEKKO
import pandas as pd
import matplotlib.pyplot as plt

# load data and parse into columns
url = 'http://apmonitor.com/dde/uploads/Main/tclab_step_test.txt'
data = pd.read_csv(url)
t = data['Time']
u = data[['Q1','Q2']]
y = data[['T1','T2']]

# generate time-series model
m = GEKKO(remote=False)

# system identification
na = 2 # output coefficients
nb = 2 # input coefficients
yp,p,K = m.sysid(t,u,y,na,nb)

plt.figure(figsize=(8,5))
plt.subplot(2,1,1)
plt.plot(t,u)
plt.legend([r'$Q_1$',r'$Q_2$'])
plt.ylabel('Inputs')
plt.subplot(2,1,2)
plt.plot(t,y)
plt.plot(t,yp)
plt.legend([r'$T_{m,1}$',r'$T_{m,2}$',r'$T_{p,0}$',r'$T_{p,2}$'])
plt.ylabel('Outputs')
plt.xlabel('Time')
plt.tight_layout()
plt.show()
```
