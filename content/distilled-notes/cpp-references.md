---
{"publish":true,"title":"References in C++","created":"2025-05-22 13:36","modified":"2025-11-03T20:38:20.813+01:00","tags":["computer-science/programming/cpp/references"],"cssclasses":"center-images"}
---


# REFERENCES IN C++

---

A **reference** variable is an _alias_ for an existing variable and can be created with the `&` operator

## Creation

A reference is created with the `&` operator.

```cpp
string food = "Pizza";  // food variable
string &meal = food;    // reference to food
```

## Reference Rules

References have important constraints that differentiate them from pointers:

1. **Must be initialised**: A reference must be bound to a variable when declared
2. **Cannot be null**: References always refer to a valid object
3. **Cannot be reassigned**: Once bound, a reference cannot refer to a different variable

```cpp
string food = "Pizza";
string &meal = food;     // Valid: initialised immediately

string &invalid;         // Error: must be initialised
meal = "Burger";         // Changes food's value, doesn't rebind the reference
```

## References vs Pointers

| Feature        | References           | Pointers                               |
| -------------- | -------------------- | -------------------------------------- |
| Syntax         | `&` operator         | `*` operator                           |
| Null value     | Cannot be null       | Can be `nullptr`                       |
| Reassignment   | Cannot be reassigned | Can point to different addresses       |
| Initialisation | Must be initialised  | Can be declared without initialisation |
| Dereferencing  | Automatic            | Explicit with `*`                      |

## Common Use Cases

### Function Parameters

References are commonly used to pass variables to functions without copying, allowing the function to modify the original variable.

```cpp
void increment(int &value) {
    value++;  // Modifies the original variable
}

int count = 5;
increment(count);
cout << count;  // Output: 6
```

### Function Return Values

References can be returned from functions, useful for operator overloading and chaining.

```cpp
int& getElement(int arr[], int index) {
    return arr[index];
}

int numbers[] = {1, 2, 3};
getElement(numbers, 1) = 10;  // Modifies numbers[1]
```

## Memory Address

The `&` operator can also be used to get the memory address of a variable.

```cpp
string food = "Pizza";

cout << &food; // Outputs 0x6dfed4
```

---

## References

- [Reference Declaration - cppreference.com](https://en.cppreference.com/w/cpp/language/reference)
- [C++ References - W3Schools](https://www.w3schools.com/cpp/cpp_references.asp)
- [Lvalue References - LearnCpp.com](https://www.learncpp.com/cpp-tutorial/lvalue-references/)
- Stroustrup, B. (2013). _The C++ Programming Language_ (4th ed.). Addison-Wesley. Chapter 7: Pointers, Arrays, and References
- [References vs Pointers - GeeksforGeeks](https://www.geeksforgeeks.org/references-in-c/)
- Meyers, S. (2005). _Effective C++_ (3rd ed.). Addison-Wesley. Item 3: Use const whenever possible (includes reference discussion)
