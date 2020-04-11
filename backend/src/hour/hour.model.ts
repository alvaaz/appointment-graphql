import { Document, Schema, model } from 'mongoose'
import { Hour } from './hour.interface'

const hourSchema = new Schema(
  {
    date: {
      type: Date,
      required: true
    },
    professional: {
      type: Schema.Types.ObjectId,
      ref: 'Professional'
    },
    specialty: {
      type: Schema.Types.ObjectId,
      ref: 'Specialty'
    },
    status: {
      type: Boolean,
      required: true
    },
    offer: {
      type: Schema.Types.ObjectId,
      ref: 'Offer'
    }
  },
  { timestamps: true }
)

export const HourModel = model<Hour & Document>('Hour', hourSchema)
