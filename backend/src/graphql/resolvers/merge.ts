import { ProfessionalModel } from '../../professional/professional.model'
import { Professional } from '../../professional/professional.interface'
import { SpecialtyModel } from '../../specialty/specialty.model'
import { Specialty } from '../../specialty/specialty.interface'
import { ObjectId } from 'mongodb'

export const specialties = async (specialtyIds?: ObjectId[]): Promise<Specialty[]> => {
  try {
    const specialties = Array.isArray(specialtyIds)
      ? await SpecialtyModel.find({ _id: { $in: specialtyIds } })
      : await SpecialtyModel.find()
    return specialties.map((specialty: Specialty) => {
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

export const professionals = async (professionalIds?: Professional[]): Promise<Professional[]> => {
  try {
    const professionals = Array.isArray(professionalIds)
      ? await ProfessionalModel.find({
          _id: { $in: professionalIds }
        })
      : await ProfessionalModel.find()
    return professionals.map((professional: Professional) => {
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

export const transformProfessional = (professional: Professional) => {
  return {
    _id: professional._id,
    firstName: professional.firstName,
    lastName: professional.lastName,
    specialties: specialties.bind(this, professional.specialties)
  }
}

export const singleProfessional = async (professionalId: ObjectId) => {
  try {
    const professional = await ProfessionalModel.findById(professionalId)
    return transformProfessional(professional)
  } catch (err) {
    throw err
  }
}

export const singleSpecialty = async (specialtyId: ObjectId) => {
  try {
    const specialty = await SpecialtyModel.findById(specialtyId)
    return {
      name: specialty.name,
      professionals: specialty.professionals.map((professional) =>
        singleProfessional.bind(this, specialty.professionals)
      )
    }
  } catch (err) {
    throw err
  }
}
