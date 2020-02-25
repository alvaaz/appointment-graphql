import { Document, Schema, model } from 'mongoose'

const specialtySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  professionals: {
    type: Schema.Types.ObjectId,
    ref: 'Professional'
  }
})

interface ProfessionalIn {
  firstName: string
  lastName: string
  specialties: string
}

export interface SpecialtyIn {
  _id: string
  name: string
}

export interface SpecialtyEntity extends Document {
  name: string
  professionals: [ProfessionalIn]
}

export const Specialty = model<SpecialtyEntity>('Specialty', specialtySchema)
