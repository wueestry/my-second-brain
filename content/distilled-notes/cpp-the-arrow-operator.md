---
{"publish":true,"title":"The -> Operator in C++","created":"2025-08-04 19:46","modified":"2025-11-03T20:39:17.695+01:00","tags":["computer-science/programming/cpp/the-arrow-operator"],"cssclasses":"center-images"}
---


# THE -> OPERATOR IN C++

---

The `->` operator is used to access members (like functions or variables) through a [[distilled-notes/cpp-pointer]]. It is a shortcut for dereferencing a pointer and then accessing a member, combining `*` and `.` into one operator.

## Syntax

```cpp
pointer->member
// Equivalent to:
(*pointer).member
```

## Example with Classes

```cpp
class Person {
    public:
        string name;
        void greet() {
            cout << "Hello, I'm " << name << "\n";
        }
};

int main() {
    Person* p = new Person();
    p->name = "Alice";
    p->greet();  // Output: Hello, I'm Alice

    // Equivalent without arrow operator:
    (*p).name = "Bob";
    (*p).greet();  // Output: Hello, I'm Bob

    delete p;  // Clean up memory
}
```

## Example with Structures

```cpp
struct Point {
    int x, y;
};

int main() {
    Point* ptr = new Point();
    ptr->x = 10;
    ptr->y = 20;

    cout << "Point: (" << ptr->x << ", " << ptr->y << ")\n";
    delete ptr;
}
```

## When to Use

- When working with pointers to objects or structures
- When accessing members of dynamically allocated objects
- More readable than dereferencing with `(*pointer).member`

## Common Use Cases

- **Dynamic memory allocation**: Accessing members of heap-allocated objects
- **Linked data structures**: Navigating through nodes in linked lists, trees, etc.
- **Polymorphism**: Calling virtual functions through base class pointers

---

## References

- [Member Access Operators - cppreference.com](https://en.cppreference.com/w/cpp/language/operator_member_access)
- [Arrow Operator in C++ - GeeksforGeeks](https://www.geeksforgeeks.org/arrow-operator-in-c-cpp-with-examples/)
