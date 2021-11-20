import { User } from '../entities/user.entity';
import { Field, ObjectType } from 'type-graphql';

/**
 *
 *
 * @export
 * @class GenerateAccessTokenReponse
 */
@ObjectType()
export class GenerateAccessTokenReponse {
  /**
   *
   *
   * @type {String}
   * @memberof GenerateAccessTokßenReponse
   */
  @Field()
  accessToken: String
}


@ObjectType()
export class UserWithTokens extends User {
  /**
   *
   *
   * @type {string}
   * @memberof User
   */
  @Field({ nullable: true })
  accessToken?: string;

  /**
   *ß
   *
   * @type {string}
   * @memberof User
  */
  @Field({ nullable: true })
  refreshToken?: string;
}

/**
 *
 *
 * @export
 * @class FieldError
 */
@ObjectType()
export class FieldError {
  /**
   *
   *
   * @type {string}
   * @memberof FieldError
   */
  @Field()
  field: string;

  /**
   *
   *
   * @type {string}
   * @memberof FieldError
   */
  @Field()
  message: string;

  /**
   *
   *
   * @type {number}
   * @memberof FieldError
   */
  @Field()
  statusCode?: number;
}


/**
 *
 *
 * @export
 * @class UserResponse
 */
@ObjectType()
export class UserResponse {
  /**
   *
   *
   * @type {FieldError[]}
   * @memberof UserResponse
   */
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  /**
   *
   *
   * @type {User}
   * @memberof UserResponse
   */
  @Field(() => User, { nullable: true })
  user?: User;
}

/**
 *
 *
 * @export
 * @class LoginResponse
 * @extends {UserResponse}
 */
@ObjectType()
export class LoginResponse extends UserResponse {

  /**
   *
   *
   * @type {UserWithTokens}
   * @memberof LoginResponse
   */
  @Field(() => UserWithTokens, { nullable: true })
  user?: UserWithTokens;
}

/**
 *
 *
 * @export
 * @class GenerateResetPasswordTokenResponse
 */
@ObjectType()
export class GenerateResetPasswordTokenResponse {

  /**
   *
   *
   * @type {Boolean}
   * @memberof GenerateResetPasswordTokenResponse
   */
  @Field(() => Boolean, { nullable: true })
  emailSent?: boolean;

  /**
   *
   *
   * @type {String}
   * @memberof GenerateResetPasswordTokenResponse
   */
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]
}
