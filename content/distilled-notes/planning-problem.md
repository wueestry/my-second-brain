---
{"publish":true,"title":"Planning Problem","created":"2024-09-17 13:18","modified":"2025-11-03T20:43:24.610+01:00","tags":["computer-science/robotics/planning/problem"],"cssclasses":"center-images"}
---


# PLANNING PROBLEM

---

A **Planning Problem** is used to determine where a robot should move to on a longer time-horizon. It involves finding a sequence of actions that transforms an initial state into a goal state while satisfying constraints and optimising an objective function.

## Planning vs. Control

**Hierarchical decomposition of robotic decision-making:**

- **Mission Planning**: What to do, objectives, constraints, priorities
- **Motion Planning**: How to reach the objective, satisfying the constraints and priorities
- **Control**: Fine tuning, noise/disturbance rejection

| Level            | Time horizon | Distance   | Rate      | Search               |
| ---------------- | ------------ | ---------- | --------- | -------------------- |
| Mission Planning | > 100 s      | > 100 m    | < 0.1 Hz  | Exogenous            |
| Motion Planning  | 1 - 10 s     | 10 - 100 m | 1 - 10 Hz | Global/Combinatorial |
| Control          | < 1 s        | < 10 m     | > 10 Hz   | Local/Continuous     |

## Elements of a Planning Problem

### 1. State Space

A [[State Space]] $\mathcal{X}$ represents all possible configurations of the system.

- **Discrete**: Grid cells, graph nodes
- **Continuous**: $(x, y, \theta)$ for mobile robot
- **Hybrid**: Combination of discrete modes and continuous variables

### 2. Transition System

A [[Transition System]] describes how actions change the state over time:
$$x_{k+1} = f(x_k, u_k)$$

Where:

- $x_k \in \mathcal{X}$: State at time $k$
- $u_k \in \mathcal{U}$: Action/control input
- $f$: Transition function (deterministic or stochastic)

### 3. Objective/Goal

An [[Objective]] or [[Goal]] $\mathcal{G} \subset \mathcal{X}$ specifies desired outcomes:

- **Goal state**: Reach specific configuration
- **Goal region**: Enter target area
- **Temporal logic**: Complex specifications (e.g., "visit A before B")

### 4. Constraints

[[Constraints]] $\mathcal{C}$ define forbidden states or actions:

- **Obstacle avoidance**: $x_k \notin \mathcal{X}_{obs}$
- **Velocity limits**: $|v| \leq v_{max}$
- **Energy budget**: $\sum_{k} c_k \leq E_{max}$
- **Time constraints**: Complete within deadline

### 5. Cost/Reward Function

A [[Cost Function]] $J$ or [[Reward Function]] $R$ evaluates solution quality:
$$J = \sum_{k=0}^{N-1} c(x_k, u_k) + c_f(x_N)$$

**Common costs:**

- Path length: $c = \|x_{k+1} - x_k\|$
- Energy: $c = \|u_k\|^2$
- Time: $c = \Delta t$

## Problem Formulation

**Formal definition:**
Given:

- Initial state $x_0 \in \mathcal{X}$
- Goal set $\mathcal{G} \subset \mathcal{X}$
- Transition function $f$
- Constraint set $\mathcal{C}$
- Cost function $J$

Find: Sequence of actions $(u_0, u_1, \ldots, u_{N-1})$ that:

1. Reaches goal: $x_N \in \mathcal{G}$
2. Satisfies constraints: $x_k \notin \mathcal{C}$ for all $k$
3. Minimises cost: $\min J$

## Planning Algorithms

### Graph-Based Methods

- **A\***: Optimal with admissible heuristic
- **Dijkstra**: Optimal but slower
- **RRT**: Probabilistically complete for high dimensions

### Optimisation-Based Methods

- **Dynamic Programming**: Optimal for discrete problems
- **Model Predictive Control**: Receding horizon optimisation
- **Trajectory Optimisation**: Direct/indirect methods

### Sampling-Based Methods

- **RRT/RRT\***: Random exploration
- **PRM**: Probabilistic roadmap
- **FMT\***: Fast marching tree

## Python Implementation

