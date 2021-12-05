import { UserService } from '../services/user.service';
import { GenerateAccessTokenReponse, LoginResponse, UserResponse } from '../types/user.types';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Context, Upload } from 'src/types/common.types';
import { GraphQLUpload } from 'graphql-upload';
import { Authorized } from '../helpers/auth.helper';
import errors, { ERROR_TYPE } from '../constants/errors';
import { createAccessToken, verifyRefreshToken } from '../helpers/token.helper';

/**
 *
 *
 * @class UserResolver
 */
@Resolver()
export class UserResolver {

  /**
   *
   *
   * @private
   * @type {UserService}
   * @memberof UserResolver
   */
  private userService: UserService;

  /**
   * Creates an instance of UserResolver.
   * @memberof UserResolver
   */
  constructor() {
    this.userService = new UserService();
  }

  /**
   *
   *
   * @param {string} id
   * @return {*} 
   * @memberof UserResolver
   */
  @Authorized()
  @Query(() => UserResponse)
  async user(@Arg('id') id: string) {
    const user = await this.userService.getById(id)
    return user;
  }

  /**
   *
   *
   * @param {string} username
   * @param {string} email
   * @param {string} password
   * @return {*} 
   * @memberof UserResolver
   */
  @Mutation(() => UserResponse)
  async register(
    @Arg('username') username: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
  ) {
    const userResponse = this.userService.create({
      username,
      email,
      password
    });

    return userResponse;
  }

  /**
   *
   *
   * @param {string} email
   * @param {string} password
   * @return {*} 
   * @memberof UserResolver
   */
  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ) {
    const userResponse = this.userService.verify({
      email,
      password
    });

    return userResponse;
  }

  /**
   *
   *
   * @param {string} username
   * @param {string} bio
   * @param {Upload} profileImage
   * @param {Context} { userId }
   * @return {*} 
   * @memberof UserResolver
   */
  @Authorized()
  @Mutation(() => UserResponse)
  async editProfile(
    @Arg('username', { nullable: true }) username: string,
    @Arg('bio', { nullable: true }) bio: string,
    @Arg('profileImage', () => GraphQLUpload, { nullable: true }) profileImage: Upload,
    @Ctx() { userId }: Context
  ) {
    if (!userId) {
      return {
        errors: [{
          field: 'password',
          ...errors[ERROR_TYPE.UNAUTHORIZED],
        }]
      }
    }
    return this.userService.edit(userId, {
      username,
      bio,
      profileImage,
    })
  }


  /**
   *
   *
   * @memberof UserResolver
   */
   @Mutation(() => GenerateAccessTokenReponse)
   generateAccessToken(
     @Arg('refreshToken') refreshToken: string,
   ): GenerateAccessTokenReponse {
     try {
       const payload: any = verifyRefreshToken(refreshToken);
       if (!payload) {
         throw new Error("Something went wrong")
       }
       return {
         accessToken: createAccessToken({ userId: payload.userId }, '15m')
       }
     } catch (e) {
       return e;
     }
   }
}