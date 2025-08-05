---
{"publish":true,"title":"Deque","created":"2025-08-05 10:57","modified":"2025-08-05T11:00:35.681+02:00","tags":["resource","cpp"],"cssclasses":"center-images"}
---


# DEQUE
---

>[!abstract]
>A deque (stands for *double-ended queue*) however, is more flexible, as elements can be added and removed from both ends (at the front and the back). You can also access elements by index numbers.

```cpp
#include <deque>

deque<string> foo = {"element0", "element1", "element2", "element3"};
```

## Access a Deque

You can access a deque element by referring to the index number inside square brackets `[]` or using the `.at()` function.

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




---
## References


---
## Child Files

| File | Created |
| ---- | ------- |



## Parent Files

| File | Created |
| ---- | ------- |

