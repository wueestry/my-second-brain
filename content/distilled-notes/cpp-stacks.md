---
{"publish":true,"title":"Stacks in C++","created":"2025-06-04T00:00:00.000Z","modified":"2025-09-19T07:22:51.878+02:00","tags":["#resource","#coding","#cpp","#data-structures","#stack","#lifo","#cpp-lists"],"cssclasses":"center-images"}
---


# STACKS IN C++

---

A stack stores multiple elements in a specific order, called _LIFO_ (Last In, First Out)

Unlike vectors, elements in the stack are not accessed by index numbers. Since elements are added and removed from the top, you can only access the element at the top of the stack.

```cpp
// Include the stack library
#include <stack>

// Create a stack of strings called cars
stack<string> cars;
```

## Add Elements

To add elements to the stack, use the `.push() function, after declaring the stack

## Access Elements

You cannot access stack elements by referring to index numbers.
In a stack only the top element can be accessed with `.top()`.

## Change Top ELement

The `.top()` element can be changed easily.

```cpp
// Change the value of the top element
cars.top() = "Tesla";
```

## Remove Elements

An element can be removed with `.pop()` from the stack. This will remove the _last_ element added.

## Get the Size of the Stack

To find out how many elements a stack has, use the `.size()` function

---

## References
