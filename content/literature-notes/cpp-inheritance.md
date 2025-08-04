---
{"publish":true,"title":"Inheritance","created":"2025-08-04 13:43","modified":"2025-08-04T16:09:32.828+02:00","tags":["#resource","#cpp"],"cssclasses":"center-images"}
---


# INHERITANCE
---

>[!abstract]
>Inheritance allows one class to reuse attributes and [[literature-notes/cpp-methods\|methods]] from another class.


## Derived Class

Derived classes are the classes, which inherit information from another class (*child*).


## Base Class

The base class is the class, from which other classes inherit their information (*parent*).

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

| File | Created |
| ---- | ------- |



## Parent Files

| File | Created |
| ---- | ------- |