```python
import numpy as np
import matplotlib.pyplot as plt
from heapq import heappush, heappop
from typing import List, Tuple, Optional, Set

class GridPlanner:
    """A* path planning on 2D grid."""

    def __init__(self, grid: np.ndarray):
        """
        Initialize planner.

        Args:
            grid: 2D binary array (0=free, 1=obstacle)
        """
        self.grid = grid
        self.rows, self.cols = grid.shape

    def heuristic(self, a: Tuple[int, int], b: Tuple[int, int]) -> float:
        """Euclidean distance heuristic."""
        return np.sqrt((a[0] - b[0])**2 + (a[1] - b[1])**2)

    def get_neighbors(self, pos: Tuple[int, int]) -> List[Tuple[int, int]]:
        """Get valid 8-connected neighbors."""
        r, c = pos
        neighbors = []

        for dr in [-1, 0, 1]:
            for dc in [-1, 0, 1]:
                if dr == 0 and dc == 0:
                    continue

                nr, nc = r + dr, c + dc

                # Check bounds and obstacles
                if (0 <= nr < self.rows and
                    0 <= nc < self.cols and
                    self.grid[nr, nc] == 0):
                    neighbors.append((nr, nc))

        return neighbors

    def plan(self, start: Tuple[int, int],
             goal: Tuple[int, int]) -> Optional[List[Tuple[int, int]]]:
        """
        A* path planning.

        Args:
            start: Starting position (row, col)
            goal: Goal position (row, col)

        Returns:
            List of positions from start to goal, or None if no path
        """
        # Priority queue: (f_score, counter, position)
        counter = 0
        open_set = [(0, counter, start)]
        counter += 1

        came_from = {}
        g_score = {start: 0}
        f_score = {start: self.heuristic(start, goal)}

        open_set_hash: Set[Tuple[int, int]] = {start}

        while open_set:
            _, _, current = heappop(open_set)
            open_set_hash.remove(current)

            if current == goal:
                # Reconstruct path
                path = [current]
                while current in came_from:
                    current = came_from[current]
                    path.append(current)
                return path[::-1]

            for neighbor in self.get_neighbors(current):
                # Cost is Euclidean distance
                cost = np.sqrt((neighbor[0] - current[0])**2 +
                              (neighbor[1] - current[1])**2)
                tentative_g = g_score[current] + cost

                if neighbor not in g_score or tentative_g < g_score[neighbor]:
                    came_from[neighbor] = current
                    g_score[neighbor] = tentative_g
                    f_score[neighbor] = tentative_g + self.heuristic(neighbor, goal)

                    if neighbor not in open_set_hash:
                        heappush(open_set, (f_score[neighbor], counter, neighbor))
                        counter += 1
                        open_set_hash.add(neighbor)

        return None  # No path found

    def visualize(self, path: Optional[List[Tuple[int, int]]] = None):
        """Visualize grid and path."""
        plt.figure(figsize=(10, 10))

        # Plot grid
        plt.imshow(self.grid, cmap='binary', origin='upper')

        # Plot path
        if path:
            path_arr = np.array(path)
            plt.plot(path_arr[:, 1], path_arr[:, 0], 'r-', linewidth=2, label='Path')
            plt.plot(path_arr[0, 1], path_arr[0, 0], 'go', markersize=10, label='Start')
            plt.plot(path_arr[-1, 1], path_arr[-1, 0], 'bs', markersize=10, label='Goal')

        plt.grid(True, alpha=0.3)
        plt.legend()
        plt.title('A* Path Planning')
        plt.xlabel('Column')
        plt.ylabel('Row')

def planning_demo():
    """Demonstrate path planning on random grid."""
    # Create random grid with obstacles
    np.random.seed(42)
    grid = np.random.choice([0, 1], size=(50, 50), p=[0.8, 0.2])

    # Ensure start and goal are free
    start = (5, 5)
    goal = (45, 45)
    grid[start] = 0
    grid[goal] = 0

    # Plan path
    planner = GridPlanner(grid)
    path = planner.plan(start, goal)

    if path:
        print(f"Path found with {len(path)} waypoints")
        print(f"Path length: {sum(np.sqrt((path[i+1][0]-path[i][0])**2 + (path[i+1][1]-path[i][1])**2) for i in range(len(path)-1)):.2f}")
    else:
        print("No path found!")

    planner.visualize(path)
    plt.savefig('planning_problem_demo.png', dpi=150, bbox_inches='tight')
    print("Saved visualization to planning_problem_demo.png")

if __name__ == "__main__":
    planning_demo()
```

## Practical Applications

### Autonomous Vehicles

- **Highway driving**: Lane change planning
- **Urban navigation**: Route planning with traffic
- **Parking**: Manoeuvre planning in tight spaces

### Warehouse Robotics

- **Order fulfilment**: Multi-robot task assignment
- **Collision avoidance**: Coordinated path planning
- **Energy optimisation**: Battery-aware routing

### Aerial Drones

- **Surveillance**: Coverage path planning
- **Delivery**: 3D obstacle avoidance
- **Search and rescue**: Exploration under uncertainty

### Manufacturing

- **Assembly line**: Robot arm motion planning
- **Material handling**: Pick-and-place trajectories
- **Welding**: Torch path generation

## Challenges

1. **Computational complexity**: Exponential growth with dimensionality
2. **Uncertainty**: Imperfect models, sensor noise, environmental changes
3. **Real-time constraints**: Limited computation time for re-planning
4. **Multi-agent coordination**: Conflicts, communication, cooperation
5. **Dynamic environments**: Moving obstacles, changing goals

---

## References

- [Planning Algorithms by Steven LaValle](http://lavalle.pl/planning/)
- [A\* Pathfinding for Beginners](http://www.policyalmanac.org/games/aStarTutorial.htm)
- [Principles of Robot Motion: Theory, Algorithms, and Implementation](https://mitpress.mit.edu/9780262033275/principles-of-robot-motion/)
- [ROS Planning Library - MoveIt](https://moveit.ros.org/)
