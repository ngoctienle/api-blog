"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_config_1 = require("./configs/app.config");
const auth_route_1 = __importDefault(require("./routes/auth.route"));
/* ExpressApp */
app_config_1.ExApp.use('/api', auth_route_1.default);
//# sourceMappingURL=index.js.map