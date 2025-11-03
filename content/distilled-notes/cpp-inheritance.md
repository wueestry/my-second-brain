---
{"publish":true,"title":"Inheritance in C++","created":"2025-08-04 13:43","modified":"2025-11-03T20:37:16.442+01:00","tags":["computer-science/programming/cpp/inheritance"],"cssclasses":"center-images"}
---


# INHERITANCE IN C++

---

**Inheritance** is a fundamental object-oriented programming mechanism that allows one [[distilled-notes/cpp-classes\|class]] (derived class) to acquire attributes and [[distilled-notes/cpp-methods\|methods]] from another class (base class), promoting code reuse and establishing hierarchical relationships.

## Basic Inheritance

### Syntax

```cpp
class Base {
public:
    int baseValue;
    void baseMethod() {
        std::cout << "Base method" << std::endl;
    }
};

class Derived : public Base {
public:
    int derivedValue;
    void derivedMethod() {
        std::cout << "Derived method" << std::endl;
    }
};
```

The derived class inherits all members from the base class and can add its own members.

---

## Access Specifiers in Inheritance

The access specifier (`public`, `protected`, `private`) determines how base class members are inherited.

| Inheritance Type | Base Public | Base Protected | Base Private |
| ---------------- | ----------- | -------------- | ------------ |
| `public`         | Public      | Protected      | Inaccessible |
| `protected`      | Protected   | Protected      | Inaccessible |
| `private`        | Private     | Private        | Inaccessible |

### Public Inheritance

Most common form. "Is-a" relationship.

```cpp
class Animal {
public:
    void eat() { std::cout << "Eating..." << std::endl; }
protected:
    int age;
private:
    std::string dnaSequence;
};

class Dog : public Animal {
public:
    void bark() {
        std::cout << "Barking..." << std::endl;
        // Can access age (protected)
        // Cannot access dnaSequence (private)
    }
};
```

### Protected Inheritance

Used when implementation details need to be inherited but not exposed publicly.

```cpp
class Implementation : protected Base {
    // All public members of Base become protected in Implementation
};
```

### Private Inheritance

Implements "is-implemented-in-terms-of" relationship.

```cpp
class Implementation : private Base {
    // All public members of Base become private in Implementation
};
```

---

## Types of Inheritance

### Single Inheritance

One derived class inherits from one base class.

```cpp
class Vehicle {
public:
    void start() { std::cout << "Starting..." << std::endl; }
};

class Car : public Vehicle {
public:
    void drive() { std::cout << "Driving..." << std::endl; }
};
```

### Multilevel Inheritance

A class is derived from another derived class, forming a chain.

```cpp
class Animal {
public:
    void breathe() { std::cout << "Breathing..." << std::endl; }
};

class Mammal : public Animal {
public:
    void feedMilk() { std::cout << "Feeding milk..." << std::endl; }
};

class Dog : public Mammal {
public:
    void bark() { std::cout << "Barking..." << std::endl; }
};
```

### Multiple Inheritance

A class inherits from multiple base classes.

```cpp
class Flyable {
public:
    void fly() { std::cout << "Flying..." << std::endl; }
};

class Swimmable {
public:
    void swim() { std::cout << "Swimming..." << std::endl; }
};

class Duck : public Flyable, public Swimmable {
public:
    void quack() { std::cout << "Quacking..." << std::endl; }
};
```

### Hierarchical Inheritance

Multiple derived classes inherit from a single base class.

```cpp
class Shape {
public:
    virtual double area() = 0;
};

class Circle : public Shape {
public:
    double area() override { return 3.14 * radius * radius; }
private:
    double radius = 1.0;
};

class Rectangle : public Shape {
public:
    double area() override { return width * height; }
private:
    double width = 1.0;
    double height = 1.0;
};
```

### Hybrid Inheritance

Combination of multiple inheritance types.

```cpp
class A { };
class B : public A { };
class C : public A { };
class D : public B, public C { };  // Diamond problem may occur
```

---

## Constructor and Destructor Behaviour

### Constructor Execution Order

1. Base class constructor
2. Derived class constructor

```cpp
class Base {
public:
    Base() { std::cout << "Base constructor" << std::endl; }
};

class Derived : public Base {
public:
    Derived() { std::cout << "Derived constructor" << std::endl; }
};

// Output when creating Derived object:
// Base constructor
// Derived constructor
```

### Destructor Execution Order

Opposite of constructors:

1. Derived class destructor
2. Base class destructor

### Calling Base Constructor

```cpp
class Base {
public:
    Base(int value) : baseValue(value) { }
private:
    int baseValue;
};

class Derived : public Base {
public:
    // Must call base constructor explicitly
    Derived(int base, int derived) : Base(base), derivedValue(derived) { }
private:
    int derivedValue;
};
```

---

## The Diamond Problem

Occurs in multiple inheritance when a class inherits from two classes that share a common base class.

```cpp
class Animal {
public:
    void eat() { std::cout << "Eating..." << std::endl; }
};

class Mammal : public Animal { };
class Bird : public Animal { };

class Bat : public Mammal, public Bird {
    // Ambiguous: which eat() method?
};
```

### Solution: Virtual Inheritance

```cpp
class Animal {
public:
    void eat() { std::cout << "Eating..." << std::endl; }
};

class Mammal : virtual public Animal { };
class Bird : virtual public Animal { };

class Bat : public Mammal, public Bird {
    // Now only one copy of Animal exists
};
```

---

## Method Overriding

Derived classes can override base class methods to provide specialised behaviour.

```cpp
class Base {
public:
    virtual void display() {
        std::cout << "Base display" << std::endl;
    }
};

class Derived : public Base {
public:
    void display() override {
        std::cout << "Derived display" << std::endl;
    }
};
```

Use `override` keyword (C++11) to ensure you're actually overriding a base method.

---

## Using Base Class Members

Access base class members explicitly using the scope resolution operator.

```cpp
class Base {
public:
    void show() { std::cout << "Base show" << std::endl; }
};

class Derived : public Base {
public:
    void show() {
        Base::show();  // Call base class version
        std::cout << "Derived show" << std::endl;
    }
};
```

---

## Best Practices

| Guideline                                         | Rationale                                         |
| ------------------------------------------------- | ------------------------------------------------- |
| Prefer composition over inheritance               | More flexible, reduces coupling                   |
| Use `public` inheritance for "is-a" relationships | Models logical relationships correctly            |
| Make destructors virtual in base classes          | Ensures proper cleanup in polymorphic hierarchies |
| Use `override` keyword                            | Catches errors at compile time                    |
| Avoid deep inheritance hierarchies                | Reduces complexity, improves maintainability      |
| Be cautious with multiple inheritance             | Can lead to diamond problem and complexity        |
| Use virtual inheritance when necessary            | Resolves diamond problem in multiple inheritance  |

---

## References

- Stroustrup, B. (2013). _The C++ Programming Language_ (4th ed.). Addison-Wesley.
- [Inheritance in C++ - cppreference.com](https://en.cppreference.com/w/cpp/language/derived_class)
- Meyers, S. (2005). _Effective C++_ (3rd ed.). Addison-Wesley.
