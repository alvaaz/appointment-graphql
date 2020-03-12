import { ProfessionalModel } from '../../professional/professional.model'
import { Professional } from '../../professional/professional.interface'
import { specialties } from './merge'
import { SpecialtyModel } from '../../specialty/specialty.model'

export default {
  async Professionals(): Promise<Professional[] | undefined> {
    try {
      const professionals = await ProfessionalModel.find()
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
  },

  async deleteProfessional(_id: string): Promise<Professional> {
    try {
      return await ProfessionalModel.findOneAndRemove({ _id }, err => {
        if (err) throw new Error(`Something goes wrong ${err}`)
      })
    } catch (err) {
      throw new Error(`Something goes wrong ${err}`)
    }
  },

  async createProfessional({
    professionalInput
  }: {
    professionalInput: Professional
  }): Promise<Professional> {
    try {
      const newProfessional = new ProfessionalModel({
        firstName: professionalInput.firstName,
        lastName: professionalInput.lastName,
        specialties: professionalInput.specialties
      })

      await newProfessional.save()

      await SpecialtyModel.updateMany(
        {
          _id: { $in: newProfessional.specialties }
        },
        { $addToSet: { professionals: newProfessional } }
      )

      const { _id, firstName, lastName } = newProfessional

      return {
        _id,
        firstName,
        lastName,
        specialties: specialties.bind(this, newProfessional.specialties)
      }
    } catch (err) {
      throw new Error(`Something goes wrong ${err}`)
    }
  }
}
