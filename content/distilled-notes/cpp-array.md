---
{"publish":true,"title":"Array in C++","created":"2025-07-29 09:47","modified":"2025-11-03T20:35:53.921+01:00","tags":["computer-science/programming/cpp/array"],"cssclasses":"center-images"}
---


# ARRAY IN C++

---

Arrays in C++ are fixed-size sequential containers that store multiple elements of the same type in contiguous memory. C++ provides two types of arrays: C-style arrays (inherited from C) and modern `std::array` (introduced in C++11).

## C-Style Arrays

### Declaration and Initialisation

```cpp
// Declaration with size
int numbers[5];

// Declaration with initialisation
int values[4] = {10, 20, 30, 40};

// Size inferred from initialiser
string names[] = {"Alice", "Bob", "Charlie"};

// Partial initialisation (rest are zero-initialised)
int data[5] = {1, 2};  // {1, 2, 0, 0, 0}
```

### Accessing Elements

```cpp
int arr[3] = {10, 20, 30};
cout << arr[0];  // 10 (first element)
arr[2] = 50;     // Modify third element
```

**Warning**: C-style arrays do not check bounds. Accessing `arr[10]` on a 3-element array causes undefined behaviour.

### Limitations

- Fixed size known at compile time
- No built-in size tracking
- Decay to [[distilled-notes/cpp-pointer\|pointers]] when passed to functions
- No bounds checking
- Cannot be returned from functions easily

## std::array (C++11)

Modern C++ provides `std::array` from `<array>` header, which wraps C-style arrays with better safety and features:

```cpp
#include <array>

// Declaration
std::array<int, 5> numbers = {1, 2, 3, 4, 5};

// Size is part of the type
std::array<string, 3> names = {"Alice", "Bob", "Charlie"};

// Access with bounds checking
cout << numbers.at(2);  // Safe: throws exception if out of bounds
cout << numbers[2];     // Fast: no bounds checking

// Get size
cout << numbers.size();  // 5
```

### Advantages of std::array

- Size is stored and accessible via `.size()`
- Can be passed to functions without decay
- Supports standard algorithms
- Iterator support for range-based loops
- Better integration with STL

## Iteration

### Range-based for loop (C++11)

```cpp
std::array<int, 4> values = {10, 20, 30, 40};

// By value
for (int val : values) {
    cout << val << "\n";
}

// By reference (for modification)
for (int& val : values) {
    val *= 2;
}

// By const reference (efficient, read-only)
for (const auto& val : values) {
    cout << val << "\n";
}
```

### Traditional for loop

```cpp
int arr[4] = {1, 2, 3, 4};

for (int i = 0; i < 4; i++) {
    cout << arr[i] << "\n";
}
```

## Multi-dimensional Arrays

```cpp
// C-style 2D array
int matrix[3][4] = {
    {1, 2, 3, 4},
    {5, 6, 7, 8},
    {9, 10, 11, 12}
};

cout << matrix[1][2];  // 7

// std::array 2D
std::array<std::array<int, 4>, 3> grid;
```

## Array vs Vector

| Feature     | Array                 | [[distilled-notes/cpp-vectors\|Vector]]     |
| ----------- | --------------------- | --------------------------- |
| Size        | Fixed at compile time | Dynamic                     |
| Memory      | Stack (usually)       | Heap                        |
| Performance | Slightly faster       | Overhead for dynamic sizing |
| Use case    | Known fixed size      | Variable size needed        |

## Common Operations

```cpp
#include <array>
#include <algorithm>

std::array<int, 5> arr = {5, 2, 8, 1, 9};

// Sort
std::sort(arr.begin(), arr.end());

// Find
auto it = std::find(arr.begin(), arr.end(), 8);

// Fill with value
arr.fill(0);

// Check if empty (always false for non-zero size array)
bool empty = arr.empty();
```

---

## References

- Stroustrup, B. (2013). _The C++ Programming Language_ (4th ed.). Addison-Wesley.
- Meyers, S. (2014). _Effective Modern C++_. O'Reilly Media.
- [std::array - cppreference.com](https://en.cppreference.com/w/cpp/container/array)
- [[meta/references/Cpp Std Array Reference]]
