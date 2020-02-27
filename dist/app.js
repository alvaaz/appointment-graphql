'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function(resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
Object.defineProperty(exports, '__esModule', { value: true })
const type_graphql_1 = require('type-graphql')
require('reflect-metadata')
const apollo_server_1 = require('apollo-server')
const mongodb_1 = require('mongodb')
const database_1 = require('./database')
const object_id_scalar_1 = require('./object-id.scalar')
const ProfessionalResolver_1 = require('./resolvers/ProfessionalResolver')
const bootstrap = () =>
  __awaiter(void 0, void 0, void 0, function*() {
    try {
      database_1.connect()
      const schema = yield type_graphql_1.buildSchema({
        resolvers: [ProfessionalResolver_1.ProfessionalResolver],
        scalarsMap: [{ type: mongodb_1.ObjectId, scalar: object_id_scalar_1.ObjectIdScalar }]
      })
      const server = new apollo_server_1.ApolloServer({ schema })
      const { url } = yield server.listen(3000)
      console.log(`Server is running, GraphQL Playground available at ${url}`)
    } catch (err) {
      throw new Error(err)
    }
  })
bootstrap()
//# sourceMappingURL=app.js.map
