import { Specialty } from '../specialty/specialty.interface'
import { ObjectId } from 'mongodb'

export interface Professional {
  _id: ObjectId
  firstName: string
  lastName: string
  specialties?: Array<Specialty>
}
