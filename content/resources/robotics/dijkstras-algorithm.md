---
{"publish":true,"title":"Dijkstra's Algorithm","created":"2024-10-15 15:17","tags":["#algorithm","#navigation","#resource","#robotics"],"cssclasses":""}
---


# Dijkstra's Algorithm

> [!abstract]
> Dijkstra's algorithm is an algorithm for finding the shortest paths between nodes in a weighted graph.

## Complexity

In a graph with $|V|$ being the number of vertices and $|E|$ the number of edges, the time and space complexity of the algorithm is

- Worst-case performance: $\mathcal{O}((|V| + |E|)\cdot log (V))$
- Worst-case space complexity: $\mathcal{O}(|V|)$

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

### Python Implementation

```python
import heapq

class Node:
    def __init__(self, v, distance):
        self.v = v
        self.distance = distance

    def __lt__(self, other):
        return self.distance < other.distance

def dijkstra(V, adj, S):
    visited = [False] * V
    map = {}
    q = []

    map[S] = Node(S, 0)
    heapq.heappush(q, Node(S, 0))

    while q:
        n = heapq.heappop(q)
        v = n.v
        distance = n.distance
        visited[v] = True

        adjList = adj[v]
        for adjLink in adjList:
            if not visited[adjLink[0]]:
                if adjLink[0] not in map:
                    map[adjLink[0]] = Node(v, distance + adjLink[1])
                else:
                    sn = map[adjLink[0]]
                    if distance + adjLink[1] < sn.distance:
                        sn.v = v
                        sn.distance = distance + adjLink[1]
                heapq.heappush(q, Node(adjLink[0], distance + adjLink[1]))

    result = [0] * V
    for i in range(V):
        result[i] = map[i].distance

    return result

adj = [[] for _ in range(6)]

V = 6
E = 5
u = [0, 0, 1, 2, 4]
v = [3, 5, 4, 5, 5]
w = [9, 4, 4, 10, 3]

for i in range(E):
    edge = [v[i], w[i]]
    adj[u[i]].append(edge)

    edge2 = [u[i], w[i]]
    adj[v[i]].append(edge2)

S = 1

result = dijkstra(V, adj, S)
print(result)
```

## Example

![[resources/robotics/assets/dijkstra.gif|500]]
