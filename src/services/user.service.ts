import { User } from '../entities/user.entity';
import { hash } from 'bcryptjs';
import errors, { ERROR_TYPE } from '../constants/errors';
import { UserResponse } from '../types/user.types';

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
}