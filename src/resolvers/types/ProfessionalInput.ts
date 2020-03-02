import { InputType, Field, Int } from 'type-graphql'
import { Specialty } from '../../entities/Specialty'
import { ObjectId } from 'mongodb'

@InputType()
export class ProfessionalInput {
  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field(() => Int)
  identification: number

  @Field(() => [ObjectId])
  specialties: Specialty[]
}
