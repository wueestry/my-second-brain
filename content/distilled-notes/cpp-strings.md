---
{"publish":true,"title":"Strings in C++","created":"2025-05-20 15:51","modified":"2025-10-01T21:17:17.308+02:00","tags":["#cpp","#cpp-datatypes","#data-types","#programming","#strings","#string-manipulation","#c-style-strings"],"cssclasses":"center-images"}
---


# STRINGS IN C++

---

Strings are a datatype, used for storing text/characters.

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

---

## References
