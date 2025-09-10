---
{"publish":true,"title":"C++ Compilation","created":"2025-06-17 09:07","modified":"2025-08-18T12:58:14.452+02:00","tags":["#resource"],"cssclasses":"center-images"}
---


# C++ COMPILATION

---

To compile and run a C++ file a number of steps have to be done first.

## Single File

```bash
g++ file_name.cpp -o file_name
./file_name
```

## Multiple Files

### Without Additional Tools

Similarly to the compilation with a single file, multiple files can be compiled with

```bash
g++ file1.cpp file2.cpp file3.cpp ... -o outfile
./outfile
```

### With Makefiles

For better scaling `Makefiles` are generally used to automate the process.

#### Example

There are currently three files `hellomake.cpp`, `hellomake.hpp` and `hellofunc.cpp`

```make
IDIR =../include
CC=gcc
CFLAGS=-I$(IDIR)

ODIR=obj
LDIR =../lib

LIBS=-lm

_DEPS = hellomake.h
DEPS = $(patsubst %,$(IDIR)/%,$(_DEPS))

_OBJ = hellomake.o hellofunc.o
OBJ = $(patsubst %,$(ODIR)/%,$(_OBJ))


$(ODIR)/%.o: %.c $(DEPS)
	$(CC) -c -o $@ $< $(CFLAGS)

hellomake: $(OBJ)
	$(CC) -o $@ $^ $(CFLAGS) $(LIBS)

.PHONY: clean

clean:
	rm -f $(ODIR)/*.o *~ core $(INCDIR)/*~
```

---

## References
