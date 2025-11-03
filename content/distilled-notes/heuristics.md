---
{"publish":true,"title":"Heuristics","created":"2024-10-01 15:01","modified":"2025-11-03T20:27:08.293+01:00","tags":[null],"cssclasses":"center-images"}
---


# HEURISTICS

---

The objective of a heuristic is to produce a solution in a reasonable time frame that is good enough for solving the problem at hand. This solution may not be the best of all the solutions to this problem, or it may simply approximate the exact solution. But it is still valuable because finding it does not require a prohibitively long time.

Heuristics may produce results by themselves, or they may be used in conjunction with optimization algorithms to improve their efficiency.

Results about NP-hardness in theoretical computer science make heuristics the only viable option for a variety of complex optimization problems that need to be routinely solved in real-world applications.

## Trade-Off

The trade-off criteria for deciding whether to use a heuristic for solving a given problem include the following:

- **Optimality**: When several solutions exist for a given problem, does the heuristic guarantee that the best solution will be found? Is it actually necessary to find the best solution?
- **Completeness**: When several solutions exist for a given problem, can the heuristic find them all? Do we actually need all solutions? Many heuristics are only meant to find one solution.
- **Accuracy and Precision**: Can the heuristic provide a confidence interval for the purported solution? Is the error bar on the solution unreasonably large?
- **Execution time**: Is this the best-known heuristic for solving this type of problem? Some heuristics converge faster than others. Some heuristics are only marginally quicker than classic methods, in which case the 'overhead' on calculating the heuristic might have a negative impact.

In some cases, it may be difficult to decide whether the solution found by the heuristic is good enough because the theory underlying heuristics is not very elaborate.

## Types of Heuristics

### Constructive Heuristics

Build a solution from scratch incrementally:

- **Greedy algorithms**: Make locally optimal choices
- **Nearest neighbour**: Select closest available option
- **Insertion methods**: Add elements one at a time

### Improvement Heuristics

Start with an initial solution and iteratively improve it:

- **Local search**: Explore neighbouring solutions
- **Simulated annealing**: Probabilistic hill-climbing
- **Tabu search**: Avoid recently visited solutions
- **Genetic algorithms**: Evolution-inspired optimisation

### Decomposition Heuristics

Break complex problems into simpler sub-problems:

- **Divide and conquer**: Recursively split problems
- **Dynamic programming relaxation**: Simplify state space
- **Problem relaxation**: Remove constraints temporarily

## Python Examples

### Example 1: Greedy Heuristic for Knapsack Problem

```python
def greedy_knapsack(weights: list[int],
                    values: list[int],
                    capacity: int) -> tuple[list[int], int]:
    """
    Greedy heuristic for 0/1 knapsack problem.
    Not optimal, but fast approximation.

    Args:
        weights: Item weights
        values: Item values
        capacity: Knapsack capacity

    Returns:
        Tuple of (selected items indices, total value)
    """
    n = len(weights)

    # Calculate value-to-weight ratio
    items = [(i, values[i] / weights[i]) for i in range(n)]

    # Sort by ratio (descending)
    items.sort(key=lambda x: x[1], reverse=True)

    total_weight = 0
    total_value = 0
    selected = []

    for idx, ratio in items:
        if total_weight + weights[idx] <= capacity:
            selected.append(idx)
            total_weight += weights[idx]
            total_value += values[idx]

    return selected, total_value

# Example usage
weights = [10, 20, 30]
values = [60, 100, 120]
capacity = 50

selected, value = greedy_knapsack(weights, values, capacity)
print(f"Selected items: {selected}, Total value: {value}")
```

### Example 2: Nearest Neighbour for TSP

