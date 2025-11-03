---
{"publish":true,"title":"Peripheral Register","created":"2024-11-20 09:25","modified":"2025-11-03T20:43:36.573+01:00","tags":["engineering/embedded/peripherals/register"],"cssclasses":"center-images"}
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

## Common Peripheral Registers

### GPIO (General Purpose Input/Output)

- **Data Direction Register (DDR)**: Configure pins as input/output
- **Port Register (PORT)**: Set output values
- **Pin Register (PIN)**: Read input values
- **Pull-up Register (PUR)**: Enable internal pull-up resistors

### UART (Universal Asynchronous Receiver-Transmitter)

- **Control Register**: Configure baud rate, parity, stop bits
- **Status Register**: Check transmission complete, receive ready
- **Data Register**: Send/receive bytes

### Timer/Counter

- **Control Register**: Configure mode, prescaler, interrupts
- **Counter Register**: Current counter value
- **Compare Register**: Trigger actions at specific counts

### ADC (Analog-to-Digital Converter)

- **Control Register**: Start conversion, select channel
- **Data Register**: Read converted value
- **Status Register**: Check conversion complete

## Memory-Mapped I/O (MMIO)

Peripheral registers are accessed through **memory-mapped I/O**:

- Registers occupy specific memory addresses
- CPU uses standard load/store instructions
- No special I/O instructions needed (unlike x86 port I/O)

### Address Mapping Example (STM32)

```c
// STM32 peripheral base addresses
#define PERIPH_BASE     0x40000000UL
#define APB1PERIPH_BASE PERIPH_BASE
#define AHB1PERIPH_BASE (PERIPH_BASE + 0x00020000UL)

// GPIO Port A base address
#define GPIOA_BASE      (AHB1PERIPH_BASE + 0x0000UL)

// GPIO registers
typedef struct {
    volatile uint32_t MODER;    // Mode register
    volatile uint32_t OTYPER;   // Output type register
    volatile uint32_t OSPEEDR;  // Output speed register
    volatile uint32_t PUPDR;    // Pull-up/pull-down register
    volatile uint32_t IDR;      // Input data register
    volatile uint32_t ODR;      // Output data register
    volatile uint32_t BSRR;     // Bit set/reset register
    volatile uint32_t LCKR;     // Configuration lock register
    volatile uint32_t AFR[2];   // Alternate function registers
} GPIO_TypeDef;

// Access GPIO Port A
#define GPIOA ((GPIO_TypeDef *)GPIOA_BASE)
```

## Why `volatile` is Critical

The `volatile` keyword tells the compiler:

1. **Don't optimize away**: Always read from memory
2. **Don't reorder**: Maintain access order
3. **Don't cache**: Value may change externally

### What Happens Without `volatile`

```c
// Without volatile - INCORRECT
uint8_t *status_reg = (uint8_t *)0x1234;

while (*status_reg == 0) {
    // Compiler sees: "status_reg never changes in loop"
    // Optimization: Read once, loop forever if zero
}

// Compiled to (incorrect):
// r0 = *0x1234
// while (r0 == 0) { }  // Never re-reads!
```

```c
// With volatile - CORRECT
volatile uint8_t *status_reg = (volatile uint8_t *)0x1234;

while (*status_reg == 0) {
    // Compiler: "Must re-read every iteration"
}

// Compiled to (correct):
// loop:
//   r0 = *0x1234
//   if (r0 == 0) goto loop
```

## Practical Examples

### Example 1: LED Blink (STM32)

```c
// Define GPIO Port A
#define GPIOA_BASE 0x40020000UL

typedef struct {
    volatile uint32_t MODER;
    volatile uint32_t OTYPER;
    volatile uint32_t OSPEEDR;
    volatile uint32_t PUPDR;
    volatile uint32_t IDR;
    volatile uint32_t ODR;
    volatile uint32_t BSRR;
} GPIO_TypeDef;

#define GPIOA ((GPIO_TypeDef *)GPIOA_BASE)

void led_init() {
    // Configure PA5 as output (LED)
    GPIOA->MODER &= ~(0x3 << (5 * 2));  // Clear mode bits
    GPIOA->MODER |= (0x1 << (5 * 2));   // Set as output
}

void led_on() {
    GPIOA->ODR |= (1 << 5);  // Set bit 5
}

void led_off() {
    GPIOA->ODR &= ~(1 << 5);  // Clear bit 5
}

void led_toggle() {
    GPIOA->ODR ^= (1 << 5);  // Toggle bit 5
}
```

