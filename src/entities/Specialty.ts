import { prop as Property, getModelForClass } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Specialty {
  @Field()
  readonly _id: ObjectId

  @Field()
  @Property({ required: true })
  name: string
}

export const SpecialtyModel = getModelForClass(Specialty)