```python
import math
from typing import List, Tuple

def distance(p1: Tuple[float, float],
             p2: Tuple[float, float]) -> float:
    """Calculate Euclidean distance between two points"""
    return math.sqrt((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2)

def nearest_neighbour_tsp(cities: List[Tuple[float, float]],
                          start: int = 0) -> Tuple[List[int], float]:
    """
    Nearest neighbour heuristic for Travelling Salesman Problem.

    Args:
        cities: List of (x, y) coordinates
        start: Starting city index

    Returns:
        Tuple of (tour, total distance)
    """
    n = len(cities)
    unvisited = set(range(n))
    tour = [start]
    unvisited.remove(start)
    total_dist = 0.0

    current = start

    while unvisited:
        # Find nearest unvisited city
        nearest = min(unvisited,
                     key=lambda city: distance(cities[current], cities[city]))

        total_dist += distance(cities[current], cities[nearest])
        tour.append(nearest)
        unvisited.remove(nearest)
        current = nearest

    # Return to start
    total_dist += distance(cities[current], cities[start])
    tour.append(start)

    return tour, total_dist

# Example usage
cities = [(0, 0), (1, 3), (4, 3), (6, 1), (3, 0)]
tour, distance_total = nearest_neighbour_tsp(cities)
print(f"Tour: {tour}")
print(f"Total distance: {distance_total:.2f}")
```

### Example 3: 2-Opt Local Search Improvement

```python
def two_opt_improve(cities: List[Tuple[float, float]],
                    tour: List[int],
                    max_iterations: int = 1000) -> Tuple[List[int], float]:
    """
    2-opt local search heuristic to improve TSP tour.

    Args:
        cities: List of city coordinates
        tour: Initial tour
        max_iterations: Maximum improvement iterations

    Returns:
        Improved tour and its distance
    """
    def tour_distance(tour: List[int]) -> float:
        """Calculate total tour distance"""
        dist = 0.0
        for i in range(len(tour) - 1):
            dist += distance(cities[tour[i]], cities[tour[i + 1]])
        return dist

    def two_opt_swap(tour: List[int], i: int, k: int) -> List[int]:
        """Reverse tour segment between i and k"""
        new_tour = tour[:i] + tour[i:k+1][::-1] + tour[k+1:]
        return new_tour

    best_tour = tour[:]
    best_distance = tour_distance(best_tour)
    improved = True
    iterations = 0

    while improved and iterations < max_iterations:
        improved = False
        iterations += 1

        for i in range(1, len(tour) - 2):
            for k in range(i + 1, len(tour) - 1):
                new_tour = two_opt_swap(best_tour, i, k)
                new_distance = tour_distance(new_tour)

                if new_distance < best_distance:
                    best_tour = new_tour
                    best_distance = new_distance
                    improved = True
                    break

            if improved:
                break

    return best_tour, best_distance

# Example: Combine nearest neighbour with 2-opt
cities = [(0, 0), (1, 3), (4, 3), (6, 1), (3, 0), (2, 2)]
initial_tour, initial_dist = nearest_neighbour_tsp(cities)
improved_tour, improved_dist = two_opt_improve(cities, initial_tour)

print(f"Initial distance: {initial_dist:.2f}")
print(f"Improved distance: {improved_dist:.2f}")
print(f"Improvement: {((initial_dist - improved_dist) / initial_dist * 100):.1f}%")
```

## Famous Heuristic Applications

| Problem             | Heuristic               | Approximation Ratio |
| ------------------- | ----------------------- | ------------------- |
| Travelling Salesman | Nearest Neighbour       | O(log n)            |
| Bin Packing         | First Fit Decreasing    | 11/9 OPT + 6/9      |
| Set Cover           | Greedy Set Cover        | ln(n) + 1           |
| Vertex Cover        | Greedy Matching         | 2-approximation     |
| Job Scheduling      | Earliest Deadline First | Varies by problem   |

## When to Use Heuristics

✅ **Use heuristics when:**

- Problem is NP-hard and exact solution is too slow
- Near-optimal solution is acceptable
- Real-time decision making is required
- Problem size is very large
- Quick prototyping is needed

❌ **Avoid heuristics when:**

- Optimal solution is critically required
- Problem is tractable with exact algorithms
- Heuristic quality cannot be verified
- Problem structure allows efficient exact solution

---

## References

- [Heuristic - Wikipedia](<https://en.wikipedia.org/wiki/Heuristic_(computer_science)>)
- [Approximation Algorithm - Wikipedia](https://en.wikipedia.org/wiki/Approximation_algorithm)
- [Metaheuristics - Wikipedia](https://en.wikipedia.org/wiki/Metaheuristic)
