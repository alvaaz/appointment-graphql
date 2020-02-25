'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const body_parser_1 = __importDefault(require('body-parser'))
const express_graphql_1 = __importDefault(require('express-graphql'))
const database_1 = require('./database')
const schema_1 = __importDefault(require('./graphql/schema'))
const resolvers_1 = __importDefault(require('./graphql/resolvers'))
const app = express_1.default()
app.use(body_parser_1.default.json())
app.use(
  '/graphql',
  express_graphql_1.default({
    graphiql: true,
    schema: schema_1.default,
    rootValue: resolvers_1.default,
    context: {
      messageId: 'test'
    }
  })
)
database_1.connect()
app.listen(3000, () => console.log('Server on port 3000'))
//# sourceMappingURL=app.js.map
