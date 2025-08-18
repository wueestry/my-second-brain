---
{"publish":true,"title":"Methods","created":"2025-08-04 13:30","modified":"2025-08-18T12:58:14.257+02:00","tags":["#resource"],"cssclasses":"center-images"}
---


# METHODS

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
