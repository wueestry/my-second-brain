---
{"publish":true,"title":"Dijkstra's Algorithm","created":"2024-10-15 15:17","modified":"2025-11-03T20:27:08.245+01:00","tags":[null],"cssclasses":"center-images"}
---


# DIJKSTRA'S ALGORITHM

---

**Dijkstra's algorithm** is an algorithm for finding the shortest paths between nodes in a weighted graph.

## Algorithm

### Explanation

1. Set initial distances for all vertices: 0 for the source vertex, and infinity for all the other.
2. Choose the unvisited vertex with the shortest distance from the start to be the current vertex. So the algorithm will always start with the source as the current vertex.
3. For each of the current vertex's unvisited neighbour vertices, calculate the distance from the source and update the distance if the new, calculated, distance is lower.
4. We are now done with the current vertex, so we mark it as visited. A visited vertex is not checked again.
5. Go back to step 2 to choose a new current vertex, and keep repeating these steps until all vertices are visited.
6. In the end we are left with the shortest path from the source vertex to every other vertex in the graph.

### Pseudo Code

```pseudo
function Dijkstra(Graph, source)
	distances = map(all nodes -> infinity)
	distances = 0

	visited = empty set
	queue = new PriorityQueue()
	queue.enqueue(source, 0)

	while queue is not empty
	    current = queue.dequeue()
	    if current in visited
	        continue
			visited.add(current)

    for neighbor in Graph.neighbors(current)
	    tentative_distance = distances[current] + Graph.distance(current, neighbor)

		if tentative_distance < distances[neighbor]
			distances[neighbor] = tentative_distance
			queue.enqueue(neighbor, distances[neighbor])

	return distances
```

## Example

![[meta/assets/dijkstra.gif|500]]

## Complexity

In a graph with $|V|$ being the number of vertices and $|E|$ the number of edges, the time and space complexity of the algorithm is

- Worst-case performance: $\mathcal{O}((|V| + |E|)\cdot log (V))$
- Worst-case space complexity: $\mathcal{O}(|V|)$

## Python Implementation

```python
import heapq

def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    priority_queue = [(0, start)]
    visited = set()

    while priority_queue:
        current_distance, current_node = heapq.heappop(priority_queue)

        if current_node in visited:
            continue

        visited.add(current_node)

        for neighbour, weight in graph[current_node].items():
            distance = current_distance + weight

            if distance < distances[neighbour]:
                distances[neighbour] = distance
                heapq.heappush(priority_queue, (distance, neighbour))

    return distances

# Example usage
graph = {
    'A': {'B': 4, 'C': 2},
    'B': {'A': 4, 'C': 1, 'D': 5},
    'C': {'A': 2, 'B': 1, 'D': 8, 'E': 10},
    'D': {'B': 5, 'C': 8, 'E': 2},
    'E': {'C': 10, 'D': 2}
}

print(dijkstra(graph, 'A'))  # {'A': 0, 'B': 3, 'C': 2, 'D': 8, 'E': 10}
```

## C++ Implementation

```cpp
#include <vector>
#include <queue>
#include <limits>

using namespace std;

vector<int> dijkstra(const vector<vector<pair<int, int>>>& graph, int start) {
    int n = graph.size();
    vector<int> distances(n, numeric_limits<int>::max());
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;

    distances[start] = 0;
    pq.push({0, start});

    while (!pq.empty()) {
        auto [currentDist, currentNode] = pq.top();
        pq.pop();

        if (currentDist > distances[currentNode]) continue;

        for (const auto& [neighbour, weight] : graph[currentNode]) {
            int newDist = currentDist + weight;

            if (newDist < distances[neighbour]) {
                distances[neighbour] = newDist;
                pq.push({newDist, neighbour});
            }
        }
    }

    return distances;
}
```

## Key Properties

- **Non-negative weights**: Only works with graphs having non-negative edge weights
- **Greedy approach**: Always selects the node with minimum distance
- **Optimal solution**: Guarantees shortest path for non-negative weights
- **Single-source**: Finds shortest paths from one source to all other nodes

## Limitations

- Does not work with **negative edge weights** (use Bellman-Ford instead)
- Less efficient than A\* for pathfinding to a specific target
- Requires all edge weights to be known beforehand

## Applications

- **GPS navigation**: Finding shortest routes
- **Network routing**: OSPF protocol uses Dijkstra's algorithm
- **Social networks**: Finding degrees of separation
- **Game development**: NPC pathfinding
- **Robotics**: Motion planning

---

## References

- [Dijkstra's Algorithm - Wikipedia](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)
- [Dijkstra's Algorithm - GeeksforGeeks](https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/)
- [Visualisation - University of San Francisco](https://www.cs.usfca.edu/~galles/visualization/Dijkstra.html)
