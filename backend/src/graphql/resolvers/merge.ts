import { ProfessionalModel } from '../../professional/professional.model'
import { Professional } from '../../professional/professional.interface'
import { SpecialtyModel } from '../../specialty/specialty.model'
import { Specialty } from '../../specialty/specialty.interface'

export const specialties = async (specialtyIds: string): Promise<Specialty[]> => {
  try {
    const specialties = await SpecialtyModel.find({ _id: { $in: specialtyIds } })
    return specialties.map(specialty => {
      return {
        _id: specialty._id,
        name: specialty.name,
        professionals: professionals.bind(this, specialty.professionals)
      }
    })
  } catch (err) {
    throw new Error(`Something goes wrong ${err}`)
  }
}

// export const assignSpecialties = async (professional: Professional): Promise<void> => {
//   try {
//     await SpecialtyModel.updateMany(
//       {
//         _id: { $in: professional.specialties }
//       },
//       { $addToSet: { professionals: professional } }
//     )
//   } catch (err) {
//     throw new Error(`Something goes wrong ${err}`)
//   }
// }

export const professionals = async (professionalIds: string): Promise<Professional[]> => {
  try {
    const professionals = await ProfessionalModel.find({
      _id: { $in: professionalIds }
    })
    return professionals.map(professional => {
      return {
        _id: professional._id,
        firstName: professional.firstName,
        lastName: professional.lastName,
        specialties: specialties.bind(this, professional.specialties)
      }
    })
  } catch (err) {
    throw new Error(`Something goes wrong ${err}`)
  }
}
