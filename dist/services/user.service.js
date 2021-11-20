"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_entity_1 = require("../entities/user.entity");
const bcryptjs_1 = require("bcryptjs");
const errors_1 = __importStar(require("../constants/errors"));
class UserService {
    constructor() {
    }
    async hashPassword(password) {
        const hashedPassword = await (0, bcryptjs_1.hash)(password, 12);
        return hashedPassword;
    }
    async getByEmail(email) {
        const user = await user_entity_1.User.findOne({ email });
        if (!user) {
            return {
                errors: [Object.assign({ field: 'email' }, errors_1.default[errors_1.ERROR_TYPE.NOT_FOUND])]
            };
        }
        return {
            user
        };
    }
    async getById(id) {
        const user = await user_entity_1.User.findOne(id);
        if (!user) {
            return {
                errors: [Object.assign({ field: 'email' }, errors_1.default[errors_1.ERROR_TYPE.NOT_FOUND])]
            };
        }
        return {
            user
        };
    }
    async create({ username, email, password, }) {
        const userResponse = await this.getByEmail(email);
        if (userResponse.user) {
            return {
                errors: [{
                        field: 'email',
                        message: `User with email: ${email} already exists`,
                        statusCode: errors_1.default[errors_1.ERROR_TYPE.CONFLICT].statusCode,
                    }]
            };
        }
        ;
        const hashedPassword = await this.hashPassword(password);
        const user = await user_entity_1.User.create({
            username,
            email,
            password: hashedPassword
        }).save();
        return { user };
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map