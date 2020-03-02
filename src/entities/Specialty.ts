import {
  prop as Property,
  arrayProp as ArrayProperty,
  getModelForClass
} from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, ObjectType } from 'type-graphql'
import { Professional } from './Professional'

@ObjectType()
export class Specialty {
  @Field()
  readonly _id: ObjectId

  @Field()
  @Property({ required: true })
  name: string

  @Field(() => [Professional], { nullable: true })
  @ArrayProperty({ ref: 'Professional', items: Professional, default: [] })
  professionals: ObjectId[]
}

export const SpecialtyModel = getModelForClass(Specialty)
