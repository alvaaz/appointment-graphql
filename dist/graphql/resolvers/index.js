'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function(resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
Object.defineProperty(exports, '__esModule', { value: true })
// import { User, UserEntity, UserIn } from '../../models/User'
const professional_model_1 = require('../../professional/professional.model')
const specialty_model_1 = require('../../specialty/specialty.model')
// import bcrypt from 'bcrypt'
const specialties = specialtyIds =>
  __awaiter(void 0, void 0, void 0, function*() {
    try {
      const specialties = yield specialty_model_1.SpecialtyModel.find({
        _id: { $in: specialtyIds }
      })
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
  })
const assignSpecialties = professional =>
  __awaiter(void 0, void 0, void 0, function*() {
    try {
      yield specialty_model_1.SpecialtyModel.find(
        {
          _id: { $in: professional.specialties }
        },
        (err, doc) =>
          __awaiter(void 0, void 0, void 0, function*() {
            if (err) throw new Error(`Something goes wrong ${err}`)
            yield specialty_model_1.SpecialtyModel.findOneAndUpdate(
              { _id: doc },
              { $push: { professionals: professional } }
            )
          })
      )
    } catch (err) {
      throw new Error(`Something goes wrong ${err}`)
    }
  })
const professionals = professionalIds =>
  __awaiter(void 0, void 0, void 0, function*() {
    try {
      const professionals = yield professional_model_1.ProfessionalModel.find({
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
  })
exports.default = {
  Professionals() {
    return __awaiter(this, void 0, void 0, function*() {
      try {
        const professionals = yield professional_model_1.ProfessionalModel.find()
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
    })
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
  deleteProfessional(_id) {
    return __awaiter(this, void 0, void 0, function*() {
      try {
        return yield professional_model_1.ProfessionalModel.findOneAndRemove({ _id }, err => {
          if (err) throw new Error(`Something goes wrong ${err}`)
        })
      } catch (err) {
        throw new Error(`Something goes wrong ${err}`)
      }
    })
  },
  createProfessional({ professionalInput }) {
    return __awaiter(this, void 0, void 0, function*() {
      try {
        const newProfessional = new professional_model_1.ProfessionalModel({
          firstName: professionalInput.firstName,
          lastName: professionalInput.lastName,
          specialties: professionalInput.specialties
        })
        yield newProfessional.save()
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
    })
  },
  createSpecialty({ specialtyInput }) {
    return __awaiter(this, void 0, void 0, function*() {
      try {
        const newSpecialty = new specialty_model_1.SpecialtyModel({
          name: specialtyInput.name
        })
        yield newSpecialty.save()
        return {
          _id: newSpecialty._id,
          name: newSpecialty.name
        }
      } catch (err) {
        throw new Error(`Something goes wrong ${err}`)
      }
    })
  }
}
//# sourceMappingURL=index.js.map
