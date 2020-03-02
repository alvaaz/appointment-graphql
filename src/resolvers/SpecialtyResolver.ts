import { ObjectId } from 'mongodb'
import { Resolver, Mutation, Arg, Query } from 'type-graphql'
import { Specialty, SpecialtyModel } from '../entities/Specialty'
import { SpecialtyInput } from './types/SpecialtyInput'
import { ProfessionalModel } from '../entities/Professional'
import { professionals } from './helpers/populate'

@Resolver()
export class SpecialtyResolver {
  @Query(() => [Specialty])
  async specialties(): Promise<Specialty[]> {
    try {
      const specialties = await SpecialtyModel.find()
      return specialties.map(specialty => {
        return {
          ...specialty.toObject(),
          professionals: professionals(specialty.professionals)
        }
      })
    } catch (err) {
      throw new Error(`Something goes wrong ${err}`)
    }
  }

  @Mutation(() => Specialty)
  async createSpecialty(@Arg('options') options: SpecialtyInput): Promise<Specialty> {
    try {
      const specialty = await new SpecialtyModel({ ...options }).save()
      return {
        ...specialty.toObject(),
        professionals: professionals(specialty.professionals)
      }
    } catch (err) {
      throw new Error(`Something goes wrong ${err}`)
    }
  }

  @Mutation(() => Specialty)
  async deleteSpecialty(@Arg('specialty') specialty: ObjectId): Promise<Specialty> {
    try {
      return await SpecialtyModel.findOneAndRemove({ _id: specialty }, async (err, doc) => {
        if (err) throw new Error(`Something goes wrong ${err}`)
        console.log(doc, err)
        await ProfessionalModel.updateMany(
          { _id: { $in: doc.professionals } },
          { $pull: { specialties: specialty } }
        )
      })
    } catch (err) {
      throw new Error(`Something goes wrong ${err}`)
    }
  }
}
