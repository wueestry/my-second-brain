---
{"publish":true,"title":"Robotic Operating System","created":"2025-02-18 13:45","modified":"2025-11-03T20:43:24.514+01:00","tags":["computer-science/robotics/ros"],"cssclasses":""}
---


# ROBOTIC OPERATING SYSTEM (ROS)

---

The **Robotic Operating System (ROS)** is a set of software libraries and tools that help to build robot applications, providing frameworks for all aspects of robot development. Despite its name, ROS is not an operating system but rather a middleware framework that runs on top of Linux.

## Core Concepts

### Nodes

Independent processes that perform computation. Each node is responsible for a single modular task (e.g., sensor reading, motor control, path planning).

### Topics

Named buses over which nodes exchange messages using a publish-subscribe pattern. Topics are asynchronous and allow many-to-many communication.

### Services

Synchronous request-reply communication between nodes. A service client sends a request and blocks until receiving a response.

### Actions

Similar to services but for long-running tasks. Provide feedback during execution and can be preempted.

### Messages

Data structures that define the content of topics, services, and actions (e.g., `geometry_msgs/Twist` for velocity commands).

### Parameters

Configuration values stored in a central parameter server that nodes can query and modify at runtime.

## Essential Tools

### rviz

The **Robot Visualisation** tool is a 3D visualiser to display:

- Robot model (URDF)
- Sensor data (laser scans, point clouds, cameras)
- Planning results (paths, trajectories)
- TF transforms (coordinate frames)

### rosbag

Command-line tool to **record and playback** ROS messages:

```bash
# Record all topics
rosbag record -a

# Record specific topics
rosbag record /camera/image /cmd_vel

# Playback
rosbag play my_recording.bag
```

**Use cases:**

- Debugging without hardware
- Dataset collection for machine learning
- Regression testing

### rqt

Qt-based framework for GUI tools:

- **rqt_graph**: Visualize node/topic connectivity
- **rqt_plot**: Real-time data plotting
- **rqt_console**: View log messages
- **rqt_reconfigure**: Dynamic parameter adjustment

### tf2

Transform library for managing coordinate frames:

- Tracks relationships between coordinate frames over time
- Allows querying "where was the robot's left wheel relative to the camera at time t?"

## Versions

### ROS 1

**Legacy versions** (Kinetic, Melodic, Noetic):

- Targets C++03 and Python 2 (Noetic added Python 3)
- Supported only on Ubuntu
- **No longer actively maintained** (except Noetic until 2025)

**Architecture:**

- Centralized `roscore` master node
- TCP/IP communication (TCPROS, UDPROS)
- Custom serialization

### ROS 2

**Current generation** (Foxy, Humble, Iron, Jazzy):

- C++14/17 and Python 3.6+
- Cross-platform (Linux, Windows, macOS)
- **Long-term support** releases every 2 years

**Architecture:**

- No centralized master (peer-to-peer)
- DDS middleware (multiple vendors: Fast-DDS, Cyclone DDS)
- Standard serialization (CDR)

## ROS 1 vs ROS 2 Comparison

| Feature          | ROS 1                       | ROS 2                                        |
| ---------------- | --------------------------- | -------------------------------------------- |
| **Master node**  | Required (`roscore`)        | None (decentralized)                         |
| **Middleware**   | Custom (TCPROS)             | DDS (standard)                               |
| **Real-time**    | Limited                     | Full support with RCLCPP                     |
| **QoS policies** | None                        | Configurable (reliability, durability, etc.) |
| **Security**     | Minimal                     | Built-in (SROS2 with encryption)             |
| **Multi-robot**  | Difficult (namespace hacks) | Native support                               |
| **Platforms**    | Linux only                  | Linux, Windows, macOS, embedded              |
| **Build system** | catkin                      | colcon + ament                               |
| **Python**       | 2.7 / 3.x                   | 3.6+ only                                    |
| **Lifecycle**    | None                        | Managed nodes with states                    |

## Python Example: Simple Publisher/Subscriber

### ROS 2 Publisher

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalPublisher(Node):
    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)
        self.timer = self.create_timer(1.0, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = f'Hello ROS 2: {self.i}'
        self.publisher_.publish(msg)
        self.get_logger().info(f'Publishing: "{msg.data}"')
        self.i += 1

def main(args=None):
    rclpy.init(args=args)
    node = MinimalPublisher()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### ROS 2 Subscriber

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalSubscriber(Node):
    def __init__(self):
        super().__init__('minimal_subscriber')
        self.subscription = self.create_subscription(
            String,
            'topic',
            self.listener_callback,
            10)

    def listener_callback(self, msg):
        self.get_logger().info(f'I heard: "{msg.data}"')

def main(args=None):
    rclpy.init(args=args)
    node = MinimalSubscriber()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Common ROS Commands

```bash
# ROS 2 commands
ros2 node list                    # List running nodes
ros2 topic list                   # List active topics
ros2 topic echo /topic_name       # Display messages on topic
ros2 topic pub /cmd_vel ...       # Publish to topic
ros2 service list                 # List available services
ros2 service call /service_name   # Call a service
ros2 run package_name node_name   # Run a node
ros2 launch package_name file.py  # Launch multiple nodes

# ROS 1 equivalents (different syntax)
rosnode list
rostopic list
rostopic echo /topic_name
rosservice list
rosrun package_name node_name
roslaunch package_name file.launch
```

## Popular ROS Packages

### Navigation

- **Nav2** (ROS 2): Complete navigation stack with planners, controllers, recovery behaviours
- **SLAM Toolbox**: 2D SLAM with loop closure
- **Cartographer**: Google's SLAM for 2D and 3D mapping

### Manipulation

- **MoveIt 2**: Motion planning framework for robot arms
- **Gazebo**: Physics simulator for robot testing

### Perception

- **vision_opencv**: OpenCV integration for image processing
- **pcl_ros**: Point Cloud Library integration
- **image_pipeline**: Camera calibration and rectification

### Hardware Interfaces

- **ros2_control**: Hardware abstraction layer for actuators and sensors
- **micro-ROS**: ROS 2 for microcontrollers (ESP32, STM32)

## Advantages

- **Modular architecture**: Loose coupling between components
- **Language agnostic**: C++, Python, and others
- **Rich ecosystem**: Thousands of packages available
- **Simulation support**: Gazebo, Isaac Sim integration
- **Active community**: Extensive documentation and support

## Disadvantages

- **Steep learning curve**: Complex build system and concepts
- **Overhead**: Not suitable for hard real-time systems (< 1ms)
- **Dependency management**: Can be fragile
- **Version fragmentation**: ROS 1 vs ROS 2 split

---

## References

- [ROS 2 Documentation](https://docs.ros.org/en/humble/)
- [ROS 2 Design Overview](https://design.ros2.org/)
- [Programming Robots with ROS - Book by Morgan Quigley](https://www.oreilly.com/library/view/programming-robots-with/9781449325480/)
- [ROS 2 Migration Guide](https://docs.ros.org/en/humble/How-To-Guides/Migrating-from-ROS1.html)
