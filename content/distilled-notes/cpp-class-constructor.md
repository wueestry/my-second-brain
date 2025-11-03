---
{"publish":true,"title":"Class Constructor in C++","created":"2025-08-04 13:27","modified":"2025-11-03T20:36:03.769+01:00","tags":["computer-science/programming/cpp/class-constructor"],"cssclasses":"center-images"}
---


# CLASS CONSTRUCTOR IN C++

---

A **constructor** is a special member function in a [[distilled-notes/cpp-classes\|class]] that is automatically called when an object is created. Constructors initialize the object's member variables and set up its initial state.

## Basic Constructor

A constructor has the same name as the class and no return type:

```cpp
class Person {
private:
    string name;
    int age;

public:
    // Constructor
    Person(string n, int a) {
        name = n;
        age = a;
    }
};

// Usage
Person person("Alice", 25);
```

## Types of Constructors

### Default Constructor

A constructor with no parameters:

```cpp
class Point {
private:
    int x, y;

public:
    // Default constructor
    Point() {
        x = 0;
        y = 0;
    }
};

Point p;  // Calls default constructor
```

**Note**: If you define any constructor, the compiler will not automatically generate a default constructor.

### Parameterized Constructor

A constructor that accepts arguments:

```cpp
class Rectangle {
private:
    int width, height;

public:
    // Parameterized constructor
    Rectangle(int w, int h) {
        width = w;
        height = h;
    }
};

Rectangle rect(10, 20);
```

### Copy Constructor

Creates a new object as a copy of an existing object:

```cpp
class Box {
private:
    int size;

public:
    Box(int s) : size(s) {}

    // Copy constructor
    Box(const Box& other) {
        size = other.size;
        cout << "Copy constructor called\n";
    }
};

Box box1(10);
Box box2 = box1;  // Calls copy constructor
Box box3(box1);   // Also calls copy constructor
```

## Member Initializer List

The preferred way to initialize member variables (more efficient):

```cpp
class Student {
private:
    string name;
    int id;
    double gpa;

public:
    // Using member initializer list
    Student(string n, int i, double g)
        : name(n), id(i), gpa(g) {
        // Constructor body (can be empty)
    }
};
```

**Advantages**:

- More efficient (direct initialization vs. assignment)
- Required for [[distilled-notes/cpp-constant-keyword\|const]] members and [[distilled-notes/cpp-references\|references]]
- Necessary for base class initialization in [[distilled-notes/cpp-inheritance\|inheritance]]

## Constructor Overloading

Multiple constructors with different parameters:

```cpp
class Circle {
private:
    double radius;

public:
    // Default constructor
    Circle() : radius(1.0) {}

    // Parameterized constructor
    Circle(double r) : radius(r) {}

    // Copy constructor
    Circle(const Circle& other) : radius(other.radius) {}
};

Circle c1;         // Default
Circle c2(5.0);    // Parameterized
Circle c3 = c2;    // Copy
```

## Delegating Constructors (C++11)

One constructor can call another:

```cpp
class Account {
private:
    string owner;
    double balance;

public:
    // Main constructor
    Account(string o, double b) : owner(o), balance(b) {}

    // Delegates to main constructor
    Account() : Account("Unknown", 0.0) {}

    // Delegates with partial defaults
    Account(string o) : Account(o, 0.0) {}
};
```

## Explicit Constructors

Prevents implicit type conversions:

```cpp
class Length {
private:
    double meters;

public:
    // Explicit prevents implicit conversion
    explicit Length(double m) : meters(m) {}
};

Length l1(5.0);     // OK
Length l2 = 5.0;    // ERROR: implicit conversion not allowed
Length l3 = Length(5.0);  // OK: explicit conversion
```

## Default and Delete (C++11)

```cpp
class MyClass {
public:
    // Explicitly request default constructor
    MyClass() = default;

    // Delete copy constructor (prevent copying)
    MyClass(const MyClass&) = delete;

    // Delete assignment operator
    MyClass& operator=(const MyClass&) = delete;
};
```

## Best Practices

1. **Use member initializer lists** for efficiency and correctness
2. **Make single-argument constructors explicit** to prevent implicit conversions
3. **Initialize all members** to avoid undefined behaviour
4. **Follow the Rule of Three/Five**: If you define a destructor, copy constructor, or copy assignment operator, define all three (or all five with move semantics)
5. **Use delegating constructors** to avoid code duplication

## Example: Complete Class

```cpp
class BankAccount {
private:
    string accountNumber;
    string owner;
    double balance;

public:
    // Default constructor
    BankAccount() : accountNumber(""), owner(""), balance(0.0) {}

    // Parameterized constructor with member initializer list
    BankAccount(string accNum, string own, double bal)
        : accountNumber(accNum), owner(own), balance(bal) {
        cout << "Account created for " << owner << "\n";
    }

    // Constructor with default parameter
    BankAccount(string accNum, string own)
        : BankAccount(accNum, own, 0.0) {}  // Delegating

    // Copy constructor
    BankAccount(const BankAccount& other)
        : accountNumber(other.accountNumber),
          owner(other.owner),
          balance(other.balance) {}
};
```

---

## References

- Stroustrup, B. (2013). _The C++ Programming Language_ (4th ed.). Addison-Wesley.
- Meyers, S. (2014). _Effective Modern C++_. O'Reilly Media.
- [Constructors - cppreference.com](https://en.cppreference.com/w/cpp/language/constructor)
