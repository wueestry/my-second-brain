---
{"publish":true,"title":"Classes","created":"2025-06-04 10:51","tags":["#coding","#computer-science","#cpp","#resource"],"cssclasses":""}
---


# Classes

> [!abstract]
> A class is a user-defined data type that can be used in the program.

A class consists of a declaration and contains objects and methods.
```cpp
class MyClass {       // The class  
  public:             // Access specifier  
    int myNum;        // Attribute (int variable)  
    string myString;  // Attribute (string variable)  
};  
  
int main() {  
  MyClass myObj;  // Create an object of MyClass  
  
  // Access attributes and set values  
  myObj.myNum = 15;   
  myObj.myString = "Some text";  
  
  // Print attribute values  
  cout << myObj.myNum << "\n";  
  cout << myObj.myString;  
  return 0;  
}
```

## Methods
A function created specifically for a class is called a method. It can be created either inside the class declaration.
```cpp
class MyClass {        // The class  
  public:              // Access specifier  
    void myMethod() {  // Method/function defined inside the class  
      cout << "Hello World!";  
    }  
};
```
or outside of it
```cpp
class MyClass {        // The class  
  public:              // Access specifier  
    void myMethod();   // Method/function declaration  
};  
  
// Method/function definition outside the class  
void MyClass::myMethod() {  
  cout << "Hello World!";  
}
```

## Constructor
A constructor is a special method that is automatically called when an object of the class is created.
```cpp
class Car {        // The class  
  public:          // Access specifier  
    string brand;  // Attribute  
    string model;  // Attribute  
    int year;      // Attribute  
    Car(string x, string y, int z) { // Constructor with parameters  
      brand = x;  
      model = y;  
      year = z;  
    }  
};

int main() {  
  // Create Car objects and call the constructor with different values  
  Car carObj("BMW", "X5", 1999);
}
```

## Access Specifiers
Access Specifiers control how members of a class can be accessed.
- **public:** members are accessible from outside the class
- **private:** members cannot be accessed form outside the class
- **protected:** members cannot be accessed from outside the class, but in inherited classes they can be

## Inheritance
Allows one class to reuse attributes and methods from another class.
- **derived** class (child): the class that inherits from another class
- **base** class (parent): the class being inherited from
```cpp
// Base class  
class Vehicle {  
  public:  
    string brand = "Ford";  
    void honk() {  
      cout << "Tuut, tuut! \n" ;  
    }  
};  
  
// Derived class  
class Car: public Vehicle {  
  public:  
    string model = "Mustang";  
};
```

### Multilevel Inheritance
A class can also be derived from one class, which is already derived from another class.

### Multiple Inheritance
A class can also be derived from more than one base class, using a **comma-separated list:**

### Polymorphism
As inheritance lets us inherit attributes and methods, with polymorphism those methods can perform different tasks for different sub classes. This can be done, by redefining the method for each class.

#### Virtual Functions
A **virtual function** is a member function in the base class that can be **overridden** in derived classes.

##### Without Virtual
```cpp
class Animal {  
  public:  
    void sound() {  
      cout << "Animal sound\n";  
    }  
};  
  
class Dog : public Animal {  
  public:  
    void sound() {  
      cout << "Dog barks\n";  
    }  
};  
  
int main() {  
  Animal* a;  // Declare a pointer to the base class (Animal)  
  Dog d;  // Create an object of the derived class (Dog)  
  a = &d;  // Point the base class pointer to the Dog object  
  a->sound(); // Call the sound() function using the pointer. Since sound() is not virtual, this calls Animal's version  
  return 0;  
}
```

##### With Virtual
```cpp
class Animal {  
  public:  
    **virtual** void sound() {  
      cout << "Animal sound\n";  
    }  
};  
  
class Dog : public Animal {  
  public:  
    void sound() override {  
      cout << "Dog barks\n";  
    }  
};  
  
int main() {  
  Animal* a;  
  Dog d;  
  a = &d;  
  a->sound(); // Outputs: Dog barks  
  return 0;  
}
```

### The `->` Operator
The `->` operator is used to access members (like functions or variables) through a pointer.

```cpp
Animal* a = new Animal();  
a->sound(); // Same as (*a).sound();
```

## Templates
[[resources/coding/cpp/template\|Templates]] let you:
- Avoid repeating the same logic for different types
- Write cleaner, reusable code
- Support generic programming