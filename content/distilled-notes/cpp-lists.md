---
{"publish":true,"title":"Lists in C++","created":"2025-06-04 11:24","modified":"2025-11-03T20:37:28.627+01:00","tags":["computer-science/programming/cpp/lists"],"cssclasses":"center-images"}
---


# LISTS IN C++

---

`std::list` is a doubly-linked list container in the C++ Standard Template Library (STL). Unlike [[distilled-notes/cpp-vectors\|vectors]], lists provide efficient insertion and deletion at any position but do not support random access.

## Declaration and Initialisation

```cpp
#include <list>
#include <string>

// Empty list
std::list<int> numbers;

// Initialiser list
std::list<std::string> cars = {"Volvo", "BMW", "Ford", "Mazda"};

// Fill constructor (5 elements with value 10)
std::list<int> values(5, 10);

// Range constructor
std::list<int> source = {1, 2, 3, 4, 5};
std::list<int> copy(source.begin(), source.end());
```

---

## Access Elements

Lists do **not** support random access via `[]` operator or `.at()` method. Only sequential access is available.

### Front and Back Access

```cpp
std::list<std::string> cars = {"Volvo", "BMW", "Ford", "Mazda"};

std::string first = cars.front();  // "Volvo"
std::string last = cars.back();    // "Mazda"
```

### Modifying Front and Back

```cpp
cars.front() = "Opel";     // Change first element
cars.back() = "Toyota";    // Change last element

std::cout << cars.front(); // Outputs: Opel
std::cout << cars.back();  // Outputs: Toyota
```

---

## Adding Elements

### At the Beginning or End

```cpp
std::list<int> numbers = {2, 3, 4};

numbers.push_front(1);  // List: {1, 2, 3, 4}
numbers.push_back(5);   // List: {1, 2, 3, 4, 5}
```

### At Arbitrary Position

Use iterators to insert at any position.

```cpp
std::list<int> numbers = {1, 2, 4, 5};

auto it = numbers.begin();
++it;  // Move to position 1
++it;  // Move to position 2
numbers.insert(it, 3);  // List: {1, 2, 3, 4, 5}
```

---

## Removing Elements

### From Beginning or End

```cpp
std::list<int> numbers = {1, 2, 3, 4, 5};

numbers.pop_front();  // Removes 1; List: {2, 3, 4, 5}
numbers.pop_back();   // Removes 5; List: {2, 3, 4}
```

### By Value

```cpp
numbers.remove(3);  // Removes all occurrences of 3
```

### By Position

```cpp
auto it = numbers.begin();
++it;
numbers.erase(it);  // Removes element at position 1
```

### By Condition

```cpp
// Remove all even numbers
numbers.remove_if([](int n) { return n % 2 == 0; });
```

---

## Iteration

### Range-based For Loop

```cpp
std::list<std::string> cars = {"Volvo", "BMW", "Ford"};

for (const std::string& car : cars) {
    std::cout << car << std::endl;
}
```

### Iterator

```cpp
for (auto it = cars.begin(); it != cars.end(); ++it) {
    std::cout << *it << std::endl;
}
```

---

## Common Operations

### Size and Empty Check

```cpp
std::list<int> numbers = {1, 2, 3};

size_t size = numbers.size();        // Returns 3
bool isEmpty = numbers.empty();      // Returns false

numbers.clear();
isEmpty = numbers.empty();           // Returns true
```

### Sorting

```cpp
std::list<int> numbers = {5, 2, 8, 1, 9};
numbers.sort();  // List: {1, 2, 5, 8, 9}

// Custom comparator (descending order)
numbers.sort([](int a, int b) { return a > b; });
```

### Reversing

```cpp
std::list<int> numbers = {1, 2, 3, 4, 5};
numbers.reverse();  // List: {5, 4, 3, 2, 1}
```

### Merging

Combines two sorted lists into one sorted list.

```cpp
std::list<int> list1 = {1, 3, 5};
std::list<int> list2 = {2, 4, 6};

list1.merge(list2);  // list1: {1, 2, 3, 4, 5, 6}, list2 is empty
```

### Removing Duplicates

```cpp
std::list<int> numbers = {1, 2, 2, 3, 3, 3, 4};
numbers.unique();  // List: {1, 2, 3, 4}
```

---

## List vs Vector Comparison

| Feature                   | `std::list`                      | `std::vector`                  |
| ------------------------- | -------------------------------- | ------------------------------ |
| **Underlying Structure**  | Doubly-linked list               | Dynamic array                  |
| **Random Access**         | No (O(n))                        | Yes (O(1))                     |
| **Insert at Beginning**   | O(1)                             | O(n)                           |
| **Insert at End**         | O(1)                             | O(1) amortised                 |
| **Insert in Middle**      | O(1) with iterator               | O(n)                           |
| **Delete from Beginning** | O(1)                             | O(n)                           |
| **Delete from End**       | O(1)                             | O(1)                           |
| **Memory Overhead**       | Higher (pointers per element)    | Lower (contiguous memory)      |
| **Cache Locality**        | Poor                             | Excellent                      |
| **Iterator Invalidation** | Stable (except deleted elements) | May invalidate on reallocation |

---

## When to Use `std::list`

- Frequent insertions/deletions at arbitrary positions
- Need stable iterators (insertions/deletions don't invalidate other iterators)
- No requirement for random access
- Frequent merging or splicing operations

---

## Best Practices

| Guideline                                      | Rationale                                                  |
| ---------------------------------------------- | ---------------------------------------------------------- |
| Prefer `std::vector` by default                | Better cache locality, simpler interface                   |
| Use `std::list` for frequent middle insertions | O(1) insertion with iterator                               |
| Use iterators for traversal                    | Lists don't support index-based access                     |
| Consider `std::deque` as middle ground         | Supports random access and efficient front/back operations |
| Call `.sort()` on list, not `std::sort`        | List's `.sort()` is optimised for linked structures        |

---

## References

- Stroustrup, B. (2013). _The C++ Programming Language_ (4th ed.). Addison-Wesley.
- [std::list - cppreference.com](https://en.cppreference.com/w/cpp/container/list)
- Josuttis, N. M. (2012). _The C++ Standard Library_ (2nd ed.). Addison-Wesley.
