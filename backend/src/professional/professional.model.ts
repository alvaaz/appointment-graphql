import { Document, Schema, model } from 'mongoose'
import { Professional } from './professional.interface'

const professionalSchema = new Schema({
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
      type: Schema.Types.ObjectId,
      ref: 'Specialty'
    }
  ]
})

export const ProfessionalModel = model<Professional & Document>('Professional', professionalSchema)
