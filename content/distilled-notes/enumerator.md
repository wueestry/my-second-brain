---
{"publish":true,"title":"Enumerator","created":"2025-05-22 13:32","modified":"2025-08-18T12:58:14.200+02:00","tags":["#resource","#coding"],"cssclasses":"center-images"}
---


# ENUMERATOR

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
