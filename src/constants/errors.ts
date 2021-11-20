export enum ERROR_TYPE {
  OK = 'OK',
  UNAUTHORIZED = 'UNAUTHORIZED',
  BAD_REQUEST = 'BAD REQUEST',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT FOUND',
  INTERNAL_SERVER_ERROR = 'INTERNAL SERVER ERROR',
  CONFLICT = 'CONFLICT',
}
export default {
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
}