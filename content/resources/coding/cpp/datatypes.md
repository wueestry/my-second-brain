---
{"publish":true,"title":"Datatypes","created":"2025-05-16 09:10","tags":["#coding","#computer-science","#cpp","#resource"],"cssclasses":""}
---


# Datatypes

> [!abstract]
> In C++ every variable has to have a specified data type.

## Basic Datatypes

### boolean

Stores true or false values
_Size_: 1 byte

### char

Stores a single character/letter/number, or ASCII values
_Size_: 1 byte

### int

Stores whole numbers, without decimals
_Size_: 2 or 4 bytes

### float

Stores fractional numbers, containing one or more decimals. Sufficient for storing 6-7 decimal digits
_Size_: 4 bytes

### double

Stores fractional numbers, containing one or more decimals. Sufficient for storing 15 decimal digits
_Size_: 8 bytes

## Complex Datatypes

# String

> [!abstract]
> Strings are used for storing text/characters.

_Requires_: `#include <string>` in the header

## String Concatenation

The `+` operator can be used between strings to add them together

```cpp
string firstName = "John";
string lastName = "Doe";
string fullName = firstName + " " + lastName;
```

## Append

Adds string after another string

```cpp
string firstName = "John ";
string lastName = "Doe";
string fullName = firstName.append(lastName);
```

## Length

Get length of a string using `length()`. `size()` is an alias of `length()`

```cpp
string txt = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
cout << "The length of the txt string is: " << txt.length();
```

## Access elements

You can access the characters in a string by referring to its index number inside square brackets `[]`.
Alternatively the `at()` function can be used.

## C-Style Strings

C-style strings are created with the `char` type instead of `string`.

```cpp
string greeting1 = "Hello";  // Regular String
char greeting2[] = "Hello";  // C-Style String (an array of characters)
```


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

