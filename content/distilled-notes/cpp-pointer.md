---
{"publish":true,"title":"C++ Pointers","created":"2025-05-22 13:43","modified":"2025-11-03T20:38:05.668+01:00","tags":["computer-science/programming/cpp/pointer"],"cssclasses":"center-images"}
---


# C++ POINTERS

---

A pointer is a variable that stores the memory address as its value.

## Pointer Initialisation

A pointer can be created with the `*` operator and uses the `&` operator to get the actual [[distilled-notes/cpp-references#Memory Address\|memory address]].

```cpp
string food = "Pizza";  // A food variable of type string
string* ptr = &food;   // A pointer variable, with the name ptr, that stores the address of food
```

## Dereferencing

It is also possible to use the value of a pointer by using the `*` operator.

```cpp
// Reference: Output the memory address of food with the pointer (0x6dfed4)
cout << ptr << "\n";

// Dereference: Output the value of food with the pointer (Pizza)
cout << *ptr << "\n";
```

## Null Pointers

A pointer should be initialised to `nullptr` if it doesn't point to a valid memory address yet. This prevents undefined behaviour from accessing uninitialised pointers.

```cpp
string* ptr = nullptr;  // Safe initialisation

if (ptr != nullptr) {
    cout << *ptr << "\n";  // Only dereference if valid
}
```

## Modify the Pointer Value

Dereferencing a pointer with `*ptr` allows you to modify the value at the memory address it points to. This will change the original variable's value since the pointer references the same memory location.

```cpp
// Change the value through the pointer
*ptr = "Hamburger";

// Output the value through the pointer (Hamburger)
cout << *ptr << "\n";

// Output the original variable (also Hamburger - it has been modified)
cout << food << "\n";
```

## Pointer Arithmetic

Pointers can be incremented or decremented to navigate through memory, particularly useful with arrays.

```cpp
int numbers[] = {10, 20, 30, 40};
int* ptr = numbers;  // Points to first element

cout << *ptr << "\n";       // 10
cout << *(ptr + 1) << "\n"; // 20
cout << *(ptr + 2) << "\n"; // 30
```

## Common Pitfalls

- **Dangling pointers**: Pointers that reference deallocated memory
- **Memory leaks**: Failing to deallocate dynamically allocated memory
- **Null pointer dereferencing**: Attempting to access memory through a null pointer

---

## References

- [C++ Pointers - cppreference.com](https://en.cppreference.com/w/cpp/language/pointer)
- [C++ Pointers - W3Schools](https://www.w3schools.com/cpp/cpp_pointers.asp)
- [Pointers - LearnCpp.com](https://www.learncpp.com/cpp-tutorial/introduction-to-pointers/)
- Stroustrup, B. (2013). _The C++ Programming Language_ (4th ed.). Addison-Wesley. Chapter 7: Pointers, Arrays, and References
- [Pointer Arithmetic - cplusplus.com](https://cplusplus.com/doc/tutorial/pointers/)
