"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorized = void 0;
const type_graphql_1 = require("type-graphql");
const token_helper_1 = require("./token.helper");
const Authorized = () => {
    return (0, type_graphql_1.createMethodDecorator)(async ({ context }, next) => {
        const req = context.req;
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader)
            throw new Error('Not Authorized');
        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken)
            throw new Error('Not Authorized');
        try {
            (0, token_helper_1.verifyAccessToken)(accessToken);
        }
        catch (e) {
            throw new Error(e);
        }
        return next();
    });
};
exports.Authorized = Authorized;
//# sourceMappingURL=auth.helper.js.map