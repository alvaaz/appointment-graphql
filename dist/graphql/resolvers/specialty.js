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
const specialty_model_1 = require('../../specialty/specialty.model')
const professional_model_1 = require('../../professional/professional.model')
exports.default = {
  createSpecialty({ specialtyInput }) {
    return __awaiter(this, void 0, void 0, function*() {
      try {
        const newSpecialty = new specialty_model_1.SpecialtyModel({
          name: specialtyInput.name
        })
        yield newSpecialty.save()
        return Object.assign({}, newSpecialty)
      } catch (err) {
        throw new Error(`Something goes wrong ${err}`)
      }
    })
  },
  assignSpecialties({ _id, specialties }) {
    return __awaiter(this, void 0, void 0, function*() {
      try {
        yield specialty_model_1.SpecialtyModel.updateMany(
          {
            _id: { $in: specialties }
          },
          { $addToSet: { professionals: _id } }
        )
        return yield professional_model_1.ProfessionalModel.findOneAndUpdate(
          {
            _id: _id
          },
          { $addToSet: { specialties: specialties } },
          { new: true }
        ).populate('specialties')
      } catch (err) {
        throw new Error(`Something goes wrong ${err}`)
      }
    })
  }
}
//# sourceMappingURL=specialty.js.map
