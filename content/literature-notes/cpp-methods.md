---
{"publish":true,"title":"Methods","created":"2025-08-04 13:30","modified":"2025-08-04T13:45:39.622+02:00","tags":["#resource","#cpp"],"cssclasses":"center-images"}
---


# METHODS
---

>[!abstract]
>A method is a function specifically created for a class. It can be created either inside the class declaration or outside of it.


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


---
## Child Files

| File                                                     | Created          |
| -------------------------------------------------------- | ---------------- |
| [[literature-notes/cpp-inheritance\|cpp-inheritance]] | 2025-08-04 13:43 |



## Parent Files

| File                                             | Created          |
| ------------------------------------------------ | ---------------- |
| [[literature-notes/cpp-classes\|cpp-classes]] | 2025-08-04 12:56 |

