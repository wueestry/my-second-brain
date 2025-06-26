---
{"publish":true,"title":"Functions","created":"2025-06-04 08:52","tags":["#coding","#computer-science","#cpp","#resource"],"cssclasses":""}
---


# Functions

> [!abstract]
> Block of code with runs only when it is called.


## Declaration and Definition
Return type, name of the function and parameters (if any).
Parameters are specified by first specifying their type and then their name.
```cpp
void myFunction(parameter1, parameter2, parameter3) { // declaration
  // the body of the function (definition)
}
```

Default parameters values can be set by using `type name = default_value`

### Return Values
A `void` keyword indicates that the function should not return a value. If a return value is set it should also be used as the keyword before the function name.

## Function Overloading
Allows multiple functions to have the same name, as long as their parameters are different in type or number.

```cpp
int myFunction(int x)  
float myFunction(float x)  
double myFunction(double x, double y)
```

## Lambda Functions
A lambda function is a small, anonymous function you can write directly in your code. It's useful when you need a quick function without naming it or declaring it separately.

### Syntax
```cpp
[capture] (parameters) { code };
```

```cpp
#include <iostream>  
using namespace std;  
  
int main() {  
  for (int i = 1; i <= 3; i++) {  
    auto show = [i]() {  
      cout << "Number: " << i << "\n";  
    };  
    show();  
  }  
  return 0;  
}
```

### Capture Clause
You can use the `[` `]` brackets to give a lambda access to variables outside of it.
In the example above this would be `i`.