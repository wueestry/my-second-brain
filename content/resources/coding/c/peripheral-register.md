---
{"publish":true,"title":"Peripheral Register","created":"2024-11-20 09:25","tags":["#c","#coaching","#cpp","#embedded-programming","#resource"],"cssclasses":""}
---


# Peripheral Register

> [!abstract]
> The registers of peripherals may change asynchronously to the program flow.

Embedded systems contain real hardware, usually with sophisticated peripherals. These peripherals contain registers whose values may change asynchronously to the program flow.

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
