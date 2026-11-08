# Rarely Needed String Methods

You will hardly ever write these in test code, but you will see them in docs, autocomplete and interview questions. One example each, all checked with Node 22.

| Method | What it does | Use it? |
|:--|:--|:--|
| `.isWellFormed()` | `false` if the string has a lone surrogate (half of an emoji) | Rarely |
| `.toWellFormed()` | Replaces lone surrogates with `�` | Rarely |
| `.normalize(form)` | Unicode normalization: `NFC`, `NFD`, `NFKC`, `NFKD` | When comparing accented text |
| `.valueOf()` / `.toString()` | Returns the primitive string | Almost never by hand |
| `.anchor()`, `.big()`, `.blink()`, `.bold()`, `.fixed()`, `.fontcolor()`, `.fontsize()`, `.italics()`, `.link()`, `.small()`, `.strike()`, `.sub()`, `.sup()` | Legacy HTML wrappers | **Never** |

---

## 1. `.isWellFormed()`

**What a lone surrogate is:** JavaScript strings are stored in 16-bit units. An emoji like `😀` needs two of them (a "surrogate pair"), so `"😀".length` is `2`. Cut the emoji in half and you are left with a lone surrogate: a broken character.

`isWellFormed()` returns `true` when there are no broken halves.

```js
const broken = "😀".slice(0, 1);       // only the first half of the emoji

console.log("Hello 😀".isWellFormed());  // true
console.log(broken.isWellFormed());      // false
```

Available since ES2024 (Node 20+).

## 2. `.toWellFormed()`

Returns a copy of the string with every lone surrogate replaced by `�` (U+FFFD, the replacement character). Useful before passing text to something that rejects broken strings, such as `encodeURIComponent`.

```js
const text = "ab" + "😀".slice(0, 1);

// encodeURIComponent(text);            URIError: URI malformed
console.log(text.toWellFormed());       // ab�
console.log(encodeURIComponent(text.toWellFormed()));   // ab%EF%BF%BD
```

Available since ES2024 (Node 20+).

## 3. `.normalize(form)`

The same visible text can be stored in different ways. `é` can be one character (`é`) or `e` plus a combining accent (`é`). They look identical, but `===` says they are different. `normalize()` converts both to the same form so they compare equal.

```js
const composed   = "caf\u00e9";    // é as one character
const decomposed = "cafe\u0301";   // e + combining accent

console.log(composed, decomposed);                     // café café
console.log(composed === decomposed);                  // false
console.log(composed.length, decomposed.length);       // 4 5
console.log(composed.normalize("NFC") === decomposed.normalize("NFC"));   // true
```

| Form | Meaning | `"café"` / `"ﬁle"` becomes |
|:--|:--|:--|
| `NFC` (default) | Combine into single characters | `é` as one character (length 4) |
| `NFD` | Split into base letter + accent | `e` + accent (length 5) |
| `NFKC` | Like NFC, and also turns look-alike "compatibility" characters into plain ones | the `ﬁ` ligature becomes `fi`: `"ﬁle"` becomes `"file"` |
| `NFKD` | Like NFD, plus the compatibility step | split accents and plain `fi` |

**In tests:** normalize both sides before comparing names or text copied from different sources, for example `actual.normalize() === expected.normalize()`.

## 4. `.valueOf()` / `.toString()`

Both return the plain (primitive) string. JavaScript calls them for you behind the scenes, so you almost never write them. The one place they matter is a `String` object made with `new String(...)`, which is an object, not a string.

```js
const obj = new String("abc");

console.log(typeof obj);             // object
console.log(typeof obj.valueOf());   // string
console.log(obj === "abc");          // false: an object is never === a string
console.log(obj.valueOf() === "abc");// true
console.log("abc".toString());       // abc
```

**Rule:** never use `new String(...)`; write `"abc"` or `String(value)`.

## 5. Legacy HTML wrappers: never use these

These come from the very early web (1990s). Each one wraps the string in an HTML tag and returns that HTML as a string.

| Method | Example | Result |
|:--|:--|:--|
| `.anchor(name)` | `"abc".anchor("top")` | `<a name="top">abc</a>` |
| `.big()` | `"abc".big()` | `<big>abc</big>` |
| `.blink()` | `"abc".blink()` | `<blink>abc</blink>` |
| `.bold()` | `"abc".bold()` | `<b>abc</b>` |
| `.fixed()` | `"abc".fixed()` | `<tt>abc</tt>` |
| `.fontcolor(color)` | `"abc".fontcolor("red")` | `<font color="red">abc</font>` |
| `.fontsize(size)` | `"abc".fontsize(7)` | `<font size="7">abc</font>` |
| `.italics()` | `"abc".italics()` | `<i>abc</i>` |
| `.link(url)` | `"abc".link("https://example.com")` | `<a href="https://example.com">abc</a>` |
| `.small()` | `"abc".small()` | `<small>abc</small>` |
| `.strike()` | `"abc".strike()` | `<strike>abc</strike>` |
| `.sub()` | `"abc".sub()` | `<sub>abc</sub>` |
| `.sup()` | `"abc".sup()` | `<sup>abc</sup>` |

**Why never:**

1. **Deprecated.** They exist only so very old websites keep working.
2. **Obsolete tags.** `<big>`, `<blink>`, `<font>`, `<tt>` and `<strike>` are not valid HTML5.
3. **No escaping.** The text goes into the HTML as-is, which is an XSS risk with user input:

```js
console.log("<img src=x onerror=alert(1)>".bold());
// <b><img src=x onerror=alert(1)></b>   the injected tag survives untouched
```

Use CSS for styling and the DOM (`element.textContent`, `document.createElement`) to build HTML instead.