---
{"publish":true,"title":"Pointers","created":"2025-05-22 13:43","tags":["#coding","#computer-science","#cpp","#resource"],"cssclasses":""}
---


# Pointers

> [!abstract]
> A pointer is a variable that stores the memory address as its value.

## Pointer Initialisation
A pointer can be created with the `*` operator and uses the `&` operator to get the actual [[resources/coding/cpp/references#Memory Address\|memory address]].
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

## Modify the Pointer Value
It is also possible to change the pointer's value. **Note**: the value of the original value will *not* be changed.
```cpp
// Change the value of the pointer
*ptr = "Hamburger";

// Output the new value of the pointer (Hamburger)
cout << *ptr << "\n";

// Output the new value of the food variable (Hamburger)
cout << food << "\n";
```