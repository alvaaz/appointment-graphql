import { connect } from './database'
import { ObjectId } from 'mongodb'
import { ObjectIdScalar } from './object-id.scalar'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { ProfessionalResolver } from './resolvers/ProfessionalResolver'
import { ApolloServer } from 'apollo-server'

const bootstrap = async (): Promise<void> => {
  try {
    connect()

    const schema = await buildSchema({
      resolvers: [ProfessionalResolver],
      scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }]
    })

    const server = new ApolloServer({ schema })
    const { url } = await server.listen(3000)

    console.log(`Server is running, GraphQL Playground available at ${url}`)
  } catch (err) {
    throw new Error(err)
  }
}

bootstrap()
