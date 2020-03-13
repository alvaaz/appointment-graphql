import { Professional } from '../professional/professional.interface'
import { ObjectId } from 'mongodb'

export interface Specialty {
  _id: ObjectId
  name: string
  professionals: Array<Professional>
}
