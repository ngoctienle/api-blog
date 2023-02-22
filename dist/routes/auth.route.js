"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_config_1 = require("../configs/app.config");
const auth_middlewares_1 = __importDefault(require("../middlewares/auth.middlewares"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
/* Register API */
app_config_1.ExRouter.post('/register', auth_middlewares_1.default, auth_controller_1.default.RegisterAction);
/* SignIn API */
app_config_1.ExRouter.post('/login', auth_controller_1.default.LoginAction);
exports.default = app_config_1.ExRouter;
//# sourceMappingURL=auth.route.js.map