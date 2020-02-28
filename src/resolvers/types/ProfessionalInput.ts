import { InputType, Field, Int } from 'type-graphql'
import { Professional } from '../../entities/Professional'

@InputType()
export class ProfessionalInput implements Partial<Professional> {
  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field(() => Int)
  identification: number
}
