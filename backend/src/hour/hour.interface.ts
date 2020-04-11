import { ObjectId } from 'mongodb'
import { Offer } from '../offer/offer.interface'
import { Professional } from '../professional/professional.interface'
import { Specialty } from '../specialty/specialty.interface'

export interface Hour {
  _id: ObjectId
  date: Date
  professional: Professional
  specialty: Specialty
  status: boolean
  offer: Offer
  createdAt: string
  updatedAt: string
  hours?: string[]
}
