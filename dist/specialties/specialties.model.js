'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const mongoose_1 = require('mongoose')
const specialtySchema = new mongoose_1.Schema({
  name: {
    type: String,
    required: true
  },
  professionals: {
    type: mongoose_1.Schema.Types.ObjectId,
    ref: 'Professional'
  }
})
exports.SpecialtyModel = mongoose_1.model('Specialty', specialtySchema)
//# sourceMappingURL=specialties.model.js.map
