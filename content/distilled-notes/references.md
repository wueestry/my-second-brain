---
{"publish":true,"title":"References","created":"2025-05-22 13:36","modified":"2025-08-18T12:58:14.319+02:00","tags":["#resource"],"cssclasses":"center-images"}
---


# REFERENCES

---

A **reference** variable is an _alias_ for an existing variable and can be created with the `&` operator

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

---

## References
