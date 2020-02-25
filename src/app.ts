import express from 'express'
import bodyParser from 'body-parser'
import graphqlHTTP from 'express-graphql'
import { connect } from './database'

import graphQlSchema from './graphql/schema'
import graphQlResolvers from './graphql/resolvers'

const app = express()

app.use(bodyParser.json())

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    context: {
      messageId: 'test'
    }
  })
)

connect()

app.listen(3000, () => console.log('Server on port 3000'))
