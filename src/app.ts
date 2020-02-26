import express from 'express'
import bodyParser from 'body-parser'
import graphqlHTTP from 'express-graphql'
import { connect } from './database'

import 'reflect-metadata'
import { buildSchema, Resolver, Query } from 'type-graphql'
import { ProfessionalResolver } from './resolvers/ProfessionalResolver'

@Resolver()
class HelloResolver {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  @Query(() => String, { name: 'helloWorld' })
  async hello() {
    return 'hello world'
  }
}

// import graphQlSchema from './graphql/schema'
// import graphQlResolvers from './graphql/resolvers'

const main = async (): Promise<void> => {
  const app = express()
  app.use(bodyParser.json())
  app.use(
    '/graphql',
    graphqlHTTP({
      graphiql: true,
      schema: await buildSchema({
        resolvers: [HelloResolver, ProfessionalResolver]
      }),
      context: {
        messageId: 'test'
      }
    })
  )

  connect()

  app.listen(3000, () => console.log('Server on port 3000'))
}

main()
