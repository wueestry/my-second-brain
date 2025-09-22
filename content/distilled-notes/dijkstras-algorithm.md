---
{"publish":true,"title":"Dijkstra's Algorithm","created":"2024-10-15 15:17","modified":"2025-09-22T10:31:46.879+02:00","tags":["#graph-theory","#graph-traversal","#algorithms","#search-algorithm","#data-structures","#programming","#computer-science"],"cssclasses":"center-images"}
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

---

## References
