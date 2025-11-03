---
{"publish":true,"title":"Polymorphism in C++","created":"2025-08-04 15:56","modified":"2025-11-03T20:38:13.084+01:00","tags":["computer-science/programming/cpp/polymorphism"],"cssclasses":"center-images"}
---


# POLYMORPHISM IN C++

---

Polymorphism means "many forms", and occurs when many classes are related to each other by inheritance. It allows objects of different classes to be treated as objects of a common base class.

While [[distilled-notes/cpp-inheritance\|Inheritance]] allows to inherit attributes and methods of another class, **Polymorphism** allows those methods to perform different tasks for each subclass.

## Types of Polymorphism

### Compile-Time Polymorphism (Static)

Achieved through function overloading and operator overloading. The function to call is determined at compile time.

```cpp
class Calculator {
	public:
		int add(int a, int b) { return a + b; }
		double add(double a, double b) { return a + b; }
};
```

### Runtime Polymorphism (Dynamic)

Achieved through [[distilled-notes/cpp-virtual-functions\|virtual functions]] and inheritance. The function to call is determined at runtime based on the actual object type.

```cpp
class Animal {
	public:
		virtual void makeSound() {
			cout << "Some generic animal sound\n";
		}
};

class Dog : public Animal {
	public:
		void makeSound() override {
			cout << "Woof!\n";
		}
};

class Cat : public Animal {
	public:
		void makeSound() override {
			cout << "Meow!\n";
		}
};

// Polymorphism in action
Animal* animal1 = new Dog();
Animal* animal2 = new Cat();

animal1->makeSound(); // Output: Woof!
animal2->makeSound(); // Output: Meow!
```

## Benefits

- **Code reusability**: Write generic code that works with base class pointers/references
- **Flexibility**: Add new derived classes without modifying existing code
- **Maintainability**: Changes to base class behaviour automatically propagate to derived classes

---

## References

- [Polymorphism - cppreference.com](https://en.cppreference.com/w/cpp/language/virtual)
- [C++ Polymorphism - W3Schools](https://www.w3schools.com/cpp/cpp_polymorphism.asp)
- [Polymorphism - LearnCpp.com](https://www.learncpp.com/cpp-tutorial/introduction-to-virtual-functions/)
- Stroustrup, B. (2013). _The C++ Programming Language_ (4th ed.). Addison-Wesley. Chapter 20: Derived Classes
- [Virtual Functions and Polymorphism - GeeksforGeeks](https://www.geeksforgeeks.org/virtual-function-cpp/)
- Deitel, P., & Deitel, H. (2016). _C++ How to Program_ (10th ed.). Pearson. Chapter 12: Object-Oriented Programming: Polymorphism
