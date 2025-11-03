---
{"publish":true,"title":"Static Keyword in C++","created":"2024-11-20 09:45","modified":"2025-11-03T20:38:42.477+01:00","tags":["computer-science/programming/cpp/static-keyword"],"cssclasses":"center-images"}
---


# STATIC KEYWORD IN C++

---

The `static` keyword modifies the lifetime and visibility of variables and functions in C++. It has different meanings depending on the context.

The static keyword can be used with:

1. **Static Variables**: Variables in functions and classes
2. **Static Members of Class**: Class objects and functions

Let us now look at each use case in detail.

## Static Variables

### Static Variables in a Function

When a variable is declared as static inside a function, it is allocated space for the lifetime of the program. Even if the function is called multiple times, the static variable is initialised only once and retains its value between function calls.

```cpp
void counter() {
    static int count = 0;  // Initialised only once
    count++;
    cout << "Count: " << count << "\n";
}

int main() {
    counter();  // Output: Count: 1
    counter();  // Output: Count: 2
    counter();  // Output: Count: 3
}
```

This is useful when the previous state of a function needs to be preserved between calls.

### Static Variables in a Class

Static variables in a class are shared by all objects of that class. They are allocated space in separate static storage and initialised only once. There cannot be multiple copies of the same static variable for different objects, and they cannot be initialised using constructors.

```cpp
class Employee {
    public:
        static int count;  // Declaration

        Employee() {
            count++;
        }
};

// Definition outside class (required for static members)
int Employee::count = 0;

int main() {
    Employee e1, e2, e3;
    cout << "Total employees: " << Employee::count;  // Output: 3
}
```

## Static Members of a Class

### Class Objects as Static

Just like variables, objects declared as static have a scope that lasts for the lifetime of the program.

```cpp
class MyClass {
    public:
        MyClass() { cout << "Constructor called\n"; }
        ~MyClass() { cout << "Destructor called\n"; }
};

void function() {
    static MyClass obj;  // Created only once
}

int main() {
    function();
    function();  // Constructor not called again
    // Destructor called when program ends
}
```

### Static Functions in a Class

Static member functions do not depend on any object of the class. They can only access static data members and other static member functions. It is recommended to invoke them using the class name and scope resolution operator `::`.

```cpp
class Calculator {
    public:
        static int add(int a, int b) {
            return a + b;
        }

        static int multiply(int a, int b) {
            return a * b;
        }
};

int main() {
    // Call without creating an object
    cout << Calculator::add(5, 3);       // Output: 8
    cout << Calculator::multiply(4, 2);  // Output: 8
}
```

**Key Restrictions:**

- Cannot access non-static data members
- Cannot access non-static member functions
- Cannot use `this` pointer

---

## References

- [Static keyword - cppreference.com](https://en.cppreference.com/w/cpp/keyword/static)
- [Static Members - cppreference.com](https://en.cppreference.com/w/cpp/language/static)
- [Static Keyword in C++ - GeeksforGeeks](https://www.geeksforgeeks.org/static-keyword-cpp/)
