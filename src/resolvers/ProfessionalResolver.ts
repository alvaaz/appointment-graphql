import { Resolver, Mutation, Arg } from 'type-graphql'
import { Professional, ProfessionalModel } from '../entities/Professional'
import { ProfessionalInput } from './types/ProfessionalInput'

@Resolver()
export class ProfessionalResolver {
  @Mutation(() => Professional)
  async createProfessional(@Arg('options') options: ProfessionalInput): Promise<Professional> {
    try {
      const professional = new ProfessionalModel(options as Professional)

      return await professional.save()
    } catch (err) {
      console.log('Erroooooor', err)
    }
  }
}
