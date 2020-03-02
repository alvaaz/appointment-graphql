import { InputType, Field, Int } from 'type-graphql'
import { ObjectId } from 'mongodb'

@InputType()
export class ProfessionalInput {
  @Field(() => ObjectId)
  _id: ObjectId

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field(() => Int)
  identification: number

  @Field(() => [ObjectId])
  specialties: ObjectId[]
}
