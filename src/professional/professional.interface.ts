import { Specialty } from '../specialty/specialty.interface'

export interface Professional {
  _id: string
  firstName: string
  lastName: string
  specialty?: string
  specialties: Array<Specialty | string>
}
