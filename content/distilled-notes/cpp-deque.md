---
{"publish":true,"title":"Deque in C++","created":"2025-08-05 10:57","modified":"2025-11-03T20:36:50.442+01:00","tags":["computer-science/programming/cpp/deque"],"cssclasses":"center-images"}
---


# DEQUE IN C++

---

A **deque** (double-ended queue, pronounced "deck") is a sequence container in C++ that allows efficient insertion and removal at both ends. Unlike [[distilled-notes/cpp-vectors\|vectors]] which are optimized for back operations, deques provide fast operations at both the front and back. They also support random access by index.

## Declaration and Initialization

```cpp
#include <deque>
#include <string>
using namespace std;

// Empty deque
deque<int> numbers;

// Initialize with values
deque<string> names = {"Alice", "Bob", "Charlie"};

// Initialize with size and default value
deque<int> data(10, 0);  // 10 elements, all zero

// Copy from another deque
deque<int> copy(numbers);
```

## Accessing Elements

### By Index

```cpp
deque<int> nums = {10, 20, 30, 40};

// Using [] operator (no bounds checking)
cout << nums[0];  // 10

// Using at() (with bounds checking)
cout << nums.at(2);  // 30
// cout << nums.at(10);  // Throws out_of_range exception
```

### Front and Back

```cpp
cout << nums.front();  // 10 (first element)
cout << nums.back();   // 40 (last element)
```

## Adding Elements

### At the Back

```cpp
deque<int> nums = {1, 2, 3};

nums.push_back(4);     // {1, 2, 3, 4}
nums.emplace_back(5);  // {1, 2, 3, 4, 5} (constructs in-place, C++11)
```

### At the Front

```cpp
nums.push_front(0);     // {0, 1, 2, 3, 4, 5}
nums.emplace_front(-1); // {-1, 0, 1, 2, 3, 4, 5}
```

### At Specific Position

```cpp
auto it = nums.begin() + 2;
nums.insert(it, 99);  // Insert 99 at index 2
```

## Removing Elements

### From the Back

```cpp
nums.pop_back();  // Removes last element
```

### From the Front

```cpp
nums.pop_front();  // Removes first element
```

### At Specific Position

```cpp
auto it = nums.begin() + 2;
nums.erase(it);  // Remove element at index 2

// Erase range
nums.erase(nums.begin(), nums.begin() + 3);  // Remove first 3 elements
```

### Clear All

```cpp
nums.clear();  // Remove all elements
```

## Size and Capacity

```cpp
deque<int> nums = {1, 2, 3, 4, 5};

cout << nums.size();   // 5 (number of elements)
cout << nums.empty();  // false (0)

nums.clear();
cout << nums.empty();  // true (1)
```

## Iteration

### Range-based for loop

```cpp
deque<string> names = {"Alice", "Bob", "Charlie"};

for (const auto& name : names) {
    cout << name << " ";
}
```

### Using iterators

```cpp
for (auto it = names.begin(); it != names.end(); ++it) {
    cout << *it << " ";
}

// Reverse iteration
for (auto it = names.rbegin(); it != names.rend(); ++it) {
    cout << *it << " ";
}
```

## Common Operations

```cpp
#include <algorithm>

deque<int> nums = {3, 1, 4, 1, 5};

// Sort
sort(nums.begin(), nums.end());

// Find
auto it = find(nums.begin(), nums.end(), 4);
if (it != nums.end()) {
    cout << "Found at index: " << distance(nums.begin(), it);
}

// Reverse
reverse(nums.begin(), nums.end());

// Resize
nums.resize(10);      // Extend to 10 elements
nums.resize(3);       // Shrink to 3 elements

// Swap with another deque
deque<int> other = {7, 8, 9};
nums.swap(other);
```

## Deque vs Vector vs List

| Feature                 | Deque                 | [[distilled-notes/cpp-vectors\|Vector]] | [[distilled-notes/cpp-lists\|List]]  |
| ----------------------- | --------------------- | ----------------------- | -------------------- |
| Random access           | O(1)                  | O(1)                    | O(n)                 |
| Insert/remove at front  | O(1)                  | O(n)                    | O(1)                 |
| Insert/remove at back   | O(1)                  | O(1)                    | O(1)                 |
| Insert/remove in middle | O(n)                  | O(n)                    | O(1)                 |
| Memory layout           | Non-contiguous chunks | Contiguous              | Non-contiguous nodes |
| Iterator invalidation   | Middle ops only       | Moderate                | Minimal              |
| Cache performance       | Good                  | Excellent               | Poor                 |

## When to Use Deque

**Use deque when**:

- You need fast insertions/deletions at both ends
- You need random access by index
- You don't need iterator stability during insertions

**Avoid deque when**:

- You only need back operations (use vector instead)
- You need frequent middle insertions (use list instead)
- Memory must be contiguous (use vector instead)

## Performance Characteristics

- **Random access**: O(1)
- **Insert/delete at ends**: O(1) amortized
- **Insert/delete in middle**: O(n)
- **Search**: O(n)

## Example: Complete Usage

```cpp
#include <deque>
#include <iostream>
#include <algorithm>

int main() {
    deque<int> buffer;

    // Add elements at both ends
    buffer.push_back(3);
    buffer.push_back(4);
    buffer.push_front(2);
    buffer.push_front(1);
    // buffer = {1, 2, 3, 4}

    // Access elements
    cout << "Front: " << buffer.front() << "\n";  // 1
    cout << "Back: " << buffer.back() << "\n";    // 4
    cout << "Index 2: " << buffer[2] << "\n";     // 3

    // Remove from both ends
    buffer.pop_front();  // {2, 3, 4}
    buffer.pop_back();   // {2, 3}

    // Iterate
    for (int num : buffer) {
        cout << num << " ";
    }

    // Size and empty check
    cout << "Size: " << buffer.size() << "\n";
    cout << "Empty: " << buffer.empty() << "\n";

    return 0;
}
```

---

## References

- Stroustrup, B. (2013). _The C++ Programming Language_ (4th ed.). Addison-Wesley.
- [std::deque - cppreference.com](https://en.cppreference.com/w/cpp/container/deque)
- Josuttis, N. M. (2012). _The C++ Standard Library: A Tutorial and Reference_ (2nd ed.). Addison-Wesley.
