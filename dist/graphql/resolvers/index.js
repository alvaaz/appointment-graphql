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
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const User_1 = require('../../models/User')
const Specialty_1 = require('../../models/Specialty')
const Professional_1 = require('../../models/Professional')
const bcrypt_1 = __importDefault(require('bcrypt'))
const specialties = specialtyIds =>
  __awaiter(void 0, void 0, void 0, function*() {
    try {
      const specialties = yield Specialty_1.Specialty.find({ _id: { $in: specialtyIds } })
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
  })
const professionals = professionalIds =>
  __awaiter(void 0, void 0, void 0, function*() {
    try {
      const professionals = yield Professional_1.Professional.find({
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
  })
exports.default = {
  Users() {
    return __awaiter(this, void 0, void 0, function*() {
      try {
        return yield User_1.User.find()
      } catch (err) {
        throw new Error(`Something goes wrong ${err}`)
      }
    })
  },
  createUser({ userInput }) {
    return __awaiter(this, void 0, void 0, function*() {
      try {
        const user = yield User_1.User.findOne({ email: userInput.email })
        if (user) {
          throw new Error('User exists already.')
        }
        const hashedPassword = yield bcrypt_1.default.hash(userInput.password, 12)
        const newUser = new User_1.User({
          email: userInput.email,
          password: hashedPassword
        })
        yield newUser.save()
        const { _id, email } = newUser
        return { _id, email, password: null }
      } catch (err) {
        throw new Error(`Something goes wrong ${err}`)
      }
    })
  },
  createProfessional({ professionalInput }) {
    return __awaiter(this, void 0, void 0, function*() {
      try {
        const newProfessional = new Professional_1.Professional({
          firstName: professionalInput.firstName,
          lastName: professionalInput.lastName,
          specialties: '5e5491969ae6c8344f0bb4be'
        })
        yield newProfessional.save()
        const specialty = yield Specialty_1.Specialty.findById('5e5491969ae6c8344f0bb4be')
        if (!specialty) {
          throw new Error('Specialty not found.')
        }
        specialty.professionals.push(newProfessional)
        yield specialty.save()
        return {
          _id: newProfessional._id,
          firstName: newProfessional.firstName,
          lastName: newProfessional.lastName,
          specialties: specialties.bind(this, newProfessional.specialties)
        }
      } catch (e) {
        throw new Error(`Something goes wrong ${e}`)
      }
    })
  },
  createSpecialty({ specialtyInput }) {
    return __awaiter(this, void 0, void 0, function*() {
      try {
        const newSpecialty = new Specialty_1.Specialty({
          name: specialtyInput.name
        })
        yield newSpecialty.save()
        return {
          _id: newSpecialty._id,
          name: newSpecialty.name
        }
      } catch (e) {
        throw new Error(`Something goes wrong ${e}`)
      }
    })
  }
}
//# sourceMappingURL=index.js.map
