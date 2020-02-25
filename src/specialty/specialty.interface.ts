import { Professional } from '../professional/professional.interface'

export interface Specialty {
  _id: string
  name: string
  professionals?: Array<Professional>
}
