import { Specialty } from '../specialty/specialty.interface'
import { ObjectId, Collection } from 'mongodb'

export interface Professional {
  _id: ObjectId
  firstName: string
  lastName: string
  specialties?: Array<Specialty>
}
