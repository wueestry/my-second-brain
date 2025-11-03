---
{"publish":true,"title":"Structures in C++","created":"2025-05-22 07:47","modified":"2025-11-03T20:39:00.389+01:00","tags":["computer-science/programming/cpp/structures"],"cssclasses":"center-images"}
---


# STRUCTURES IN C++

---

**Structures** (also called **structs**) are a way to group several related variables into one place.

## Creation

```cpp
struct {             // Structure declaration
  int myNum;         // Member (int variable)
  string myString;   // Member (string variable)
} myStructure;       // Structure variable
```

### One Structure in Multiple Variables

A single structure can be used in multiple variables by separating the structure variables by a comma.

```cpp
struct {
    int myNum;
    string myString;
} s1, s2, s3;  // Create three structure variables
```

### Named Structures

By giving a name to a structure, it can be treated as a datatype.

```cpp
struct Car {
    string brand;
    string model;
    int year;
};

Car myCar1;
Car myCar2;
```

## Access Members

Use the dot operator `.` to access members of a structure.

```cpp
// Create a structure variable called myStructure
struct {
    int myNum;
    string myString;
} myStructure;

// Assign values to members of myStructure
myStructure.myNum = 1;
myStructure.myString = "Hello";

// Print members of myStructure
cout << myStructure.myNum << "\n";
cout << myStructure.myString << "\n";
```

## Initialising Structures

Structures can be initialised with values when they are created.

```cpp
struct Person {
    string name;
    int age;
    string city;
};

Person person1 = {"John Doe", 30, "London"};
cout << person1.name;  // Output: John Doe
```

## Structures vs Classes

Structures and classes in C++ are very similar, with one key difference:

| Feature        | Structure       | Class                  |
| -------------- | --------------- | ---------------------- |
| Default access | `public`        | `private`              |
| Typical use    | Data containers | Objects with behaviour |
| Inheritance    | Supported       | Supported              |

```cpp
struct Point {
    int x, y;  // Public by default
};

class Point {
    int x, y;  // Private by default
};
```

## Nested Structures

Structures can contain other structures as members.

```cpp
struct Address {
    string street;
    string city;
};

struct Employee {
    string name;
    Address address;  // Nested structure
};

Employee emp;
emp.name = "Alice";
emp.address.city = "Manchester";
```

---

## References

- [C++ Structures - cppreference.com](https://en.cppreference.com/w/cpp/language/class)
- [Structures in C++ - GeeksforGeeks](https://www.geeksforgeeks.org/structures-in-cpp/)
- [Struct vs Class - Stack Overflow](https://stackoverflow.com/questions/54585/when-should-you-use-a-class-vs-a-struct-in-c)
