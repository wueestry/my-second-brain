---
{"publish":true,"title":"Assembler","created":"2025-09-24T00:00:00.000Z","modified":"2025-11-03T20:34:18.958+01:00","tags":["computer-science/compiler/assembler"],"cssclasses":"center-images"}
---


# ASSEMBLER

---

An assembler is a system software tool that translates assembly language (human-readable mnemonics) into machine code (binary instructions) that can be executed by a computer's processor. It serves as a bridge between low-level programming and hardware execution.

## Process

The assembler performs a two-pass translation:

1. **First pass**: Builds a symbol table by scanning the code and recording labels, variable addresses, and instruction locations
2. **Second pass**: Generates machine code by replacing mnemonics and symbols with their binary equivalents

The output is an **object file** containing:

- Machine instructions in binary format
- Data sections
- Relocation information
- Symbol table for linking

## Key Responsibilities

- **Instruction translation**: Converts assembly mnemonics (e.g., `ADD`, `MOV`, `JMP`) to binary opcodes
- **Address resolution**: Resolves labels and symbolic addresses to memory locations
- **Directive processing**: Handles assembler directives (e.g., `.data`, `.text`, `.global`)
- **Error detection**: Identifies syntax errors, undefined symbols, and invalid instructions

## Related Concepts

Assemblers work with several low-level programming concepts:

- **[[distilled-notes/instruction-set\|Instruction Set]]**: The set of operations supported by the processor
- **[[stack\| Stack]]**: Memory structure used for function calls and local variables
- **Conditional branches**: Instructions that alter program flow based on conditions
- **Interrupts**: Hardware signals that alter execution flow

## Assembler vs. Compiler

| Aspect       | Assembler              | Compiler                            |
| ------------ | ---------------------- | ----------------------------------- |
| Input        | Assembly language      | High-level language (C, Java, etc.) |
| Output       | Machine code           | Assembly or machine code            |
| Abstraction  | Low-level, 1:1 mapping | High-level, many-to-many mapping    |
| Optimisation | Minimal                | Extensive                           |

---

## References

- Aho, A. V., Lam, M. S., Sethi, R., & Ullman, J. D. (2006). _Compilers: Principles, Techniques, and Tools_ (2nd ed.). Addison-Wesley.
- [Assembler - Wikipedia](https://en.wikipedia.org/wiki/Assembly_language#Assembler)
- Patterson, D. A., & Hennessy, J. L. (2020). _Computer Organization and Design: The Hardware/Software Interface_ (6th ed.). Morgan Kaufmann.
