---
{"publish":true,"title":"Depth-First Search","created":"2024-09-17 16:16","modified":"2025-09-22T10:31:42.127+02:00","tags":["#graph-theory","#algorithms","#programming","#science","#computer-science","#search-algorithm","#graph-traversal"],"cssclasses":"center-images"}
---


# DEPTH-FIRST SEARCH

---

**Depth-First Search (DFS)** is an algorithm for traversing or searching a tree or graph data structure. The algorithm starts at the root node and explores as far as possible along each branch **before** backtracking.

## Complexity

In a graph with $|V|$ being the number of vertices and $|E|$ the number of edges, the time and space complexity of the algorithm is

- Worst-case performance: $\mathcal{O}(|V| + |E|)$
- Worst-case space complexity: $\mathcal{O}(|V|)$

## Algorithm

### Explanation

A standard DFS implementation puts each vertex of the graph into one of two categories:

- Visited
- Not Visited

The purpose of the algorithm is to mark each vertex as visited while avoiding cycles.

The DFS algorithm works as follows:

1. Start by putting any one of the graph's vertices on top of a stack.
2. Take the top item of the stack and add it to the visited list.
3. Create a list of that vertex's adjacent nodes. Add the ones which aren't in the visited list to the top of the stack.
4. Keep repeating steps 2 and 3 until the stack is empty.

### Pseudo Code

```pseudo
DFS(G, u)
    u.visited = true
    for each v ∈ G.Adj[u]
        if v.visited == false
            DFS(G,v)

init() {
    For each u ∈ G
        u.visited = false
     For each u ∈ G
       DFS(G, u)
}
```

### Python Implementation

```python
# DFS algorithm
def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    visited.add(start)

    print(start)

    for next in graph[start] - visited:
        dfs(graph, next, visited)
    return visited


graph = {'0': set(['1', '2']),
         '1': set(['0', '3', '4']),
         '2': set(['0']),
         '3': set(['1']),
         '4': set(['2', '3'])}

dfs(graph, '0')
```

## Example

![[meta/assets/depth-first-search.gif]]

---

## References
