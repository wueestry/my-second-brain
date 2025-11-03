---
{"publish":true,"title":"Volatile Keyword in C++","created":"2025-08-05 11:04","modified":"2025-11-03T20:39:44.670+01:00","tags":["computer-science/programming/cpp/volatile-keyword"],"cssclasses":"center-images"}
---


# _VOLATILE_ KEYWORD IN C++

---

A value is said to be **volatile** if it can be read or modified asynchronously by something other than the current thread of execution.

The `volatile` keyword tells the compiler to suppress optimisations and always read the variable's value from memory rather than using cached values in registers.

## Purpose

The `volatile` keyword is intended to:

- Allow access to memory-mapped I/O devices
- Prevent compiler optimisations that assume variables don't change unexpectedly
- Allow preserving values across a `longjmp`
- Allow sharing values between signal handlers and the rest of the program in `volatile sig_atomic_t` objects

## Why `volatile` is Needed

Without `volatile`, the compiler may optimise away repeated reads:

```cpp
// Without volatile
int flag = 0;

void waitForInterrupt() {
    while (flag == 0) {
        // Compiler may optimise this to infinite loop
        // since it doesn't see flag changing
    }
}
```

With `volatile`, each read accesses memory:

```cpp
// With volatile
volatile int flag = 0;

void waitForInterrupt() {
    while (flag == 0) {
        // Compiler always reads flag from memory
    }
}
// ISR can now change flag and break the loop
```

## Proper Usage

A variable should be declared volatile whenever its value could change unexpectedly:

### Memory-Mapped Peripheral Registers

```cpp
volatile uint32_t* const GPIO_DATA = (uint32_t*)0x40020000;

void setPin() {
    *GPIO_DATA |= (1 << 5);  // Always reads current register value
}
```

### Global Variables Modified by ISR

```cpp
volatile bool dataReady = false;

void UART_IRQHandler() {
    dataReady = true;  // Set by interrupt
}

void main() {
    while (!dataReady) {
        // Wait for interrupt
    }
    processData();
}
```

### Multi-Threaded Shared Variables

```cpp
volatile bool stopThread = false;

void workerThread() {
    while (!stopThread) {
        doWork();
    }
}
```

## Important Limitations

- `volatile` does **not** provide thread safety or atomicity
- For multi-threading, use `std::atomic` instead of `volatile`
- `volatile` is primarily for hardware registers and signal handlers
- Does not prevent race conditions

```cpp
// BAD: volatile doesn't make this thread-safe
volatile int counter = 0;
counter++;  // Not atomic! Use std::atomic instead

// GOOD: for hardware registers
volatile uint32_t* statusReg = (uint32_t*)0x40000000;
if (*statusReg & 0x01) { /* ... */ }
```

---

## References

- [Volatile Keyword - cppreference.com](https://en.cppreference.com/w/cpp/language/cv)
- [Why volatile in Embedded C - Embedded Artistry](https://embeddedartistry.com/blog/2019/02/04/demystifying-volatile/)
- [volatile vs atomic - Stack Overflow](https://stackoverflow.com/questions/8819095/concurrency-atomic-and-volatile-in-c11-memory-model)
