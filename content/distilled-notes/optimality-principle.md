---
{"publish":true,"title":"Optimality Principle","created":"2024-10-15 14:29","modified":"2025-11-03T20:43:36.579+01:00","tags":["computer-science/algorithms/optimization/optimality-principle"],"cssclasses":"center-images"}
---


# OPTIMALITY PRINCIPLE

---

Optimal paths are made of optimal (sub-)paths. Hence, we can construct long optimal paths by putting together shorter optimal paths.

## Idea

- Let $P = (s, ..., v, ..., g)$ be an optimal path from $s$ to $g$. Then for any $v \in P$:
  - The sub-path $P_v = (v, ..., g)$ is itself an optimal path (from $v$ to $g$).
  - The cost of the sub-path $P_v$ is equal to the optimal cost to go from $v$ to $g$, $h^*(v)$
  - If $v$ and $v'$ are two consecutive states on the optimal path, then

    $$
    h^*(v) = min_{(v,a,v')}[w(v,a,v') + h^*(v')]
    $$

- Since we know that $h^*(g) = 0$, we can reconstruct $h^*$ for all other states working backwards from the goal. Eventually we will be able to compute $h^*$ for the initial state, and hence reconstruct the whole path

## Bellman's Principle of Optimality

This principle is formally known as **Bellman's Principle of Optimality**, named after Richard Bellman, the founder of dynamic programming.

> **Principle**: An optimal policy has the property that whatever the initial state and initial decision are, the remaining decisions must constitute an optimal policy with regard to the state resulting from the first decision.

## Applications

### Dynamic Programming

The optimality principle is the foundation of dynamic programming algorithms:

- Breaking problems into overlapping subproblems
- Solving each subproblem once
- Building up solutions to larger problems

### Shortest Path Algorithms

- **Dijkstra's algorithm**: Uses optimality to build shortest paths incrementally
- **Bellman-Ford algorithm**: Relaxes edges based on optimal subpath property
- **A\* search**: Combines optimal cost-to-come with heuristic cost-to-go

### Optimal Control

- **Model Predictive Control (MPC)**: Solves optimal control problem recursively
- **Linear Quadratic Regulator (LQR)**: Derives optimal feedback law using dynamic programming
- **Hamilton-Jacobi-Bellman equation**: Continuous-time optimal control

## Mathematical Formulation

### Discrete Time Dynamic Programming

For a finite-horizon problem:

$$V_k(x_k) = \min_{u_k} \left[ c(x_k, u_k) + V_{k+1}(f(x_k, u_k)) \right]$$

Where:

- $V_k(x_k)$: Optimal cost-to-go from state $x_k$ at time $k$
- $c(x_k, u_k)$: Stage cost for action $u_k$ in state $x_k$
- $f(x_k, u_k)$: State transition function
- $V_N(x_N) = c_N(x_N)$: Terminal cost

### Infinite Horizon

For infinite-horizon problems:

$$V(x) = \min_u \left[ c(x, u) + \gamma V(f(x, u)) \right]$$

Where $\gamma \in [0, 1]$ is a discount factor.

## Python Implementation Examples

### Example 1: Grid World Shortest Path

```python
import numpy as np
import matplotlib.pyplot as plt
from collections import deque

class GridWorld:
    """Grid world for demonstrating optimality principle"""

    def __init__(self, grid_size, obstacles, goal):
        """
        Initialize grid world

        Args:
            grid_size: (rows, cols)
            obstacles: List of (row, col) obstacle positions
            goal: (row, col) goal position
        """
        self.rows, self.cols = grid_size
        self.obstacles = set(obstacles)
        self.goal = goal

        # Cost-to-go from each cell (initially infinite)
        self.cost_to_go = np.full(grid_size, np.inf)
        self.cost_to_go[goal] = 0

        # Optimal policy (next state from each cell)
        self.policy = {}

    def get_neighbors(self, state):
        """Get valid neighboring states"""
        row, col = state
        neighbors = []

        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            new_row, new_col = row + dr, col + dc

            if (0 <= new_row < self.rows and
                0 <= new_col < self.cols and
                (new_row, new_col) not in self.obstacles):
                neighbors.append((new_row, new_col))

        return neighbors

    def compute_optimal_costs(self):
        """
        Compute optimal cost-to-go using backward induction
        (based on optimality principle)
        """
        # BFS from goal backwards
        queue = deque([self.goal])
        visited = {self.goal}

        while queue:
            state = queue.popleft()

            # For each neighbor, update cost if we found better path
            for neighbor in self.get_neighbors(state):
                new_cost = self.cost_to_go[state] + 1

                if new_cost < self.cost_to_go[neighbor]:
                    self.cost_to_go[neighbor] = new_cost
                    self.policy[neighbor] = state

                    if neighbor not in visited:
                        queue.append(neighbor)
                        visited.add(neighbor)

    def get_optimal_path(self, start):
        """Extract optimal path from start to goal"""
        if np.isinf(self.cost_to_go[start]):
            return None  # No path exists

        path = [start]
        current = start

        while current != self.goal:
            current = self.policy[current]
            path.append(current)

        return path

    def visualize(self, start=None):
        """Visualize grid world with costs and optimal path"""
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(16, 7))

        # Plot cost-to-go
        cost_display = np.copy(self.cost_to_go)
        cost_display[cost_display == np.inf] = -1

        im1 = ax1.imshow(cost_display, cmap='viridis', interpolation='nearest')
        ax1.set_title('Optimal Cost-to-Go (Optimality Principle)', fontsize=14)

        # Mark obstacles, goal, and start
        for obs in self.obstacles:
            ax1.add_patch(plt.Rectangle((obs[1]-0.5, obs[0]-0.5),
                                       1, 1, fill=True, color='black'))

        ax1.plot(self.goal[1], self.goal[0], 'r*', markersize=20, label='Goal')

        if start:
            ax1.plot(start[1], start[0], 'go', markersize=15, label='Start')

        # Add cost values
        for i in range(self.rows):
            for j in range(self.cols):
                if (i, j) not in self.obstacles and not np.isinf(self.cost_to_go[i, j]):
                    ax1.text(j, i, f'{int(self.cost_to_go[i, j])}',
                           ha='center', va='center', color='white', fontsize=10)

        ax1.legend(fontsize=10)
        plt.colorbar(im1, ax=ax1)

        # Plot optimal path if start provided
        if start:
            path = self.get_optimal_path(start)

            if path:
                path_array = np.array(path)
                ax2.imshow(cost_display, cmap='viridis', interpolation='nearest')
                ax2.plot(path_array[:, 1], path_array[:, 0],
                        'r-', linewidth=3, marker='o', markersize=8, label='Optimal Path')

                for obs in self.obstacles:
                    ax2.add_patch(plt.Rectangle((obs[1]-0.5, obs[0]-0.5),
                                               1, 1, fill=True, color='black'))

                ax2.plot(self.goal[1], self.goal[0], 'r*', markersize=20, label='Goal')
                ax2.plot(start[1], start[0], 'go', markersize=15, label='Start')
                ax2.set_title(f'Optimal Path (Length: {len(path)-1})', fontsize=14)
                ax2.legend(fontsize=10)

        plt.tight_layout()
        plt.show()

# Example usage
def demo_grid_world():
    """Demonstrate optimality principle in grid world"""

    # Create 10x10 grid with obstacles
    obstacles = [
        (2, 2), (2, 3), (2, 4), (2, 5),
        (5, 1), (5, 2), (5, 3),
        (7, 5), (7, 6), (7, 7), (7, 8)
    ]

    grid = GridWorld(
        grid_size=(10, 10),
        obstacles=obstacles,
        goal=(9, 9)
    )

    # Compute optimal costs using optimality principle
    grid.compute_optimal_costs()

    # Visualize with path from start
    start = (0, 0)
    grid.visualize(start)

    path = grid.get_optimal_path(start)
    print(f"Optimal path from {start} to {grid.goal}:")
    print(f"Length: {len(path) - 1}")
    print(f"Path: {path}")

### Example 2: Resource Allocation

def resource_allocation_dp(values, costs, budget):
    """
    Solve resource allocation using dynamic programming
    (demonstrates optimality principle)

    Args:
        values: List of values for each item
        costs: List of costs for each item
        budget: Total budget

    Returns:
        Maximum value and optimal selection
    """
    n = len(values)

    # DP table: dp[i][b] = max value using items 0..i-1 with budget b
    dp = np.zeros((n + 1, budget + 1))

    # Track selections
    selections = [[[] for _ in range(budget + 1)] for _ in range(n + 1)]

    # Build DP table using optimality principle
    for i in range(1, n + 1):
        for b in range(budget + 1):
            # Option 1: Don't take item i-1
            dp[i][b] = dp[i-1][b]
            selections[i][b] = selections[i-1][b].copy()

            # Option 2: Take item i-1 (if affordable)
            if costs[i-1] <= b:
                value_with_item = dp[i-1][b - costs[i-1]] + values[i-1]

                if value_with_item > dp[i][b]:
                    dp[i][b] = value_with_item
                    selections[i][b] = selections[i-1][b - costs[i-1]].copy()
                    selections[i][b].append(i-1)

    return dp[n][budget], selections[n][budget]

# Example
def demo_resource_allocation():
    """Demonstrate optimality principle in resource allocation"""

    values = [10, 40, 30, 50]
    costs = [5, 4, 6, 3]
    budget = 10

    max_value, optimal_items = resource_allocation_dp(values, costs, budget)

    print("Resource Allocation Problem:")
    print(f"Items: {list(range(len(values)))}")
    print(f"Values: {values}")
    print(f"Costs: {costs}")
    print(f"Budget: {budget}")
    print(f"\nOptimal selection: {optimal_items}")
    print(f"Total value: {max_value}")
    print(f"Total cost: {sum(costs[i] for i in optimal_items)}")

if __name__ == "__main__":
    demo_grid_world()
    demo_resource_allocation()
```

## Conditions for Optimality Principle

The optimality principle applies when:

1. **Subproblem independence**: Subproblems don't affect each other
2. **Optimal substructure**: Optimal solutions contain optimal subsolutions
3. **Markov property**: Future depends only on current state, not history
4. **No path-dependent constraints**: Constraints depend only on current state

## Counter-Examples (When It Fails)

### Longest Simple Path

Finding the longest simple path (no repeated vertices) violates optimality:

- Subpaths of longest simple path may not be longest simple paths
- Need to track visited vertices (history-dependent)

### Path-Dependent Costs

When cost depends on the path taken, not just current position:

- Travel planning with fuel constraints
- Time-dependent traffic conditions

---

## References

- [Dynamic Programming - Bellman, Richard](https://press.princeton.edu/books/paperback/9780691146683/dynamic-programming)
- [Introduction to Algorithms - CLRS](https://mitpress.mit.edu/books/introduction-algorithms-third-edition)
- [Dynamic Programming and Optimal Control - Bertsekas](http://athenasc.com/dpbook.html)
- [Principles of Optimal Control - Kirk](https://www.pearson.com/)
