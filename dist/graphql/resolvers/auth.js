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
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const user_model_1 = require('../../user/user.model')
const bcrypt_1 = __importDefault(require('bcrypt'))
exports.default = {
  Users() {
    return __awaiter(this, void 0, void 0, function*() {
      try {
        return yield user_model_1.UserModel.find()
      } catch (err) {
        throw new Error(`Something goes wrong ${err}`)
      }
    })
  },
  createUser({ userInput }) {
    return __awaiter(this, void 0, void 0, function*() {
      try {
        const user = yield user_model_1.UserModel.findOne({ email: userInput.email })
        const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (user) throw new Error('User exists already.')
        if (!regexEmail.test(userInput.email)) throw new Error('Email invalid.')
        const hashedPassword = yield bcrypt_1.default.hash(userInput.password, 12)
        const newUser = new user_model_1.UserModel({
          email: userInput.email,
          password: hashedPassword
        })
        yield newUser.save()
        const { _id, email } = newUser
        return { _id, email, password: null }
      } catch (err) {
        throw new Error(`Something goes wrong ${err}`)
      }
    })
  }
}
//# sourceMappingURL=auth.js.map
