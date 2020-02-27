import { Resolver, Mutation, Arg, InputType, Field } from 'type-graphql'
import { Professional, ProfessionalModel } from '../entities/Professional'

@InputType()
class ProfessionalInput implements Partial<Professional> {
  @Field()
  firstName: string

  @Field()
  lastName: string
}

@Resolver()
export class ProfessionalResolver {
  @Mutation(() => Professional)
  async createProfessional(
    @Arg('options', () => ProfessionalInput) options: ProfessionalInput
  ): Promise<Professional> {
    const professional = new ProfessionalModel({
      ...options
    } as Professional)

    return await professional.save()
  }
}
