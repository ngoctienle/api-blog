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
const bcrypt_config_1 = __importDefault(require("../configs/bcrypt.config"));
const user_model_1 = require("../models/user.model");
const rules_1 = require("../utils/rules");
const httpStatusCode_constant_1 = __importDefault(require("../constants/httpStatusCode.constant"));
const RegisterAction = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password, confirmPassword } = request.body;
        /* Check Dependency */
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return response.status(httpStatusCode_constant_1.default.FailedDependency).json({
                status: httpStatusCode_constant_1.default.FailedDependency,
                message: 'Missing Dependency'
            });
        }
        /* Check Email */
        if (!(0, rules_1.isValidateEmail)(email)) {
            return response.status(httpStatusCode_constant_1.default.FailedDependency).json({
                status: httpStatusCode_constant_1.default.FailedDependency,
                message: 'Email is invalid'
            });
        }
        const isExistEmail = yield user_model_1.UserModel.findOne({ email: email }).exec();
        if (isExistEmail) {
            return response.status(httpStatusCode_constant_1.default.FailedDependency).json({
                status: httpStatusCode_constant_1.default.FailedDependency,
                message: 'Email is existed!'
            });
        }
        let role = 1;
        const isHaveAdmin = yield user_model_1.UserModel.findOne({ role: 1 }).exec();
        if (isHaveAdmin) {
            role = 0;
        }
        /* Check Password */
        if (!(0, rules_1.isStrongPassword)(password)) {
            return response.status(httpStatusCode_constant_1.default.FailedDependency).json({
                status: httpStatusCode_constant_1.default.FailedDependency,
                message: 'Password is not strong'
            });
        }
        if (password !== confirmPassword) {
            return response.status(httpStatusCode_constant_1.default.FailedDependency).json({
                status: httpStatusCode_constant_1.default.FailedDependency,
                message: 'Confirm Password need to be same with Password'
            });
        }
        const hashedPw = yield bcrypt_config_1.default.hash(password);
        const newUser = new user_model_1.UserModel({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPw,
            role: role
        });
        yield newUser.save().then(() => {
            return response.status(httpStatusCode_constant_1.default.Created).json({
                status: httpStatusCode_constant_1.default.Created,
                message: 'Account created!',
                data: newUser
            });
        });
    }
    catch (error) {
        response.status(httpStatusCode_constant_1.default.BadRequest).json({
            status: httpStatusCode_constant_1.default.BadRequest,
            message: 'Bad Request'
        });
    }
});
const LoginAction = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = request.body;
        const user = yield user_model_1.UserModel.findOne({ email: email });
        if (!user) {
            response.status(httpStatusCode_constant_1.default.FailedDependency).json({
                status: httpStatusCode_constant_1.default.FailedDependency,
                message: 'Email or Password is not correct!'
            });
        }
        else {
            const validatePw = bcrypt_config_1.default.compare(password, user.password);
            if (!validatePw) {
                response.status(httpStatusCode_constant_1.default.FailedDependency).json({
                    status: httpStatusCode_constant_1.default.FailedDependency,
                    message: 'Email or Password is not correct!'
                });
            }
            response.status(httpStatusCode_constant_1.default.Ok).json({
                status: httpStatusCode_constant_1.default.Ok,
                message: 'Login success'
            });
        }
    }
    catch (error) {
        response.status(httpStatusCode_constant_1.default.BadRequest).json({
            status: httpStatusCode_constant_1.default.BadRequest,
            message: 'Bad Request'
        });
    }
});
const AuthController = {
    RegisterAction,
    LoginAction
};
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map