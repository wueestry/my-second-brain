---
{"publish":true,"title":"Structures in C++","created":"2025-05-22 07:47","modified":"2025-09-19T07:23:22.086+02:00","tags":["#coding","#resource","#cpp","#struct","#data-structures","#cpp-classes","#object-oriented-programming"],"cssclasses":"center-images"}
---


# STRUCTURES IN C++

---

**Structures** (also called **structs**) are a way to group several related variables into one place.

## Creation

```cpp
struct {             // Structure declaration
  int myNum;         // Member (int variable)
  string myString;   // Member (string variable)
} myStructure;       // Structure variable
```

### One Structure in Multiple Variables

A single structure can be used in multiple variables by separating the structure variables by a comma.

### Named Structures

By giving a name to a structure, it can be treated as a datatype

```cpp
struct car {
	string brand;
};
car myCar1;
```

## Access Member

```cpp
// Create a structure variable called myStructure
struct {
  int myNum;
  string myString;
} myStructure;

// Assign values to members of myStructure
myStructure.myNum = 1;

// Print members of myStructure
cout << myStructure.myNum << "\n";
```

---

## References
