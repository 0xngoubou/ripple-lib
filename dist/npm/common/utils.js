"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const bignumber_js_1 = require("bignumber.js-4.1.0");
const ripple_keypairs_1 = require("ripple-keypairs");
const errors_1 = require("./errors");
function isValidSecret(secret) {
    try {
        ripple_keypairs_1.deriveKeypair(secret);
        return true;
    }
    catch (err) {
        return false;
    }
}
exports.isValidSecret = isValidSecret;
function dropsToXrp(drops) {
    if (typeof drops === 'string') {
        if (!drops.match(/^-?[0-9]*\.?[0-9]*$/)) {
            throw new errors_1.ValidationError(`dropsToXrp: invalid value '${drops}',` +
                ` should be a number matching (^-?[0-9]*\.?[0-9]*$).`);
        }
        else if (drops === '.') {
            throw new errors_1.ValidationError(`dropsToXrp: invalid value '${drops}',` +
                ` should be a BigNumber or string-encoded number.`);
        }
    }
    // Converting to BigNumber and then back to string should remove any
    // decimal point followed by zeros, e.g. '1.00'.
    // Important: specify base 10 to avoid exponential notation, e.g. '1e-7'.
    drops = (new bignumber_js_1.default(drops)).toString(10);
    // drops are only whole units
    if (drops.includes('.')) {
        throw new errors_1.ValidationError(`dropsToXrp: value '${drops}' has` +
            ` too many decimal places.`);
    }
    // This should never happen; the value has already been
    // validated above. This just ensures BigNumber did not do
    // something unexpected.
    if (!drops.match(/^-?[0-9]+$/)) {
        throw new errors_1.ValidationError(`dropsToXrp: failed sanity check -` +
            ` value '${drops}',` +
            ` does not match (^-?[0-9]+$).`);
    }
    return (new bignumber_js_1.default(drops)).dividedBy(1000000.0).toString(10);
}
exports.dropsToXrp = dropsToXrp;
function xrpToDrops(xrp) {
    if (typeof xrp === 'string') {
        if (!xrp.match(/^-?[0-9]*\.?[0-9]*$/)) {
            throw new errors_1.ValidationError(`xrpToDrops: invalid value '${xrp}',` +
                ` should be a number matching (^-?[0-9]*\.?[0-9]*$).`);
        }
        else if (xrp === '.') {
            throw new errors_1.ValidationError(`xrpToDrops: invalid value '${xrp}',` +
                ` should be a BigNumber or string-encoded number.`);
        }
    }
    // Important: specify base 10 to avoid exponential notation, e.g. '1e-7'.
    xrp = (new bignumber_js_1.default(xrp)).toString(10);
    // This should never happen; the value has already been
    // validated above. This just ensures BigNumber did not do
    // something unexpected.
    if (!xrp.match(/^-?[0-9.]+$/)) {
        throw new errors_1.ValidationError(`xrpToDrops: failed sanity check -` +
            ` value '${xrp}',` +
            ` does not match (^-?[0-9.]+$).`);
    }
    const components = xrp.split('.');
    if (components.length > 2) {
        throw new errors_1.ValidationError(`xrpToDrops: failed sanity check -` +
            ` value '${xrp}' has` +
            ` too many decimal points.`);
    }
    const fraction = components[1] || '0';
    if (fraction.length > 6) {
        throw new errors_1.ValidationError(`xrpToDrops: value '${xrp}' has` +
            ` too many decimal places.`);
    }
    return (new bignumber_js_1.default(xrp)).times(1000000.0).floor().toString(10);
}
exports.xrpToDrops = xrpToDrops;
function toRippledAmount(amount) {
    if (amount.currency === 'XRP') {
        return xrpToDrops(amount.value);
    }
    if (amount.currency === 'drops') {
        return amount.value;
    }
    return {
        currency: amount.currency,
        issuer: amount.counterparty ? amount.counterparty :
            (amount.issuer ? amount.issuer : undefined),
        value: amount.value
    };
}
exports.toRippledAmount = toRippledAmount;
function convertKeysFromSnakeCaseToCamelCase(obj) {
    if (typeof obj === 'object') {
        let newKey;
        return _.reduce(obj, (result, value, key) => {
            newKey = key;
            // taking this out of function leads to error in PhantomJS
            const FINDSNAKE = /([a-zA-Z]_[a-zA-Z])/g;
            if (FINDSNAKE.test(key)) {
                newKey = key.replace(FINDSNAKE, r => r[0] + r[2].toUpperCase());
            }
            result[newKey] = convertKeysFromSnakeCaseToCamelCase(value);
            return result;
        }, {});
    }
    return obj;
}
exports.convertKeysFromSnakeCaseToCamelCase = convertKeysFromSnakeCaseToCamelCase;
function removeUndefined(obj) {
    return _.omitBy(obj, _.isUndefined);
}
exports.removeUndefined = removeUndefined;
/**
 * @param {Number} rpepoch (seconds since 1/1/2000 GMT)
 * @return {Number} ms since unix epoch
 *
 */
function rippleToUnixTimestamp(rpepoch) {
    return (rpepoch + 0x386D4380) * 1000;
}
/**
 * @param {Number|Date} timestamp (ms since unix epoch)
 * @return {Number} seconds since ripple epoch ( 1/1/2000 GMT)
 */
function unixToRippleTimestamp(timestamp) {
    return Math.round(timestamp / 1000) - 0x386D4380;
}
function rippleTimeToISO8601(rippleTime) {
    return new Date(rippleToUnixTimestamp(rippleTime)).toISOString();
}
exports.rippleTimeToISO8601 = rippleTimeToISO8601;
function iso8601ToRippleTime(iso8601) {
    return unixToRippleTimestamp(Date.parse(iso8601));
}
exports.iso8601ToRippleTime = iso8601ToRippleTime;
//# sourceMappingURL=utils.js.map