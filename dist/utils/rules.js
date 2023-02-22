"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidateEmail = exports.isStrongPassword = void 0;
function isStrongPassword(password) {
    const strongPasswordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
    return strongPasswordRegex.test(password);
}
exports.isStrongPassword = isStrongPassword;
function isValidateEmail(email) {
    const re = 
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
exports.isValidateEmail = isValidateEmail;
//# sourceMappingURL=rules.js.map