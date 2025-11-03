---
{"publish":true,"title":"Maps in C++","created":"2025-07-03 13:33","modified":"2025-11-03T20:37:39.252+01:00","tags":["computer-science/programming/cpp/maps"],"cssclasses":"center-images"}
---


# MAPS IN C++

---

`std::map` is an associative container in the C++ Standard Template Library (STL) that stores elements as key-value pairs. Keys are unique and automatically sorted, typically implemented as a balanced binary search tree (usually red-black tree).

## Declaration and Initialisation

```cpp
#include <map>
#include <string>

// Empty map
std::map<std::string, int> people;

// Initialiser list
std::map<std::string, int> ages = {{"John", 32}, {"Adele", 45}, {"Bo", 29}};

// Copy constructor
std::map<std::string, int> copy(ages);
```

---

## Accessing Elements

### Using Bracket Operator `[]`

```cpp
std::map<std::string, int> people = {{"John", 32}, {"Adele", 45}};

int johnAge = people["John"];  // Returns 32

// Creates new entry if key doesn't exist
int bobAge = people["Bob"];    // Creates {"Bob", 0}
```

**Warning**: Using `[]` with a non-existent key creates a new entry with default value.

### Using `.at()`

```cpp
int johnAge = people.at("John");  // Returns 32

// Throws std::out_of_range if key doesn't exist
int bobAge = people.at("Bob");    // Throws exception
```

**Best Practice**: Use `.at()` for safer access when key existence is uncertain.

---

## Modifying Elements

### Changing Values

```cpp
people["John"] = 50;      // Changes John's age to 50
people.at("Adele") = 46;  // Changes Adele's age to 46
```

---

## Adding Elements

### Using Bracket Operator

```cpp
people["Charlie"] = 28;
```

### Using `.insert()`

```cpp
// Insert pair
people.insert({"David", 35});

// Insert with std::make_pair
people.insert(std::make_pair("Emma", 27));

// Check if insertion succeeded
auto result = people.insert({"John", 40});
if (!result.second) {
    std::cout << "Key already exists" << std::endl;
}
```

The `.insert()` method returns a `pair<iterator, bool>` where the boolean indicates success.

### Using `.emplace()`

More efficient than `.insert()` as it constructs the element in-place.

```cpp
people.emplace("Frank", 31);
```

---

## Removing Elements

### Remove Specific Element

```cpp
people.erase("John");  // Removes entry with key "John"

// Returns number of elements removed (0 or 1)
size_t removed = people.erase("NonExistent");
```

### Remove by Iterator

```cpp
auto it = people.find("Adele");
if (it != people.end()) {
    people.erase(it);
}
```

### Remove All Elements

```cpp
people.clear();
```

---

## Searching and Existence Checking

### Check if Key Exists

```cpp
// Method 1: Using .count() (returns 0 or 1)
if (people.count("John") > 0) {
    std::cout << "John exists" << std::endl;
}

// Method 2: Using .find()
auto it = people.find("John");
if (it != people.end()) {
    std::cout << "John exists with age: " << it->second << std::endl;
}

// Method 3: C++20 .contains()
if (people.contains("John")) {
    std::cout << "John exists" << std::endl;
}
```

---

## Size and Empty Check

```cpp
size_t size = people.size();        // Number of elements
bool isEmpty = people.empty();      // Returns true if empty
```

---

## Iteration

### Range-based For Loop

```cpp
std::map<std::string, int> people = {{"John", 32}, {"Adele", 45}, {"Bo", 29}};

for (const auto& person : people) {
    std::cout << person.first << " is: " << person.second << std::endl;
}
```

**Note**: Elements are automatically sorted by key in ascending order.

### Iterator

```cpp
for (auto it = people.begin(); it != people.end(); ++it) {
    std::cout << it->first << " is: " << it->second << std::endl;
}
```

### Structured Bindings (C++17)

```cpp
for (const auto& [name, age] : people) {
    std::cout << name << " is: " << age << std::endl;
}
```

---

## Custom Sorting

### Descending Order

```cpp
std::map<std::string, int, std::greater<std::string>> people = {
    {"John", 32}, {"Adele", 45}, {"Bo", 29}
};

// Output order: John, Bo, Adele (descending by key)
```

### Custom Comparator

```cpp
struct CustomCompare {
    bool operator()(const std::string& a, const std::string& b) const {
        return a.length() < b.length();  // Sort by string length
    }
};

std::map<std::string, int, CustomCompare> people;
```

---

## Map Variants

### `std::unordered_map`

Hash table implementation with O(1) average access time but no ordering.

```cpp
#include <unordered_map>

std::unordered_map<std::string, int> people = {{"John", 32}, {"Adele", 45}};
```

### `std::multimap`

Allows duplicate keys.

```cpp
#include <map>

std::multimap<std::string, int> scores = {{"Alice", 90}, {"Alice", 85}};
```

---

## Performance Characteristics

| Operation    | `std::map`     | `std::unordered_map`     |
| ------------ | -------------- | ------------------------ |
| **Insert**   | O(log n)       | O(1) average, O(n) worst |
| **Access**   | O(log n)       | O(1) average, O(n) worst |
| **Delete**   | O(log n)       | O(1) average, O(n) worst |
| **Search**   | O(log n)       | O(1) average, O(n) worst |
| **Ordering** | Sorted by key  | No ordering              |
| **Memory**   | Lower overhead | Higher (hash table)      |

---

## Common Use Cases

- Dictionaries and lookup tables
- Counting occurrences (word frequency)
- Caching and memoisation
- Representing graph adjacency lists
- Configuration settings

---

## Best Practices

| Guideline                                   | Rationale                                    |
| ------------------------------------------- | -------------------------------------------- |
| Use `.at()` for safe access                 | Throws exception instead of creating entries |
| Use `.find()` before access                 | Avoids unnecessary element creation          |
| Prefer `std::unordered_map` for performance | O(1) vs O(log n) when ordering not needed    |
| Use structured bindings (C++17)             | Cleaner iteration syntax                     |
| Use `.emplace()` for insertions             | More efficient than `.insert()`              |
| Check `.insert()` return value              | Detects duplicate keys                       |

---

## References

- Stroustrup, B. (2013). _The C++ Programming Language_ (4th ed.). Addison-Wesley.
- [std::map - cppreference.com](https://en.cppreference.com/w/cpp/container/map)
- [std::unordered_map - cppreference.com](https://en.cppreference.com/w/cpp/container/unordered_map)
- Josuttis, N. M. (2012). _The C++ Standard Library_ (2nd ed.). Addison-Wesley.
