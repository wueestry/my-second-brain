---
{"publish":true,"title":"Vectors","created":"2025-06-04 11:16","tags":["#coding","#computer-science","#cpp","#resource"],"cssclasses":""}
---


# Vectors

> [!abstract]
> A vector in C++ is like a resizeable [[resources/coding/cpp/array]]

## Create a Vector
To create a vector, use the *vector* keyword, and specify the type of values it should store within angle brackets `<>` and then the name of the vector, like: `vector<type> vectorName`.

```cpp
// Include the vector library  
#include <vector>

// Create a vector called cars that will store strings  
vector<string> cars = {"Volvo", "BMW", "Ford", "Mazda"};
```

## Access Elements
You can access a vector element by referring to the index number inside square brackets `[]` or by using the `.at()` function.
To access the first or the last element of a vector the `.front()` and `.back()` functions can be used.

## Add Vector Elements
To add an element to the vector, you can use the `.push_back()` function, which will add an element at the end of the vector
```cpp
vector<string> cars = {"Volvo", "BMW", "Ford", "Mazda"};  
cars.push_back("Tesla");
```

## Remove Vector Elements
To remove an element from the vector, you can use the `.pop_back()` function, which removes an element from the end of the vector
```cpp
vector<string> cars = {"Volvo", "BMW", "Ford", "Mazda"};  
cars.pop_back();
```

## Vector Size
To find out how many elements a vector has, use the `.size()` function

## Check if a Vector is Empty
The `.empty()` function returns `1` (_true_) if the vector is empty and `0` (_false_) if it contains one or more elements