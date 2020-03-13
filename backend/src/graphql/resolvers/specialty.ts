import { SpecialtyModel } from '../../specialty/specialty.model'
import { Specialty } from '../../specialty/specialty.interface'
import { Professional } from '../../professional/professional.interface'
import { ProfessionalModel } from '../../professional/professional.model'
import { professionals, specialties } from './merge'

export default {
  async Specialties(): Promise<Specialty[] | undefined> {
    try {
      return specialties()
    } catch (err) {
      throw new Error(`Something goes wrong ${err}`)
    }
  },
  async createSpecialty({ specialtyInput }: { specialtyInput: Specialty }): Promise<Specialty> {
    try {
      const newSpecialty = new SpecialtyModel({
        name: specialtyInput.name
      })
      await newSpecialty.save()
      return {
        ...newSpecialty
      }
    } catch (err) {
      throw new Error(`Something goes wrong ${err}`)
    }
  },
  async assignSpecialties({
    _id,
    specialties
  }: {
    _id: string
    specialties: string[]
  }): Promise<Professional> {
    try {
      await SpecialtyModel.updateMany(
        {
          _id: { $in: specialties }
        },
        { $addToSet: { professionals: _id } }
      )
      return await ProfessionalModel.findOneAndUpdate(
        {
          _id: _id
        },
        { $addToSet: { specialties: specialties } },
        { new: true }
      ).populate('specialties')
    } catch (err) {
      throw new Error(`Something goes wrong ${err}`)
    }
  }
}
