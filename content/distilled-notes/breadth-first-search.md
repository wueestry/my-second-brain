---
{"publish":true,"title":"Breadth-First Search","created":"2024-09-17 16:37","modified":"2025-11-03T20:35:14.368+01:00","tags":["computer-science/algorithms/graph-theory/breadth-first-search"],"cssclasses":"center-images"}
---


# BREADTH-FIRST SEARCH

---

**Breadth-First Search (BFS)** is a graph traversal algorithm that explores nodes level by level, starting from a source node. It visits all neighbors at the current depth before moving to nodes at the next depth level, making it ideal for finding shortest paths in unweighted graphs.

## Key Characteristics

- **Traversal order**: Level-by-level (horizontal exploration)
- **Data structure**: Uses a queue (FIFO - First In, First Out)
- **Completeness**: Always finds a solution if one exists
- **Optimality**: Finds the shortest path in unweighted graphs

## Complexity

For a graph with $|V|$ vertices and $|E|$ edges:

- **Time complexity**: $\mathcal{O}(|V| + |E|)$ - each vertex and edge is explored once
- **Space complexity**: $\mathcal{O}(|V|)$ - queue can hold up to all vertices

## Algorithm

### Explanation

A standard BFS implementation puts each vertex of the graph into one of two categories:

- Visited
- Not Visited

The purpose of the algorithm is to mark each vertex as visited while avoiding cycles.

The algorithm works as follows:

1. Start by putting any one of the graph's vertices at the back of a queue.
2. Take the front item of the queue and add it to the visited list.
3. Create a list of that vertex's adjacent nodes. Add the ones which aren't in the visited list to the back of the queue.
4. Keep repeating steps 2 and 3 until the queue is empty.

The graph might have two different disconnected parts so to make sure that we cover every vertex, we can also run the BFS algorithm on every node

### Pseudo Code

```pseudo
create a queue Q
mark v as visited and put v into Q
while Q is non-empty
    remove the head u of Q
    mark and enqueue all (unvisited) neighbours of u
```

### Python Implementation

```python
from collections import deque

def bfs(graph: dict, start: str) -> list:
    """
    Perform breadth-first search on a graph.

    @param graph: Adjacency list representation {node: [neighbors]}
    @param start: Starting node
    @return: List of nodes in BFS traversal order
    """
    visited = set()
    queue = deque([start])
    visited.add(start)
    result = []

    while queue:
        vertex = queue.popleft()
        result.append(vertex)

        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return result
```

## Applications

BFS is used in various scenarios:

- **Shortest path**: Finding shortest path in unweighted graphs
- **Level-order traversal**: Processing tree nodes level by level
- **Connected components**: Finding all nodes in a connected component
- **Web crawling**: Discovering pages at increasing distances from a starting URL
- **Social networks**: Finding degrees of separation (e.g., "6 degrees of separation")
- **GPS navigation**: Finding routes with fewest turns or stops
- **Puzzle solving**: Finding minimum moves to solve (e.g., sliding puzzles)

## Example

![[meta/assets/breadth-first-search.gif]]

## Comparison with [[distilled-notes/depth-first-search\|Depth-First Search]]

| Aspect           | BFS                                        | DFS                               |
| ---------------- | ------------------------------------------ | --------------------------------- |
| Data structure   | Queue (FIFO)                               | Stack (LIFO)                      |
| Exploration      | Level by level                             | Depth first                       |
| Shortest path    | Yes (unweighted)                           | No                                |
| Space complexity | Higher (stores all nodes at current level) | Lower (stores path only)          |
| Use case         | Shortest paths, level traversal            | Topological sort, cycle detection |

---

## References

- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). _Introduction to Algorithms_ (4th ed.). MIT Press.
- [Breadth-first search - Wikipedia](https://en.wikipedia.org/wiki/Breadth-first_search)
- Skiena, S. S. (2020). _The Algorithm Design Manual_ (3rd ed.). Springer.
