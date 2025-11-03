---
{"publish":true,"title":"A-Star Search","created":"2025-07-30 13:16","modified":"2025-11-03T20:33:24.855+01:00","tags":["computer-science/algorithms/pathfinding/a-star"],"cssclasses":"center-images"}
---


# A-STAR SEARCH

---

$A^*$ is a graph search algorithm that finds the shortest path between a start and a goal node. It is widely used in robotics, games, and navigation systems due to its efficiency and ability to incorporate domain knowledge through heuristics. $A^*$ is both [[completeness\|complete]] and [[distilled-notes/optimality-principle\|optimal]] when the heuristic is admissible.

## Core Concept

$A^*$ combines the best aspects of two algorithms:

- [[distilled-notes/dijkstras-algorithm\|Dijkstra's Algorithm]]: Guarantees the shortest path by exploring all nodes systematically.
- [[best-first-search\|Greedy Best-First Search]]: Uses a [[distilled-notes/heuristic-function\|heuristic function]] to prioritise nodes that appear closest to the goal.

The algorithm evaluates paths using three key components:

- **Path Cost** $g(n)$: The exact cost from the start node to the current node $n$.
- **[[distilled-notes/heuristic-function\|Heuristic Function]]** $h(n)$: An estimate of the cost from node $n$ to the goal.
- **Total Estimated Cost** $f(n) = g(n) + h(n)$: The estimated total cost of a path through $n$, used to select the next node to explore.

**Admissibility**: For $A^*$ to guarantee an optimal solution, the heuristic $h(n)$ must never overestimate the true cost to reach the goal.

![[meta/assets/a-star-heuristics-concept.png]]

## Algorithm

```python
from heapq import heappop, heappush

def a_star_search(graph: dict, start: str, goal: str, heuristic_values: dict) -> int:
    '''
    Find the lowest-cost path from start to goal using the A* algorithm.

    @param graph: The graph as an adjacency list (dict of node -> list of (neighbor, edge_cost)).
    @param start: The starting node.
    @param goal: The goal node.
    @param heuristic_values: Heuristic values for each node (goal node must have value 0).
    @return: The path cost from start to goal, or -1 if no path exists.
    '''

    open_list, closed_list = [(heuristic_values[start], start)], set()

    while open_list:
        cost, node = heappop(open_list)

        # The algorithm ends when the goal node has been explored, NOT when it is added to the open list.
        if node == goal:
            return cost

        if node in closed_list:
            continue

        closed_list.add(node)

        # Subtract the heuristic value as it was overcounted.
        cost -= heuristic_values[node]

        for neighbor, edge_cost in graph[node]:
            if neighbor in closed_list:
                continue

            # f(x) = g(x) + h(x), where g(x) is the path cost and h(x) is the heuristic.
            neighbor_cost = cost + edge_cost + heuristic_values[neighbor]
            heappush(open_list, (neighbor_cost, neighbor))

    return -1  # No path found

```

### Complexity Analysis

Time complexity depends heavily on the quality of the heuristic:

- If $h(n) = 0$, $A^*$ behaves identically to [[distilled-notes/dijkstras-algorithm\|Dijkstra's Algorithm]], with complexity $\mathcal{O}((|V| + |E|) \log |V|)$.
- A well-designed heuristic can significantly reduce the number of nodes explored.

Space complexity is $\mathcal{O}(|V|)$ due to storage requirements for the open and closed lists.

## Use Cases

- **Video games**: NPC pathfinding and player navigation
- **Robotics**: Autonomous robot motion planning
- **Mapping applications**: Route planning and GPS navigation
- **Puzzle solving**: Finding optimal solutions in state-space search

## Example

![[meta/assets/a-star-algorithm-animation.gif|350]]

---

## References

- Hart, P. E., Nilsson, N. J., & Raphael, B. (1968). "A Formal Basis for the Heuristic Determination of Minimum Cost Paths." _IEEE Transactions on Systems Science and Cybernetics_, 4(2), 100–107.
- [A\* search algorithm - Wikipedia](https://en.wikipedia.org/wiki/A*_search_algorithm)
- [[AI  Search Algorithms  A Search  Codecademy]]
- [[meta/references/The A Algorithm A Complete Guide]]
