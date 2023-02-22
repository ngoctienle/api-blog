"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const validate_1 = __importDefault(require("../utils/validate"));
const httpStatusCode_constant_1 = __importDefault(require("../constants/httpStatusCode.constant"));
const jwtSerect = validate_1.default.SECRECT_JWT;
const authorization = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authToken = request.header('X-Auth');
    if (!authToken) {
        return response.status(httpStatusCode_constant_1.default.Unauthorized).json({
            status: httpStatusCode_constant_1.default.Unauthorized,
            message: 'Unauthorized! Access Denied!'
        });
    }
    try {
        if (authToken === jwtSerect) {
            next();
        }
    }
    catch (error) {
        response.status(httpStatusCode_constant_1.default.BadRequest).json({
            status: httpStatusCode_constant_1.default.BadRequest,
            message: 'Bad Request'
        });
    }
});
exports.default = authorization;
//# sourceMappingURL=auth.middlewares.js.map