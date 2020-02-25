'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const mongoose_1 = require('mongoose')
const professionalSchema = new mongoose_1.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  specialties: [
    {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'Specialty'
    }
  ]
})
exports.ProfessionalModel = mongoose_1.model('Professional', professionalSchema)
//# sourceMappingURL=professional.model.js.map
