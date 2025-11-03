---
{"publish":true,"title":"Load-Store Architecture","created":"2025-08-29 07:10","modified":"2025-11-03T20:43:47.224+01:00","tags":["computer-science/architecture/instruction-set/load-store"],"cssclasses":"center-images"}
---


# LOAD-STORE ARCHITECTURE

---

A load-store architecture is an [[instruction-set architecture]] that divides instructions into two distinct categories:

1. **Memory access instructions**: Load and store between memory and registers
2. **ALU operations**: Arithmetic and logical operations that work only on registers

This is a key characteristic of RISC (Reduced Instruction Set Computing) architectures.

## Key Characteristics

### Explicit Memory Operations

- **LOAD**: Transfer data from memory to registers
- **STORE**: Transfer data from registers to memory
- **No direct memory operands**: ALU instructions cannot access memory directly

### Register-Based Computation

All arithmetic and logical operations must be performed on values in registers:

```asm
# Load-Store Architecture (e.g., ARM, RISC-V)
LOAD  R1, [addr1]    # Load from memory to register
LOAD  R2, [addr2]    # Load from memory to register
ADD   R3, R1, R2     # Perform operation on registers
STORE R3, [addr3]    # Store result back to memory
```

Compare with memory-register architecture:

```asm
# Memory-Register Architecture (e.g., x86)
ADD [addr3], [addr1]  # Can operate directly on memory (not in load-store)
```

## Advantages

1. **Simplified Instruction Set**: Fewer instruction types and formats
2. **Faster Execution**: Memory operations are isolated, allowing better pipelining
3. **More Registers**: Encourages larger register files for better performance
4. **Easier Optimization**: Compilers can optimize register allocation better
5. **Predictable Timing**: Fixed instruction execution times

## Disadvantages

1. **More Instructions**: Simple operations require multiple instructions
2. **Larger Code Size**: More instructions mean larger program binaries
3. **Increased Memory Traffic**: Explicit loads and stores can increase memory bandwidth usage

## Examples of Load-Store Architectures

### ARM Assembly

```asm
; ARM load-store example
; Calculate: c = a + b

    LDR  r0, =a         ; Load address of a
    LDR  r1, [r0]       ; Load value of a into r1
    LDR  r0, =b         ; Load address of b
    LDR  r2, [r0]       ; Load value of b into r2
    ADD  r3, r1, r2     ; r3 = r1 + r2
    LDR  r0, =c         ; Load address of c
    STR  r3, [r0]       ; Store result to c
```

### RISC-V Assembly

```asm
# RISC-V load-store example
# Calculate: array[i] = array[i] + 5

    la   t0, array      # Load address of array
    slli t1, a0, 2      # t1 = i * 4 (assuming 4-byte integers)
    add  t0, t0, t1     # t0 = address of array[i]
    lw   t2, 0(t0)      # Load array[i] into t2
    addi t2, t2, 5      # t2 = t2 + 5
    sw   t2, 0(t0)      # Store result back to array[i]
```

### MIPS Assembly

```asm
# MIPS load-store example
# Swap two variables: temp = x; x = y; y = temp

    lw   $t0, x         # Load x into $t0
    lw   $t1, y         # Load y into $t1
    sw   $t1, x         # Store $t1 (y) into x
    sw   $t0, y         # Store $t0 (old x) into y
```

## Python Simulator

