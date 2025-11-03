---
{"publish":true,"title":"MIPS Instruction Set","created":"2025-08-29 07:06","modified":"2025-11-03T20:43:47.206+01:00","tags":["computer-science/architecture/instruction-set/mips"],"cssclasses":"center-images"}
---


# MIPS INSTRUCTION SET

---

The MIPS (Microprocessor without Interlocked Pipelined Stages) instruction set is a [[RISC]] architecture designed for simplicity and efficient pipelining.
It provides 32 general-purpose registers and uses a [[distilled-notes/load-store-architecture\|load-store model]].

## Instruction Format

To maintain simplicity and fixed instruction length (32 bits), MIPS uses a few distinct instruction formats

### R-type (Register-type)

Used for arithmetic and logical operations that operate on registers.

**Format**: `opcode (6 bits) | rs (5 bits) | rt (5 bits) | rd (5 bits) | shamt (5 bits) | funct (6 bits)`

**Example**: `add $t0, $t1, $t2` → `$t0 = $t1 + $t2`

### I-type (Immediate-type)

Used for data transfer, immediate arithmetic and logical operations, and conditional branching.

**Format**: `opcode (6 bits) | rs (5 bits) | rt (5 bits) | immediate (16 bits)`

**Example**: `addi $t0, $t1, 10` → `$t0 = $t1 + 10`

### J-type (Jump-type)

Used for unconditional jumps and jump-and-link instructions.

**Format**: `opcode (6 bits) | address (26 bits)`

**Example**: `j label` → Jump to address `label`

## Common Instructions

### Arithmetic Operations

```assembly
add  $t0, $t1, $t2    # $t0 = $t1 + $t2 (R-type)
addi $t0, $t1, 100    # $t0 = $t1 + 100 (I-type)
sub  $t0, $t1, $t2    # $t0 = $t1 - $t2
mul  $t0, $t1, $t2    # $t0 = $t1 * $t2 (pseudo-instruction)
div  $t1, $t2         # lo = $t1 / $t2, hi = $t1 % $t2
```

### Logical Operations

```assembly
and  $t0, $t1, $t2    # $t0 = $t1 & $t2
andi $t0, $t1, 0xFF   # $t0 = $t1 & 0xFF
or   $t0, $t1, $t2    # $t0 = $t1 | $t2
ori  $t0, $t1, 0xFF   # $t0 = $t1 | 0xFF
xor  $t0, $t1, $t2    # $t0 = $t1 ^ $t2
nor  $t0, $t1, $t2    # $t0 = ~($t1 | $t2)
sll  $t0, $t1, 2      # $t0 = $t1 << 2 (shift left logical)
srl  $t0, $t1, 2      # $t0 = $t1 >> 2 (shift right logical)
```

### Memory Access

```assembly
lw   $t0, 0($t1)      # $t0 = Memory[$t1 + 0] (load word)
sw   $t0, 0($t1)      # Memory[$t1 + 0] = $t0 (store word)
lb   $t0, 0($t1)      # Load byte (sign-extended)
lbu  $t0, 0($t1)      # Load byte unsigned
sb   $t0, 0($t1)      # Store byte
lh   $t0, 0($t1)      # Load halfword
sh   $t0, 0($t1)      # Store halfword
```

### Control Flow

```assembly
beq  $t0, $t1, label  # if ($t0 == $t1) goto label
bne  $t0, $t1, label  # if ($t0 != $t1) goto label
blt  $t0, $t1, label  # if ($t0 < $t1) goto label (pseudo)
bgt  $t0, $t1, label  # if ($t0 > $t1) goto label (pseudo)
j    label            # goto label (unconditional jump)
jal  func             # jump and link (function call)
jr   $ra              # jump register (return from function)
```

## Register Convention

MIPS has 32 general-purpose registers:

| Register  | Number    | Usage                    |
| --------- | --------- | ------------------------ |
| `$zero`   | `$0`      | Always zero              |
| `$at`     | `$1`      | Assembler temporary      |
| `$v0-$v1` | `$2-$3`   | Function return values   |
| `$a0-$a3` | `$4-$7`   | Function arguments       |
| `$t0-$t7` | `$8-$15`  | Temporary (caller-saved) |
| `$s0-$s7` | `$16-$23` | Saved (callee-saved)     |
| `$t8-$t9` | `$24-$25` | More temporaries         |
| `$k0-$k1` | `$26-$27` | Kernel/OS reserved       |
| `$gp`     | `$28`     | Global pointer           |
| `$sp`     | `$29`     | Stack pointer            |
| `$fp`     | `$30`     | Frame pointer            |
| `$ra`     | `$31`     | Return address           |

## Example Programs

### Factorial Calculation

```assembly
# Calculate factorial of n
# Input: $a0 = n
# Output: $v0 = n!

factorial:
    addi $sp, $sp, -8      # allocate stack space
    sw   $ra, 4($sp)       # save return address
    sw   $a0, 0($sp)       # save argument

    slti $t0, $a0, 2       # if n < 2
    beq  $t0, $zero, L1    # branch if n >= 2

    addi $v0, $zero, 1     # return 1 (base case)
    addi $sp, $sp, 8       # deallocate stack
    jr   $ra               # return

L1:
    addi $a0, $a0, -1      # n = n - 1
    jal  factorial         # factorial(n-1)

    lw   $a0, 0($sp)       # restore n
    lw   $ra, 4($sp)       # restore return address
    addi $sp, $sp, 8       # deallocate stack

    mul  $v0, $a0, $v0     # result = n * factorial(n-1)
    jr   $ra               # return
```

