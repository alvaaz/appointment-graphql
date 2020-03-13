import { Document, Schema, model } from 'mongoose'
import { Offer } from './offer.interface'

const offerSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    begin: {
      type: Date,
      required: true
    },
    end: {
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
    interval: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
)

export const OfferModel = model<Offer & Document>('Offer', offerSchema)
