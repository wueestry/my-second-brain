---
{"publish":true,"title":"Depth-First Search","created":"2024-09-17 16:16","modified":"2025-11-03T20:40:40.550+01:00","tags":["computer-science/algorithms/graph-theory/depth-first-search"],"cssclasses":"center-images"}
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

## C++ Implementation

```cpp
#include <vector>
#include <stack>
#include <unordered_set>

void dfsIterative(const vector<vector<int>>& graph, int start) {
    stack<int> stk;
    unordered_set<int> visited;

    stk.push(start);

    while (!stk.empty()) {
        int node = stk.top();
        stk.pop();

        if (visited.find(node) == visited.end()) {
            cout << node << " ";
            visited.insert(node);

            // Add neighbours in reverse order for correct traversal
            for (int i = graph[node].size() - 1; i >= 0; i--) {
                if (visited.find(graph[node][i]) == visited.end()) {
                    stk.push(graph[node][i]);
                }
            }
        }
    }
}

void dfsRecursive(const vector<vector<int>>& graph, int node,
                  unordered_set<int>& visited) {
    visited.insert(node);
    cout << node << " ";

    for (int neighbour : graph[node]) {
        if (visited.find(neighbour) == visited.end()) {
            dfsRecursive(graph, neighbour, visited);
        }
    }
}
```

## Applications

- **Pathfinding**: Finding a path between two nodes
- **Cycle detection**: Detecting cycles in directed graphs
- **Topological sorting**: Ordering tasks with dependencies
- **Connected components**: Finding isolated subgraphs
- **Maze solving**: Finding paths through mazes
- **Solving puzzles**: Sudoku, N-Queens problem

---

## References

- [Depth-First Search - Wikipedia](https://en.wikipedia.org/wiki/Depth-first_search)
- [DFS Algorithm - GeeksforGeeks](https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/)
- [Graph Traversal - Khan Academy](https://www.khanacademy.org/computing/computer-science/algorithms/graph-representation/a/representing-graphs)
