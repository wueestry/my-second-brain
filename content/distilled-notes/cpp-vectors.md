---
{"publish":true,"title":"Vectors in C++","created":"2025-07-29 16:12","modified":"2025-11-03T20:39:25.630+01:00","tags":["computer-science/programming/cpp/vectors"],"cssclasses":"center-images"}
---


# VECTORS IN C++

---

A vector is a dynamic array that can change size during runtime. Unlike fixed-size arrays, vectors automatically resize when elements are added or removed.

_Requires_: `#include <vector>` in the header

## Initialisation

Use the vector keyword and specify the type, then give the name of the vector.

```cpp
vector<string> names = {"Alice", "Bob"};
vector<int> numbers(5);        // 5 elements, initialised to 0
vector<int> values(5, 10);     // 5 elements, all initialised to 10
vector<double> empty;          // Empty vector
```

## Access Elements

Elements can be accessed by index using `[]` or `.at()`. The first and last elements can be accessed with `.front()` and `.back()`.

```cpp
vector<int> nums = {10, 20, 30, 40};
cout << nums[0];        // Output: 10
cout << nums.at(2);     // Output: 30 (with bounds checking)
cout << nums.front();   // Output: 10
cout << nums.back();    // Output: 40
```

## Add Elements

A new element can be added to the end with `.push_back()`.

```cpp
vector<int> nums;
nums.push_back(5);
nums.push_back(10);
// Vector now contains: {5, 10}
```

## Remove Elements

The last element can be removed with `.pop_back()`.

```cpp
vector<int> nums = {1, 2, 3};
nums.pop_back();
// Vector now contains: {1, 2}
```

## Size and Capacity

```cpp
vector<int> nums = {1, 2, 3};
cout << nums.size();      // Output: 3 (number of elements)
cout << nums.capacity();  // Allocated storage capacity
cout << nums.empty();     // Output: 0 (false, vector not empty)
```

## Iterating Through Vectors

### Using Index

```cpp
for (int i = 0; i < nums.size(); i++) {
    cout << nums[i] << " ";
}
```

### Using Range-Based Loop

```cpp
for (int num : nums) {
    cout << num << " ";
}
```

### Using Iterators

```cpp
for (auto it = nums.begin(); it != nums.end(); ++it) {
    cout << *it << " ";
}
```

## Other Useful Methods

```cpp
vector<int> nums = {1, 2, 3, 4, 5};

nums.clear();           // Remove all elements
nums.insert(nums.begin(), 0);  // Insert 0 at beginning
nums.erase(nums.begin());      // Erase first element
nums.resize(10);        // Resize to 10 elements
```

## Advantages Over Arrays

- **Dynamic sizing**: Automatically grows as needed
- **Memory management**: Handles allocation/deallocation automatically
- **Safety**: Methods like `.at()` provide bounds checking
- **Utility functions**: Built-in methods for common operations

---

## References

- [std::vector - cppreference.com](https://en.cppreference.com/w/cpp/container/vector)
- [C++ Vectors - cplusplus.com](https://cplusplus.com/reference/vector/vector/)
- [Vector in C++ STL - GeeksforGeeks](https://www.geeksforgeeks.org/vector-in-cpp-stl/)
