"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_TYPE = void 0;
var ERROR_TYPE;
(function (ERROR_TYPE) {
    ERROR_TYPE["OK"] = "OK";
    ERROR_TYPE["UNAUTHORIZED"] = "UNAUTHORIZED";
    ERROR_TYPE["BAD_REQUEST"] = "BAD REQUEST";
    ERROR_TYPE["FORBIDDEN"] = "FORBIDDEN";
    ERROR_TYPE["NOT_FOUND"] = "NOT FOUND";
    ERROR_TYPE["INTERNAL_SERVER_ERROR"] = "INTERNAL SERVER ERROR";
    ERROR_TYPE["CONFLICT"] = "CONFLICT";
})(ERROR_TYPE = exports.ERROR_TYPE || (exports.ERROR_TYPE = {}));
exports.default = {
    [ERROR_TYPE.OK]: {
        statusCode: 200,
        message: 'Ok',
    },
    [ERROR_TYPE.UNAUTHORIZED]: {
        statusCode: 401,
        message: 'Unauthorized access',
    },
    [ERROR_TYPE.BAD_REQUEST]: {
        statusCode: 400,
        message: 'Bad Request',
    },
    [ERROR_TYPE.FORBIDDEN]: {
        statusCode: 403,
        message: 'Forbidden',
    },
    [ERROR_TYPE.NOT_FOUND]: {
        statusCode: 404,
        message: 'Not Found',
    },
    [ERROR_TYPE.CONFLICT]: {
        statusCode: 409,
        message: 'Conflict',
    },
    [ERROR_TYPE.INTERNAL_SERVER_ERROR]: {
        statusCode: 500,
        message: 'Internal Server Error',
    },
};
//# sourceMappingURL=errors.js.map