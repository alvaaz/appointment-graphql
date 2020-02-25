import { User, UserEntity, UserIn } from '../../models/User'
import { Specialty, SpecialtyEntity, SpecialtyIn } from '../../models/Specialty'
import { Professional, ProfessionalEntity, ProfessionalIn } from '../../models/Professional'

import bcrypt from 'bcrypt'

const specialties = async (specialtyIds: string): Promise<SpecialtyIn[]> => {
  try {
    const specialties = await Specialty.find({ _id: { $in: specialtyIds } })
    return specialties.map(specialty => {
      return {
        _id: specialty._id,
        name: specialty.name,
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        professionals: professionals.bind(this, specialty.professionals)
      }
    })
  } catch (e) {
    throw new Error(`Something goes wrong ${e}`)
  }
}

const professionals = async (professionalIds: string): Promise<ProfessionalIn[]> => {
  try {
    const professionals = await Professional.find({
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
  } catch (e) {
    throw new Error(`Something goes wrong ${e}`)
  }
}

export default {
  async Users(): Promise<UserIn[] | undefined> {
    try {
      return await User.find()
    } catch (err) {
      throw new Error(`Something goes wrong ${err}`)
    }
  },
  async createUser({ userInput }: { userInput: UserEntity }): Promise<UserIn> {
    try {
      const user = await User.findOne({ email: userInput.email })
      if (user) {
        throw new Error('User exists already.')
      }
      const hashedPassword = await bcrypt.hash(userInput.password, 12)
      const newUser = new User({
        email: userInput.email,
        password: hashedPassword
      })
      await newUser.save()
      const { _id, email } = newUser
      return { _id, email, password: null }
    } catch (err) {
      throw new Error(`Something goes wrong ${err}`)
    }
  },
  async createProfessional({
    professionalInput
  }: {
    professionalInput: ProfessionalEntity
  }): Promise<ProfessionalIn> {
    try {
      const newProfessional = new Professional({
        firstName: professionalInput.firstName,
        lastName: professionalInput.lastName,
        specialties: '5e5491969ae6c8344f0bb4be'
      })
      await newProfessional.save()
      const specialty = await Specialty.findById('5e5491969ae6c8344f0bb4be')
      if (!specialty) {
        throw new Error('Specialty not found.')
      }
      specialty.professionals.push(newProfessional)
      await specialty.save()
      return {
        _id: newProfessional._id,
        firstName: newProfessional.firstName,
        lastName: newProfessional.lastName,
        specialties: specialties.bind(this, newProfessional.specialties)
      }
    } catch (e) {
      throw new Error(`Something goes wrong ${e}`)
    }
  },
  async createSpecialty({
    specialtyInput
  }: {
    specialtyInput: SpecialtyEntity
  }): Promise<SpecialtyIn> {
    try {
      const newSpecialty = new Specialty({
        name: specialtyInput.name
      })
      await newSpecialty.save()
      return {
        _id: newSpecialty._id,
        name: newSpecialty.name
      }
    } catch (e) {
      throw new Error(`Something goes wrong ${e}`)
    }
  }
}
