import { Document, Schema, model } from 'mongoose'

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

export interface ProfessionalIn {
  _id: string
  firstName: string
  lastName: string
  specialties: []
}

export interface ProfessionalEntity extends Document {
  firstName: string
  lastName: string
  specialties: string
}

export const Professional = model<ProfessionalEntity>('Professional', professionalSchema)
