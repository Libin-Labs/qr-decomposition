import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('identity factors', () => {
  assert.deepEqual(
    api.qr([
      [1, 0],
      [0, 1],
    ]),
    {
      q: [
        [1, 0],
        [0, 1],
      ],
      r: [
        [1, 0],
        [0, 1],
      ],
    },
  );
});
test('rectangular norm', () => {
  const f = api.qr([[3], [4], [0]]);
  assert.equal(f.r[0][0], 5);
  assert.deepEqual(f.q, [[0.6], [0.8], [0]]);
});
test('dependent rejection', () => {
  assert.throws(() =>
    api.qr([
      [1, 2],
      [2, 4],
    ]),
  );
});
test('shape rules', () => {
  assert.throws(() => api.qr([[1, 2]]));
  assert.throws(() => api.qr([[1], [2, 3]]));
});
test('finite tolerance validation', () => {
  assert.throws(() => api.qr([[Infinity]]));
  assert.throws(() => api.qr([[1]], 0));
});
test('orthogonality reconstruction', () => {
  const a = [
      [1, 2],
      [3, 1],
      [2, 4],
      [5, 0],
    ],
    { q, r } = api.qr(a);
  for (let i = 0; i < 2; i++)
    for (let j = 0; j < 2; j++) {
      const dot = q.reduce((s, row) => s + row[i] * row[j], 0);
      assert.ok(Math.abs(dot - (i === j ? 1 : 0)) < 1e-12);
    }
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 2; j++)
      assert.ok(Math.abs(q[i].reduce((s, x, k) => s + x * r[k][j], 0) - a[i][j]) < 1e-12);
});
