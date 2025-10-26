---
{"publish":true,"title":"DR-SPAAM","created":"2025-02-24 07:32","modified":"2025-10-01T21:17:17.304+02:00","tags":["#person-detection","#computer-vision","#robotics","#lidar"],"cssclasses":"center-images"}
---


# DR-SPAAM: A SPACIAL ATTENTION AND AUTO REGRESSIVE MODEL FOR PERSON DETECTION IN 2D RANGE DATA

---

The paper introduces a novel approach to detect persons using 2D LiDAR, a generally challenging task due to the sparsity of information in 2D range data.

A significant step forward in this task is achieved by introducing a mechanism to "look-forward" and bypass the computational overhead of explicit scan alignment.

## Algorithm

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

---

## References

[[meta/references/DR-SPAAM_ A Spatial-Attention and Auto-regressive Model for Person Detection in 2D Range Data]]
