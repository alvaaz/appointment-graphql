import {
  prop as Property,
  arrayProp as ArrayProperty,
  getModelForClass,
  Ref
} from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, ObjectType, Int } from 'type-graphql'
import { Specialty } from './Specialty'

@ObjectType()
export class Professional {
  @Field()
  readonly _id: ObjectId

  @Field()
  @Property({ required: true })
  firstName: string

  @Field()
  @Property({ required: true })
  lastName: string

  @Field(() => Int)
  @Property({ required: true })
  identification: number

  @Field(() => [Specialty], { nullable: true })
  @ArrayProperty({ref: Specialty, default: []})     // Changed by Ryann
  specialties: Ref<Specialty[]>                     // Changed by Ryann

  
    // ***
    // You were not using the correct syntax above, you were telling mongoose to expect 
    // a full specialty object instead of just the objectId as reference, so now mongo expects
    // and object ID array to save.
    // ***
  
  // @ArrayProperty({
  //   items: Specialty,
  //   default: []
  // })
  // specialties: Specialty[]
}

export const ProfessionalModel = getModelForClass(Professional)
