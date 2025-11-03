---
{"publish":true,"title":"Enumerator in C++","created":"2025-05-22 13:32","modified":"2025-11-03T20:36:59.626+01:00","tags":["computer-science/programming/cpp/enumerator"],"cssclasses":"center-images"}
---


# ENUMERATOR IN C++

---

An **enumeration** (enum) is a user-defined type in C++ that consists of a set of named integral constants. Enumerations make code more readable and maintainable by replacing "magic numbers" with descriptive names. C++ provides both traditional C-style enums and type-safe enum classes (C++11).

## Traditional Enums (C-style)

### Basic Declaration

```cpp
enum Color {
    RED,      // 0 by default
    GREEN,    // 1
    BLUE      // 2
};

Color myColor = RED;
cout << myColor;  // Outputs: 0
```

**Note**: Enum values are automatically assigned integers starting from 0.

### Custom Values

You can explicitly assign values:

```cpp
enum Level {
    LOW = 1,
    MEDIUM = 5,
    HIGH = 10
};

Level difficulty = MEDIUM;
cout << difficulty;  // Outputs: 5
```

### Automatic Increment

Values auto-increment from the last assigned value:

```cpp
enum Status {
    IDLE = 0,
    RUNNING,    // 1
    PAUSED,     // 2
    STOPPED = 10,
    ERROR       // 11
};
```

### Scope Issues

Traditional enums pollute the enclosing [[distilled-notes/cpp-scopes\|scope]]:

```cpp
enum Color { RED, GREEN, BLUE };
enum TrafficLight { RED, YELLOW, GREEN };  // ERROR: RED and GREEN redefined
```

## Enum Classes (C++11)

**Strongly-typed, scoped enumerations** solve traditional enum problems:

### Basic Syntax

```cpp
enum class Color {
    RED,
    GREEN,
    BLUE
};

Color myColor = Color::RED;  // Must use scope resolution
// int x = myColor;          // ERROR: no implicit conversion to int
int x = static_cast<int>(myColor);  // Explicit conversion required
```

### Advantages of Enum Classes

1. **Type safety**: No implicit conversion to integers
2. **Scoped**: Names don't pollute enclosing scope
3. **Forward declaration**: Can be declared without definition
4. **Explicit underlying type**: Can specify storage type

### Specifying Underlying Type

```cpp
enum class Status : unsigned char {
    OK,
    WARNING,
    ERROR
};

// Saves memory (1 byte instead of 4)
```

### Multiple Enums with Same Names

```cpp
enum class Color { RED, GREEN, BLUE };
enum class TrafficLight { RED, YELLOW, GREEN };  // OK: scoped

Color c = Color::RED;
TrafficLight t = TrafficLight::RED;  // No conflict
```

## Comparison: Traditional vs Enum Class

| Feature             | Traditional Enum               | Enum Class                      |
| ------------------- | ------------------------------ | ------------------------------- |
| Type safety         | Weak (implicit int conversion) | Strong (no implicit conversion) |
| Scoping             | Unscoped (pollutes namespace)  | Scoped (requires `::`)          |
| Forward declaration | No                             | Yes                             |
| Underlying type     | `int` (implicit)               | Customizable                    |

## Using Enums in Switch Statements

```cpp
enum class Day {
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY
};

Day today = Day::WEDNESDAY;

switch (today) {
    case Day::MONDAY:
        cout << "Start of work week\n";
        break;
    case Day::FRIDAY:
        cout << "End of work week\n";
        break;
    case Day::SATURDAY:
    case Day::SUNDAY:
        cout << "Weekend!\n";
        break;
    default:
        cout << "Midweek\n";
}
```

## Iterating Over Enums

Enums don't have built-in iteration, but you can implement it:

```cpp
enum class Color {
    RED,
    GREEN,
    BLUE,
    COUNT  // Sentinel value for iteration
};

for (int i = 0; i < static_cast<int>(Color::COUNT); ++i) {
    Color c = static_cast<Color>(i);
    // Process color
}
```

## Bitwise Operations with Enums

Useful for flags:

```cpp
enum class Permission : unsigned int {
    NONE = 0,
    READ = 1 << 0,   // 0001
    WRITE = 1 << 1,  // 0010
    EXECUTE = 1 << 2 // 0100
};

// Enable operator overloading for bitwise ops
Permission operator|(Permission a, Permission b) {
    return static_cast<Permission>(
        static_cast<unsigned int>(a) | static_cast<unsigned int>(b)
    );
}

Permission userPerms = Permission::READ | Permission::WRITE;
```

## Best Practices

1. **Prefer enum class**: Use enum class instead of traditional enums for better type safety
2. **Use meaningful names**: Make enum and enumerator names descriptive
3. **Avoid magic numbers**: Replace integer constants with enums
4. **Specify underlying type**: When size matters, specify the underlying type
5. **Use ALL_CAPS or PascalCase**: Follow consistent naming conventions
6. **Group related constants**: Keep related values together in one enum

## Common Use Cases

### State Machines

```cpp
enum class State {
    IDLE,
    PROCESSING,
    COMPLETE,
    ERROR
};

State currentState = State::IDLE;
```

### Error Codes

```cpp
enum class ErrorCode {
    SUCCESS = 0,
    FILE_NOT_FOUND = 1,
    PERMISSION_DENIED = 2,
    INVALID_ARGUMENT = 3
};

ErrorCode result = openFile("data.txt");
```

### Configuration Options

```cpp
enum class LogLevel {
    DEBUG,
    INFO,
    WARNING,
    ERROR,
    CRITICAL
};
```

## Example: Complete Usage

```cpp
#include <iostream>
using namespace std;

enum class Priority : unsigned char {
    LOW = 1,
    MEDIUM = 5,
    HIGH = 10,
    CRITICAL = 100
};

void processTask(Priority p) {
    switch (p) {
        case Priority::CRITICAL:
            cout << "Immediate action required!\n";
            break;
        case Priority::HIGH:
            cout << "High priority task\n";
            break;
        case Priority::MEDIUM:
            cout << "Normal priority\n";
            break;
        case Priority::LOW:
            cout << "Low priority\n";
            break;
    }
}

int main() {
    Priority taskPriority = Priority::HIGH;

    processTask(taskPriority);

    // Explicit conversion to int
    int priorityValue = static_cast<int>(taskPriority);
    cout << "Priority value: " << priorityValue << "\n";  // 10

    return 0;
}
```

---

## References

- Stroustrup, B. (2013). _The C++ Programming Language_ (4th ed.). Addison-Wesley.
- Meyers, S. (2014). _Effective Modern C++_. O'Reilly Media.
- [Enumeration declaration - cppreference.com](https://en.cppreference.com/w/cpp/language/enum)