```python
class LoadStoreArchitecture:
    """
    Simulator for load-store architecture.
    Demonstrates separation of memory access and ALU operations.
    """

    def __init__(self, num_registers=16, memory_size=1024):
        self.registers = [0] * num_registers
        self.memory = [0] * memory_size
        self.pc = 0
        self.running = True

    def load(self, reg: int, addr: int):
        """Load value from memory to register"""
        if 0 <= addr < len(self.memory):
            self.registers[reg] = self.memory[addr]
            print(f"LOAD: R{reg} ← M[{addr}] = {self.memory[addr]}")
        else:
            raise ValueError(f"Memory address out of bounds: {addr}")

    def store(self, reg: int, addr: int):
        """Store value from register to memory"""
        if 0 <= addr < len(self.memory):
            self.memory[addr] = self.registers[reg]
            print(f"STORE: M[{addr}] ← R{reg} = {self.registers[reg]}")
        else:
            raise ValueError(f"Memory address out of bounds: {addr}")

    def add(self, rd: int, rs1: int, rs2: int):
        """Add two registers (ALU operation - register only)"""
        self.registers[rd] = self.registers[rs1] + self.registers[rs2]
        print(f"ADD: R{rd} ← R{rs1} + R{rs2} = {self.registers[rd]}")

    def sub(self, rd: int, rs1: int, rs2: int):
        """Subtract registers"""
        self.registers[rd] = self.registers[rs1] - self.registers[rs2]
        print(f"SUB: R{rd} ← R{rs1} - R{rs2} = {self.registers[rd]}")

    def mul(self, rd: int, rs1: int, rs2: int):
        """Multiply registers"""
        self.registers[rd] = self.registers[rs1] * self.registers[rs2]
        print(f"MUL: R{rd} ← R{rs1} × R{rs2} = {self.registers[rd]}")

    def addi(self, rd: int, rs: int, imm: int):
        """Add immediate value to register"""
        self.registers[rd] = self.registers[rs] + imm
        print(f"ADDI: R{rd} ← R{rs} + {imm} = {self.registers[rd]}")

    def print_state(self):
        """Print current state"""
        print("\nRegister State:")
        for i, val in enumerate(self.registers):
            if val != 0:
                print(f"  R{i}: {val}")
        print()

# Example: Array sum using load-store architecture
if __name__ == "__main__":
    cpu = LoadStoreArchitecture()

    # Initialize memory with array values
    array = [10, 20, 30, 40, 50]
    for i, val in enumerate(array):
        cpu.memory[i] = val

    print("=== Computing Sum of Array ===\n")
    print(f"Array: {array}\n")

    # R0: sum accumulator
    # R1: array element
    # R2: loop counter
    # R3: array length

    cpu.addi(0, 0, 0)           # R0 = 0 (sum)
    cpu.addi(2, 0, 0)           # R2 = 0 (counter)
    cpu.addi(3, 0, len(array))  # R3 = array length

    print("Loop iterations:")
    for i in range(len(array)):
        print(f"\n--- Iteration {i} ---")
        cpu.load(1, i)          # R1 = array[i]
        cpu.add(0, 0, 1)        # R0 = R0 + R1
        cpu.addi(2, 2, 1)       # R2 = R2 + 1 (increment counter)

    print("\n=== Final Result ===")
    cpu.print_state()
    print(f"Sum = {cpu.registers[0]}")

    # Example 2: Swap two values
    print("\n\n=== Swapping Two Values ===\n")

    cpu2 = LoadStoreArchitecture()
    cpu2.memory[100] = 42
    cpu2.memory[101] = 73

    print(f"Before: M[100] = {cpu2.memory[100]}, M[101] = {cpu2.memory[101]}\n")

    cpu2.load(1, 100)        # R1 = M[100]
    cpu2.load(2, 101)        # R2 = M[101]
    cpu2.store(2, 100)       # M[100] = R2
    cpu2.store(1, 101)       # M[101] = R1

    print(f"\nAfter: M[100] = {cpu2.memory[100]}, M[101] = {cpu2.memory[101]}")
```

## Comparison with Other Architectures

| Feature                    | Load-Store (RISC)        | Register-Memory (CISC)  |
| -------------------------- | ------------------------ | ----------------------- |
| **Memory Access**          | Explicit LOAD/STORE only | ALU can access memory   |
| **Instruction Complexity** | Simple, uniform          | Complex, varied         |
| **Code Size**              | Larger                   | Smaller                 |
| **Execution Speed**        | Faster (pipelined)       | Variable                |
| **Register Usage**         | Heavy (many registers)   | Moderate                |
| **Examples**               | ARM, RISC-V, MIPS        | x86, x86-64 (partially) |

## Impact on Compiler Design

Load-store architecture simplifies compiler optimisation:

1. **Register Allocation**: Critical for performance
2. **Instruction Scheduling**: More flexible due to uniform instructions
3. **Loop Optimisation**: Can keep frequently-used variables in registers
4. **Code Generation**: Simpler patterns to match

---

## References

- [Load-Store Architecture - Wikipedia](https://en.wikipedia.org/wiki/Load-store_architecture)
- [RISC vs CISC - Stanford](http://web.stanford.edu/class/cs143/materials/lectures/lecture01.pdf)
- [ARM Architecture Reference Manual](https://developer.arm.com/documentation/)
- [RISC-V Specification](https://riscv.org/technical/specifications/)