### Array Sum

```assembly
# Sum elements of an array
# Input: $a0 = array base address, $a1 = array length
# Output: $v0 = sum

array_sum:
    add  $v0, $zero, $zero    # sum = 0
    add  $t0, $zero, $zero    # i = 0

loop:
    beq  $t0, $a1, done       # if i == length, exit

    sll  $t1, $t0, 2          # $t1 = i * 4 (word offset)
    add  $t1, $t1, $a0        # $t1 = address of array[i]
    lw   $t2, 0($t1)          # $t2 = array[i]

    add  $v0, $v0, $t2        # sum += array[i]
    addi $t0, $t0, 1          # i++
    j    loop                 # continue loop

done:
    jr   $ra                  # return
```

## Python MIPS Simulator

```python
class MIPSSimulator:
    """Simple MIPS instruction simulator"""

    def __init__(self):
        # 32 registers ($0 to $31)
        self.registers = [0] * 32
        self.memory = {}
        self.pc = 0  # program counter

    def execute_r_type(self, opcode: str, rd: int, rs: int, rt: int):
        """Execute R-type instruction"""
        if opcode == "add":
            self.registers[rd] = self.registers[rs] + self.registers[rt]
        elif opcode == "sub":
            self.registers[rd] = self.registers[rs] - self.registers[rt]
        elif opcode == "and":
            self.registers[rd] = self.registers[rs] & self.registers[rt]
        elif opcode == "or":
            self.registers[rd] = self.registers[rs] | self.registers[rt]
        elif opcode == "xor":
            self.registers[rd] = self.registers[rs] ^ self.registers[rt]
        elif opcode == "sll":
            self.registers[rd] = self.registers[rs] << rt
        elif opcode == "srl":
            self.registers[rd] = self.registers[rs] >> rt
        else:
            raise ValueError(f"Unknown R-type opcode: {opcode}")

        # Keep register 0 always zero
        self.registers[0] = 0

    def execute_i_type(self, opcode: str, rt: int, rs: int, imm: int):
        """Execute I-type instruction"""
        if opcode == "addi":
            self.registers[rt] = self.registers[rs] + imm
        elif opcode == "andi":
            self.registers[rt] = self.registers[rs] & imm
        elif opcode == "ori":
            self.registers[rt] = self.registers[rs] | imm
        elif opcode == "lw":
            addr = self.registers[rs] + imm
            self.registers[rt] = self.memory.get(addr, 0)
        elif opcode == "sw":
            addr = self.registers[rs] + imm
            self.memory[addr] = self.registers[rt]
        else:
            raise ValueError(f"Unknown I-type opcode: {opcode}")

        self.registers[0] = 0

    def get_register(self, reg_num: int) -> int:
        """Get register value"""
        return self.registers[reg_num]

    def set_register(self, reg_num: int, value: int):
        """Set register value (except $0)"""
        if reg_num != 0:
            self.registers[reg_num] = value

    def print_registers(self):
        """Print all register values"""
        reg_names = [
            "$zero", "$at", "$v0", "$v1", "$a0", "$a1", "$a2", "$a3",
            "$t0", "$t1", "$t2", "$t3", "$t4", "$t5", "$t6", "$t7",
            "$s0", "$s1", "$s2", "$s3", "$s4", "$s5", "$s6", "$s7",
            "$t8", "$t9", "$k0", "$k1", "$gp", "$sp", "$fp", "$ra"
        ]

        print("Register values:")
        for i in range(32):
            if self.registers[i] != 0:
                print(f"  {reg_names[i]:6s} (${i:2d}) = {self.registers[i]}")

# Example usage
if __name__ == "__main__":
    sim = MIPSSimulator()

    # Example: Calculate sum of two numbers
    # $t0 = 5, $t1 = 10
    sim.set_register(8, 5)   # $t0 = 5
    sim.set_register(9, 10)  # $t1 = 10

    # add $t2, $t0, $t1
    sim.execute_r_type("add", rd=10, rs=8, rt=9)

    # addi $t3, $t2, 100
    sim.execute_i_type("addi", rt=11, rs=10, imm=100)

    sim.print_registers()
    # Expected: $t2 = 15, $t3 = 115
```

## Advantages and Disadvantages

### Advantages

- **Simple instruction set**: Easy to implement in hardware
- **Fixed instruction length**: Simplifies pipelining and instruction fetch
- **Large register file**: Reduces memory access
- **Load-store architecture**: Clean separation between computation and memory access
- **Good for compilers**: Regular instruction format aids code generation

### Disadvantages

- **Code density**: Programs can be larger than CISC equivalents
- **More instructions needed**: Simple operations require multiple instructions
- **Limited immediate values**: 16-bit immediates may require loading constants
- **Branch delay slots**: Requires careful instruction scheduling

---

## References

- [MIPS Architecture - Stanford CS107](https://web.stanford.edu/class/cs107/)
- [MIPS Instruction Set Reference](https://www.mips.com/products/architectures/mips32-2/)
- [MIPS Assembly Language Programming](https://chortle.ccsu.edu/assemblytutorial/)
- [MARS MIPS Simulator](http://courses.missouristate.edu/kenvollmar/mars/)
