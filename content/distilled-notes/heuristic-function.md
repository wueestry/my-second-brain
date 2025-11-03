---
{"publish":true,"title":"Heuristic Function","created":"2025-08-06 19:52","modified":"2025-11-03T20:27:08.284+01:00","tags":[null],"cssclasses":"center-images"}
---


# HEURISTIC FUNCTION

---

- A heuristic function provides an estimated cost from the current node or state to the goal.
- It is generally used to guide a search algorithm towards a solution more efficiently.
- Any heuristic estimation is possible, as long as it satisfies the condition $h(n) \leq h^*(n)$, with $h^*(n)$ being the actual cost to the goal.
- Often the Euclidean distance or Manhattan distance are used for approximation.

## Properties of Heuristic Functions

### Admissibility

A heuristic is **admissible** if it never overestimates the actual cost to reach the goal:

$$
h(n) \leq h^*(n) \quad \forall n
$$

where $h^*(n)$ is the true optimal cost from node $n$ to the goal.

### Consistency (Monotonicity)

A heuristic is **consistent** if it satisfies the triangle inequality:

$$
h(n) \leq c(n, n') + h(n')
$$

where $c(n, n')$ is the cost of moving from node $n$ to $n'$.

## Common Heuristic Functions

### 1. Euclidean Distance

Used for continuous spaces where diagonal movement is allowed:

$$
h(n) = \sqrt{(x_n - x_{goal})^2 + (y_n - y_{goal})^2}
$$

### 2. Manhattan Distance

Used for grid-based problems with 4-directional movement:

$$
h(n) = |x_n - x_{goal}| + |y_n - y_{goal}|
$$

### 3. Chebyshev Distance

Used when diagonal movement has the same cost as cardinal movement:

$$
h(n) = \max(|x_n - x_{goal}|, |y_n - y_{goal}|)
$$

### 4. Octile Distance

Combination for 8-directional movement with different costs:

$$
h(n) = \max(\Delta x, \Delta y) + (\sqrt{2} - 1) \cdot \min(\Delta x, \Delta y)
$$

## Python Implementation

```python
import math
from typing import Tuple

class HeuristicFunctions:
    """Collection of common heuristic functions for pathfinding"""

    @staticmethod
    def euclidean(pos: Tuple[float, float],
                  goal: Tuple[float, float]) -> float:
        """
        Euclidean distance heuristic.

        Best for: Continuous spaces with unrestricted movement
        Admissible: Yes
        """
        dx = pos[0] - goal[0]
        dy = pos[1] - goal[1]
        return math.sqrt(dx**2 + dy**2)

    @staticmethod
    def manhattan(pos: Tuple[int, int],
                  goal: Tuple[int, int]) -> int:
        """
        Manhattan distance heuristic.

        Best for: Grid-based with 4-directional movement
        Admissible: Yes (for 4-directional grids)
        """
        return abs(pos[0] - goal[0]) + abs(pos[1] - goal[1])

    @staticmethod
    def chebyshev(pos: Tuple[int, int],
                  goal: Tuple[int, int]) -> int:
        """
        Chebyshev distance heuristic.

        Best for: 8-directional movement, same cost for all moves
        Admissible: Yes
        """
        return max(abs(pos[0] - goal[0]), abs(pos[1] - goal[1]))

    @staticmethod
    def octile(pos: Tuple[float, float],
               goal: Tuple[float, float]) -> float:
        """
        Octile distance heuristic.

        Best for: 8-directional with sqrt(2) cost for diagonals
        Admissible: Yes
        """
        dx = abs(pos[0] - goal[0])
        dy = abs(pos[1] - goal[1])
        return max(dx, dy) + (math.sqrt(2) - 1) * min(dx, dy)

    @staticmethod
    def zero(pos: Tuple, goal: Tuple) -> float:
        """
        Zero heuristic (always returns 0).

        Reduces A* to Dijkstra's algorithm
        Admissible: Yes (very conservative)
        """
        return 0.0

# Example: A* Search with different heuristics
import heapq
from typing import List, Set, Dict, Callable

def a_star_search(start: Tuple[int, int],
                  goal: Tuple[int, int],
                  grid: List[List[int]],
                  heuristic: Callable) -> List[Tuple[int, int]]:
    """
    A* pathfinding algorithm with selectable heuristic.

    Args:
        start: Starting position (row, col)
        goal: Goal position (row, col)
        grid: 2D grid (0=walkable, 1=obstacle)
        heuristic: Heuristic function to use

    Returns:
        Path from start to goal as list of coordinates
    """
    rows, cols = len(grid), len(grid[0])

    # Priority queue: (f_score, g_score, position)
    open_set = [(heuristic(start, goal), 0, start)]
    came_from: Dict[Tuple, Tuple] = {}
    g_score: Dict[Tuple, float] = {start: 0}
    closed_set: Set[Tuple] = set()

    while open_set:
        _, current_g, current = heapq.heappop(open_set)

        if current == goal:
            # Reconstruct path
            path = [current]
            while current in came_from:
                current = came_from[current]
                path.append(current)
            return path[::-1]

        if current in closed_set:
            continue

        closed_set.add(current)

        # Explore neighbours (4-directional)
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            neighbour = (current[0] + dr, current[1] + dc)

            # Check bounds and obstacles
            if (0 <= neighbour[0] < rows and
                0 <= neighbour[1] < cols and
                grid[neighbour[0]][neighbour[1]] == 0):

                tentative_g = current_g + 1

                if neighbour not in g_score or tentative_g < g_score[neighbour]:
                    g_score[neighbour] = tentative_g
                    f_score = tentative_g + heuristic(neighbour, goal)
                    heapq.heappush(open_set, (f_score, tentative_g, neighbour))
                    came_from[neighbour] = current

    return []  # No path found

# Example usage
if __name__ == "__main__":
    # Create a simple grid (0=walkable, 1=obstacle)
    grid = [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]
    ]

    start = (0, 0)
    goal = (4, 4)

    h = HeuristicFunctions()

    # Test with Manhattan distance
    path = a_star_search(start, goal, grid, h.manhattan)
    print(f"Path found: {path}")
```

## Heuristic Selection Guidelines

| Problem Type    | Recommended Heuristic | Reason                              |
| --------------- | --------------------- | ----------------------------------- |
| Grid (4-way)    | Manhattan             | Matches actual movement constraints |
| Grid (8-way)    | Octile or Chebyshev   | Accounts for diagonal movement      |
| Continuous 2D   | Euclidean             | True straight-line distance         |
| Weighted graph  | Problem-specific      | Domain knowledge required           |
| Unknown optimum | Relaxed problem       | Solve simpler version               |

## Impact on Search Performance

- **More accurate heuristic** → Fewer nodes explored → Faster search
- **Admissible heuristic** → Guaranteed optimal solution (with A\*)
- **Consistent heuristic** → Efficient closed list management
- **Zero heuristic** → Degrades to uninformed search (Dijkstra's)

---

## References

- [Heuristic Function - Wikipedia](<https://en.wikipedia.org/wiki/Heuristic_(computer_science)>)
- [A\* Search Algorithm](https://en.wikipedia.org/wiki/A*_search_algorithm)
- [Introduction to A\* - Red Blob Games](https://www.redblobgames.com/pathfinding/a-star/introduction.html)
