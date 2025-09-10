---
{"publish":true,"title":"Template","created":"2024-09-16 11:13","modified":"2025-08-18T12:58:14.349+02:00","tags":["#resource"],"cssclasses":"center-images"}
---


# TEMPLATE

---

A **template** is a feature of C++ that allows functions and classes to operate with generic types. This allows a function or class declaration to reference via a generic variable another different class without creating full declaration for each of these different classes.

## Technical Overview

There are tree kinds of templates:

- Function Templates
- Class Templates
- Variable Templates

### Function Templates

Behaves like a function except that the template can have arguments of many different types

```cpp
template<class identifier> declaration;
template<typename identifier> declaration;
```

Both expressions have the same meaning and behave in the same way. The second way was introduced to avoid confusion, since a type parameter didn't need to be a class until C++20.

#### Example

Function template `max(x,y)` which returns the larger of `x` and `y`. This template would work for all types where the greater-than operator is defined.

```cpp
template<typename T> T max(T &a, T &b){
	return a > b ? a : b;
};
```

### Class Templates

Provides a specification for generating classes based on parameters. Generally used to implement containers.
A class template is instantiated by passing a given set of types to it as template arguments.

### Variable Templates

Since C++14, templates can also be used for variables.

### Non-Type Template Parameters

Although the previously mentioned templates are the most common ones, it is also possible to template on values.

As an example the class `MyClass` can here be instantiated with a specific `int`.

```cpp
template <int K>
class MyClass;
```

A real-world example of such a template can be seen in the implementation of fixed-size arrays.

```cpp
template<class T, size_t N> struct array;
```

an array of six `char`s can then be declared as

```cpp
array<char, 6> myArray
```

---

## References
