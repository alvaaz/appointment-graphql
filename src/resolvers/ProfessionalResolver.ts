import { ObjectId } from 'mongodb'
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
      throw new Error(`Something goes wrong ${err}`)
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
      throw new Error(`Something goes wrong ${err}`)
    }
  }

  @Mutation(() => Professional)
  async deleteProfessional(@Arg('professional') professional: ObjectId): Promise<Professional> {
    try {
      const professionalDeleted = await ProfessionalModel.findOneAndRemove({ _id: professional })
      await SpecialtyModel.updateMany(
        { _id: { $in: professionalDeleted.specialties } },
        { $pull: { professionals: professional } }
      )
      return professionalDeleted
    } catch (err) {
      throw new Error(`Something goes wrong ${err}`)
    }
  }
}
