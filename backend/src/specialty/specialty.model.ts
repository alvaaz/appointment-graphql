import { Document, Schema, model } from 'mongoose'
import { Specialty } from './specialty.interface'

const specialtySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  professionals: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Professional'
    }
  ]
})

export const SpecialtyModel = model<Specialty & Document>('Specialty', specialtySchema)
