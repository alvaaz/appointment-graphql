import { Professional, ProfessionalModel } from '../../entities/Professional'
import { Specialty, SpecialtyModel } from '../../entities/Specialty'
import { ObjectId } from 'mongodb'

export const specialties = async (specialtyIds: ObjectId[]): Promise<Specialty[]> => {
  try {
    const specialties = await SpecialtyModel.find({ _id: { $in: specialtyIds } })
    return specialties.map(specialty => {
      return {
        ...specialty.toObject(),
        professionals: professionals(specialty.professionals)
      }
    })
  } catch (err) {
    throw new Error(`Something goes wrong ${err}`)
  }
}

export const professionals = async (professionalIds: ObjectId[]): Promise<Professional[]> => {
  try {
    const professionals = await ProfessionalModel.find({ _id: { $in: professionalIds } })
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
