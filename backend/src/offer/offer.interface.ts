import { ObjectId } from 'mongodb'
import { Professional } from '../professional/professional.interface'
import { Specialty } from '../specialty/specialty.interface'

export interface Offer {
  _id: ObjectId
  name: string
  begin: Date
  end: Date
  professional?: Professional
  specialty?: Specialty
  interval: number
  createdAt: string
  updatedAt: string
}
