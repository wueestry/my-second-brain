---
{"publish":true,"title":"Inheritance","created":"2025-08-04 13:43","modified":"2025-08-18T12:58:14.177+02:00","tags":["#resource"],"cssclasses":"center-images"}
---


# INHERITANCE

---

> [!abstract]
> Inheritance allows one class to reuse attributes and [[distilled-notes/methods\|methods]] from another class.

## Derived Class

Derived classes are the classes, which inherit information from another class (_child_).

## Base Class

The base class is the class, from which other classes inherit their information (_parent_).

## Multilevel Inheritance

A class can be derived from another derived class.

```cpp
class Foo {
	// Base class
}

class FooFoo : public Foo {
	// Derived class (child)
}
```

## Multiple Inheritance

A class can also be derived from multiple classes using a comma-separated list.

```cpp
class Foo1 {
	// Base class 1
}

class Foo2 {
	// Base class 2
}

class FooFoo : public Foo1, public Foo2 {
	// Derived class (child)
}
```

---

## References

---

## Child Files

| File                                                        | Created          |
| ----------------------------------------------------------- | ---------------- |
| [[distilled-notes/virtual-functions\|virtual-functions]] | 2025-08-04 19:38 |


## Parent Files

| File | Created |
| ---- | ------- |

