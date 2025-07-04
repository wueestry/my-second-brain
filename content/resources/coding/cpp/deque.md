---
{"publish":true,"title":"Deque","created":"2025-07-04","tags":["coding","computer-science","cpp","resource"],"cssclasses":""}
---


# Deque

>[!abstract]
>A deque (stands for *double-ended queue*) however, is more flexible, as elements can be added and removed from both ends (at the front and the back). You can also access elements by index numbers.

```cpp
// Include the deque library  
#include <deque>

// Create a deque called cars that will store strings  
deque<string> cars = {"Volvo", "BMW", "Ford", "Mazda"};
```

## Access a Deque
You can access a deque element by referring to the index number inside square brackets `[]` or using the `.at()` function.
```cpp
deque<string> cars = {"Volvo", "BMW", "Ford", "Mazda"};  
  
// Get the first element  
cout << cars[0];  // Outputs Volvo
```
You can also access the first or the last element of a deque with the `.front()` and `.back()` functions.

## Add Deque Elements
To add elements to a deque, you can use `.push_front()` to insert an element at the beginning of the deque and `.push_back()` to add an element at the end.

## Remove Deque Elements
To remove elements from a deque, use `.pop_front()` to remove an element from the beginning of the deque and `.pop_back()` to remove an element at the end.

## Deque Size
To find out how many elements a deque has, use the `.size()` function.

## Check if a Deque is Empty
Use the `.empty()` function to find out if a deque is empty or not.

The `.empty()` function returns `1` (_true_) if the deque is empty and `0` (_false_) otherwise.