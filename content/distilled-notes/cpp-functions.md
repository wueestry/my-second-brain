---
{"publish":true,"title":"Functions in C++","created":"2025-06-04 08:52","modified":"2025-11-03T20:37:08.706+01:00","tags":["computer-science/programming/cpp/functions"],"cssclasses":"center-images"}
---


# FUNCTIONS IN C++

---

**Functions** are reusable blocks of code that execute only when called. They enable modularity, code reuse, and abstraction in C++ programmes.

## Declaration and Definition

A **declaration** (or function prototype) specifies the function's return type, name, and parameters. A **definition** provides the actual implementation.

```cpp
// Declaration
int add(int a, int b);

// Definition
int add(int a, int b) {
    return a + b;
}
```

**Best Practice**: Declare functions in header files (`.h`) and define them in source files (`.cpp`) for better organisation.

---

## Return Values

Functions can return values of any type or use `void` to indicate no return value. Modern C++ also supports automatic return type deduction.

```cpp
void printMessage() {
    std::cout << "Hello, World!" << std::endl;
}

int square(int x) {
    return x * x;
}

// Auto return type deduction (C++14)
auto multiply(int a, int b) {
    return a * b;  // Deduced as int
}
```

---

## Parameter Passing Mechanisms

### Pass by Value

Creates a copy of the argument. Changes do not affect the original.

```cpp
void increment(int x) {
    x++;  // Only modifies local copy
}
```

### Pass by Reference

Uses the original variable. Changes affect the original.

```cpp
void increment(int& x) {
    x++;  // Modifies original variable
}
```

### Pass by Pointer

Passes the memory address. Allows modification and null checks.

```cpp
void increment(int* x) {
    if (x != nullptr) {
        (*x)++;
    }
}
```

### Pass by Const Reference

Efficient for large objects, prevents modification.

```cpp
void printVector(const std::vector<int>& vec) {
    for (int val : vec) {
        std::cout << val << " ";
    }
}
```

---

## Default Arguments

Functions can specify default values for parameters, which are used when arguments are not provided.

```cpp
int power(int base, int exponent = 2) {
    int result = 1;
    for (int i = 0; i < exponent; i++) {
        result *= base;
    }
    return result;
}

// Usage
power(5);      // Returns 25 (uses default exponent = 2)
power(5, 3);   // Returns 125
```

**Note**: Default arguments must appear at the end of the parameter list.

---

## Function Overloading

C++ allows multiple functions with the same name but different parameter lists (number, type, or order of parameters).

```cpp
int add(int a, int b) {
    return a + b;
}

double add(double a, double b) {
    return a + b;
}

int add(int a, int b, int c) {
    return a + b + c;
}
```

**Note**: Overloading based solely on return type is not permitted.

---

## Inline Functions

The `inline` keyword suggests to the compiler to insert the function's code directly at the call site, reducing function call overhead.

```cpp
inline int max(int a, int b) {
    return (a > b) ? a : b;
}
```

**Modern C++**: Compilers often make better inlining decisions than explicit `inline` keywords.

---

## Constexpr Functions

`constexpr` functions can be evaluated at compile time when given constant expressions, improving performance.

```cpp
constexpr int factorial(int n) {
    return (n <= 1) ? 1 : n * factorial(n - 1);
}

// Evaluated at compile time
constexpr int result = factorial(5);  // 120
```

---

## Function Pointers

Pointers can store addresses of functions, enabling callback mechanisms and dynamic function invocation.

```cpp
int add(int a, int b) {
    return a + b;
}

int subtract(int a, int b) {
    return a - b;
}

int main() {
    int (*operation)(int, int);  // Function pointer declaration

    operation = add;
    std::cout << operation(5, 3) << std::endl;  // Outputs 8

    operation = subtract;
    std::cout << operation(5, 3) << std::endl;  // Outputs 2
}
```

---

## Lambda Functions

Lambda expressions create anonymous functions inline, particularly useful for callbacks and short operations.

### Syntax

```cpp
[capture] (parameters) -> return_type { code };
```

The return type is optional and can be automatically deduced.

### Examples

```cpp
// Basic lambda
auto add = [](int x, int y) { return x + y; };
std::cout << add(3, 4) << std::endl;  // Outputs 7

// Lambda with capture by value
int multiplier = 3;
auto multiply = [multiplier](int x) { return x * multiplier; };
std::cout << multiply(5) << std::endl;  // Outputs 15

// Lambda with capture by reference
int counter = 0;
auto increment = [&counter]() { counter++; };
increment();
std::cout << counter << std::endl;  // Outputs 1

// Lambda in loop
#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 3; i++) {
        auto show = [i]() {
            cout << "Number: " << i << "\n";
        };
        show();
    }
    return 0;
}
```

### Capture Modes

| Capture   | Description                            |
| --------- | -------------------------------------- |
| `[]`      | Capture nothing                        |
| `[=]`     | Capture all by value                   |
| `[&]`     | Capture all by reference               |
| `[x]`     | Capture `x` by value                   |
| `[&x]`    | Capture `x` by reference               |
| `[x, &y]` | Capture `x` by value, `y` by reference |

---

## Recursion

A function that calls itself to solve problems by breaking them into smaller subproblems.

```cpp
int fibonacci(int n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Tail recursion (more efficient)
int factorial(int n, int accumulator = 1) {
    if (n <= 1) {
        return accumulator;
    }
    return factorial(n - 1, n * accumulator);
}
```

---

## Best Practices

| Guideline                                 | Rationale                                        |
| ----------------------------------------- | ------------------------------------------------ |
| Use meaningful function names             | Improves code readability and self-documentation |
| Keep functions short and focused          | Single Responsibility Principle                  |
| Use `const` for parameters not modified   | Prevents accidental changes, documents intent    |
| Pass large objects by const reference     | Avoids expensive copying                         |
| Prefer `auto` for complex return types    | Simplifies code, reduces maintenance             |
| Use `[[nodiscard]]` for important returns | Prevents ignoring critical return values (C++17) |
| Document complex functions                | Helps future maintainers understand logic        |

---

## References

- Stroustrup, B. (2013). _The C++ Programming Language_ (4th ed.). Addison-Wesley.
- [C++ Functions - cppreference.com](https://en.cppreference.com/w/cpp/language/functions)
- Meyers, S. (2014). _Effective Modern C++_. O'Reilly Media.
