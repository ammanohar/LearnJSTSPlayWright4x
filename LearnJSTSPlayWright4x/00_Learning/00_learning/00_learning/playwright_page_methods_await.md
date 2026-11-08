# Playwright `page.`: Which Calls Need `await`?

Every method and property on the `page` fixture, and whether it needs `await`:

```ts
test('uses await in a Playwright test', async ({ page }) => {
    await page.goto('https://playwright.dev/');
});
```

Checked against the type definitions of Playwright 1.65.0: 118 members in total. **80 methods return a promise and need `await`**, 28 methods return straight away, and 10 are properties. The tables show required arguments only, so optional ones like `options` are left out.

## The rule

| What it returns | `await`? | Example |
|:--|:-:|:--|
| A promise, because it has to talk to the browser | ✅ Yes | `await page.goto(url)` |
| A value straight away, with no browser round trip | ❌ No | `page.locator('#login')`, `page.url()` |

`page.locator()` does return something: a `Locator`. It returns it immediately and doesn't touch the browser yet, so there is nothing to wait for. The browser work happens when you act on it, and that is where `await` goes:

```ts
await page.goto('https://playwright.dev/');      // Promise: await
const login = page.locator('#login');            // Locator: no await
await login.click();                             // Promise: await

const url = page.url();                          // string: no await
const title = await page.title();                // Promise<string>: await
```

## Mistakes to watch for

| Looks similar | Why it's different |
|:--|:--|
| `page.url()` vs `await page.title()` | `url()` is known locally; `title()` asks the browser |
| `page.isClosed()` vs `await page.isVisible(selector)` | `isClosed()` is known locally; `isVisible()` checks the page |
| `page.keyboard` vs `await page.keyboard.press('Enter')` | The property is plain; its methods are async |
| `page.locator('#a').first()` vs `await page.locator('#a').click()` | `filter`, `first`, `last` and `nth` only build a new `Locator`; actions are async |

- **Forgetting `await` on a promise:** the test moves on before the step finishes, which is a classic cause of flaky tests. The value you get is a `Promise`, not the result.
- **Adding `await` where it isn't needed:** `await page.locator('#a')` runs without an error, but it does nothing useful and misleads the reader.

## No `await`: returns straight away

### Find elements (these build a Locator; nothing happens until you act on it)

| Method | Returns | `await`? | What it does |
|:--|:--|:-:|:--|
| `page.locator(selector)` | `Locator` | ❌ No | Finds elements with a CSS or XPath selector |
| `page.getByRole(role)` | `Locator` | ❌ No | Finds by ARIA role, like `button` or `link` |
| `page.getByText(text)` | `Locator` | ❌ No | Finds by the text an element contains |
| `page.getByLabel(text)` | `Locator` | ❌ No | Finds an input by its label |
| `page.getByPlaceholder(text)` | `Locator` | ❌ No | Finds an input by its placeholder |
| `page.getByAltText(text)` | `Locator` | ❌ No | Finds by alt text, usually images |
| `page.getByTitle(text)` | `Locator` | ❌ No | Finds by the `title` attribute |
| `page.getByTestId(testId)` | `Locator` | ❌ No | Finds by `data-testid` |
| `page.getByRef(ref)` | `Locator` | ❌ No | Finds by an aria ref (like `e2`) from `ariaSnapshot()` |
| `page.frameLocator(selector?)` | `FrameLocator` | ❌ No | Enters an iframe so you can locate inside it |

### Page information

| Method | Returns | `await`? | What it does |
|:--|:--|:-:|:--|
| `page.url()` | `string` | ❌ No | The current URL |
| `page.viewportSize()` | `{ width, height } \| null` | ❌ No | The viewport width and height |
| `page.isClosed()` | `boolean` | ❌ No | Whether the page has been closed |
| `page.context()` | `BrowserContext` | ❌ No | The browser context this page belongs to |
| `page.mainFrame()` | `Frame` | ❌ No | The page's main frame |
| `page.frames()` | `Frame[]` | ❌ No | All frames attached to the page |
| `page.frame(frameSelector)` | `Frame \| null` | ❌ No | One frame, by name or URL |
| `page.video()` | `Video \| null` | ❌ No | The video object, when video recording is on |
| `page.workers()` | `Worker[]` | ❌ No | The page's dedicated web workers |

### Settings

