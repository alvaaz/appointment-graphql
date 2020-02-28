import { Resolver, Mutation, Arg, Query } from 'type-graphql'
import { Specialty, SpecialtyModel } from '../entities/Specialty'
import { SpecialtyInput } from './types/SpecialtyInput'

@Resolver()
export class SpecialtyResolver {
  @Query(() => [Specialty])
  async specialties(): Promise<Specialty[]> {
    return await SpecialtyModel.find({})
  }

  @Mutation(() => Specialty)
  async createSpecialty(@Arg('options') options: SpecialtyInput): Promise<Specialty> {
    try {
      const specialty = new SpecialtyModel(options as Specialty)

      return await specialty.save()
    } catch (err) {
      console.log('Erroooooor', err)
    }
  }
}
