---
{"publish":true,"title":"Instruction Set","created":"2025-08-29 07:38","modified":"2025-11-03T20:27:08.306+01:00","tags":[null],"cssclasses":"center-images"}
---


# INSTRUCTION SET

---

An **instruction set** is the vocabulary of commands that a computer's processor understands and can execute. It defines the set of operations (instructions) that the processor can perform, such as arithmetic operations, data movement, control flow, and logical operations.

- The instruction set acts as the interface between software and hardware.
- It specifies the operations available, the format of instructions, and how data is manipulated.
- Programmers write code using these instructions, either directly in assembly language or through higher-level languages that compile down to these instructions.
- Maintaining a consistent instruction set architecture (ISA) allows different hardware implementations to run the same software.

## Types of Instructions

### 1. Data Movement Instructions

Transfer data between registers, memory, and I/O devices:

- `MOV`: Move data
- `LOAD`: Load from memory
- `STORE`: Store to memory
- `PUSH`: Push onto stack
- `POP`: Pop from stack

### 2. Arithmetic Instructions

Perform mathematical operations:

- `ADD`: Addition
- `SUB`: Subtraction
- `MUL`: Multiplication
- `DIV`: Division
- `INC`: Increment
- `DEC`: Decrement

### 3. Logical Instructions

Perform bitwise operations:

- `AND`: Bitwise AND
- `OR`: Bitwise OR
- `XOR`: Bitwise exclusive OR
- `NOT`: Bitwise NOT
- `SHL`: Shift left
- `SHR`: Shift right

### 4. Control Flow Instructions

Alter program execution:

- `JMP`: Unconditional jump
- `JE/JZ`: Jump if equal/zero
- `JNE/JNZ`: Jump if not equal/not zero
- `CALL`: Call subroutine
- `RET`: Return from subroutine

### 5. Comparison Instructions

Compare values:

- `CMP`: Compare two values
- `TEST`: Bitwise test

## Instruction Set Architectures

### CISC (Complex Instruction Set Computing)

**Examples**: x86, x86-64

**Characteristics**:

- Many specialised instructions
- Variable instruction length
- Instructions can access memory directly
- Fewer registers
- Complex addressing modes

**Advantages**:

- Compact code
- Rich functionality per instruction

**Disadvantages**:

- Complex decoding
- Variable execution time

### RISC (Reduced Instruction Set Computing)

**Examples**: ARM, RISC-V, MIPS

**Characteristics**:

- Simple, uniform instructions
- Fixed instruction length
- Load-store architecture
- Many general-purpose registers
- Simple addressing modes

**Advantages**:

- Simpler hardware design
- Easier pipelining
- Predictable execution time

**Disadvantages**:

- More instructions needed
- Larger code size

## Example: x86-64 Assembly

```asm
; Simple function to add two numbers
; Parameters: rdi (first), rsi (second)
; Returns: rax

section .text
global add_numbers

add_numbers:
    mov rax, rdi        ; Move first parameter to rax
    add rax, rsi        ; Add second parameter
    ret                 ; Return (result in rax)

; Function to calculate factorial
; Parameter: rdi (n)
; Returns: rax

global factorial

factorial:
    cmp rdi, 1          ; Compare n with 1
    jle base_case       ; If n <= 1, jump to base case

    push rdi            ; Save n on stack
    dec rdi             ; n = n - 1
    call factorial      ; Recursive call
    pop rdi             ; Restore n

    imul rax, rdi       ; rax = factorial(n-1) * n
    ret

base_case:
    mov rax, 1          ; Return 1
    ret
```

## Example: ARM Assembly

```asm
; ARM assembly example
; Function to add two numbers
; Parameters: r0 (first), r1 (second)
; Returns: r0

.global add_numbers
add_numbers:
    ADD r0, r0, r1      @ r0 = r0 + r1
    BX lr               @ Return

; Function to find maximum of two numbers
.global max_of_two
max_of_two:
    CMP r0, r1          @ Compare r0 and r1
    MOVLT r0, r1        @ If r0 < r1, move r1 to r0
    BX lr               @ Return
```

## Example: RISC-V Assembly

```asm
# RISC-V assembly example
# Function to add two numbers
# Parameters: a0 (first), a1 (second)
# Returns: a0

.global add_numbers
add_numbers:
    add a0, a0, a1      # a0 = a0 + a1
    ret                 # Return

# Function to multiply by shift-and-add
# Multiply a0 by 5 (shift left 2, then add original)
.global mul_by_5
mul_by_5:
    mv t0, a0           # Save original value
    slli a0, a0, 2      # a0 = a0 << 2 (multiply by 4)
    add a0, a0, t0      # a0 = a0 + original (total = 5x)
    ret
```

## Python Emulator Example