| Method | Returns | `await`? | What it does |
|:--|:--|:-:|:--|
| `page.setDefaultTimeout(timeout)` | `void` | ❌ No | Sets the default timeout for methods with a `timeout` option |
| `page.setDefaultNavigationTimeout(timeout)` | `void` | ❌ No | Sets the default timeout for navigation methods |

### Event listeners (they return the page, so calls can be chained)

| Method | Returns | `await`? | What it does |
|:--|:--|:-:|:--|
| `page.on(event, listener)` | `this` | ❌ No | Runs a listener every time an event fires |
| `page.once(event, listener)` | `this` | ❌ No | Runs a listener once, then removes it |
| `page.off(event, listener)` | `this` | ❌ No | Removes a listener |
| `page.addListener(event, listener)` | `this` | ❌ No | Same as `on` |
| `page.removeListener(event, listener)` | `this` | ❌ No | Same as `off` |
| `page.prependListener(event, listener)` | `this` | ❌ No | Like `on`, but runs before the other listeners |
| `page.removeAllListeners(event?)` | `this` | ❌ No | Removes all listeners. Returns a promise only when you pass `options`, so `await` it then |

## Properties: no `await` on the property, but `await` its methods

| Property | Type | `await` the property? | Example (the method needs `await`) | What it is |
|:--|:--|:-:|:--|:--|
| `page.keyboard` | `Keyboard` | ❌ No | `await page.keyboard.press('Enter')` | Keyboard input |
| `page.mouse` | `Mouse` | ❌ No | `await page.mouse.click(10, 20)` | Mouse input |
| `page.touchscreen` | `Touchscreen` | ❌ No | `await page.touchscreen.tap(10, 20)` | Touch input |
| `page.request` | `APIRequestContext` | ❌ No | `await page.request.get(url)` | API calls that share the page's context |
| `page.clock` | `Clock` | ❌ No | `await page.clock.install()` | Fakes the clock and passage of time |
| `page.localStorage` | `WebStorage` | ❌ No | `await page.localStorage.getItem('token')` | The page's `localStorage` |
| `page.sessionStorage` | `WebStorage` | ❌ No | `await page.sessionStorage.getItem('flag')` | The page's `sessionStorage` |
| `page.coverage` | `Coverage` | ❌ No | `await page.coverage.startJSCoverage()` | Code coverage, Chromium only |
| `page.screencast` | `Screencast` | ❌ No | `await page.screencast.start({ onFrame })` | Streams frames of the page |
| `page.webmcp` | `WebMCP` | ❌ No | `await page.webmcp.tools()` | Tools the page registers through the experimental WebMCP API |

## `await` needed: returns a promise

### Navigation and page lifecycle

| Method | Returns | `await`? | What it does |
|:--|:--|:-:|:--|
| `page.goto(url)` | `Promise<Response \| null>` | ✅ Yes | Opens a URL |
| `page.reload()` | `Promise<Response \| null>` | ✅ Yes | Reloads the page |
| `page.goBack()` | `Promise<Response \| null>` | ✅ Yes | Goes back one page in history |
| `page.goForward()` | `Promise<Response \| null>` | ✅ Yes | Goes forward one page in history |
| `page.close()` | `Promise<void>` | ✅ Yes | Closes the page |
| `page.bringToFront()` | `Promise<void>` | ✅ Yes | Brings the tab to the front |
| `page.setContent(html)` | `Promise<void>` | ✅ Yes | Replaces the page's HTML |
| `page.opener()` | `Promise<Page \| null>` | ✅ Yes | The page that opened this popup, or `null` |

### Read from the page

| Method | Returns | `await`? | What it does |
|:--|:--|:-:|:--|
| `page.title()` | `Promise<string>` | ✅ Yes | The page title |
| `page.content()` | `Promise<string>` | ✅ Yes | The page's full HTML |
| `page.screenshot()` | `Promise<Buffer>` | ✅ Yes | Takes a screenshot |
| `page.pdf()` | `Promise<Buffer>` | ✅ Yes | Creates a PDF of the page |
| `page.ariaSnapshot()` | `Promise<string>` | ✅ Yes | Accessibility snapshot of the page |
| `page.ariaSnapshotJSON()` | `Promise<Serializable>` | ✅ Yes | Accessibility snapshot as a JSON object |
| `page.consoleMessages()` | `Promise<ConsoleMessage[]>` | ✅ Yes | Up to the last 200 console messages |
| `page.clearConsoleMessages()` | `Promise<void>` | ✅ Yes | Clears the stored console messages |
| `page.pageErrors()` | `Promise<Error[]>` | ✅ Yes | Up to the last 200 page errors |
| `page.clearPageErrors()` | `Promise<void>` | ✅ Yes | Clears the stored page errors |
| `page.requests()` | `Promise<Request[]>` | ✅ Yes | Up to the last 100 network requests |

