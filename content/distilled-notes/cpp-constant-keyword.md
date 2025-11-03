---
{"publish":true,"title":"Constant Keyword in C++","created":"2025-08-05 10:19","modified":"2025-11-03T20:36:33.241+01:00","tags":["computer-science/programming/cpp/constant-keyword"],"cssclasses":"center-images"}
---


# `const` KEYWORD IN C++

---

The `const` keyword is a type qualifier in C++ that specifies that a variable's value cannot be modified after initialization. It is fundamental to const-correctness, a practice that helps prevent bugs and communicates programmer intent.

## Basic Usage

### Const Variables

```cpp
const int MAX_SIZE = 100;
const double PI = 3.14159;

// MAX_SIZE = 200;  // ERROR: cannot modify const variable
```

**Rules**:

- Must be initialized at declaration
- Cannot be modified after initialization
- Attempts to modify result in compilation errors

### Const with Pointers

The placement of `const` matters significantly with [[distilled-notes/cpp-pointer\|pointers]]:

#### Pointer to Const Data

```cpp
const int* ptr;        // Pointer to const int
int const* ptr;        // Same as above

int value = 10;
ptr = &value;
// *ptr = 20;         // ERROR: cannot modify data through pointer
ptr = &otherValue;    // OK: can change what pointer points to
```

#### Const Pointer

```cpp
int* const ptr = &value;  // Const pointer to int

*ptr = 20;               // OK: can modify data
// ptr = &otherValue;    // ERROR: cannot change what pointer points to
```

#### Const Pointer to Const Data

```cpp
const int* const ptr = &value;  // Const pointer to const int

// *ptr = 20;          // ERROR: cannot modify data
// ptr = &otherValue;  // ERROR: cannot change pointer
```

**Mnemonic**: Read right-to-left: `const int* const ptr` = "ptr is a const pointer to a const int"

## Const with Functions

### Const Parameters

Prevents accidental modification of arguments:

```cpp
void printValue(const int value) {
    // value = 10;  // ERROR: cannot modify
    cout << value;
}

void processArray(const int* arr, int size) {
    // arr[0] = 5;  // ERROR: cannot modify array elements
    cout << arr[0];
}
```

### Const Return Values

```cpp
const string getName() {
    return "John";
}

// Prevents: getName() = "Jane";
```

### Const Member Functions

Methods that don't modify the object's state:

```cpp
class Rectangle {
private:
    int width, height;

public:
    Rectangle(int w, int h) : width(w), height(h) {}

    // Const member function (doesn't modify object)
    int getArea() const {
        return width * height;
    }

    // Non-const member function
    void setWidth(int w) {
        width = w;
    }
};

const Rectangle rect(10, 20);
cout << rect.getArea();  // OK: const method on const object
// rect.setWidth(15);    // ERROR: cannot call non-const method on const object
```

**Key point**: Const member functions can only call other const member functions.

## Const with References

### Const References

Efficient parameter passing without copying or allowing modification:

```cpp
void printVector(const vector<int>& vec) {
    // vec.push_back(5);  // ERROR: cannot modify
    for (int val : vec) {
        cout << val << " ";
    }
}

vector<int> data = {1, 2, 3, 4, 5};
printVector(data);  // No copy made, efficient and safe
```

**Common use case**: Passing large objects to functions without overhead.

## Const with Classes

### Const Member Variables

```cpp
class Config {
private:
    const int maxConnections;  // Must be initialized in constructor

public:
    Config(int max) : maxConnections(max) {}  // Initialize in member initializer list

    int getMax() const { return maxConnections; }
};
```

### Const Objects

```cpp
const Config config(100);
cout << config.getMax();  // OK: calling const method
// config.setMax(200);    // ERROR if setMax is not const
```

## constexpr (C++11)

For compile-time constants:

```cpp
constexpr int square(int x) {
    return x * x;
}

constexpr int result = square(5);  // Evaluated at compile time

// Can be used in contexts requiring compile-time constants
int arr[square(3)];  // Array size must be compile-time constant
```

**Difference**: `const` means "won't change at runtime", `constexpr` means "evaluable at compile time".

## Benefits of Const-Correctness

1. **Prevent bugs**: Compiler catches accidental modifications
2. **Document intent**: Clearly shows what can and cannot be modified
3. **Enable optimizations**: Compiler can optimize knowing values won't change
4. **Interface clarity**: Function signatures communicate immutability guarantees
5. **Const-propagation**: Const objects can only call const methods, encouraging good design

## Best Practices

1. **Use const by default**: Make variables const unless they need to change
2. **Const references for parameters**: Pass large objects by const reference
3. **Const member functions**: Mark all read-only methods as const
4. **Const correctness throughout**: Maintain const-correctness across entire codebase
5. **Use constexpr for compile-time values**: When values are known at compile time

## Example: Complete Usage

```cpp
class BankAccount {
private:
    const string accountNumber;  // Cannot change after construction
    double balance;

public:
    BankAccount(const string& accNum, double initialBalance)
        : accountNumber(accNum), balance(initialBalance) {}

    // Const getter
    double getBalance() const {
        return balance;
    }

    // Const getter for const member
    const string& getAccountNumber() const {
        return accountNumber;
    }

    // Non-const mutator
    void deposit(double amount) {
        balance += amount;
    }

    // Const reference parameter
    bool transfer(const BankAccount& target, double amount) {
        if (balance >= amount) {
            balance -= amount;
            // target.balance += amount;  // ERROR: target is const
            return true;
        }
        return false;
    }
};
```

---

## References

- Stroustrup, B. (2013). _The C++ Programming Language_ (4th ed.). Addison-Wesley.
- Meyers, S. (2014). _Effective Modern C++_. O'Reilly Media.
- [const type qualifier - cppreference.com](https://en.cppreference.com/w/cpp/language/cv)
- Sutter, H., & Alexandrescu, A. (2004). _C++ Coding Standards_. Addison-Wesley.
