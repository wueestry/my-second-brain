---
{"publish":true,"title":"The -> Operator","created":"2025-08-04 19:46","modified":"2025-08-18T12:58:14.351+02:00","tags":["#resource"],"cssclasses":"center-images"}
---


# THE -> OPERATOR

---

The `->` operator is used to access members (like functions or variables) through a [[distilled-notes/pointer]] and a shortcut for writing `(*pointer).member`

```cpp
foo* a = new Foo();
a->foo_func(); // Same as (*a).foo_func()
```

---

## References
