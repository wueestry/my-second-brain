---
{"publish":true,"title":"DR-SPAAM","created":"2025-02-24 07:32","tags":["#detection","#lidar","#perception","#resource","#robotics"],"cssclasses":""}
---


# DR-SPAAM

> [!abstract]
> Detect people using a 2D LiDAR sensor with a spatial-attention and auto-regressive model

Spatial attention and auto-regressive model that fuses information from previous LiDAR scans without need of alignment operation

- Other methods:
  - Use previous scans and align them with odometry information -> Backward looking paradigm
- Here: - Forward looking paradigm by just adding new information of new scans
  Much faster compared to other detection algorithms (DROW3) with superior performance

## Method

### DROW

- Temporal Information Aggregation computed using last 5 scenes
  - In each step the cut-outs for all previous scenes have to be recomputed to match points

### DR-SPAAM

- Forward looking paradigm
- 4x faster than DROW
- Compute pairwise similarity in network
  $$
  	\Omega_{nj} = \psi(F_j^{t-1})^T \psi(F_n^t)
  $$
  For all points in the neighbourhood 
- Convert similarity to weighting factors
  $$
  \tilde{F}_n^{t-1} = \sum_{j=n-w}^{n+w} softmax(\Omega_n)_j F_j^{t-1}
  $$
- Weights points more with higher similarity
- To combine more than two scans
  $$
  	\tilde{F}_n^{t} = \alpha F_n^t +(1-\alpha)\sum_{j=n-w}^{n+w} softmax(\Omega_n)_j \tilde{F}_j^{t-1}
  $$
- Doesn't require robot odometry or cut-out re-computation to realign scans
