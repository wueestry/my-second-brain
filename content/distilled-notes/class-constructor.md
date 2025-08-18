---
{"publish":true,"title":"Class Constructor","created":"2025-08-04 13:27","modified":"2025-08-18T12:58:14.164+02:00","tags":["#resource"],"cssclasses":"center-images"}
---


# CLASS CONSTRUCTOR

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
