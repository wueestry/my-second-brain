---
{"publish":true,"title":"Classes in C++","created":"2025-08-04 12:56","modified":"2025-11-03T20:36:15.777+01:00","tags":["computer-science/programming/cpp/classes"],"cssclasses":"center-images"}
---


# CLASSES IN C++

---

A **class** is a user-defined type in C++ that encapsulates data (attributes/member variables) and [[distilled-notes/cpp-methods\|methods]] (member functions) into a single unit. Classes are the foundation of object-oriented programming in C++, enabling encapsulation, inheritance, and polymorphism.

## Basic Class Structure

```cpp
class ClassName {
private:
    // Private member variables (attributes)
    int privateData;

protected:
    // Protected members (accessible to derived classes)
    int protectedData;

public:
    // Public interface
    ClassName();  // Constructor
    void publicMethod();
    int getPrivateData() const;
    ~ClassName();  // Destructor
};
```

## Key Components

### Member Variables (Attributes)

Data stored in each object:

```cpp
class Person {
private:
    string name;
    int age;
    double height;
};
```

### Member Functions (Methods)

Functions that operate on the class data:

```cpp
class Rectangle {
private:
    double width, height;

public:
    double area() const {
        return width * height;
    }

    void setDimensions(double w, double h) {
        width = w;
        height = h;
    }
};
```

### [[distilled-notes/cpp-access-specifiers\|Access Specifiers]]

Control visibility of members:

- `public`: Accessible from anywhere
- `private`: Only accessible within the class
- `protected`: Accessible within the class and derived classes

### [[distilled-notes/cpp-class-constructor\|Constructors]]

Special functions that initialize objects:

```cpp
class Student {
private:
    string name;
    int id;

public:
    // Default constructor
    Student() : name(""), id(0) {}

    // Parameterized constructor
    Student(string n, int i) : name(n), id(i) {}
};
```

### Destructors

Special function called when an object is destroyed:

```cpp
class FileHandler {
private:
    FILE* file;

public:
    FileHandler(const char* filename) {
        file = fopen(filename, "r");
    }

    ~FileHandler() {
        if (file) fclose(file);  // Cleanup
    }
};
```

## Creating and Using Objects

```cpp
class Car {
private:
    string brand;
    int year;

public:
    Car(string b, int y) : brand(b), year(y) {}

    void display() const {
        cout << brand << " (" << year << ")\n";
    }
};

// Creating objects
Car car1("Toyota", 2020);       // On stack
Car* car2 = new Car("Honda", 2022);  // On heap

// Using objects
car1.display();
car2->display();

// Cleanup heap allocation
delete car2;
```

## Class vs Struct

In C++, `struct` and `class` are nearly identical:

- **Default access**: `struct` members are `public` by default, `class` members are `private`
- **Convention**: Use `struct` for simple data containers, `class` for complex types with behaviour

```cpp
struct Point {
    int x, y;  // Public by default
};

class Vector {
private:
    int x, y;  // Private by default
public:
    Vector(int x, int y) : x(x), y(y) {}
};
```

## Advanced Features

### [[distilled-notes/cpp-inheritance\|Inheritance]]

Classes can inherit from other classes:

```cpp
class Animal {
protected:
    string name;
public:
    Animal(string n) : name(n) {}
    virtual void speak() = 0;  // Pure virtual
};

class Dog : public Animal {
public:
    Dog(string n) : Animal(n) {}
    void speak() override {
        cout << name << " says Woof!\n";
    }
};
```

### [[distilled-notes/cpp-polymorphism\|Polymorphism]]

Using base class [[distilled-notes/cpp-pointer\|pointers]]/[[distilled-notes/cpp-references\|references]] to access derived class objects.

### Encapsulation

Hiding internal details and providing controlled access:

```cpp
class BankAccount {
private:
    double balance;  // Hidden from outside

public:
    // Controlled access through methods
    double getBalance() const { return balance; }

    void deposit(double amount) {
        if (amount > 0) balance += amount;
    }
};
```

## Best Practices

1. **Encapsulation**: Keep data members `private`, provide `public` methods for access
2. **Initialization**: Always initialize member variables in [[distilled-notes/cpp-class-constructor\|constructors]]
3. **Const correctness**: Mark read-only methods as `const`
4. **Resource management**: Use destructors to clean up resources (RAII principle)
5. **Single responsibility**: Each class should have one clear purpose
6. **Prefer composition over inheritance**: Use member objects rather than deep inheritance hierarchies

## Example: Complete Class

```cpp
class BankAccount {
private:
    string accountNumber;
    string owner;
    double balance;

    void logTransaction(const string& type, double amount) {
        // Internal helper method
        cout << type << ": $" << amount << "\n";
    }

public:
    // Constructor
    BankAccount(string accNum, string own, double initialBalance)
        : accountNumber(accNum), owner(own), balance(initialBalance) {}

    // Getter (const method)
    double getBalance() const {
        return balance;
    }

    string getOwner() const {
        return owner;
    }

    // Methods that modify state
    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            logTransaction("Deposit", amount);
        }
    }

    bool withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            logTransaction("Withdrawal", amount);
            return true;
        }
        return false;
    }

    // Destructor
    ~BankAccount() {
        cout << "Account " << accountNumber << " closed\n";
    }
};
```

---

## References

- Stroustrup, B. (2013). _The C++ Programming Language_ (4th ed.). Addison-Wesley.
- Meyers, S. (2014). _Effective Modern C++_. O'Reilly Media.
- [Classes - cppreference.com](https://en.cppreference.com/w/cpp/language/classes)
