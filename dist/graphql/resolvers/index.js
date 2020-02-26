'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const professional_1 = __importDefault(require('./professional'))
const auth_1 = __importDefault(require('./auth'))
const specialty_1 = __importDefault(require('./specialty'))
const rootResolver = Object.assign(
  Object.assign(Object.assign({}, professional_1.default), auth_1.default),
  specialty_1.default
)
exports.default = rootResolver
//# sourceMappingURL=index.js.map
