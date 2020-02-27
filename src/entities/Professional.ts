// import { Document, Schema, model } from 'mongoose'
// import { Professional } from './professional.interface'

import { prop as Property, Typegoose } from 'typegoose'
import { ObjectId } from 'mongodb'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Professional extends Typegoose {
  @Field()
  readonly _id: ObjectId

  @Field()
  @Property({ required: true })
  firstName: string

  @Field()
  @Property({ required: true })
  lastName: string
}

export const ProfessionalModel = new Professional().getModelForClass(Professional)
