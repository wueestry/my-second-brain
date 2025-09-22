---
{"publish":true,"title":"Vectors in C++","created":"2025-07-29 16:12","modified":"2025-09-22T10:31:36.251+02:00","tags":["#cpp","#data-types","#arrays","#vector","#cpp-std","#string-manipulation"],"cssclasses":"center-images"}
---


# VECTORS IN C++

---

A vector is like an [[distilled-notes/cpp-array\|cpp-array]], but is additionally resizeable.

## Initialisation

Use the vector keyword and specify the type, then give the name of the vector.

```cpp
vector<string> foo = {"x0", "x1"};
```

## Access Elements

Additionally to the general access with the index the first and last element can be accessed with `foo.front()` and `foo.back()` respectively.

## Add Elements

A new element to the end of the vector can be added with the `foo.push_back()` function.

## Remove Elements

The last element of the vector can be removed with `foo.pop_back()`.

---

## References

[[meta/references/Cpp Std Vector Reference]]
