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
const professional_model_1 = require('../../professional/professional.model')
const merge_1 = require('./merge')
const specialty_model_1 = require('../../specialty/specialty.model')
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
            specialties: merge_1.specialties.bind(this, professional.specialties)
          }
        })
      } catch (err) {
        throw new Error(`Something goes wrong ${err}`)
      }
    })
  },
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
        yield specialty_model_1.SpecialtyModel.updateMany(
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
          specialties: merge_1.specialties.bind(this, newProfessional.specialties)
        }
      } catch (err) {
        throw new Error(`Something goes wrong ${err}`)
      }
    })
  }
}
//# sourceMappingURL=professional.js.map
