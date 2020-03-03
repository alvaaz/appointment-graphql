import { buildSchema } from 'type-graphql'
import 'reflect-metadata'
import { ObjectId } from 'mongodb'

import { mongoAtlas } from './database'
import { ObjectIdScalar } from './object-id.scalar'
import { ProfessionalResolver } from './resolvers/ProfessionalResolver'
import { SpecialtyResolver } from './resolvers/SpecialtyResolver'

import express from 'express'
import bodyParser from 'body-parser'
import graphqlHTTP from 'express-graphql'

const bootstrap = async (): Promise<void> => {
  const app = express()
  app.use(bodyParser.json())

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

  app.use(
    '/graphql',
    graphqlHTTP({
      graphiql: true,
      schema: schema,
      rootValue: [ProfessionalResolver, SpecialtyResolver]
    })
  )

  mongoAtlas()

  app.listen(3000, () => console.log('Server on port 3000'))
}

bootstrap()
