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
exports.getUserIdByAuthorizationBearer = exports.verifyResetPasswordToken = exports.verifyRememberMeToken = exports.verifyRefreshToken = exports.verifyAccessToken = exports.createResetPasswordToken = exports.createRememberMeToken = exports.createRefreshToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const accessTokenSecret = '10';
const refreshTokenSecret = '12';
const rememberMeTokenSecret = '14';
const resetPasswordToken = '14';
const createToken = (payload, secret, expiresIn = undefined) => {
    const jwtOptions = {};
    if (expiresIn)
        jwtOptions.expiresIn = expiresIn;
    return jsonwebtoken_1.default.sign(payload, secret, jwtOptions);
};
const createAccessToken = (payload, expiresIn) => {
    return createToken(payload, accessTokenSecret, expiresIn);
};
exports.createAccessToken = createAccessToken;
const createRefreshToken = (payload, expiresIn = undefined) => {
    return createToken(payload, refreshTokenSecret, expiresIn);
};
exports.createRefreshToken = createRefreshToken;
const createRememberMeToken = (payload, expiresIn = undefined) => {
    return createToken(payload, rememberMeTokenSecret, expiresIn);
};
exports.createRememberMeToken = createRememberMeToken;
const createResetPasswordToken = (payload, expiresIn = undefined) => {
    return createToken(payload, resetPasswordToken, expiresIn);
};
exports.createResetPasswordToken = createResetPasswordToken;
const verifyToken = (token, secret) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
const verifyAccessToken = (token) => {
    return verifyToken(token, accessTokenSecret);
};
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (token) => {
    return verifyToken(token, refreshTokenSecret);
};
exports.verifyRefreshToken = verifyRefreshToken;
const verifyRememberMeToken = (token) => {
    return verifyToken(token, rememberMeTokenSecret);
};
exports.verifyRememberMeToken = verifyRememberMeToken;
const verifyResetPasswordToken = (token) => {
    return verifyToken(token, resetPasswordToken);
};
exports.verifyResetPasswordToken = verifyResetPasswordToken;
const getUserIdByAuthorizationBearer = (bearer) => {
    if (bearer) {
        const token = bearer.split(' ')[1];
        const decodedToken = (0, jsonwebtoken_1.decode)(token);
        if (decodedToken)
            return decodedToken.userId;
        return null;
    }
    return null;
};
exports.getUserIdByAuthorizationBearer = getUserIdByAuthorizationBearer;
//# sourceMappingURL=token.helper.js.map