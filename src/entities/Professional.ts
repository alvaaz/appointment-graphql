import {
  prop as Property,
  arrayProp as ArrayProperty,
  getModelForClass
} from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, ObjectType, Int } from 'type-graphql'
import { Specialty } from './Specialty'

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

  @Field(() => [Specialty], { nullable: true })
  @ArrayProperty({
    items: Specialty,
    default: []
  })
  specialties: Specialty[]
}

export const ProfessionalModel = getModelForClass(Professional)
