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
   * @memberof EntityWrapper
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
   * @memberof EntityWrapper
   */
  @Field(() => Date)
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  /**
   *
   *
   * @type {Date}
   * @memberof EntityWrapper
   */
  @Field(() => Date)
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date

  /**
   *
   *
   * @memberof EntityWrapper
   */
  @BeforeInsert()
  setId() {
    this.id = this.id || shortid.generate();
  }

  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof EntityWrapper
   */
  @BeforeInsert()
  @BeforeUpdate()
  validate(): Promise<void> {
    return validateOrReject(this);
  }
}