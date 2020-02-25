import { buildSchema } from 'graphql'

export default buildSchema(`
  type User {
    _id: ID
    email: String
    password: String
  }

  input UserInput {
    email: String!
    password: String!
  }

  type RootQuery {
    Users: [User]
  }

  type RootMutation {
    createUser(userInput: UserInput): User
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`)
