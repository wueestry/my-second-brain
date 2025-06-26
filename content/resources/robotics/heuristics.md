---
{"publish":true,"title":"Heuristics","created":"2024-10-01 15:01","tags":["#computer-science","#mathematics","#resource","#term"],"cssclasses":""}
---


# Heuristics

> [!abstract]
> In mathematical optimization and computer science, heuristic is a technique designed for problem solving more quickly when classic methods are too slow for finding an exact or approximate solution, or when classic methods fail to find any exact solution in a search space. This is achieved by trading optimality, completeness, accuracy, or precision for speed. In a way, it can be considered a shortcut.

## Definition

The objective of an heuristic is to produce a solution in a reasonable time frame that is good enough for solving the problem at hand. This solution may not be the best of all the solutions to this problem, or it may simply approximate the exact solution. But it is still valuable because finding it does not require a prohibitively long time.

Heuristics may produce results by themselves, or they may be used in conjunction with optimization algorithms to improve their efficiency.

Results about NP-hardness in theoretical computer science make heuristics the only viable option for a variety of complex optimization problems that need to be routinely solved in real-world applications.

## Trade-Off

The trade-off criteria for deciding whether to use a heuristic for solving a given problem include the following:

- **Optimality**: When several solutions exist for a given problem, does the heuristic guarantee that the best solution will be found? Is it actually necessary to find the best solution?
- **Completeness**: When several solutions exist for a given problem, can the heuristic find them all? Do we actually need all solutions? Many heuristics are only meant to find one solution.
- **Accuracy and Precision**: Can the heuristic provide a confidence interval for the purported solution? Is the error bar on the solution unreasonably large?
- **Execution time**: Is this the best-known heuristic for solving this type of problem? Some heuristics converge faster than others. Some heuristics are only marginally quicker than classic methods, in which case the 'overhead' on calculating the heuristic might have a negative impact.

In some cases, it may be difficult to decide whether the solution found by the heuristic is good enough because the theory underlying heuristics is not very elaborate.
