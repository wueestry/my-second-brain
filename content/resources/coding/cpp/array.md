---
{"publish":true,"title":"Array","created":"2025-05-20 15:54","tags":["#coding","#computer-science","#cpp","#resource"],"cssclasses":""}
---


# Array

> [!abstract]
> Arrays are used to store multiple values in a single variable, instead of declaring separate variables for each value.

To declare an array, define the variable type, name followed by _square brackets_ and specify the number of elements

```cpp
string cars[4] = {"Volvo", "BMW", "Ford", "Mazda"};
```

## Access Element

Access an array element by referring to the index number inside square brackets `[]`

```cpp
string cars[4] = {"Volvo", "BMW", "Ford", "Mazda"};
cout << cars[0];
// Outputs Volvo
```

## Change Element

Change value of element by refer to the index number

```cpp
string cars[4] = {"Volvo", "BMW", "Ford", "Mazda"};
cars[0] = "Opel";
cout << cars[0];
// Now outputs Opel instead of Volvo
```

## Iterate Through Array

Loop through the array elements with the `for` loop

```cpp
// Create an array of strings
string cars[5] = {"Volvo", "BMW", "Ford", "Mazda", "Tesla"};

// Loop through strings
for (int i = 0; i < 5; i++) {
  cout << cars[i] << "\n";
}
```

### foreach Loop

Since C++11 there also exists the "_for-each_ loop"

```cpp
// Create an array of integers
int myNumbers[5] = {10, 20, 30, 40, 50};

// Loop through integers
for (int i : myNumbers) {
  cout << i << "\n";
}
```
