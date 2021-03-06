"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("./utils");
const keypairs = require("ripple-keypairs");
const binary = require("ripple-binary-codec");
const ripple_hashes_1 = require("ripple-hashes");
const bignumber_js_1 = require("bignumber.js-4.1.0");
const common_1 = require("../common");
const validate = utils.common.validate;
function computeSignature(tx, privateKey, signAs) {
    const signingData = signAs
        ? binary.encodeForMultisigning(tx, signAs)
        : binary.encodeForSigning(tx);
    return keypairs.sign(signingData, privateKey);
}
function signWithKeypair(api, txJSON, keypair, options = {
    signAs: ''
}) {
    validate.sign({ txJSON, keypair });
    const tx = JSON.parse(txJSON);
    if (tx.TxnSignature || tx.Signers) {
        throw new utils.common.errors.ValidationError('txJSON must not contain "TxnSignature" or "Signers" properties');
    }
    const fee = new bignumber_js_1.BigNumber(tx.Fee);
    const maxFeeDrops = common_1.xrpToDrops(api._maxFeeXRP);
    if (fee.greaterThan(maxFeeDrops)) {
        throw new utils.common.errors.ValidationError(`"Fee" should not exceed "${maxFeeDrops}". ` +
            'To use a higher fee, set `maxFeeXRP` in the RippleAPI constructor.');
    }
    tx.SigningPubKey = options.signAs ? '' : keypair.publicKey;
    if (options.signAs) {
        const signer = {
            Account: options.signAs,
            SigningPubKey: keypair.publicKey,
            TxnSignature: computeSignature(tx, keypair.privateKey, options.signAs)
        };
        tx.Signers = [{ Signer: signer }];
    }
    else {
        tx.TxnSignature = computeSignature(tx, keypair.privateKey);
    }
    const serialized = binary.encode(tx);
    return {
        signedTransaction: serialized,
        id: ripple_hashes_1.computeBinaryTransactionHash(serialized)
    };
}
function sign(txJSON, secret, options, keypair) {
    if (typeof secret === 'string') {
        // we can't validate that the secret matches the account because
        // the secret could correspond to the regular key
        validate.sign({ txJSON, secret });
        return signWithKeypair(this, txJSON, keypairs.deriveKeypair(secret), options);
    }
    else {
        return signWithKeypair(this, txJSON, keypair ? keypair : secret, options);
    }
}
exports.default = sign;
//# sourceMappingURL=sign.js.map