### Example 2: UART Transmission (AVR)

```c
// AVR UART registers
#define UDR0   (*(volatile uint8_t *)0xC6)   // Data register
#define UCSR0A (*(volatile uint8_t *)0xC0)   // Control/Status A
#define UCSR0B (*(volatile uint8_t *)0xC1)   // Control/Status B
#define UCSR0C (*(volatile uint8_t *)0xC2)   // Control/Status C
#define UBRR0L (*(volatile uint8_t *)0xC4)   // Baud rate low
#define UBRR0H (*(volatile uint8_t *)0xC5)   // Baud rate high

// Status register bits
#define UDRE0 5  // Data Register Empty
#define TXC0  6  // Transmit Complete

void uart_init(uint16_t baud_rate) {
    // Set baud rate
    UBRR0H = (uint8_t)(baud_rate >> 8);
    UBRR0L = (uint8_t)baud_rate;

    // Enable transmitter
    UCSR0B = (1 << 3);  // TXEN0 bit

    // Set frame format: 8 data bits, 1 stop bit
    UCSR0C = (3 << 1);  // UCSZ01:0 bits
}

void uart_send_byte(uint8_t data) {
    // Wait for data register empty
    while (!(UCSR0A & (1 << UDRE0))) {
        // Busy wait - MUST re-read UCSR0A each iteration
    }

    // Send data
    UDR0 = data;
}
```

### Example 3: Timer (ARM Cortex-M)

```c
// SysTick timer registers (ARM Cortex-M)
#define SYSTICK_BASE 0xE000E010UL

typedef struct {
    volatile uint32_t CTRL;   // Control and Status
    volatile uint32_t LOAD;   // Reload Value
    volatile uint32_t VAL;    // Current Value
    volatile uint32_t CALIB;  // Calibration
} SysTick_TypeDef;

#define SysTick ((SysTick_TypeDef *)SYSTICK_BASE)

void systick_init(uint32_t ticks) {
    SysTick->LOAD = ticks - 1;       // Set reload value
    SysTick->VAL = 0;                // Clear current value
    SysTick->CTRL = 0x7;             // Enable, interrupt, processor clock
}

// Timer interrupt handler
void SysTick_Handler(void) {
    // Called every timer overflow
    led_toggle();
}
```

## Register Access Patterns

### Read-Modify-Write

```c
// Set bit 3 without affecting other bits
volatile uint32_t *reg = (volatile uint32_t *)0x40000000;
*reg |= (1 << 3);

// Clear bit 5
*reg &= ~(1 << 5);

// Toggle bit 7
*reg ^= (1 << 7);
```

### Atomic Access (Set/Reset Registers)

Many microcontrollers provide atomic bit operations:

```c
// STM32 BSRR (Bit Set/Reset Register)
// Lower 16 bits: set bits
// Upper 16 bits: reset bits

// Set bit 5 atomically
GPIOA->BSRR = (1 << 5);

// Clear bit 5 atomically
GPIOA->BSRR = (1 << (5 + 16));
```

## Common Pitfalls

1. **Missing `volatile`**: Compiler optimizes away reads
2. **Wrong pointer type**: Incorrect alignment or size
3. **Race conditions**: Interrupt modifying same register
4. **Read side effects**: Some registers clear on read
5. **Write-only registers**: Reading may cause errors

## Best Practices

1. **Always use `volatile`** for hardware registers
2. **Use struct definitions** for related registers
3. **Define bit masks** as named constants
4. **Document side effects** of register access
5. **Use atomic operations** when available
6. **Critical sections** for read-modify-write in ISRs

---

## References

- [Volatile Keyword in Embedded Systems - Barr Group](https://barrgroup.com/embedded-systems/how-to/c-volatile-keyword)
- [Memory-Mapped I/O - ARM Developer](https://developer.arm.com/)
- [STM32 Reference Manual - STMicroelectronics](https://www.st.com/resource/en/reference_manual/)
- [AVR Instruction Set Manual - Microchip](https://www.microchip.com/)
