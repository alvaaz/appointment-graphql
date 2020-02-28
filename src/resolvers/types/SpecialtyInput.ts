import { InputType, Field } from 'type-graphql'
import { Specialty } from '../../entities/Specialty'

@InputType()
export class SpecialtyInput implements Partial<Specialty> {
  @Field()
  name: string
}
