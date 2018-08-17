"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const utils = require("./utils");
const common_1 = require("../common");
function isImmediateRejection(engineResult) {
    // note: "tel" errors mean the local server refused to process the
    // transaction *at that time*, but it could potentially buffer the
    // transaction and then process it at a later time, for example
    // if the required fee changes (this does not occur at the time of
    // this writing, but it could change in the future)
    // all other error classes can potentially result in transaction validation
    return _.startsWith(engineResult, 'tem');
}
function formatSubmitResponse(response) {
    const data = {
        resultCode: response.engine_result,
        resultMessage: response.engine_result_message
    };
    if (isImmediateRejection(response.engine_result)) {
        throw new utils.common.errors.RippledError('Submit failed', data);
    }
    return data;
}
function submit(signedTransaction) {
    return __awaiter(this, void 0, void 0, function* () {
        // 1. Validate
        common_1.validate.submit({ signedTransaction });
        // 2. Make Request
        const response = yield this.request('submit', { tx_blob: signedTransaction });
        // 3. Return Formatted Response
        return formatSubmitResponse(response);
    });
}
exports.default = submit;
//# sourceMappingURL=submit.js.map