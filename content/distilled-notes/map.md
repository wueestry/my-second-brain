---
{"publish":true,"title":"Map","created":"2025-07-03 13:33","modified":"2025-08-18T12:58:14.251+02:00","tags":["#resource"],"cssclasses":"center-images"}
---


# MAP

---

A map stores elements in "key/value" pairs.
Elements in a map are:

- Accessible by keys (not index), with unique keys
- Automatically sorted in ascending order by their keys.

```cpp
// Include the map library
#include <map>

map<string, int> people = { {"John", 32}, {"Adele", 45}, {"Bo", 29} };
```

## Access a Map

You cannot access map elements by referring to index numbers, like you would with [[distilled-notes/array]] and [[distilled-notes/vector]].

Instead, you can access a map element by referring to its key inside square brackets `[]` or using the function `.at()`.

```cpp
// Get the value associated with the key "John"
cout << "John is: " << people["John"] << "\n";
```

## Change Values

You can also change the value associated with a key:

```cpp
// Change John's value to 50 instead of 32
people["John"] = 50;
```

However, it is safer to use the `.at()` function:

## Add Elements

To add elements to a map, use the square brackets `[]` or use the `.insert()` function.

## Remove Elements

To remove specific elements from a map, you can use the `.erase()` function.
To remove all elements from a map, you can use the `.clear()` function.

## Get Size of a Map

To find out how many elements a map has, use the `.size()` function.

## Check if a Map is Empty

Use the `.empty()` function to find out if a map is empty or not.
The `.empty()` function returns `1` (_true_) if the map is empty and `0` (_false_) otherwise.

### Check if a Key Exists

You can also check if a specific element exists, by using the `.count(_key_)` function.
It returns `1` (_true_) if the element exists and `0` (_false_) otherwise.

## Loop Through a Map

You can loop through a map with the **for-each** loop. However, there are a couple of things to be aware of:

- You should use the `auto` keyword (introduced in C++ version 11) inside the `for` loop. This allows the compiler to automatically determine the correct data type for each key-value pair.
- Since map elements consist of both keys and values, you have to include `.first` to access the keys, and `.second` to access values in the loop.
- Elements in the map are sorted automatically in ascending order by their keys.

```cpp
map<string, int> people = { {"John", 32}, {"Adele", 45}, {"Bo", 29} };

for (**auto** person : people) {
  cout << **person.first** << " is: " << **person.second** << "\n";
}
```

If you want to reverse the order, you can use the `greater<_type_>` functor inside the angle brackets, like this.

```cpp
map<string, int, **greater<string>**> people = { {"John", 32}, {"Adele", 45}, {"Bo", 29} };
```

---

## References
