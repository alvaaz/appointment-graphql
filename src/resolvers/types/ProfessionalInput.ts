import { InputType, Field, Int } from 'type-graphql'
import { Specialty } from '../../entities/Specialty'
import { ObjectId } from 'mongodb'

@InputType()
export class ProfessionalInput {

  @Field(type => ObjectId)  // Added by Ryann
  _id: ObjectId             // Added by Ryann

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field(() => Int)
  identification: number

  @Field(() => [ObjectId])
  specialties: ObjectId[]   // Added by Ryann
  // specialties: Specialty[]
}
