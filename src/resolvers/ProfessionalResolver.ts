import { Resolver, Mutation, Arg, Query } from 'type-graphql'
import { Professional, ProfessionalModel } from '../entities/Professional'
import { ProfessionalInput } from './types/ProfessionalInput'
import { SpecialtyModel } from '../entities/Specialty'
import { specialties } from './helpers/populate'

@Resolver()
export class ProfessionalResolver {
  @Query(() => [Professional])
  async professionals(): Promise<Professional[]> {
    try {
      const professionals = await ProfessionalModel.find()
      return professionals.map(professional => {
        return {
          ...professional.toObject(),
          specialties: specialties(professional.specialties)
        }
      })
    } catch (err) {
      console.log('Erroooooor', err)
    }
  }

  @Mutation(() => Professional)
  async createProfessional(@Arg('options') options: ProfessionalInput): Promise<Professional> {
    try {
      const professional = await new ProfessionalModel({ ...options }).save()
      await SpecialtyModel.updateMany(
        { _id: { $in: professional.specialties } },
        { $addToSet: { professionals: professional } }
      )
      return {
        ...professional.toObject(),
        specialties: specialties(professional.specialties)
      }
    } catch (err) {
      console.log('Erroooooor', err)
    }
  }
}
