import { Resolver, Mutation, Arg, Query } from 'type-graphql'
import { Specialty, SpecialtyModel } from '../entities/Specialty'
import { SpecialtyInput } from './types/SpecialtyInput'
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
      console.log('Erroooooor', err)
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
      console.log('Erroooooor', err)
    }
  }
}
