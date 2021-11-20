import { IsEmail } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { EntityWrapper } from './wrapper';

/**
 *
 *
 * @export
 * @class User
 */
@ObjectType()
@Entity({ name: "users" })
export class User extends EntityWrapper {

  /**
   *
   *
   * @type {string}
   * @memberof User
   */
  @Field()
  @Column()
  username: string;

  /**
   *
   *
   * @type {string}
   * @memberof User
   */
  @Field()
  @Column({ unique: true, })
  @IsEmail({}, { message: "Invalid Email" })
  email: string;

  /**
   *
   *
   * @type {string}
   * @memberof User
   */
  @Column({ nullable: true })
  password: string;

  /**
   *
   *
   * @type {string}
   * @memberof User
   */
  @Field({ nullable: true })
  @Column({ name: "profile_image", nullable: true })
  profileImage?: string;
}