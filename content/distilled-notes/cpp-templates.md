---
{"publish":true,"title":"Templates  in C++","created":"2024-09-16 11:13","modified":"2025-11-03T20:39:09.229+01:00","tags":["computer-science/programming/cpp/templates"],"cssclasses":"center-images"}
---


# TEMPLATES IN C++

---

A **template** is a feature of C++ that allows functions and classes to operate with generic types. This allows a function or class declaration to reference via a generic variable another different class without creating full declaration for each of these different classes.

## Technical Overview

There are three kinds of templates:

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

#### Example

```cpp
template<typename T>
class Container {
    private:
        T element;
    public:
        Container(T arg) : element(arg) {}
        T get() { return element; }
};

int main() {
    Container<int> intContainer(42);
    Container<string> strContainer("Hello");

    cout << intContainer.get();  // Output: 42
    cout << strContainer.get();  // Output: Hello
}
```

### Variable Templates

Since C++14, templates can also be used for variables.

#### Example

```cpp
template<typename T>
constexpr T pi = T(3.1415926535897932385);

int main() {
    cout << pi<float>;   // 3.14159 (float precision)
    cout << pi<double>;  // 3.14159265358979 (double precision)
}
```

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

An array of six `char`s can then be declared as:

```cpp
array<char, 6> myArray;
```

## Template Specialisation

Templates can be specialised for specific types to provide custom behaviour.

```cpp
template<typename T>
class Printer {
    public:
        void print(T value) {
            cout << value << "\n";
        }
};

// Specialisation for bool
template<>
class Printer<bool> {
    public:
        void print(bool value) {
            cout << (value ? "true" : "false") << "\n";
        }
};
```

## Benefits of Templates

- **Code reusability**: Write once, use with multiple types
- **Type safety**: Compile-time type checking
- **Performance**: No runtime overhead, resolved at compile time
- **Generic programming**: Write algorithms independent of data types

---

## References

- [C++ Templates - cppreference.com](https://en.cppreference.com/w/cpp/language/templates)
- [Template Specialisation - cppreference.com](https://en.cppreference.com/w/cpp/language/template_specialization)
- [C++ Templates Tutorial - GeeksforGeeks](https://www.geeksforgeeks.org/templates-cpp/)
