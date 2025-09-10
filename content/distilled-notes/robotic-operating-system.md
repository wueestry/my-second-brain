---
{"publish":true,"title":"Robotic Operating System","created":"2025-02-18 13:45","modified":"2025-08-18T12:58:14.324+02:00","tags":["#resource"],"cssclasses":""}
---


# ROBOTIC OPERATING SYSTEM (ROS)

---

The **Robotic Operating System (ROS)** is a set of software libraries and tools that help to build robot applications, providing frameworks for all aspects of robot development.

## Tools

### rviz

The Robot Visualisation tool is a 3D visualiser to visualise the robot, environment and, all sensor data.

### rosbag

A command line tool to record and playback ROS messages, a message protocol implemented between the different processes running simultaneously.

## Versions

### ROS1

Umbrella term for the first versions of ROS. ROS1 targets C++03 and Python 2, as well as only being supported on Ubuntu.
Due to these old build targets ROS1 is no longer actively maintained.

### ROS2

The current version of ROS which uses C++11 and C++14 as well as Python 3.5+.

### Differences

#### Middleware Update

- **ROS 1** relied on a centralized hub (rosmaster) for node communication, which could be a single point of failure.
- **ROS 2** adopts DDS (Data Distribution Service), a standard middleware offering better efficiency and scalability, ideal
  for large-scale systems.

#### Communication Model

- **ROS 1** used topics, services, and actions via rosmaster, which sometimes led to bottlenecks.
- **ROS 2** employs a publish/subscribe model through DDS, eliminating the central hub and enhancing efficiency and
  scalability.

#### Real-Time Capabilities

- **ROS 1** had limited real-time support, suitable for prototyping but not critical applications.
- **ROS 2** excels in real-time operations, making it ideal for autonomous vehicles and drones where quick reactions are
  essential.

#### Modular Architecture

- **ROS 2** features a more modular design, allowing components to operate independently, which boosts system robustness and
  scalability.

#### Quality of Service (QoS)

- **ROS 1** had limited QoS options.
- **ROS 2** supports various QoS policies (reliability, latency control), enabling tailored communication needs for different
  applications.

#### Hardware Support

- **ROS 2** enhances support for micro-controllers and embedded systems, expanding its use in resource-constrained
  environments.

---

## References
