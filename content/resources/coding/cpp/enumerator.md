---
{"publish":true,"title":"Enumerator","created":"2025-05-22 13:32","tags":["#coding","#computer-science","#cpp","#resource"],"cssclasses":""}
---


# Enumerator

> [!abstract]
> An **enum** is a special type that represents a group of constants (unchangeable values).

## Initialisation
```cpp
enum Level {
  LOW,
  MEDIUM,
  HIGH
}; 

enum Level myVar = MEDIUM;
```

## Change Values
```cpp
enum Level {
  LOW = 25,
  MEDIUM = 50,
  HIGH = 75
};

enum Level myVar = MEDIUM;
cout << myVar;  // Now outputs 50
```

