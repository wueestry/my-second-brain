---
{"publish":true,"title":"Enumerator in C++","created":"2025-05-22 13:32","modified":"2025-10-01T21:17:17.306+02:00","tags":["#coding","#cpp","#enums","#data-types","#initialization"],"cssclasses":"center-images"}
---


# ENUMERATOR IN C++

---

An **enum** or Enumerator is a special type that represents a group of constants (unchangeable values).

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

---

## References
