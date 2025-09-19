---
{"publish":true,"title":"A-Star Search","created":"2025-07-30 13:16","modified":"2025-09-17T12:43:49.881+02:00","tags":["resource","coding","algorithm","science","graph-theory","pathfinding","heuristic","artificial-intelligence"],"cssclasses":"center-images"}
---


# A-STAR SEARCH

---

$A^*$ is a search algorithm used to find the shortest path between two predefined points. It is a popular choice due to its [[completeness]], [[distilled-notes/optimality-principle\|optimality]] and optimal efficiency.

## Core Concept

It combines the best aspects of two other algorithms:

- [[distilled-notes/dijkstras-algorithm\|Dijkstra's Algorithm]]: Find shortest path to all nodes from a single source node.
- [[best-first-search\|Gready Best-First Search]]: Prefers exploration of nodes appearing closest to goal, based on a [[distilled-notes/heuristic-function\|heuristic function]].

The combination of these algorithms lead to a smart evaluation of paths using three key components: $g(n)$, $h(n)$ and $f(n)$.

![[meta/assets/a-star-heuristics-concept.png]]

- **Path Cost** $g(n)$: Gives the exact known distance from the start to the current node.
- [[distilled-notes/heuristic-function\|Heuristic Function]] $h(n)$
- **Total Estimated Cost** $f(n)$: Combination of the previous two cost functions used to determine the optimal, next node to explore.

## Algorithm

```python
from heapq import heappop, heappush

def a_star_search(graph: dict, start: str, goal: str, heuristic_values: dict) -> int:
    '''
    A* search algorithm implementation.

    @param graph: The graph to search.
    @param start: The starting node.
    @param goal: The goal node.
    @param heuristic_values: The heuristic values for each node. The goal node must be admissible, and the heuristic value must be 0.
    @return: The path cost from the start node to the goal node.
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

The time complexity of the algorithm depends, heavily on the selection of the heuristic function.
When setting $h(n) = 0$ $A^*$ is equivalent to [[distilled-notes/dijkstras-algorithm\|Dijkstra's Algorithm]] resulting in a complexity of $\mathcal{O}((|V| + |E|)\cdot log(V))$.
A good heuristic function can drastically decrease $A^*$'s complexity.

## Example

![[meta/assets/a-star-algorithm-animation.gif|350]]

---

## References

[[AI  Search Algorithms  A Search  Codecademy]]
[[meta/references/The A Algorithm A Complete Guide]]
