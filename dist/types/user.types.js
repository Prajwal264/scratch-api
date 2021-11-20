"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateResetPasswordTokenResponse = exports.LoginResponse = exports.UserResponse = exports.FieldError = exports.UserWithTokens = exports.GenerateAccessTokenReponse = void 0;
const user_entity_1 = require("../entities/user.entity");
const type_graphql_1 = require("type-graphql");
let GenerateAccessTokenReponse = class GenerateAccessTokenReponse {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], GenerateAccessTokenReponse.prototype, "accessToken", void 0);
GenerateAccessTokenReponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], GenerateAccessTokenReponse);
exports.GenerateAccessTokenReponse = GenerateAccessTokenReponse;
let UserWithTokens = class UserWithTokens extends user_entity_1.User {
};
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserWithTokens.prototype, "accessToken", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserWithTokens.prototype, "refreshToken", void 0);
UserWithTokens = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserWithTokens);
exports.UserWithTokens = UserWithTokens;
let FieldError = class FieldError {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], FieldError.prototype, "field", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], FieldError.prototype, "message", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], FieldError.prototype, "statusCode", void 0);
FieldError = __decorate([
    (0, type_graphql_1.ObjectType)()
], FieldError);
exports.FieldError = FieldError;
let UserResponse = class UserResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => user_entity_1.User, { nullable: true }),
    __metadata("design:type", user_entity_1.User)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserResponse);
exports.UserResponse = UserResponse;
let LoginResponse = class LoginResponse extends UserResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => UserWithTokens, { nullable: true }),
    __metadata("design:type", UserWithTokens)
], LoginResponse.prototype, "user", void 0);
LoginResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], LoginResponse);
exports.LoginResponse = LoginResponse;
let GenerateResetPasswordTokenResponse = class GenerateResetPasswordTokenResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], GenerateResetPasswordTokenResponse.prototype, "emailSent", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], GenerateResetPasswordTokenResponse.prototype, "errors", void 0);
GenerateResetPasswordTokenResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], GenerateResetPasswordTokenResponse);
exports.GenerateResetPasswordTokenResponse = GenerateResetPasswordTokenResponse;
//# sourceMappingURL=user.types.js.map