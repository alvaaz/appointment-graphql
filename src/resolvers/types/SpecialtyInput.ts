import { InputType, Field } from 'type-graphql'
import { ObjectId } from 'mongodb'

@InputType()
export class SpecialtyInput {
  @Field(() => ObjectId)
  _id: ObjectId

  @Field()
  name: string
}
