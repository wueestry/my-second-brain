---
{"publish":true,"title":"Stacks in C++","created":"2025-06-04T00:00:00.000Z","modified":"2025-11-03T20:38:34.965+01:00","tags":["computer-science/programming/cpp/stacks"],"cssclasses":"center-images"}
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

To add elements to the stack, use the `.push()` function, after declaring the stack.

```cpp
cars.push("Volvo");
cars.push("BMW");
cars.push("Ford");
// Stack from bottom to top: Volvo, BMW, Ford
```

## Access Elements

You cannot access stack elements by referring to index numbers.
In a stack only the top element can be accessed with `.top()`.

```cpp
cout << cars.top();  // Output: Ford (last added)
```

## Change Top Element

The `.top()` element can be changed easily.

```cpp
// Change the value of the top element
cars.top() = "Tesla";
cout << cars.top();  // Output: Tesla
```

## Remove Elements

An element can be removed with `.pop()` from the stack. This will remove the _last_ element added.

```cpp
cars.pop();  // Removes "Tesla"
cout << cars.top();  // Output: BMW (now the top element)
```

## Get the Size of the Stack

To find out how many elements a stack has, use the `.size()` function.

```cpp
cout << cars.size();  // Output: 2
```

## Check if Stack is Empty

Use the `.empty()` function to check if the stack is empty. Returns `true` if empty, `false` otherwise.

```cpp
if (cars.empty()) {
    cout << "Stack is empty\n";
} else {
    cout << "Stack has " << cars.size() << " elements\n";
}
```

## Common Use Cases

- **Function call management**: The call stack tracks function calls and local variables
- **Undo functionality**: Store previous states for undo operations
- **Expression evaluation**: Convert and evaluate mathematical expressions (postfix notation)
- **Backtracking algorithms**: Store paths or states when exploring solutions

---

## References

- [std::stack - cppreference.com](https://en.cppreference.com/w/cpp/container/stack)
- [Stack Data Structure - GeeksforGeeks](https://www.geeksforgeeks.org/stack-data-structure/)
