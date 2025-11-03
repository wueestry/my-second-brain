---
{"publish":true,"title":"Virtual Functions in C++","created":"2025-08-04 19:38","modified":"2025-11-03T20:39:34.209+01:00","tags":["computer-science/programming/cpp/virtual-functions"],"cssclasses":"center-images"}
---


# VIRTUAL FUNCTIONS IN C++

---

A virtual function is a member function in a base class that can be **overridden** in derived classes. Virtual functions enable **runtime polymorphism** through dynamic dispatch.

## Without _virtual_

The base function runs, even if the object is from a child class.

```cpp
class Animal {
public:
    void speak() { cout << "Some sound\n"; }
};

class Dog : public Animal {
public:
    void speak() { cout << "Woof!\n"; }
};

Animal* ptr = new Dog();
ptr->speak();  // Output: "Some sound" (base version called)
```

## With _virtual_

The child's version of the function runs when the object is from a child class.

```cpp
class Animal {
public:
    virtual void speak() { cout << "Some sound\n"; }
};

class Dog : public Animal {
public:
    void speak() override { cout << "Woof!\n"; }
};

Animal* ptr = new Dog();
ptr->speak();  // Output: "Woof!" (derived version called)
```

## Pure Virtual Functions

A pure virtual function has no implementation in the base class and **must** be overridden in derived classes. Classes with pure virtual functions are **abstract classes** and cannot be instantiated.

```cpp
class Shape {
public:
    virtual double area() = 0;  // Pure virtual function
    virtual ~Shape() {}
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}
    double area() override { return 3.14159 * radius * radius; }
};

// Shape s;  // Error: cannot instantiate abstract class
Circle c(5.0);  // OK
```

## Virtual Destructors

Always declare destructors as virtual in base classes to ensure proper cleanup of derived class objects.

```cpp
class Base {
public:
    virtual ~Base() { cout << "Base destructor\n"; }
};

class Derived : public Base {
    int* data;
public:
    Derived() { data = new int[100]; }
    ~Derived() {
        delete[] data;
        cout << "Derived destructor\n";
    }
};

Base* ptr = new Derived();
delete ptr;  // Calls both destructors (prevents memory leak)
```

## The `override` Specifier

The `override` keyword explicitly indicates that a function overrides a virtual function. It helps catch errors at compile-time.

```cpp
class Base {
public:
    virtual void foo(int x) {}
};

class Derived : public Base {
public:
    void foo(int x) override {}  // OK: clearly overriding
    void bar() override {}       // Error: no virtual function to override
};
```

## Use Cases

- **Polymorphic behaviour**: Different classes responding to the same interface
- **Plugin systems**: Loading and using derived classes at runtime
- **Strategy pattern**: Swapping algorithms dynamically
- **Framework design**: Allowing users to extend functionality

---

## References

- [Virtual Functions - cppreference.com](https://en.cppreference.com/w/cpp/language/virtual)
- [Pure Virtual Functions - GeeksforGeeks](https://www.geeksforgeeks.org/pure-virtual-functions-and-abstract-classes/)
- [Virtual Destructors - learncpp.com](https://www.learncpp.com/cpp-tutorial/virtual-destructors-virtual-assignment-and-overriding-virtualization/)
