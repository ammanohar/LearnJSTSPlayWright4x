<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Object Reference Copy (ELI5)</title>
<style>
  :root {
    --bg: #FAF7F0; --card: #ffffff; --ink: #1F2937; --muted: #6B7280;
    --yellow: #F7DF1E; --yellow-soft: #FEF9C3; --green: #059669; --green-soft: #D1FAE5;
    --red: #DC2626; --red-soft: #FEE2E2; --amber: #D97706; --line: #E5E0D5; --code-bg: #F3F0E8;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #17171A; --card: #222228; --ink: #F3F4F6; --muted: #A1A1AA;
      --yellow-soft: #3A3410; --green-soft: #0F2E25; --red-soft: #3A1717; --line: #34343C; --code-bg: #2A2A31;
    }
  }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--bg); color: var(--ink); font: 17px/1.6 -apple-system, system-ui, "Segoe UI", sans-serif; }
  main { max-width: 920px; margin: 0 auto; padding: 32px 16px 64px; }
  h1 { font-size: 2rem; line-height: 1.2; margin: 0 0 8px; }
  h2 { font-size: 1.35rem; margin: 40px 0 12px; }
  .lead { font-size: 1.15rem; color: var(--muted); margin: 0 0 24px; }
  code, pre { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
  code { background: var(--code-bg); padding: 1px 6px; border-radius: 5px; font-size: .92em; }
  pre { background: var(--code-bg); padding: 16px; border-radius: 10px; overflow-x: auto; margin: 0; font-size: .95rem; line-height: 1.5; }
  pre code { background: none; padding: 0; }
  .card { background: var(--card); border: 1px solid var(--line); border-radius: 14px; padding: 20px; margin: 16px 0; }
  .analogy { border-left: 6px solid var(--yellow); }
  .steps { display: grid; gap: 16px; }
  .step { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; align-items: center; }
  .step .num { display: inline-block; background: var(--yellow); color: #1F2937; font-weight: 700; border-radius: 999px; width: 28px; height: 28px; text-align: center; line-height: 28px; margin-right: 8px; }
  .step p { margin: 8px 0 0; color: var(--muted); }
  svg { width: 100%; height: auto; display: block; }
  svg text { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
  .svg-ink { fill: var(--ink); }
  .svg-muted { fill: var(--muted); }
  .svg-card { fill: var(--card); stroke: var(--ink); }
  .svg-arrow { stroke: var(--ink); }
  .result { font-size: 1.1rem; font-weight: 600; }
  .bad { color: var(--red); } .good { color: var(--green); }
  table { border-collapse: collapse; width: 100%; }
  th, td { border: 1px solid var(--line); padding: 8px 10px; text-align: left; vertical-align: top; }
  th { background: var(--code-bg); }
  .tip { background: var(--green-soft); border: 1px solid var(--green); border-radius: 12px; padding: 14px 18px; }
  @media (max-width: 640px) { .step { grid-template-columns: 1fr; } }
</style>
</head>
<body>
<main>

<h1>Why does <code>a.status</code> say "fail"?</h1>
<p class="lead">You never touched <code>a</code>, yet it changed. Here is why, explained like you are 5, with pictures.</p>

<pre><code>let a = { status: "pass" };
let b = a;  //Copy the reference
b.status = "fail";
console.log(a.status);   // fail  (not pass!)</code></pre>

<div class="card analogy">
  <strong>The toy box story.</strong>
  Imagine one toy box with a note inside that says <strong>"pass"</strong>.
  You stick a name label <strong>a</strong> on the box. Then your friend sticks a second label, <strong>b</strong>, on the <em>same</em> box.
  Your friend opens the box using label b and changes the note to <strong>"fail"</strong>.
  Now you open the box using label a... and you find <strong>"fail"</strong>. Of course! There was only ever <strong>one box</strong>.
</div>

<h2>Step by step</h2>
<div class="steps">

  <!-- Step 1 -->
  <div class="card step">
    <div>
      <div><span class="num">1</span><code>let a = { status: "pass" };</code></div>
      <p>JavaScript builds one object (the box) somewhere in memory and gives <code>a</code> the address of that box.</p>
    </div>
    <svg viewBox="0 0 360 150" role="img" aria-label="Label a points to one box holding status pass">
      <defs><marker id="ar1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1F2937"/></marker></defs>
      <rect x="10" y="50" width="60" height="40" rx="8" fill="#F7DF1E" stroke="#1F2937" stroke-width="2"/>
      <text x="40" y="76" text-anchor="middle" font-size="20" font-weight="700" fill="#1F2937">a</text>
      <line x1="72" y1="70" x2="168" y2="70" stroke="#1F2937" stroke-width="2.5" marker-end="url(#ar1)"/>
      <rect x="172" y="30" width="170" height="80" rx="12" fill="#D1FAE5" stroke="#059669" stroke-width="2.5"/>
      <text x="257" y="76" text-anchor="middle" font-size="17" fill="#064E3B">status: "pass"</text>
      <text x="257" y="130" text-anchor="middle" font-size="13" class="svg-muted">one object in memory</text>
    </svg>
  </div>

  <!-- Step 2 -->
  <div class="card step">
    <div>
      <div><span class="num">2</span><code>let b = a;</code></div>
      <p>This does <strong>not</strong> build a second box. It copies the <em>address</em>, so <code>b</code> points at the very same box.</p>
    </div>
    <svg viewBox="0 0 360 150" role="img" aria-label="Labels a and b both point to the same box">
      <defs><marker id="ar2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1F2937"/></marker></defs>
      <rect x="10" y="22" width="60" height="40" rx="8" fill="#F7DF1E" stroke="#1F2937" stroke-width="2"/>
      <text x="40" y="48" text-anchor="middle" font-size="20" font-weight="700" fill="#1F2937">a</text>
      <rect x="10" y="88" width="60" height="40" rx="8" fill="#F7DF1E" stroke="#1F2937" stroke-width="2"/>
      <text x="40" y="114" text-anchor="middle" font-size="20" font-weight="700" fill="#1F2937">b</text>
      <line x1="72" y1="42" x2="168" y2="64" stroke="#1F2937" stroke-width="2.5" marker-end="url(#ar2)"/>
      <line x1="72" y1="108" x2="168" y2="80" stroke="#1F2937" stroke-width="2.5" marker-end="url(#ar2)"/>
      <rect x="172" y="32" width="170" height="80" rx="12" fill="#D1FAE5" stroke="#059669" stroke-width="2.5"/>
      <text x="257" y="78" text-anchor="middle" font-size="17" fill="#064E3B">status: "pass"</text>
      <text x="257" y="138" text-anchor="middle" font-size="13" class="svg-muted">still only ONE box</text>
    </svg>
  </div>

  <!-- Step 3 -->
  <div class="card step">
    <div>
      <div><span class="num">3</span><code>b.status = "fail";</code></div>
      <p>Using label <code>b</code>, we open the box and change what is inside. The box itself is the one <code>a</code> also points to.</p>
    </div>
    <svg viewBox="0 0 360 150" role="img" aria-label="Through b, the shared box changes to status fail">
      <defs><marker id="ar3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1F2937"/></marker>
        <marker id="ar3r" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#DC2626"/></marker></defs>
      <rect x="10" y="22" width="60" height="40" rx="8" fill="#F7DF1E" stroke="#1F2937" stroke-width="2"/>
      <text x="40" y="48" text-anchor="middle" font-size="20" font-weight="700" fill="#1F2937">a</text>
      <rect x="10" y="88" width="60" height="40" rx="8" fill="#F7DF1E" stroke="#DC2626" stroke-width="3"/>
      <text x="40" y="114" text-anchor="middle" font-size="20" font-weight="700" fill="#1F2937">b</text>
      <line x1="72" y1="42" x2="168" y2="64" stroke="#1F2937" stroke-width="2.5" marker-end="url(#ar3)"/>
      <line x1="72" y1="108" x2="168" y2="80" stroke="#DC2626" stroke-width="3" marker-end="url(#ar3r)"/>
      <rect x="172" y="32" width="170" height="80" rx="12" fill="#FEE2E2" stroke="#DC2626" stroke-width="2.5"/>
      <text x="257" y="78" text-anchor="middle" font-size="17" fill="#7F1D1D">status: "fail"</text>
      <text x="257" y="138" text-anchor="middle" font-size="13" class="svg-muted">changed through b</text>
    </svg>
  </div>

  <!-- Step 4 -->
  <div class="card step">
    <div>
      <div><span class="num">4</span><code>console.log(a.status);</code></div>
      <p>We look in the box through label <code>a</code>. Same box, so we see the change.</p>
      <p class="result bad">Output: fail</p>
    </div>
    <svg viewBox="0 0 360 150" role="img" aria-label="Reading through a shows fail">
      <defs><marker id="ar4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1F2937"/></marker></defs>
      <rect x="10" y="22" width="60" height="40" rx="8" fill="#F7DF1E" stroke="#1F2937" stroke-width="3"/>
      <text x="40" y="48" text-anchor="middle" font-size="20" font-weight="700" fill="#1F2937">a</text>
      <rect x="10" y="88" width="60" height="40" rx="8" fill="#F7DF1E" stroke="#1F2937" stroke-width="2"/>
      <text x="40" y="114" text-anchor="middle" font-size="20" font-weight="700" fill="#1F2937">b</text>
      <line x1="72" y1="42" x2="168" y2="64" stroke="#1F2937" stroke-width="3" marker-end="url(#ar4)"/>
      <line x1="72" y1="108" x2="168" y2="80" stroke="#1F2937" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#ar4)"/>
      <rect x="172" y="32" width="170" height="80" rx="12" fill="#FEE2E2" stroke="#DC2626" stroke-width="2.5"/>
      <text x="257" y="78" text-anchor="middle" font-size="17" fill="#7F1D1D">status: "fail"</text>
      <text x="257" y="138" text-anchor="middle" font-size="13" class="svg-muted">a.status is "fail"</text>
    </svg>
  </div>
</div>

<h2>How to make a real copy (two boxes)</h2>
<div class="card step">
  <div>
    <pre><code>let a = { status: "pass" };
let b = { ...a };   // spread: a NEW box with the same contents
b.status = "fail";
console.log(a.status);   // pass
console.log(b.status);   // fail</code></pre>
    <p class="result good">Now a stays "pass".</p>
  </div>
  <svg viewBox="0 0 360 170" role="img" aria-label="With spread, a and b point to two separate boxes">
    <defs><marker id="ar5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1F2937"/></marker></defs>
    <rect x="10" y="20" width="60" height="40" rx="8" fill="#F7DF1E" stroke="#1F2937" stroke-width="2"/>
    <text x="40" y="46" text-anchor="middle" font-size="20" font-weight="700" fill="#1F2937">a</text>
    <line x1="72" y1="40" x2="168" y2="40" stroke="#1F2937" stroke-width="2.5" marker-end="url(#ar5)"/>
    <rect x="172" y="10" width="170" height="60" rx="12" fill="#D1FAE5" stroke="#059669" stroke-width="2.5"/>
    <text x="257" y="46" text-anchor="middle" font-size="17" fill="#064E3B">status: "pass"</text>
    <rect x="10" y="110" width="60" height="40" rx="8" fill="#F7DF1E" stroke="#1F2937" stroke-width="2"/>
    <text x="40" y="136" text-anchor="middle" font-size="20" font-weight="700" fill="#1F2937">b</text>
    <line x1="72" y1="130" x2="168" y2="130" stroke="#1F2937" stroke-width="2.5" marker-end="url(#ar5)"/>
    <rect x="172" y="100" width="170" height="60" rx="12" fill="#FEE2E2" stroke="#DC2626" stroke-width="2.5"/>
    <text x="257" y="136" text-anchor="middle" font-size="17" fill="#7F1D1D">status: "fail"</text>
  </svg>
</div>

<h2>The cheat sheet</h2>
<div class="card">
<table>
  <thead><tr><th>Code</th><th>New box?</th><th>Change b, does a change?</th></tr></thead>
  <tbody>
    <tr><td><code>let b = a;</code></td><td>No, same box</td><td class="bad">Yes</td></tr>
    <tr><td><code>let b = { ...a };</code></td><td>Yes (shallow copy)</td><td class="good">No, for top-level values</td></tr>
    <tr><td><code>let b = structuredClone(a);</code></td><td>Yes (deep copy)</td><td class="good">No, not even nested arrays or objects</td></tr>
  </tbody>
</table>
</div>

<h2>Three things that trip people up</h2>
<div class="card">
  <ol>
    <li><strong><code>const</code> does not protect you.</strong> <code>const a = { status: "pass" }; const b = a; b.status = "fail";</code> still changes <code>a</code>. <code>const</code> only stops you from pointing the label at a different box.</li>
    <li><strong><code>{ ...a }</code> copies one level only.</strong> If the box holds another box (like <code>steps: ["open"]</code>), both copies still share that inner array. Use <code>structuredClone(a)</code> to copy everything.</li>
    <li><strong>Two boxes that look the same are not equal.</strong> <code>{ status: "pass" } === { status: "pass" }</code> is <code>false</code>, because <code>===</code> on objects asks "same box?", not "same contents?". <code>a === b</code> is <code>true</code> in our code because they really are the same box.</li>
  </ol>
</div>

<h2>So what, as a tester?</h2>
<div class="tip">
  If several tests share one test-data object and one test "just tweaks" it (<code>user.role = "admin"</code>), every later test sees the tweak. Tests then pass or fail depending on the order they run in. Give each test its own copy: <code>const user = { ...baseUser };</code> (or <code>structuredClone(baseUser)</code> when it has nested data).
</div>

<p class="lead" style="margin-top:28px">Same idea as arrays in lesson 97 (Copy vs Reference): <code>=</code> copies the address, not the box. Source: <code>17_Objects_JS/133_Object_Copy.js</code>.</p>

</main>
</body>
</html>