// import { User, UserEntity, UserIn } from '../../models/User'
import { ProfessionalModel } from '../../professional/professional.model'
import { Professional } from '../../professional/professional.interface'
import { SpecialtyModel } from '../../specialty/specialty.model'
import { Specialty } from '../../specialty/specialty.interface'

// import bcrypt from 'bcrypt'

const specialties = async (specialtyIds: string): Promise<Specialty[]> => {
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

const assignSpecialties = async (professional: Professional): Promise<void> => {
  try {
    await SpecialtyModel.find(
      {
        _id: { $in: professional.specialties }
      },
      async (err, doc) => {
        if (err) throw new Error(`Something goes wrong ${err}`)
        await SpecialtyModel.findOneAndUpdate(
          { _id: doc },
          { $push: { professionals: professional } }
        )
      }
    )
  } catch (err) {
    throw new Error(`Something goes wrong ${err}`)
  }
}

const professionals = async (professionalIds: string): Promise<Professional[]> => {
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
  // async Users(): Promise<UserIn[] | undefined> {
  //   try {
  //     return await User.find()
  //   } catch (err) {
  //     throw new Error(`Something goes wrong ${err}`)
  //   }
  // }
  // async createUser({ userInput }: { userInput: UserEntity }): Promise<UserIn> {
  //   try {
  //     const user = await User.findOne({ email: userInput.email })
  //     if (user) {
  //       throw new Error('User exists already.')
  //     }
  //     const hashedPassword = await bcrypt.hash(userInput.password, 12)
  //     const newUser = new User({
  //       email: userInput.email,
  //       password: hashedPassword
  //     })
  //     await newUser.save()
  //     const { _id, email } = newUser
  //     return { _id, email, password: null }
  //   } catch (err) {
  //     throw new Error(`Something goes wrong ${err}`)
  //   }
  // },
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

      assignSpecialties(newProfessional)

      return {
        _id: newProfessional._id,
        firstName: newProfessional.firstName,
        lastName: newProfessional.lastName,
        specialties: specialties.bind(this, newProfessional.specialties)
      }
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
        _id: newSpecialty._id,
        name: newSpecialty.name
      }
    } catch (err) {
      throw new Error(`Something goes wrong ${err}`)
    }
  }
}
