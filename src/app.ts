import { buildSchema } from 'type-graphql'
import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { ObjectId } from 'mongodb'

import { mongoAtlas } from './database'
import { ObjectIdScalar } from './object-id.scalar'
import { ProfessionalResolver } from './resolvers/ProfessionalResolver'
import { GraphQLSchema } from 'graphql'

const bootstrap = async (): Promise<GraphQLSchema> => {
  try {
    mongoAtlas()

    const schema = await buildSchema({
      resolvers: [ProfessionalResolver],
      scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
      validate: false
    })

    const server = new ApolloServer({ schema })
    const { url } = await server.listen(3000)

    console.log(`Server is running, GraphQL Playground available at ${url}`)
    return schema
  } catch (err) {
    console.error(err)
    throw err
  }
}

bootstrap()
