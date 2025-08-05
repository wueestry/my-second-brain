---
{"publish":true,"title":"Polymorphism","created":"2025-08-04 15:56","modified":"2025-08-04T19:45:39.002+02:00","tags":["#resource","cpp"],"cssclasses":"center-images"}
---


# POLYMORPHISM
---

>[!abstract]
>Polymorphism means "many forms", and occurs when many classes are related to each other by inheritance.

While [[literature-notes/cpp-inheritance\|Inheritance]] allows to inherit attributes and methods of another class, **Polymorphism** allows those methods to perform different tasks for each subclass.

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


---
## Child Files

| File | Created |
| ---- | ------- |



## Parent Files

| File | Created |
| ---- | ------- |

