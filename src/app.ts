import { buildSchema } from 'type-graphql'
import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { ObjectId } from 'mongodb'

import { mongoAtlas } from './database'
import { ObjectIdScalar } from './object-id.scalar'
import { ProfessionalResolver } from './resolvers/ProfessionalResolver'
import { SpecialtyResolver } from './resolvers/SpecialtyResolver'

const bootstrap = async (): Promise<void> => {
  try {
    await mongoAtlas()

    const schema = await buildSchema({
      resolvers: [ProfessionalResolver, SpecialtyResolver],
      scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
      validate: false,
      nullableByDefault: true,
      emitSchemaFile: {
        path: __dirname + '/schema.gql',
        commentDescriptions: true
      }
    })

    const server = new ApolloServer({ schema })
    const { url } = await server.listen(3000)

    console.log(`Server is running, GraphQL Playground available at ${url}`)
  } catch (err) {
    console.log('El errror', err)
    return err
  }
}

bootstrap()
