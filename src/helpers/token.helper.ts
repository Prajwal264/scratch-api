import { GraphQLError } from 'graphql';
import jwt, { decode, JwtPayload, SignOptions } from 'jsonwebtoken';
import { ERROR_TYPE } from '../constants/errors';

// TODO: move this to env 
const accessTokenSecret = '10';
const refreshTokenSecret = '12';
const rememberMeTokenSecret = '14';
const resetPasswordToken = '14';


/**
 *
 *
 * @param {*} payload
 * @param {*} secret
 * @param {*} [expiresIn=undefined]
 * @return {*} 
 */
const createToken: (p: any, s: string, t?: string) => string = (payload, secret, expiresIn = undefined) => {
  const jwtOptions = {} as SignOptions;
  if (expiresIn) jwtOptions.expiresIn = expiresIn;
  return jwt.sign(payload, secret, jwtOptions)
}

/**
 * creates a new access token
 *
 * @return {*} 
 */
export const createAccessToken: (p: any, t: string) => string = (payload, expiresIn) => {
  return createToken(payload, accessTokenSecret, expiresIn)
}

/**
 * creates a new refresh token
 *
 * @return {*} 
 */
export const createRefreshToken: (p: any, t?: string) => string = (payload, expiresIn = undefined) => {
  return createToken(payload, refreshTokenSecret, expiresIn)
}

/**
 * creates a new remember me token
 *
 * @return {*} 
 */
export const createRememberMeToken: (p: any, t?: string) => string = (payload, expiresIn = undefined) => {
  return createToken(payload, rememberMeTokenSecret, expiresIn)
}

/**
 * creates a new reset password token
 *
 * @return {*} 
 */
export const createResetPasswordToken: (p: any, t?: string) => string = (payload, expiresIn = undefined) => {
  return createToken(payload, resetPasswordToken, expiresIn)
}

/**
 * verifies the token
 *
 * @param {*} token
 * @param {*} secret
 * @return {*} 
 */
const verifyToken: (t: string, s: string) => string | JwtPayload = (token, secret) => {
  let payload;
  try {
    payload = jwt.verify(token, secret)
  } catch(e) {
    switch (e.name) {
      case 'TokenExpiredError': 
        throw new GraphQLError(ERROR_TYPE.UNAUTHORIZED)
      default: 
      throw new Error(e.name);
    }
  }
  return payload;
}

/**
 * verifies the acess token
 *
 * @param {*} token
 * @return {*} 
 */
export const verifyAccessToken: (t: string) => string | JwtPayload = (token) => {
  return verifyToken(token, accessTokenSecret)
}

/**
 * verifies the refresh token
 *
 * @param {*} token
 * @return {*} 
 */
export const verifyRefreshToken: (t: string) => string | JwtPayload = (token) => {
  return verifyToken(token, refreshTokenSecret)
}

/**
 * verifies the remember me token
 *
 * @param {*} token
 * @return {*} 
 */
export const verifyRememberMeToken: (t: string) => string | JwtPayload = (token) => {
  return verifyToken(token, rememberMeTokenSecret)
}

/**
 * verifies the reset password token
 *
 * @param {*} token
 * @return {*} 
 */
export const verifyResetPasswordToken: (t: string) => string | JwtPayload = (token) => {
  return verifyToken(token, resetPasswordToken)
}

/**
 *
 *
 * @param {*} bearer
 * @return {*} 
 */
export const getUserIdByAuthorizationBearer: (b: string) => string = (bearer) => {
  if (bearer) {
    const token = bearer.split(' ')[1];
    const decodedToken: any = decode(token);
    if (decodedToken) return decodedToken.userId
    return null;
  }
  return null;
}