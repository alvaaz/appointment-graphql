import { prop as Property, getModelForClass } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, ObjectType, Int } from 'type-graphql'

@ObjectType()
export class Professional {
  @Field()
  readonly _id: ObjectId

  @Field()
  @Property({ required: true })
  firstName: string

  @Field()
  @Property({ required: true })
  lastName: string

  @Field(() => Int)
  @Property({ required: true })
  identification: number
}

export const ProfessionalModel = getModelForClass(Professional)
