---
{"publish":true,"title":"References","created":"2025-05-22 13:36","tags":["#coding","#computer-science","#cpp","#resource"],"cssclasses":""}
---


# References

> [!abstract]
> A reference variable is an **alias** for an existing variable.

## Creation
A reference is created with the `&` operator.
```cpp
string food = "Pizza";  // food variable
string &meal = food;    // reference to food
```

## Memory Address
The `&` operator can also be used to get the memory address of a variable.
```cpp
string food = "Pizza";

cout << &food; // Outputs 0x6dfed4
```
