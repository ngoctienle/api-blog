"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExRouter = exports.ExApp = void 0;
const express_1 = __importStar(require("express"));
const mongoose = __importStar(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const validate_1 = __importDefault(require("../utils/validate"));
class AppInit {
    constructor() {
        this.express = (0, express_1.default)();
        this.router = (0, express_1.Router)();
        this.middlewares();
        this.startServer();
    }
    middlewares() {
        this.express.use((0, cors_1.default)());
        this.express.use(express_1.default.json());
        this.express.use(body_parser_1.default.json({ limit: '10mb' }));
        this.express.use(body_parser_1.default.urlencoded({ extended: true, limit: '10mb' }));
    }
    startServer() {
        mongoose
            .set('strictQuery', false)
            .connect(validate_1.default.MONGODB_URL)
            .then(() => {
            exports.ExApp.listen(validate_1.default.PORT || 2399, () => {
                console.log('Backend is running. MongoDB Connected!');
            });
        })
            .catch((err) => console.error('Mongo Error:', err));
    }
}
const App = new AppInit();
exports.ExApp = App.express;
exports.ExRouter = App.router;
//# sourceMappingURL=app.config.js.map