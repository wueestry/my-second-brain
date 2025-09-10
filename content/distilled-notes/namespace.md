---
{"publish":true,"title":"Namespace","created":"2025-01-28 16:03","modified":"2025-08-18T12:58:14.265+02:00","tags":["#resource"],"cssclasses":"center-images"}
---


# NAMESPACE

---

Namespaces in C++ serve as organizational containers for code elements such as classes, functions, and variables. They help prevent naming conflicts and make large projects more manageable by grouping related code components.

## Defining a Namespace

A namespace definition begins with the keyword namespace followed by the namespace name as follows:

```cpp
namespace  namespace_name
{
    // code declarations i.e. variable  (int a;)
    method (void add();)
    classes ( class foo{};)
}
```

- **Attention:** There is no semicolon `;` after the closing brace.
- To call the namespace-enabled version of either function or variable, add the namespace name as follows:
  `namespace_name::code;`

## The _using_ directive

- In order to not have to add the namespace in the front of every variable and function, the using directive can be used to tell the compile to use the namespace for all the following code.

```cpp
#include <iostream>

int main() {
	std::cout << "Hello World!";
	return 0;
}
```

Is the same as

```cpp
#include <iostream>
using namespace std;

int main() {
	cout << "Hello World!";
	return 0;
}
```

---

## References
