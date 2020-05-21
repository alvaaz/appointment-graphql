import { ProfessionalModel } from '../../professional/professional.model'
import { Professional } from '../../professional/professional.interface'
import { specialties, professionals } from './merge'
import { ObjectId } from 'mongodb'
import { SpecialtyModel } from '../../specialty/specialty.model'

export default {
  async Professionals(specialtyId: { specialtyId: ObjectId }): Promise<Professional[] | undefined> {
    try {
      if (specialtyId.specialtyId && specialtyId.specialtyId.toString() !== '0') {
        const specialty = await SpecialtyModel.findOne({ _id: specialtyId.specialtyId })
        return professionals(specialty.professionals)
      } else {
        return professionals()
      }
    } catch (err) {
      throw new Error(`Something goes wrong ${err}`)
    }
  },

  async deleteProfessional(_id: string): Promise<Professional> {
    try {
      return await ProfessionalModel.findOneAndRemove({ _id }, (err) => {
        if (err) throw new Error(`Something goes wrong ${err}`)
      })
    } catch (err) {
      throw new Error(`Something goes wrong ${err}`)
    }
  },

  async updateProfessional({
    _id,
    firstName,
    lastName
  }: {
    _id: string
    firstName: string
    lastName: string
  }): Promise<Professional> {
    try {
      return await ProfessionalModel.updateOne({ _id }, { firstName, lastName }, (err) => {
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
