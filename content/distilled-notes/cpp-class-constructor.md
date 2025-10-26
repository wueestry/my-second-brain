---
{"publish":true,"title":"Class Constructor in C++","created":"2025-08-04 13:27","modified":"2025-10-01T21:17:17.308+02:00","tags":["#cpp","#programming","#class","#object-oriented-programming","#initialization","#c"],"cssclasses":"center-images"}
---


# CLASS CONSTRUCTOR IN C++

---

A **constructor** is a special method of a specific class, that is automatically called when an object of the class is instantiated.

```cpp
class Foo {
	public:
		// Attributes
		Foo(string x) {
			// Parameters used in Initialisation.
			foo = x;
		}
}
```

The function `Foo` can now be instantiated with a string argument

```cpp
string foo = "foo";
cls = Foo(x=foo);
```

---

## References
