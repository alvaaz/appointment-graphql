import { Resolver, Mutation, Arg, Query } from 'type-graphql'
import { Professional, ProfessionalModel } from '../entities/Professional'
import { ProfessionalInput } from './types/ProfessionalInput'

@Resolver()
export class ProfessionalResolver {
  @Query(() => [Professional])
  async professionals(): Promise<Professional[]> {
    return await ProfessionalModel.find({})
  }

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
