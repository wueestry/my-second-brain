---
{"publish":true,"title":"Polymorphism in C++","created":"2025-08-04 15:56","modified":"2025-09-22T10:31:21.426+02:00","tags":["#coding","#polymorphism","#cpp-classes","#object-oriented-programming","#inheritance"],"cssclasses":"center-images"}
---


# POLYMORPHISM IN C++

---

Polymorphism means "many forms", and occurs when many classes are related to each other by inheritance.

While [[distilled-notes/cpp-inheritance\|Inheritance]] allows to inherit attributes and methods of another class, **Polymorphism** allows those methods to perform different tasks for each subclass.

```cpp
class Foo {
	public:
		void foo() {
			// Do thing A
		}
};

class FooFoo1 : public Foo {
	public:
		void foo() {
			// Do thing B
		}
};

class FooFoo2 : public Foo {
	public:
		void foo() {
			// Do thing C
		}
};
```

---

## References
