---
{"publish":true,"title":"Strings in C++","created":"2025-05-20 15:51","modified":"2025-11-03T20:38:51.685+01:00","tags":["computer-science/programming/cpp/strings"],"cssclasses":"center-images"}
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

## Access Elements

You can access the characters in a string by referring to its index number inside square brackets `[]`.
Alternatively the `at()` function can be used.

```cpp
string name = "Hello";
cout << name[0];      // Output: H
cout << name.at(1);   // Output: e
```

## Modify Strings

Individual characters in a string can be changed by accessing them via their index.

```cpp
string greeting = "Hello";
greeting[0] = 'J';
cout << greeting;  // Output: Jello
```

## Common String Methods

### substr()

Extracts a substring from a string.

```cpp
string text = "Hello World";
string sub = text.substr(6, 5);  // Start at index 6, length 5
cout << sub;  // Output: World
```

### find()

Searches for a substring and returns its position.

```cpp
string text = "Hello World";
int pos = text.find("World");
cout << pos;  // Output: 6
```

### replace()

Replaces part of a string with another string.

```cpp
string text = "Hello World";
text.replace(6, 5, "C++");  // Replace 5 chars starting at index 6
cout << text;  // Output: Hello C++
```

## C-Style Strings

C-style strings are created with the `char` type instead of `string`. They are null-terminated character arrays inherited from C.

```cpp
string greeting1 = "Hello";  // Regular String (C++ std::string)
char greeting2[] = "Hello";  // C-Style String (array of characters ending with '\0')
```

**Differences:**

- C-style strings require manual memory management
- C++ strings are safer and provide more functionality
- C-style strings are null-terminated (end with `'\0'`)

## String Input

### Using cin

By default, `cin` reads input until whitespace.

```cpp
string name;
cin >> name;  // Reads only first word
```

### Using getline

To read a full line including spaces, use `getline()`.

```cpp
string fullName;
getline(cin, fullName);  // Reads entire line
```

---

## References

- [std::string - cppreference.com](https://en.cppreference.com/w/cpp/string/basic_string)
- [C++ Strings - cplusplus.com](https://cplusplus.com/reference/string/string/)
- [String Handling in C++ - GeeksforGeeks](https://www.geeksforgeeks.org/stdstring-class-in-c/)
