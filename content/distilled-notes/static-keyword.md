---
{"publish":true,"title":"Static Keyword","created":"2024-11-20 09:45","modified":"2025-08-18T12:58:14.340+02:00","tags":["#resource"],"cssclasses":"center-images"}
---


# STATIC KEYWORD

---

_Static_ is a keyword to modify the lifetime and visibility of a variable (depending on the programming language)

The static keyword has different meanings when used with different types. We can use static keywords with:

1. **_Static Variables:_** Variables in a function, Variables in a class
2. **_Static Members of Class:_** Class objects and Functions in a class. Let us now look at each one of these uses of static in detail.

## Static Variables

### Static Variables in a Function

When a variable is declared as static, space for *it gets allocated for the lifetime of the program*. Even if the function is called multiple times, space for the static variable is allocated only once and the value of the variable in the previous call gets carried through the next function call. This is useful for implementing coroutines in C/C++ or any other application where the previous state of function needs to be stored.

### Static Variables in a Class

As the variables declared as static are initialized only once as they are allocated space in separate static storage, the static variables *in a class are shared by the objects.* There can't be multiple copies of the same static variables for different objects. Also because of this reason static variables can't be initialized using constructors.

## Static Members of a Class

### Class Objects as Static

Just like variables, objects also when declared as static have _a scope till the lifetime of the program_.

### Static Functions in a Class

Just like the static data members or static variables inside the class, static member functions also do not depend on the object of the class. We are allowed to invoke a static member function using the object and the `.` operator but it is recommended to invoke the static members using the class name and the scope resolution operator. *Static member functions are allowed to access only the static data members or other static member functions*, they can't access the non-static data members or member functions of the class.

---

## References
