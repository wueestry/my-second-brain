---
{"publish":true,"title":"Vim Motions","created":"2025-03-30 16:18","modified":"2025-09-17T07:13:03.946+02:00","tags":["markdown","terminal","productivity","editor","text-editing","coding"],"cssclasses":"center-images"}
---


# VIM MOTIONS

---

List of the vim motions to make programming more efficient.

## Modes

Vim has three modes:

- **Normal Mode**: Command centre for issuing instructions
- **Insert Mode**: Actual code writing
- **Visual Mode**: Select and manipulate text visually

## Cursor Movements

Prefix a cursor movement command with a number to repeat it.

### Basic Movements

| Key  | Explanation                          |
| ---- | ------------------------------------ |
| `h`  | move cursor left                     |
| `j`  | move cursor down                     |
| `k`  | move cursor up                       |
| `l`  | move cursor right                    |
| `gj` | move cursor down (_multi-line text_) |
| `gk` | move cursor up (_multi-line text_)   |

### Word Navigation

| Key  | Explanation                                            |
| ---- | ------------------------------------------------------ |
| `w`  | jump forwards to start of a word                       |
| `W`  | jump forwards to start of a word (_with punctuation_)  |
| `e`  | jump forwards to end of a word                         |
| `E`  | jump forwards to end of a word (_with punctuation_)    |
| `b`  | jump backwards to start of a word                      |
| `B`  | jump backwards to start of a word (_with punctuation_) |
| `ge` | jump backwards to end of a word                        |
| `gE` | jump backwards to end of a word (_with punctuation_)   |

### Line Navigation

| Key  | Explanation                               |
| ---- | ----------------------------------------- |
| `0`  | jump to start of line                     |
| `^`  | jump to first non-blank character of line |
| `$`  | jump to end of line                       |
| `g_` | jump to last non-blank character of line  |

### Document Navigation

| Key           | Explanation                                             |
| ------------- | ------------------------------------------------------- |
| `%`           | move cursor to matching character (_bracket_)           |
| `gg`          | go to first line of document                            |
| `G`           | go to last line of document                             |
| `5gg` or `5G` | go to line 5                                            |
| `gd`          | move to _local_ declaration                             |
| `gD`          | move to _global_ declaration                            |
| `fx`          | move to next occurrence of character `x`                |
| `tx`          | move to _before_ next occurrence of character `x`       |
| `Fx`          | move to previous occurrence of character `x`            |
| `Tx`          | move to _before_ previous occurrence of character `x`   |
| `;`           | repeat previous `f`, `t`, `F`, `T` movement             |
| `,`           | repeat previous `f`, `t`, `F`, `T` movement _backwards_ |
| `}`           | jump to next paragraph                                  |
| `{`           | jump to previous paragraph                              |
| `zz`          | centre cursor on screen                                 |
| `zt`          | position cursor on top of screen                        |
| `zb`          | position cursor on bottom of screen                     |
| `Ctrl + e`    | move screen up one page                                 |
| `Ctrl + f`    | move screen down one page                               |
| `Ctrl + d`    | move cursor and screen down 1/2 page                    |
| `Ctrl + u`    | move cursor and screen up 1/2 page                      |

## Insert mode

| Key                 | Explanation                                    |
| ------------------- | ---------------------------------------------- |
| `i`                 | insert before cursor                           |
| `I`                 | insert at beginning of line                    |
| `a`                 | append after cursor                            |
| `A`                 | append at end of line                          |
| `o`                 | open a new line below current                  |
| `O`                 | open a new line above current                  |
| `ea`                | append at the end of word                      |
| `Ctrl + h`          | delete character before cursor (_insert mode_) |
| `Ctrl + w`          | delete word before cursor (_insert mode_)      |
| `Ctrl + j`          | add line break after cursor (_insert mode_)    |
| `Ctrl + t`          | indent line one shiftwidth (_insert mode_)     |
| `Ctrl + d`          | de-indent line one shiftwidth (_insert mode_)  |
| `Esc` or `Ctrl + c` | exit insert mode                               |

## Editing

| Key          | Explanation                                              |
| ------------ | -------------------------------------------------------- |
| `r`          | replace a single character                               |
| `R`          | replace more than one character (until `Esc` is pressed) |
| `J`          | join line below to current one with one space between    |
| `gJ`         | join line below to current one _without_ space between   |
| `gwip`       | reflow paragraph                                         |
| `g~`         | switch case up to motion                                 |
| `gu`         | change to lowercase up to motion                         |
| `gU`         | change to uppercase up to motion                         |
| `cc`         | change entire line                                       |
| `c$` or `C`  | change to end of line                                    |
| `ciw`        | change entire word                                       |
| `cw` or `ce` | change to end of word                                    |
| `s`          | delete character and subsitute text (same as `cl`)       |
| `S`          | delete line and subsitute text (same as `cc`)            |
| `xp`         | transpose two letters                                    |
| `u`          | undo                                                     |
| `U`          | restore last changed line                                |
| `Ctrl + r`   | redo                                                     |
| `.`          | repeate last command                                     |

## Marking Text (Visual Mode)

| Key                 | Explanation                      |
| ------------------- | -------------------------------- |
| `v`                 | start visual mode                |
| `V`                 | start _linewise_ visual mode     |
| `o`                 | move to other end of marked area |
| `Ctrl + v`          | start visual _block_ mode        |
| `O`                 | move to other corner of block    |
| `aw`                | mark a word                      |
| `ab` or `a(`        | a block with `()`                |
| `aB` or `a{`        | a block with `{}`                |
| `at`                | a block with `<>` tags           |
| `ib` or `i(`        | inner block with `()`            |
| `iB` or `i{`        | inner block with `{}`            |
| `it`                | inner block with `<>` tags       |
| `Esc` or `Ctrl + c` | exit visual mode                 |

## Visual Commands

| Keys | Explanation                     |
| ---- | ------------------------------- |
| `>`  | shift text right                |
| `<`  | shift text left                 |
| `y`  | yank (copy) marked text         |
| `d`  | delete marked text              |
| `~`  | switch case                     |
| `u`  | change marked text to lowercase |
| `U`  | change marked text to uppercase |

## Registers

| Keys           | Explanation                              |
| -------------- | ---------------------------------------- |
| `:reg[isters]` | show registers content                   |
| `"xy`          | yank into register x                     |
| `"xp`          | paste contents of register x             |
| `+y`           | yank into the system clipboard register  |
| `+p`           | paste from the system clipboard register |

---

## References
