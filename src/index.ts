function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function matrix(a: readonly (readonly number[])[], square = true): number[][] {
  if (
    !Array.isArray(a) ||
    !a.length ||
    a.length > 64 ||
    !Array.isArray(a[0]) ||
    !a[0].length ||
    a[0].length > 64
  )
    throw new RangeError('Matrix size1..64');
  const n = a[0].length;
  if (square && a.length !== n) throw new RangeError('Square matrix required');
  for (const row of a) {
    if (!Array.isArray(row) || row.length !== n)
      throw new RangeError('Rectangular dense matrix required');
    for (const v of row) finite(v);
  }
  return a.map((row) => [...row]);
}
function tolerance(t: number): number {
  return finite(t, Number.MIN_VALUE, 1);
}
export function qr(
  input: readonly (readonly number[])[],
  epsilon = 1e-12,
): { q: number[][]; r: number[][] } {
  const a = matrix(input, false),
    m = a.length,
    n = a[0]!.length;
  tolerance(epsilon);
  if (m < n) throw new RangeError('Rows must be at least columns');
  const q = Array.from({ length: m }, () => Array<number>(n).fill(0)),
    r = Array.from({ length: n }, () => Array<number>(n).fill(0));
  for (let j = 0; j < n; j++) {
    const v = a.map((row) => row[j]!);
    for (let pass = 0; pass < 2; pass++)
      for (let k = 0; k < j; k++) {
        let projection = 0;
        for (let i = 0; i < m; i++) projection = finite(projection + q[i]![k]! * v[i]!);
        r[k]![j] = finite(r[k]![j]! + projection);
        for (let i = 0; i < m; i++) v[i] = finite(v[i]! - projection * q[i]![k]!);
      }
    const norm = finite(Math.hypot(...v));
    if (norm <= epsilon) throw new RangeError('Dependent column');
    r[j]![j] = norm;
    for (let i = 0; i < m; i++) q[i]![j] = v[i]! / norm;
  }
  return { q, r };
}
