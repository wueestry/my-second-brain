---
{"publish":true,"title":"C++ Compilation","created":"2025-06-17 09:07","modified":"2025-11-03T20:36:25.729+01:00","tags":["computer-science/programming/cpp/compilation"],"cssclasses":"center-images"}
---


# C++ COMPILATION

---

C++ compilation is the process of transforming human-readable source code into executable machine code. The compilation process involves multiple stages: preprocessing, compilation, assembly, and linking. Understanding this process is essential for managing large projects and debugging build issues.

## Compilation Stages

1. **Preprocessing**: Handles directives (`#include`, `#define`, `#ifdef`)
2. **Compilation**: Converts C++ code to assembly language
3. **Assembly**: Converts assembly to object code (`.o` or `.obj` files)
4. **Linking**: Combines object files and libraries into an executable

## Basic Compilation

### Single File

Compile and run a single C++ source file:

```bash
g++ program.cpp -o program
./program
```

With common flags:

```bash
# Enable warnings and C++17 standard
g++ -Wall -Wextra -std=c++17 program.cpp -o program

# Debug symbols for debugging
g++ -g program.cpp -o program

# Optimization for release
g++ -O2 program.cpp -o program
```

### Multiple Files

Compile multiple source files in one command:

```bash
g++ main.cpp utils.cpp math.cpp -o program
./program
```

Separate compilation (compile to object files first, then link):

```bash
# Compile to object files
g++ -c main.cpp -o main.o
g++ -c utils.cpp -o utils.o
g++ -c math.cpp -o math.o

# Link object files
g++ main.o utils.o math.o -o program
```

**Advantage**: Only recompile changed files, not the entire project.

## Common Compiler Flags

| Flag                          | Purpose                                  |
| ----------------------------- | ---------------------------------------- |
| `-o <name>`                   | Specify output filename                  |
| `-c`                          | Compile to object file only (no linking) |
| `-Wall`                       | Enable common warnings                   |
| `-Wextra`                     | Enable additional warnings               |
| `-Werror`                     | Treat warnings as errors                 |
| `-g`                          | Include debug information                |
| `-O0` / `-O1` / `-O2` / `-O3` | Optimization levels (0=none, 3=max)      |
| `-std=c++11/14/17/20`         | Specify C++ standard                     |
| `-I<dir>`                     | Add include directory                    |
| `-L<dir>`                     | Add library directory                    |
| `-l<lib>`                     | Link with library                        |

## Build Systems

### Makefiles

Automate compilation with dependency tracking:

```make
# Compiler and flags
CXX = g++
CXXFLAGS = -Wall -Wextra -std=c++17 -O2

# Directories
SRCDIR = src
OBJDIR = obj
BINDIR = bin

# Files
SOURCES = $(wildcard $(SRCDIR)/*.cpp)
OBJECTS = $(SOURCES:$(SRCDIR)/%.cpp=$(OBJDIR)/%.o)
TARGET = $(BINDIR)/program

# Default target
all: $(TARGET)

# Link
$(TARGET): $(OBJECTS)
	@mkdir -p $(BINDIR)
	$(CXX) $(OBJECTS) -o $(TARGET)

# Compile
$(OBJDIR)/%.o: $(SRCDIR)/%.cpp
	@mkdir -p $(OBJDIR)
	$(CXX) $(CXXFLAGS) -c $< -o $@

# Clean
clean:
	rm -rf $(OBJDIR) $(BINDIR)

.PHONY: all clean
```

Run with:

```bash
make          # Build project
make clean    # Remove build artifacts
```

### CMake

Modern cross-platform build system:

```cmake
# CMakeLists.txt
cmake_minimum_required(VERSION 3.10)
project(MyProject)

# Set C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Add executable
add_executable(program
    src/main.cpp
    src/utils.cpp
    src/math.cpp
)

# Include directories
target_include_directories(program PRIVATE include)

# Link libraries (if needed)
# target_link_libraries(program pthread)
```

Build with:

```bash
mkdir build && cd build
cmake ..
make
./program
```

## Header Files and Include Guards

Prevent multiple inclusion:

```cpp
// utils.h
#ifndef UTILS_H
#define UTILS_H

void utilityFunction();

#endif // UTILS_H
```

Or use `#pragma once` (simpler, but non-standard):

```cpp
// utils.h
#pragma once

void utilityFunction();
```

## Linking Libraries

### Static Libraries (`.a` on Linux, `.lib` on Windows)

```bash
# Create static library
g++ -c lib.cpp -o lib.o
ar rcs libmylib.a lib.o

# Link with static library
g++ main.cpp -L. -lmylib -o program
```

### Dynamic/Shared Libraries (`.so` on Linux, `.dll` on Windows)

```bash
# Create shared library
g++ -fPIC -shared lib.cpp -o libmylib.so

# Link with shared library
g++ main.cpp -L. -lmylib -o program

# Run (may need LD_LIBRARY_PATH)
export LD_LIBRARY_PATH=.:$LD_LIBRARY_PATH
./program
```

## Common Issues

1. **Undefined reference errors**: Missing source files or libraries during linking
2. **Multiple definition errors**: Same symbol defined in multiple files
3. **Header not found**: Missing include directories (`-I` flag)
4. **Library not found**: Missing library directories (`-L` flag) or library name (`-l` flag)

---

## References

- Stroustrup, B. (2013). _The C++ Programming Language_ (4th ed.). Addison-Wesley.
- [GCC Documentation](https://gcc.gnu.org/onlinedocs/)
- [CMake Tutorial](https://cmake.org/cmake/help/latest/guide/tutorial/)
- [GNU Make Manual](https://www.gnu.org/software/make/manual/)
