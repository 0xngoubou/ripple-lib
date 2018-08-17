"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const txflags_1 = require("./txflags");
const accountRootFlags = {
    PasswordSpent: 0x00010000,
    RequireDestTag: 0x00020000,
    RequireAuth: 0x00040000,
    DepositAuth: 0x01000000,
    DisallowXRP: 0x00080000,
    DisableMaster: 0x00100000,
    NoFreeze: 0x00200000,
    GlobalFreeze: 0x00400000,
    DefaultRipple: 0x00800000
};
const AccountFlags = {
    passwordSpent: accountRootFlags.PasswordSpent,
    requireDestinationTag: accountRootFlags.RequireDestTag,
    requireAuthorization: accountRootFlags.RequireAuth,
    depositAuth: accountRootFlags.DepositAuth,
    disallowIncomingXRP: accountRootFlags.DisallowXRP,
    disableMasterKey: accountRootFlags.DisableMaster,
    noFreeze: accountRootFlags.NoFreeze,
    globalFreeze: accountRootFlags.GlobalFreeze,
    defaultRipple: accountRootFlags.DefaultRipple
};
exports.AccountFlags = AccountFlags;
const AccountFlagIndices = {
    requireDestinationTag: txflags_1.txFlagIndices.AccountSet.asfRequireDest,
    requireAuthorization: txflags_1.txFlagIndices.AccountSet.asfRequireAuth,
    depositAuth: txflags_1.txFlagIndices.AccountSet.asfDepositAuth,
    disallowIncomingXRP: txflags_1.txFlagIndices.AccountSet.asfDisallowXRP,
    disableMasterKey: txflags_1.txFlagIndices.AccountSet.asfDisableMaster,
    enableTransactionIDTracking: txflags_1.txFlagIndices.AccountSet.asfAccountTxnID,
    noFreeze: txflags_1.txFlagIndices.AccountSet.asfNoFreeze,
    globalFreeze: txflags_1.txFlagIndices.AccountSet.asfGlobalFreeze,
    defaultRipple: txflags_1.txFlagIndices.AccountSet.asfDefaultRipple
};
exports.AccountFlagIndices = AccountFlagIndices;
const AccountFields = {
    EmailHash: { name: 'emailHash', encoding: 'hex',
        length: 32, defaults: '0' },
    MessageKey: { name: 'messageKey' },
    Domain: { name: 'domain', encoding: 'hex' },
    TransferRate: { name: 'transferRate', defaults: 0, shift: 9 }
};
exports.AccountFields = AccountFields;
//# sourceMappingURL=constants.js.map