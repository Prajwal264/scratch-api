import { User } from '../entities/user.entity';
import { compare, hash } from 'bcryptjs';
import errors, { ERROR_TYPE } from '../constants/errors';
import { UserResponse } from '../types/user.types';
import { createAccessToken, createRefreshToken } from 'src/helpers/token.helper';

export interface UserCreateInput {
  username: string,
  email: string,
  password: string,
}
/**
 *
 *
 * @export
 * @class UserService
 */
export class UserService {
  /**
   * Creates an instance of UserService.
   * @memberof UserService
   */
  constructor() {

  }

  /**
   *
   *
   * @private
   * @param {string} password
   * @return {*} 
   * @memberof UserService
   */
  private async hashPassword(password: string) {
    const hashedPassword = await hash(password, 12);
    return hashedPassword;
  }

  /**
   *
   *
   * @param {string} email
   * @memberof UserService
   */
  public async getByEmail(email: string): Promise<UserResponse> {
    // check if the user already exists
    const user = await User.findOne({ email })
    if (!user) {
      return {
        errors: [{
          field: 'email',
          ...errors[ERROR_TYPE.NOT_FOUND]
        }]
      };
    }
    return {
      user
    };
  }
  /**
  *
  *
  * @memberof UserService
   */
  public async getById(id: string): Promise<UserResponse> {
    // check if the user already exists
    const user = await User.findOne(id)
    if (!user) {
      return {
        errors: [{
          field: 'email',
          ...errors[ERROR_TYPE.NOT_FOUND]
        }]
      };
    }
    return {
      user
    };
  }

  /**
   *
   *
   * @private
   * @param {string} password
   * @param {string} userPassword
   * @return {*}  {Promise<boolean>}
   * @memberof UserService
   */
  private async comparePasswords(password: string, userPassword: string): Promise<boolean> {
    return compare(password, userPassword);
  }

  /**
   *
   *
   * @param {UserCreateInput} {
   *     username,
   *     email,
   *     password,
   *   }
   * @memberof UserService
   */
  public async create({
    username,
    email,
    password,
  }: UserCreateInput): Promise<UserResponse> {
    // check if the user already exists
    const userResponse = await this.getByEmail(email)
    if (userResponse.user) {
      return {
        errors: [{
          field: 'email',
          message: `User with email: ${email} already exists`,
          statusCode: errors[ERROR_TYPE.CONFLICT].statusCode,
        }]
      }
    };
    const hashedPassword = await this.hashPassword(password);
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    }).save();

    return { user };
  }


  /**
   *
   *
   * @param {{
   *     email: string,
   *     password: string,
   *   }} {
   *     email,
   *     password
   *   }
   * @return {*} 
   * @memberof UserService
   */
  public async verify({
    email,
    password
  }: {
    email: string,
    password: string,
  }) {
    const { user } = await this.getByEmail(email)
    if (!user) {
      return {
        errors: [{
          field: 'email',
          ...errors[ERROR_TYPE.NOT_FOUND]
        }]
      }
    }
    const validUser = await this.comparePasswords(password, user.password);
    if (!validUser) {
      return {
        errors: [{
          field: 'password',
          ...errors[ERROR_TYPE.UNAUTHORIZED],
        }]
      }
    }

    const accessToken = createAccessToken({ userId: user.id }, '15m')
    const refreshToken = createRefreshToken({ userId: user.id })
    const userWithJwt = {
      user: {
        ...user,
        accessToken,
        refreshToken,
      }
    }
    return userWithJwt;
  }
}