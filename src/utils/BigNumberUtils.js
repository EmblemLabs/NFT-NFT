import { BigNumber } from 'bignumber.js';

export function convertToFloat(amount, precesion = 5) {
  return new BigNumber(amount).div(new BigNumber(10).pow(18)).toFixed(precesion).toString();
}
