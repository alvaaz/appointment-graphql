import { Resolver, Mutation, Arg, Query } from 'type-graphql'
import { Professional, ProfessionalModel } from '../entities/Professional'
import { ProfessionalInput } from './types/ProfessionalInput'
import { Specialty, SpecialtyModel } from '../entities/Specialty'

const specialties = async (specialtyIds: string): Promise<Specialty[]> => {
  try {
    const specialties = await SpecialtyModel.find({ _id: { $in: specialtyIds } })
    console.log('ss', specialties)
    return specialties.map(specialty => {
      return {
        _id: specialty._id,
        name: specialty.name
      }
    })
  } catch (err) {
    throw new Error(`Something goes wrong ${err}`)
  }
}

@Resolver()
export class ProfessionalResolver {
  @Query(() => [Professional])
  async professionals(): Promise<Professional[]> {
    return await ProfessionalModel.find({})
  }

  @Mutation(() => Professional)
  async createProfessional(@Arg('options') options: ProfessionalInput): Promise<Professional> {
    try {
      const professional = await new ProfessionalModel({ ...options }).save()
      await SpecialtyModel.updateMany(
        { _id: { $in: professional.specialties } },
        { $addToSet: { professionals: professional } }
      )
      return ProfessionalModel.findById(professional._id).populate('specialties')
    } catch (err) {
      console.log('Erroooooor', err)
    }
  }
}
