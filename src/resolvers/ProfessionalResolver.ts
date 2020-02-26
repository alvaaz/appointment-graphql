import { Resolver, Mutation, Arg, InputType, Field } from 'type-graphql'
import { Professional, ProfessionalModel } from '../entities/Professional'

@InputType()
class ProfessionalInput {
  @Field()
  firstName: string

  @Field()
  lastname: string
}

@Resolver()
export class ProfessionalResolver {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  @Mutation(() => Professional)
  async createProfessional(@Arg('options', () => ProfessionalInput) options: ProfessionalInput) {
    const newProfessional = await new ProfessionalModel(options).save()
    return newProfessional
  }
}
