import { InputType, Field } from 'type-graphql'
import { Professional } from '../../entities/Professional'
import { ObjectId } from 'mongodb'

@InputType()
export class SpecialtyInput {
  @Field(type => ObjectId) // Added by Ryann
  _id: ObjectId // Added by Ryann

  @Field()
  name: string

  // @Field(() => [ObjectId])
  // professionals: Professional[]
}
