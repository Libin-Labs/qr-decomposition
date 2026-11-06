import { qr } from '@lp-labs/qr-decomposition';
if (qr([[3], [4]]).r[0][0] !== 5) throw new Error('QR');
// @ts-expect-error invalid argument must be rejected by declarations
qr([['1']]);
