const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const source = fs.readFileSync(path.join(__dirname, '../src/lib/space-motion.ts'), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const api = {};
new Function('exports', compiled)(api);
const { pinnedProgress, chapterOpacity } = api;

// Before, halfway through and after a pinned section, including short viewports.
assert.equal(pinnedProgress(400, 2400, 800), 0);
assert.equal(pinnedProgress(-800, 2400, 800), .5);
assert.equal(pinnedProgress(-2000, 2400, 800), 1);
assert.equal(pinnedProgress(0, 600, 800), 0);
assert.equal(pinnedProgress(-100, 600, 800), 1);

// Every chapter has a fully legible hold, and the final one remains visible.
for (const [p, expected] of [[0, 0], [.15, 0], [.5, 1], [.85, 2], [1, 2]]) {
  assert.equal(chapterOpacity(p, expected, 3), 1);
}

// No empty transition and never more than two simultaneous chapters,
// regardless of whether the visitor scrolls forward or backward.
for (const direction of [1, -1]) {
  for (let i = 0; i <= 1000; i++) {
    const p = direction === 1 ? i / 1000 : 1 - i / 1000;
    const values = [0, 1, 2].map(index => chapterOpacity(p, index, 3));
    assert(values.every(value => value >= 0 && value <= 1));
    assert(values.reduce((sum, value) => sum + value, 0) >= .5, `Empty transition at ${p}`);
    assert(values.filter(value => value > 0).length <= 2);
  }
}
console.log('Space motion: chapter holds, no blank transitions, reverse scroll and viewport boundaries passed.');