### Wait for something

| Method | Returns | `await`? | What it does |
|:--|:--|:-:|:--|
| `page.waitForURL(url)` | `Promise<void>` | ✅ Yes | Waits until the URL matches |
| `page.waitForResponse(urlOrPredicate)` | `Promise<Response>` | ✅ Yes | Waits for a matching network response |
| `page.waitForRequest(urlOrPredicate)` | `Promise<Request>` | ✅ Yes | Waits for a matching network request |
| `page.waitForEvent(event)` | `Promise<event data>` | ✅ Yes | Waits for a page event, like `popup` or `download` |
| `page.waitForFunction(pageFunction)` | `Promise<JSHandle>` | ✅ Yes | Waits until a function in the page returns a truthy value |
| `page.waitForLoadState(state?)` | `Promise<void>` | ✅ Yes | Waits for a load state. Usually not needed, because actions auto-wait |
| `page.waitForSelector(selector)` | `Promise<ElementHandle \| null>` | ✅ Yes | Waits for a selector. The docs say to use web assertions or `locator.waitFor()` instead |
| `page.waitForTimeout(timeout)` | `Promise<void>` | ✅ Yes | Waits a fixed time. The docs say never to use it in production: tests get flaky |
| `page.waitForNavigation()` | `Promise<Response \| null>` | ✅ Yes | **Deprecated.** Use `waitForURL()` instead |

### Run JavaScript and inject code

| Method | Returns | `await`? | What it does |
|:--|:--|:-:|:--|
| `page.evaluate(pageFunction)` | `Promise<result>` | ✅ Yes | Runs a function in the page and returns its result |
| `page.evaluateHandle(pageFunction)` | `Promise<JSHandle>` | ✅ Yes | Like `evaluate`, but returns a handle |
| `page.$eval(selector, pageFunction)` | `Promise<result>` | ✅ Yes | Runs a function on the first match. The docs recommend `locator.evaluate()` |
| `page.$$eval(selector, pageFunction)` | `Promise<result>` | ✅ Yes | Runs a function on all matches. The docs recommend `locator.evaluateAll()` |
| `page.addInitScript(script)` | `Promise<Disposable>` | ✅ Yes | Adds a script that runs on every navigation |
| `page.addScriptTag()` | `Promise<ElementHandle>` | ✅ Yes | Adds a `<script>` tag |
| `page.addStyleTag()` | `Promise<ElementHandle>` | ✅ Yes | Adds a stylesheet |
| `page.exposeFunction(name, callback)` | `Promise<Disposable>` | ✅ Yes | Adds a function to `window` that calls back into your test |
| `page.exposeBinding(name, playwrightBinding)` | `Promise<Disposable>` | ✅ Yes | Like `exposeFunction`, and it also receives page details |

### Network

| Method | Returns | `await`? | What it does |
|:--|:--|:-:|:--|
| `page.route(url, handler)` | `Promise<Disposable>` | ✅ Yes | Intercepts and changes matching requests |
| `page.routeFromHAR(har)` | `Promise<void>` | ✅ Yes | Serves requests from a HAR file |
| `page.routeWebSocket(url, handler)` | `Promise<void>` | ✅ Yes | Intercepts and changes WebSocket connections |
| `page.unroute(url)` | `Promise<void>` | ✅ Yes | Removes a route |
| `page.unrouteAll()` | `Promise<void>` | ✅ Yes | Removes all routes |
| `page.setExtraHTTPHeaders(headers)` | `Promise<void>` | ✅ Yes | Adds headers to every request the page makes |

### Browser settings, overlays and debugging

