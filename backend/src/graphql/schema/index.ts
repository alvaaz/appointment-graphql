import { buildSchema } from 'graphql'

export default buildSchema(`
  type User {
    _id: ID
    email: String
    password: String
  }

  type Professional {
    _id: ID
    firstName: String
    lastName: String
    specialties: [Specialty!]
  }

  type Hour {
    _id: ID
    date: String
    professional: Professional
    specialty: Specialty
    status: Boolean
    offer: Offer
    hours: [String]
    createdAt: String
    updatedAt: String
  }

  type Offer {
    _id: ID
    name: String
    begin: String
    end: String
    professional: Professional
    specialty: Specialty
    interval: Int
    createdAt: String
    updatedAt: String
  }

  type Specialty {
    _id: ID
    name: String!
    professionals: [Professional!]
  }

  input UserInput {
    email: String!
    password: String!
  }

  input SpecialtyInput {
    name: String!
  }

  input OfferInput {
    professional: ID!
    specialty: ID!
    name: String!
    begin: String!
    end: String!
    interval: Int!
  }

  input HourInput {
    date: String!
    professional: ID!
    specialty: ID!
  }

  input GetHourInput {
    professional: ID
    specialty: ID
  }

  input ProfessionalInput {
    firstName: String!
    lastName: String!
    specialties: [String]
  }

  type RootQuery {
    Users: [User]
    Professionals(specialtyId: String): [Professional]
    Specialties: [Specialty]
    Hours(getHourInput: GetHourInput): [Hour]
  }

  type RootMutation {
    createUser(userInput: UserInput): User
    createProfessional(professionalInput: ProfessionalInput): Professional
    createSpecialty(specialtyInput: SpecialtyInput): Specialty
    deleteProfessional(_id: String!): Professional
    assignSpecialties(_id: String! specialties: [String]): Professional
    createOffer(offerInput: OfferInput): Offer
    createHour(hourInput: HourInput): Hour
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`)
