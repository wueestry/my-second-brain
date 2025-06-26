---
{"publish":true,"title":"List","created":"2025-06-04 11:24","tags":["#coding","#computer-science","#cpp","#resource"],"cssclasses":""}
---


# List

> [!abstract]
> A list is similar to a [[resources/coding/cpp/vectors\|vector]] in that it can store multiple elements of the same type and dynamically grow in size.

## Differences List vs. Vector
- You can add and remove elements from both the beginning and at the end of a list, while vectors are generally optimized for adding and removing at the end.
- Unlike vectors, a list does not support random access, meaning you cannot directly jump to a specific index, or access elements by index numbers. 

```cpp
// Include the list library
#include <list>

// Create a list called cars that will store strings
list<string> cars;
```

## Access Elements
You cannot access list elements by referring to index numbers, like with arrays and vectors.

However, you can access the first or the last element with the `.front()` and `.back()` functions, respectively

## Change Element
You can also change the value of the first or the last element with the `.front()` and `.back()` functions
```cpp
list<string> cars = {"Volvo", "BMW", "Ford", "Mazda"};

// Change the value of the first element
cars.front() = "Opel";
// Change the value of the last element
cars.back() = "Toyota";

cout << cars.front(); // Now outputs Opel instead of Volvo
cout << cars.back();  // Now outputs Toyota instead of Mazda
```

## Add Elements
To add elements to a list, you can use `.push_front()` to insert an element at the beginning of the list and `.push_back()` to add an element at the end

## Remove Elements
To remove elements from a list, use `.pop_front()` to remove an element from the beginning of the list and `.pop_back()` to remove an element at the end

## List Size
To find out how many elements a list has, use the `.size()` function

## Check if a List is Empty
Use the `.empty()` function to find out if a list is empty or not.

The `.empty()` function returns `1` (*true*) if the list is empty and `0` (*false*) otherwise