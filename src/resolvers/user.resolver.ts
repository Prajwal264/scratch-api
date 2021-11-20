import { UserService } from '../services/user.service';
import { UserResponse } from '../types/user.types';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';

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

  @Query(() => String)
  hi() {
    return 'hi'
  }

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
}