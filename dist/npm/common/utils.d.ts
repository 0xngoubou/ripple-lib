import BigNumber from 'bignumber.js-4.1.0';
import { Amount, RippledAmount } from './types/objects';
declare function isValidSecret(secret: string): boolean;
declare function dropsToXrp(drops: string | BigNumber): string;
declare function xrpToDrops(xrp: string | BigNumber): string;
declare function toRippledAmount(amount: Amount): RippledAmount;
declare function convertKeysFromSnakeCaseToCamelCase(obj: any): any;
declare function removeUndefined<T extends object>(obj: T): T;
declare function rippleTimeToISO8601(rippleTime: number): string;
declare function iso8601ToRippleTime(iso8601: string): number;
export { dropsToXrp, xrpToDrops, toRippledAmount, convertKeysFromSnakeCaseToCamelCase, removeUndefined, rippleTimeToISO8601, iso8601ToRippleTime, isValidSecret };
