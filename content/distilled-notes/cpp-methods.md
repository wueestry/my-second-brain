---
{"publish":true,"title":"Methods in C++","created":"2025-08-04 13:30","modified":"2025-09-19T07:20:48.010+02:00","tags":["#resource","#cpp","#class","#programming","#object-oriented-programming","#methods","#cpp-classes","#class-definition"],"cssclasses":"center-images"}
---


# METHODS IN C++

---

A method is a function specifically created for a class. It can be created either inside the class declaration or outside of it.

### Inside Class Declaration

```cpp
class Foo {
	public:
		void foo() {
			// Do stuff
		}
};
```

### Outside Class Declaration

```cpp
class Foo {
	public:
		void foo();
};

void Foo::foo(){
	// Do stuff
}
```

---

## References
