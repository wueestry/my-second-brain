---
{"publish":true,"title":"C++ Datatypes","created":"2025-05-16 09:10","modified":"2025-11-03T20:36:41.746+01:00","tags":["computer-science/programming/cpp/datatypes"],"cssclasses":"center-images"}
---


# C++ DATATYPES

---

C++ is a statically typed language where every variable must have a specified data type at compile time. The type system includes fundamental (primitive) types, derived types, and user-defined types. Understanding data types is crucial for memory management, performance optimization, and type safety.

## Fundamental Data Types

### Boolean

Stores logical values:

```cpp
bool isActive = true;
bool isComplete = false;
```

- **Size**: 1 byte (typically)
- **Values**: `true` or `false`
- **Usage**: Conditional logic, flags

### Character Types

#### char

Stores a single character:

```cpp
char letter = 'A';
char digit = '7';
char newline = '\n';
```

- **Size**: 1 byte (8 bits)
- **Range**: -128 to 127 (signed) or 0 to 255 (unsigned)
- **Usage**: Characters, small integers, ASCII values

#### wchar_t, char16_t, char32_t

Wide character types for Unicode:

```cpp
wchar_t wideChar = L'€';
char16_t utf16 = u'∑';
char32_t utf32 = U'🚀';
```

### Integer Types

#### int

Stores whole numbers:

```cpp
int count = 42;
int negative = -100;
```

- **Size**: Typically 4 bytes (32 bits)
- **Range**: -2,147,483,648 to 2,147,483,647 (signed)
- **Usage**: Counters, indices, general integers

#### short int

Smaller integer type:

```cpp
short int smallNum = 1000;
```

- **Size**: Typically 2 bytes (16 bits)
- **Range**: -32,768 to 32,767 (signed)

#### long int

Larger integer type:

```cpp
long int largeNum = 1000000L;
```

- **Size**: At least 4 bytes (often 8 bytes on 64-bit systems)
- **Range**: At least -2,147,483,648 to 2,147,483,647

#### long long int (C++11)

Even larger integer type:

```cpp
long long int veryLarge = 9223372036854775807LL;
```

- **Size**: At least 8 bytes (64 bits)
- **Range**: At least -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807

### Unsigned Modifiers

All integer types can be unsigned (non-negative only):

```cpp
unsigned int positiveOnly = 4294967295u;
unsigned short us = 65535;
unsigned char uc = 255;
```

- **Effect**: Doubles the positive range, no negative values

### Floating-Point Types

#### float

Single-precision floating-point:

```cpp
float pi = 3.14159f;
float temperature = 98.6f;
```

- **Size**: 4 bytes (32 bits)
- **Precision**: ~6-7 decimal digits
- **Range**: ±3.4 × 10³⁸
- **Usage**: Graphics, games (where precision is less critical)

#### double

Double-precision floating-point:

```cpp
double precise = 3.141592653589793;
double scientific = 1.23e-10;
```

- **Size**: 8 bytes (64 bits)
- **Precision**: ~15-16 decimal digits
- **Range**: ±1.7 × 10³⁰⁸
- **Usage**: Default for floating-point (recommended)

#### long double

Extended precision floating-point:

```cpp
long double extraPrecise = 3.141592653589793238L;
```

- **Size**: Typically 10, 12, or 16 bytes (platform-dependent)
- **Precision**: Platform-dependent (often 18-19 digits)

## Type Modifiers Summary

| Modifier   | Effect                                                     |
| ---------- | ---------------------------------------------------------- |
| `signed`   | Can store negative and positive values (default for `int`) |
| `unsigned` | Only non-negative values (doubles positive range)          |
| `short`    | Smaller storage (usually 2 bytes for integers)             |
| `long`     | Larger storage (usually 8 bytes for integers)              |

## Derived Types

### Pointers

References to memory addresses:

```cpp
int value = 42;
int* ptr = &value;  // [[cpp-pointer|Pointer]] to int
```

### References

Aliases for existing variables:

```cpp
int value = 42;
int& ref = value;  // [[cpp-references|Reference]] to int
```

### Arrays

Fixed-size sequences:

```cpp
int numbers[5] = {1, 2, 3, 4, 5};  // [[cpp-array|Array]]
```

## User-Defined Types

### Classes and Structs

```cpp
class Person {     // [[cpp-classes|Class]]
    string name;
    int age;
};

struct Point {     // [[cpp-structures|Struct]]
    int x, y;
};
```

### Enumerations

```cpp
enum Color { RED, GREEN, BLUE };  // [[cpp-enumerator|Enum]]
```

## Standard Library Types

### Strings

```cpp
#include <string>
string name = "Alice";  // [[cpp-strings|String]]
```

### Containers

```cpp
#include <vector>
#include <map>
#include <deque>

vector<int> nums = {1, 2, 3};      // [[cpp-vectors|Vector]]
map<string, int> ages;              // [[cpp-maps|Map]]
deque<int> dq;                      // [[cpp-deque|Deque]]
stack<int> st;                      // [[cpp-stacks|Stack]]
```

## Type Inference (C++11)

### auto

Compiler deduces type:

```cpp
auto x = 42;           // int
auto pi = 3.14;        // double
auto name = "Alice";   // const char*
auto vec = vector<int>{1, 2, 3};  // vector<int>
```

### decltype

Deduces type from expression:

```cpp
int x = 10;
decltype(x) y = 20;    // y is int
```

## Type Aliases

```cpp
// Using typedef (C-style)
typedef unsigned long ulong;

// Using 'using' (C++11, preferred)
using byte = unsigned char;
using IntVector = vector<int>;
```

## Size and Range Verification

```cpp
#include <limits>
#include <iostream>

cout << "int size: " << sizeof(int) << " bytes\n";
cout << "int max: " << numeric_limits<int>::max() << "\n";
cout << "double precision: " << numeric_limits<double>::digits10 << " digits\n";
```

## Best Practices

1. **Use `int` by default** for integers unless you have specific size requirements
2. **Use `double` for floating-point** unless memory is constrained
3. **Use `auto`** when the type is obvious from context
4. **Avoid `float`** unless performance or memory is critical
5. **Use fixed-width types** (`int32_t`, `uint64_t`) from `<cstdint>` for portability
6. **Initialize variables** to avoid undefined behavior

---

## References

- Stroustrup, B. (2013). _The C++ Programming Language_ (4th ed.). Addison-Wesley.
- [Fundamental types - cppreference.com](https://en.cppreference.com/w/cpp/language/types)
- [std::numeric_limits - cppreference.com](https://en.cppreference.com/w/cpp/types/numeric_limits)
