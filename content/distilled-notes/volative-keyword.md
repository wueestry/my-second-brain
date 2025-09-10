---
{"publish":true,"title":"Volatile Keyword","created":"2025-08-05 11:04","modified":"2025-08-18T12:58:14.365+02:00","tags":["resource"],"cssclasses":"center-images"}
---


# _VOLATILE_ KEYWORD

---

A value is said to be **volatile** if it can be read or modified asynchronously by something other than the current thread of execution.

It suppresses optimisations of the compiler
The `volatile` keyword is intended to:

- Allow access to memory-mapped I/O devices
- Allow preserving values across a `longjmp`
- Allow sharing values between signal handlers and the rest of the program in `volatile` `sig_atomic_t` objects

## Proper Usage

A variable should be declared volatile whenever its value could change unexpectedly

- Memory-mapped [[distilled-notes/peripheral-register\|periphal registers]]
- Global variables modified by an interrupt service routine
- Global variables accessed by multiple tasks within a multi-threaded application

---

## References
