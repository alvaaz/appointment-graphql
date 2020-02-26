'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const graphql_1 = require('graphql')
exports.default = graphql_1.buildSchema(`
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

  input ProfessionalInput {
    firstName: String!
    lastName: String!
    specialties: [String]
  }

  type RootQuery {
    Users: [User]
    Professionals: [Professional]
    Specialties: [Specialty]
  }

  type RootMutation {
    createUser(userInput: UserInput): User
    createProfessional(professionalInput: ProfessionalInput): Professional
    createSpecialty(specialtyInput: SpecialtyInput): Specialty
    deleteProfessional(_id: String!): Professional
    assignSpecialties(_id: String! specialties: [String]): Professional
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`)
//# sourceMappingURL=index.js.map
