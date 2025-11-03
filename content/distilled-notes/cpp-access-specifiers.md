---
{"publish":true,"title":"Access Specifiers in C++","created":"2025-08-04 13:38","modified":"2025-11-03T20:35:46.664+01:00","tags":["computer-science/programming/cpp/access-specifiers"],"cssclasses":"center-images"}
---


# ACCESS SPECIFIERS IN C++

---

Access specifiers in C++ control the visibility and accessibility of [[distilled-notes/cpp-classes\|class]] members (attributes and [[distilled-notes/cpp-methods\|methods]]). They are fundamental to encapsulation, one of the core principles of object-oriented programming.

## The Three Access Specifiers

### Public

**Public** members are accessible from anywhere:

- Inside the class
- Outside the class (through objects)
- In derived classes

```cpp
class Example {
public:
    int publicVar;
    void publicMethod() {
        // Accessible everywhere
    }
};

Example obj;
obj.publicVar = 10;  // OK: accessible from outside
obj.publicMethod();  // OK: accessible from outside
```

**Use case**: Interface methods and attributes meant to be accessed by users of the class.

### Private

**Private** members are only accessible within the class itself:

- Inside the class
- NOT outside the class
- NOT in derived classes (unless using friend classes)

```cpp
class Example {
private:
    int privateVar;
    void privateMethod() {
        // Only accessible within this class
    }
public:
    void setPrivateVar(int val) {
        privateVar = val;  // OK: inside the class
    }
};

Example obj;
// obj.privateVar = 10;  // ERROR: not accessible
// obj.privateMethod();  // ERROR: not accessible
obj.setPrivateVar(10);   // OK: using public method
```

**Use case**: Internal implementation details, helper methods, and data that should be hidden from users.

### Protected

**Protected** members are accessible:

- Inside the class
- NOT outside the class
- In derived classes (through [[distilled-notes/cpp-inheritance\|inheritance]])

```cpp
class Base {
protected:
    int protectedVar;
    void protectedMethod() {
        // Accessible in this class and derived classes
    }
};

class Derived : public Base {
public:
    void accessBase() {
        protectedVar = 10;    // OK: accessible in derived class
        protectedMethod();    // OK: accessible in derived class
    }
};

Derived obj;
// obj.protectedVar = 10;  // ERROR: not accessible from outside
obj.accessBase();          // OK: using public method
```

**Use case**: Members that should be accessible to derived classes but hidden from external users.

## Access Specifier Summary

| Specifier   | Same Class | Derived Class | Outside Class |
| ----------- | ---------- | ------------- | ------------- |
| `public`    | ✓          | ✓             | ✓             |
| `protected` | ✓          | ✓             | ✗             |
| `private`   | ✓          | ✗             | ✗             |

## Default Access Levels

- **Class**: Members are `private` by default
- **Struct**: Members are `public` by default

```cpp
class MyClass {
    int x;  // private by default
};

struct MyStruct {
    int x;  // public by default
};
```

## Best Practices

1. **Encapsulation**: Keep data members `private` and provide `public` accessor methods (getters/setters)
2. **Minimal interface**: Make only necessary methods `public`
3. **Protected for inheritance**: Use `protected` for members that derived classes need access to
4. **Friend functions**: Use sparingly when external functions need private access

## Example: Complete Class

```cpp
class BankAccount {
private:
    double balance;  // Hidden from outside

    void logTransaction() {  // Internal helper
        // Implementation
    }

protected:
    double calculateInterest() {  // For derived classes
        return balance * 0.05;
    }

public:
    BankAccount(double initial) : balance(initial) {}

    void deposit(double amount) {
        balance += amount;
        logTransaction();
    }

    double getBalance() const {
        return balance;
    }
};
```

---

## References

- Stroustrup, B. (2013). _The C++ Programming Language_ (4th ed.). Addison-Wesley.
- Meyers, S. (2014). _Effective Modern C++_. O'Reilly Media.
- [Access specifiers - cppreference.com](https://en.cppreference.com/w/cpp/language/access)
