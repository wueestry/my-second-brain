---
{"publish":true,"title":"Breadth-First Search","created":"2024-09-17 16:37","modified":"2025-09-17T12:43:49.880+02:00","tags":["resource","algorithm","graph-theory","programming","science","graph-traversal","data-structures","search-algorithm"],"cssclasses":"center-images"}
---


# BREADTH-FIRST SEARCH

---

**Breadth-First Search (BFS)** is an algorithm for traversing or searching a tree or graph data structure. It starts at the tree root and explores all nodes at the present depth **prior** to moving on to the nodes at the next depth level.

## Complexity

In a graph with $|V|$ being the number of vertices and $|E|$ the number of edges, the time and space complexity of the algorithm is

- Worst-case performance: $\mathcal{O}(|V| + |E|)$
- Worst-case space complexity: $\mathcal{O}(|V|)$

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
import collections

# BFS algorithm
def bfs(graph, root):
    visited, queue = set(), collections.deque([root])
    visited.add(root)
    while queue:
        # Dequeue a vertex from queue
        vertex = queue.popleft()
        print(str(vertex) + " ", end="")
        # If not visited, mark it as visited, and
        # enqueue it
        for neighbour in graph[vertex]:
            if neighbour not in visited:
                visited.add(neighbour)
                queue.append(neighbour)

```

## Example

![[meta/assets/breadth-first-search.gif]]

---

## References
