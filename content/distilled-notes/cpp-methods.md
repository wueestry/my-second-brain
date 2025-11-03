---
{"publish":true,"title":"Methods in C++","created":"2025-08-04 13:30","modified":"2025-11-03T20:37:47.475+01:00","tags":["computer-science/programming/cpp/methods"],"cssclasses":"center-images"}
---


# METHODS IN C++

---

**Methods** (also called member functions) are [[distilled-notes/cpp-functions\|functions]] that belong to a [[distilled-notes/cpp-classes\|class]]. They define the behaviour of objects and can access the class's data members.

## Defining Methods

### Inside Class Definition

Methods defined inside the class declaration are implicitly `inline`.

```cpp
class Rectangle {
public:
    void setDimensions(int w, int h) {
        width = w;
        height = h;
    }

    int getArea() {
        return width * height;
    }

private:
    int width;
    int height;
};
```

### Outside Class Definition

For better code organisation, methods can be declared inside the class and defined outside using the scope resolution operator `::`.

```cpp
class Rectangle {
public:
    void setDimensions(int w, int h);
    int getArea();

private:
    int width;
    int height;
};

// Method definitions
void Rectangle::setDimensions(int w, int h) {
    width = w;
    height = h;
}

int Rectangle::getArea() {
    return width * height;
}
```

**Best Practice**: Declare methods in header files (`.h`) and define them in source files (`.cpp`).

---

## Types of Methods

### Accessor Methods (Getters)

Methods that return the value of private data members.

```cpp
class Person {
public:
    std::string getName() const {
        return name;
    }

    int getAge() const {
        return age;
    }

private:
    std::string name;
    int age;
};
```

### Mutator Methods (Setters)

Methods that modify private data members.

```cpp
class Person {
public:
    void setName(const std::string& n) {
        name = n;
    }

    void setAge(int a) {
        if (a >= 0) {  // Validation
            age = a;
        }
    }

private:
    std::string name;
    int age;
};
```

### Utility Methods

Methods that perform operations or calculations.

```cpp
class Calculator {
public:
    int add(int a, int b) {
        return a + b;
    }

    double calculateAverage(const std::vector<int>& numbers) {
        if (numbers.empty()) return 0.0;
        int sum = 0;
        for (int num : numbers) {
            sum += num;
        }
        return static_cast<double>(sum) / numbers.size();
    }
};
```

---

## Const Methods

Methods that do not modify the object's state should be declared `const`. This allows them to be called on const objects.

```cpp
class Circle {
public:
    Circle(double r) : radius(r) {}

    double getArea() const {  // Const method
        return 3.14159 * radius * radius;
    }

    void setRadius(double r) {  // Non-const method
        radius = r;
    }

private:
    double radius;
};

// Usage
const Circle c(5.0);
double area = c.getArea();    // OK: getArea() is const
// c.setRadius(10.0);         // Error: cannot call non-const method on const object
```

**Best Practice**: Mark methods as `const` whenever they don't modify object state.

---

## Static Methods

Static methods belong to the class rather than any specific object. They can only access static members.

```cpp
class MathUtils {
public:
    static int add(int a, int b) {
        return a + b;
    }

    static double pi() {
        return 3.14159;
    }
};

// Usage (no object required)
int result = MathUtils::add(5, 3);
double piValue = MathUtils::pi();
```

---

## Method Overloading

Multiple methods can have the same name with different parameter lists.

```cpp
class Printer {
public:
    void print(int value) {
        std::cout << "Integer: " << value << std::endl;
    }

    void print(double value) {
        std::cout << "Double: " << value << std::endl;
    }

    void print(const std::string& value) {
        std::cout << "String: " << value << std::endl;
    }
};

// Usage
Printer p;
p.print(42);           // Calls print(int)
p.print(3.14);         // Calls print(double)
p.print("Hello");      // Calls print(string)
```

---

## Virtual Methods

Virtual methods enable [[distilled-notes/cpp-polymorphism\|polymorphism]], allowing derived classes to override base class behaviour.

```cpp
class Shape {
public:
    virtual double area() const {
        return 0.0;
    }

    virtual ~Shape() {}  // Virtual destructor
};

class Circle : public Shape {
public:
    Circle(double r) : radius(r) {}

    double area() const override {
        return 3.14159 * radius * radius;
    }

private:
    double radius;
};

class Rectangle : public Shape {
public:
    Rectangle(double w, double h) : width(w), height(h) {}

    double area() const override {
        return width * height;
    }

private:
    double width;
    double height;
};
```

---

## Pure Virtual Methods (Abstract Methods)

Pure virtual methods have no implementation in the base class and must be overridden by derived classes.

```cpp
class Animal {
public:
    virtual void makeSound() const = 0;  // Pure virtual
    virtual ~Animal() {}
};

class Dog : public Animal {
public:
    void makeSound() const override {
        std::cout << "Woof!" << std::endl;
    }
};

class Cat : public Animal {
public:
    void makeSound() const override {
        std::cout << "Meow!" << std::endl;
    }
};
```

Classes with pure virtual methods are abstract and cannot be instantiated.

---

## The `this` Pointer

Inside a method, `this` is a pointer to the current object.

```cpp
class Counter {
public:
    Counter(int value) : count(value) {}

    Counter& increment() {
        count++;
        return *this;  // Return reference to current object
    }

    void display() const {
        std::cout << "Count: " << count << std::endl;
    }

private:
    int count;
};

// Method chaining
Counter c(0);
c.increment().increment().increment().display();  // Outputs: Count: 3
```

---

## Inline Methods

Methods defined inside the class declaration are implicitly inline. You can also explicitly declare methods as inline.

```cpp
class Point {
public:
    // Implicitly inline
    int getX() const { return x; }

    // Explicitly inline
    inline int getY() const;

private:
    int x, y;
};

inline int Point::getY() const {
    return y;
}
```

**Note**: The `inline` keyword is a suggestion to the compiler, not a directive.

---

## Deleted and Defaulted Methods

### Deleted Methods (C++11)

Prevent specific methods from being used.

```cpp
class NonCopyable {
public:
    NonCopyable() = default;
    NonCopyable(const NonCopyable&) = delete;             // Delete copy constructor
    NonCopyable& operator=(const NonCopyable&) = delete;  // Delete copy assignment
};
```

### Defaulted Methods (C++11)

Explicitly request compiler-generated implementation.

```cpp
class MyClass {
public:
    MyClass() = default;                              // Default constructor
    MyClass(const MyClass&) = default;                // Default copy constructor
    MyClass& operator=(const MyClass&) = default;     // Default copy assignment
    ~MyClass() = default;                             // Default destructor
};
```

---

## Best Practices

| Guideline                                | Rationale                                         |
| ---------------------------------------- | ------------------------------------------------- |
| Mark non-modifying methods as `const`    | Enables use with const objects, documents intent  |
| Keep methods short and focused           | Single Responsibility Principle                   |
| Use meaningful method names              | Self-documenting code                             |
| Prefer getters/setters over public data  | Encapsulation, validation, future flexibility     |
| Declare in header, define in source      | Separation of interface and implementation        |
| Use `override` keyword                   | Catches errors at compile time                    |
| Make destructors virtual in base classes | Ensures proper cleanup in polymorphic hierarchies |
| Consider method chaining                 | Fluent interface pattern                          |

---

## References

- Stroustrup, B. (2013). _The C++ Programming Language_ (4th ed.). Addison-Wesley.
- [Member functions - cppreference.com](https://en.cppreference.com/w/cpp/language/member_functions)
- Meyers, S. (2005). _Effective C++_ (3rd ed.). Addison-Wesley.
