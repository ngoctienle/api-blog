"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
const validators_1 = require("envalid/dist/validators");
const envConfig = (0, envalid_1.cleanEnv)(process.env, {
    MONGODB_URL: (0, validators_1.str)(),
    PORT: (0, validators_1.port)(),
    SECRECT_JWT: (0, validators_1.str)()
});
exports.default = envConfig;
//# sourceMappingURL=validate.js.map