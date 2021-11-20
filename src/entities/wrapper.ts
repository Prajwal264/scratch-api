import { validateOrReject } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';
import shortid from 'shortid';

/**
 *
 *
 * @export
 * @class EntityWrapper
 * @extends {BaseEntity}
 */
@ObjectType()
export abstract class EntityWrapper extends BaseEntity {

  /**
   *
   *
   * @type {string}
   * @memberof Model
   */
  @Field(() => ID)
  @PrimaryColumn("varchar", {
    length: 40
  })
  id: string;

  /**
 *
 *
 * @type {Date}
 * @memberof User
 */
  @Field(() => Date)
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  /**
   *
   *
   * @type {Date}
   * @memberof User
   */
  @Field(() => Date)
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date



  @BeforeInsert()
  setId() {
    this.id = this.id || shortid.generate();
  }
  /**
   *
   *
   * @memberof User
   */
  @BeforeInsert()
  @BeforeUpdate()
  validate(): Promise<void> {
    return validateOrReject(this);
  }
}