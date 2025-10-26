---
{"publish":true,"title":"Array in C++","created":"2025-07-29 09:47","modified":"2025-10-01T21:17:17.307+02:00","tags":["#cpp","#programming","#arrays","#data-structures","#c-11"],"cssclasses":"center-images"}
---


# ARRAY IN C++

---

Arrays are used to store multiple values of a single type, instead of declaring separate variables for each value of the array.

## Initialisation

Define the variable type, the name, followed by square brackets with the number of elements in the array.

```cpp
string foo[4] = {"x0","x1", "x2", "x3"};
```

## Iterate through items

Since C++11 a _for-each_ loop exists, in order to not have to iterate through the array via an additional index.

```cpp
for (int i : foo) {
	cout  << i << "\n";
}
```

---

## References

[[meta/references/Cpp Std Array Reference]]
