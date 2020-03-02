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

  // @Field(() => [Professional])
  // @ArrayProperty({ items: Professional, default: [] })
  // professionals: Professional[]
}

export const SpecialtyModel = getModelForClass(Specialty)
