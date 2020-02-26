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
const specialty_model_1 = require('../../specialty/specialty.model')
exports.specialties = specialtyIds =>
  __awaiter(void 0, void 0, void 0, function*() {
    try {
      const specialties = yield specialty_model_1.SpecialtyModel.find({
        _id: { $in: specialtyIds }
      })
      return specialties.map(specialty => {
        return {
          _id: specialty._id,
          name: specialty.name,
          professionals: exports.professionals.bind(this, specialty.professionals)
        }
      })
    } catch (err) {
      throw new Error(`Something goes wrong ${err}`)
    }
  })
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
exports.professionals = professionalIds =>
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
          specialties: exports.specialties.bind(this, professional.specialties)
        }
      })
    } catch (err) {
      throw new Error(`Something goes wrong ${err}`)
    }
  })
//# sourceMappingURL=merge.js.map
