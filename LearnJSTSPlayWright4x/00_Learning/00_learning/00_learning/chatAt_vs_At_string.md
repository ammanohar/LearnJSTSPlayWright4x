# `'abc'.charAt(i)` vs `'abc'.at(i)`

Both return the character at a position. They only differ for negative indexes and for indexes past the end.

> `chatAt` is a typo: `'abc'.chatAt(0)` throws `TypeError: chatAt is not a function`. The method is `charAt`.

## Same string, different index

| Call on `"abc"` | `charAt()` | `at()` | Same? |
|:--|:--|:--|:--:|
| `(0)` | `"a"` | `"a"` | ✅ |
| `(2)` | `"c"` | `"c"` | ✅ |
| `(-1)` | `""` (empty) | `"c"` (last character) | ❌ |
| `(-3)` | `""` (empty) | `"a"` | ❌ |
| `(5)`, past the end | `""` (empty string) | `undefined` | ❌ |
| `()`, no argument | `"a"` | `"a"` | ✅ |
| `(1.7)` | `"b"` (decimal dropped) | `"b"` | ✅ |

## Feature comparison

| | `charAt(i)` | `at(i)` |
|:--|:--|:--|
| Negative index | Not supported, returns `""` | Counts from the end: `-1` is the last character |
| Index out of range | `""` (still a string) | `undefined` |
| Return type | Always a string | A string, or `undefined` |
| Last character | `s.charAt(s.length - 1)` | `s.at(-1)` |
| Works on arrays too | No, strings only | Yes: `[1, 2, 3].at(-1)` is `3` |
| Available since | The first versions of JavaScript | ES2022 (Node 16.6+ and all modern browsers) |

## Try it

```js
const s = "abc";
console.log(s.charAt(0), s.at(0));     // a a
console.log(s.charAt(-1), s.at(-1));   // "" c
console.log(s.charAt(5), s.at(5));     // "" undefined
```

**Rule of thumb:** use `at()` when you want to count from the end; use `charAt()` when you always want a string back, even for a bad index.