```python
class SimpleInstructionSet:
    """
    Simple instruction set emulator for educational purposes.
    Implements basic RISC-like instructions.
    """

    def __init__(self):
        self.registers = [0] * 16  # 16 general-purpose registers
        self.memory = [0] * 1024   # 1KB memory
        self.pc = 0                # Program counter
        self.running = True

    def execute(self, program: list[tuple]):
        """
        Execute a program.

        Program format: List of (opcode, operands) tuples
        """
        while self.running and self.pc < len(program):
            opcode, *operands = program[self.pc]
            self.pc += 1

            if opcode == 'ADD':
                # ADD rd, rs1, rs2: rd = rs1 + rs2
                rd, rs1, rs2 = operands
                self.registers[rd] = self.registers[rs1] + self.registers[rs2]

            elif opcode == 'SUB':
                # SUB rd, rs1, rs2: rd = rs1 - rs2
                rd, rs1, rs2 = operands
                self.registers[rd] = self.registers[rs1] - self.registers[rs2]

            elif opcode == 'MUL':
                rd, rs1, rs2 = operands
                self.registers[rd] = self.registers[rs1] * self.registers[rs2]

            elif opcode == 'LOAD':
                # LOAD rd, addr: rd = memory[addr]
                rd, addr = operands
                self.registers[rd] = self.memory[addr]

            elif opcode == 'STORE':
                # STORE rs, addr: memory[addr] = rs
                rs, addr = operands
                self.memory[addr] = self.registers[rs]

            elif opcode == 'MOV':
                # MOV rd, value: rd = value
                rd, value = operands
                self.registers[rd] = value

            elif opcode == 'JMP':
                # JMP addr: pc = addr
                addr, = operands
                self.pc = addr

            elif opcode == 'JZ':
                # JZ rs, addr: if rs == 0, pc = addr
                rs, addr = operands
                if self.registers[rs] == 0:
                    self.pc = addr

            elif opcode == 'HALT':
                self.running = False

            else:
                raise ValueError(f"Unknown opcode: {opcode}")

    def get_register(self, reg: int) -> int:
        """Get register value"""
        return self.registers[reg]

    def print_registers(self):
        """Print all non-zero registers"""
        print("Registers:")
        for i, val in enumerate(self.registers):
            if val != 0:
                print(f"  R{i}: {val}")

# Example program: Calculate sum of numbers 1 to 10
if __name__ == "__main__":
    cpu = SimpleInstructionSet()

    program = [
        ('MOV', 0, 0),      # R0 = 0 (sum)
        ('MOV', 1, 1),      # R1 = 1 (counter)
        ('MOV', 2, 10),     # R2 = 10 (limit)
        # Loop start (address 3):
        ('ADD', 0, 0, 1),   # R0 = R0 + R1 (sum += counter)
        ('ADD', 1, 1, 3),   # R1 = R1 + 1 (counter++) (R3=1)
        ('MOV', 3, 1),      # R3 = 1 (constant)
        ('SUB', 4, 2, 1),   # R4 = R2 - R1 (limit - counter)
        ('JZ', 4, 9),       # If R4 == 0, jump to end
        ('JMP', 3),         # Jump back to loop start
        # End (address 9):
        ('HALT',)
    ]

    # Fix the program (proper loop)
    program = [
        ('MOV', 0, 0),      # R0 = 0 (sum)
        ('MOV', 1, 1),      # R1 = 1 (counter)
        ('MOV', 2, 11),     # R2 = 11 (limit, one past 10)
        ('MOV', 3, 1),      # R3 = 1 (constant for increment)
        # Loop (address 4):
        ('ADD', 0, 0, 1),   # R0 = R0 + R1 (sum += counter)
        ('ADD', 1, 1, 3),   # R1 = R1 + 1 (counter++)
        ('SUB', 4, 1, 2),   # R4 = R1 - R2
        ('JZ', 4, 8),       # If R4 == 0, exit loop
        ('JMP', 4),         # Jump to loop start
        ('HALT',)           # End
    ]

    cpu.execute(program)
    cpu.print_registers()
    print(f"\nSum of 1 to 10 = {cpu.get_register(0)}")
```

## Comparison Table

| Feature                | CISC (x86)            | RISC (ARM)          | RISC-V                |
| ---------------------- | --------------------- | ------------------- | --------------------- |
| **Instruction Count**  | ~1000+                | ~200                | ~50 base + extensions |
| **Instruction Length** | Variable (1-15 bytes) | Fixed (32-bit)      | Fixed (32-bit base)   |
| **Registers**          | Fewer (8-16)          | Many (16-32)        | 32 integer + 32 float |
| **Addressing Modes**   | Many complex modes    | Simple modes        | Load-store only       |
| **Design Philosophy**  | Hardware complexity   | Software simplicity | Modular, open         |

---

## References

- [Instruction Set Architecture - Wikipedia](https://en.wikipedia.org/wiki/Instruction_set_architecture)
- [x86 Assembly Guide](https://www.cs.virginia.edu/~evans/cs216/guides/x86.html)
- [ARM Architecture Reference Manual](https://developer.arm.com/documentation/)
- [RISC-V Specifications](https://riscv.org/technical/specifications/)
