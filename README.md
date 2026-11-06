# @lp-labs/qr-decomposition

Thin reorthogonalized modified Gram-Schmidt QR factors.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/qr-decomposition
```

## Working example

```js
import { qr } from '@lp-labs/qr-decomposition';
if (qr([[3], [4]]).r[0][0] !== 5) throw new Error('QR');
```

CommonJS: `const api = require('@lp-labs/qr-decomposition')`.

## Behavior, customization and limits

Dense finite matrix arrays1..64 each dimension, copied before work; nonfinite intermediates throw. Default absolute tolerance1e-12, positive<=1; rescale ill-conditioned input and inspect residuals in your application, no condition/error guarantee. qr requires rows>=columns, returns thin q (m*n), r (n*n), two orthogonalization passes. Throws when column residual norm<=epsilon; no rank pivoting. O(m*n squared), scale-sensitive, not Householder or rank-revealing guarantee.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export declare function qr(
  input: readonly (readonly number[])[],
  epsilon?: number,
): {
  q: number[][];
  r: number[][];
};
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
