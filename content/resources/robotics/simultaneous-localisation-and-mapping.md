---
{"publish":true,"title":"Simultaneous Localisation and Mapping","created":"2024-12-17 10:42","tags":["#resource","#robotics","#term"],"cssclasses":""}
---


# Simultaneous Localisation and Mapping

> [!abstract]
> **Simultaneous localization and mapping (SLAM)** is the computational problem of constructing or updating a map of an unknown environment while simultaneously keeping track of an agent's location within it.

![[resources/robotics/assets/slam.png]]

## Types of SLAM

### Visual SLAM (vSLAM)

Uses images acquired from cameras and other image sensors.
Uses simple cameras (wide angle, fish-eye, and spherical cameras), compound eye cameras (stereo and multi cameras), and RGB-D cameras (depth and ToF cameras).

#### Advantages

- Can be implemented at low cost with relatively inexpensive cameras.
- Due to large volume of image information, they can be used to detect landmarks (previously measured positions).

Landmark detection can also be combined with graph-based optimization, achieving flexibility in SLAM implementation.

#### Monocular SLAM

Type of SLAM algorithm using a single camera.

Challenging to define depth when using single camera.

Solved by either detecting AR markers, checkerboards, or other known objects in the image for localization or by fusing the camera information with another sensor such as inertial measurement units (IMUs). To measure velocity and orientation.
![[resources/robotics/assets/mono-vslam.png]]

#### Sub-Categories

Visual SLAM algorithms can be broadly classified into two categories.

- **Sparse methods:** Match feature points of images and use algorithms such as PTAM and ORB-SLAM.
- **Dense methods:** Use the overall brightness of images and use algorithms such as DTAM, LSD-SLAM, DSO, and SVO.

##### Stereo vSLAM

![[resources/robotics/assets/stereo-vslam.png]]

##### RGB-D vSLAM

![[resources/robotics/assets/rgbd-vslam.png]]

### LiDAR SLAM

Uses primarily a laser sensor (or distance sensor), which are significantly more precise.

The output values from laser sensors are generally 2D (x, y) or 3D (x, y, z) point cloud data. Point clouds provides high-precision distance measurements and works effectively for map construction with SLAM algorithms.
Movement is estimated using the variation in sequential point clouds. This is then used for localizing the vehicle. To estimate the relative transformation between the point clouds, registration algorithms can be used, such as iterative closest point (ICP) and normal distributions transform (NDT). Alternatively, feature-based approach such as Lidar Odometry and Mapping (LOAM) or Fast Global Registration (FGR), based on FPFH features are also usable.

A common representation of point cloud maps are grid or voxel maps.

Due to these challenges, localization for autonomous vehicles may involve fusing other measurements such as wheel odometry, global navigation satellite system (GNSS), and IMU data. For applications such as warehouse robots, 2D lidar SLAM is commonly used, whereas SLAM using 3D point clouds is commonly used for UAVs and automated driving.

##### 2D LiDAR SLAM

![[resources/robotics/assets/2d-lidar-slam.png]]

##### 3D LiDAR SLAM

![[resources/robotics/assets/3d-lidar-slam.png]]

### Multi-Sensor SLAM

Utilises a variety of sensors to enhance the precision and robustness of SLAM algorithms. By using the complementary strengths of different sensors and mitigating their individual limitations, multi-sensor SLAM can achieve superior performance.

By integrating data from various sources a more dependable solution can be achieved. One possible method is factor graph, which is a modular and adaptable framework allowing custom sensor inputs represented as a pose factor.