| Method | Returns | `await`? | What it does |
|:--|:--|:-:|:--|
| `page.setViewportSize(viewportSize)` | `Promise<void>` | ✅ Yes | Resizes the viewport |
| `page.emulateMedia()` | `Promise<void>` | ✅ Yes | Changes the CSS media type and color scheme |
| `page.addLocatorHandler(locator, handler)` | `Promise<void>` | ✅ Yes | Runs a handler when an overlay, like a sign-up dialog, blocks an action |
| `page.removeLocatorHandler(locator)` | `Promise<void>` | ✅ Yes | Removes those handlers |
| `page.pause()` | `Promise<void>` | ✅ Yes | Pauses the script for debugging (headed mode) |
| `page.pickLocator()` | `Promise<Locator>` | ✅ Yes | Hover and click an element to get its locator |
| `page.cancelPickLocator()` | `Promise<void>` | ✅ Yes | Cancels `pickLocator()` |
| `page.hideHighlight()` | `Promise<void>` | ✅ Yes | Hides overlays added by `locator.highlight()` |
| `page.requestGC()` | `Promise<void>` | ✅ Yes | Asks the page to run garbage collection |

### Actions by selector (the docs say to use the Locator version instead)

| Method | Returns | `await`? | What it does |
|:--|:--|:-:|:--|
| `page.click(selector)` | `Promise<void>` | ✅ Yes | Clicks an element |
| `page.dblclick(selector)` | `Promise<void>` | ✅ Yes | Double-clicks an element |
| `page.fill(selector, value)` | `Promise<void>` | ✅ Yes | Fills an input |
| `page.check(selector)` | `Promise<void>` | ✅ Yes | Checks a checkbox or radio |
| `page.uncheck(selector)` | `Promise<void>` | ✅ Yes | Unchecks a checkbox |
| `page.setChecked(selector, checked)` | `Promise<void>` | ✅ Yes | Checks or unchecks, based on a boolean |
| `page.hover(selector)` | `Promise<void>` | ✅ Yes | Hovers over an element |
| `page.focus(selector)` | `Promise<void>` | ✅ Yes | Focuses an element |
| `page.tap(selector)` | `Promise<void>` | ✅ Yes | Taps an element |
| `page.press(selector, key)` | `Promise<void>` | ✅ Yes | Presses a key on an element |
| `page.selectOption(selector, values)` | `Promise<string[]>` | ✅ Yes | Picks an option in a `<select>` |
| `page.setInputFiles(selector, files)` | `Promise<void>` | ✅ Yes | Sets the files of a file input |
| `page.dispatchEvent(selector, type)` | `Promise<void>` | ✅ Yes | Fires a DOM event on an element |

### Reads by selector (the docs say to use the Locator version instead)

| Method | Returns | `await`? | What it does |
|:--|:--|:-:|:--|
| `page.getAttribute(selector, name)` | `Promise<string \| null>` | ✅ Yes | An attribute's value |
| `page.innerHTML(selector)` | `Promise<string>` | ✅ Yes | The element's `innerHTML` |
| `page.innerText(selector)` | `Promise<string>` | ✅ Yes | The element's `innerText` |
| `page.textContent(selector)` | `Promise<string \| null>` | ✅ Yes | The element's `textContent` |
| `page.inputValue(selector)` | `Promise<string>` | ✅ Yes | The value of an input |
| `page.isChecked(selector)` | `Promise<boolean>` | ✅ Yes | Whether it is checked |
| `page.isDisabled(selector)` | `Promise<boolean>` | ✅ Yes | Whether it is disabled |
| `page.isEditable(selector)` | `Promise<boolean>` | ✅ Yes | Whether it is editable |
| `page.isEnabled(selector)` | `Promise<boolean>` | ✅ Yes | Whether it is enabled |
| `page.isHidden(selector)` | `Promise<boolean>` | ✅ Yes | Whether it is hidden |
| `page.isVisible(selector)` | `Promise<boolean>` | ✅ Yes | Whether it is visible |
| `page.$(selector)` | `Promise<ElementHandle \| null>` | ✅ Yes | The first matching element handle, or `null` |
| `page.$$(selector)` | `Promise<ElementHandle[]>` | ✅ Yes | All matching element handles |

### Other actions

| Method | Returns | `await`? | What it does |
|:--|:--|:-:|:--|
| `page.dragAndDrop(source, target)` | `Promise<void>` | ✅ Yes | Drags one element onto another |
| `page.type(selector, text)` | `Promise<void>` | ✅ Yes | **Deprecated.** Use `locator.fill()`, or `locator.pressSequentially()` for key-by-key typing |