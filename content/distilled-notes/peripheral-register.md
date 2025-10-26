---
{"publish":true,"title":"Peripheral Register","created":"2024-11-20 09:25","modified":"2025-10-01T21:17:17.306+02:00","tags":["#c","#data-types","#computer-architecture","#mmio","#volatile","#embedded-systems","#arm-assembly"],"cssclasses":"center-images"}
---


# PERIPHERAL REGISTER

---

Peripheral registers are specific memory locations within a microcontroller that are used to control and interact with hardware peripherals such as GPIOs, timers, UARTs, and ADCs. These registers are part of the peripheral hardware itself and are accessed by the CPU using standard memory read and write operations, a method known as memory-mapped I/O (MMIO).

## Example

Consider a 8-bit status register that is memory mapped at address `0x1234`. It is required that you poll the status register until it becomes non-zero.

### Naïve Implementation

```c
uint8_t * p_reg = (uint8_t *) 0x1234;

// Wait for register to read non-zero
do { ... } while (0 == *p_reg)
```

Compiler optimisation will optimise the code to:

```arm-asm
main:
  mov p_reg, #0x1234
  mov a, @p_reg
loop:
  ...
  bz loop
```

Never re-reading the value during the loop execution

### Fix

```c
uint8_t volatile * p_reg = (uint8_t volatile *) 0x1234;
```

The assembly language now looks like this:

```arm-asm
main:
  mov p_reg, #0x1234
loop:
  ...
  mov a, @p_reg
  bz loop
```

Achieving the desired outcome.

---

## References
