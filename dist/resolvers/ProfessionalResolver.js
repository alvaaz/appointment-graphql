'use strict'
var __decorate =
  (this && this.__decorate) ||
  function(decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc)
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
    return c > 3 && r && Object.defineProperty(target, key, r), r
  }
var __metadata =
  (this && this.__metadata) ||
  function(k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v)
  }
var __param =
  (this && this.__param) ||
  function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex)
    }
  }
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
const Professional_1 = require('../entities/Professional')
let ProfessionalInput = class ProfessionalInput {}
__decorate(
  [type_graphql_1.Field(), __metadata('design:type', String)],
  ProfessionalInput.prototype,
  'firstName',
  void 0
)
__decorate(
  [type_graphql_1.Field(), __metadata('design:type', String)],
  ProfessionalInput.prototype,
  'lastname',
  void 0
)
ProfessionalInput = __decorate([type_graphql_1.InputType()], ProfessionalInput)
let ProfessionalResolver = class ProfessionalResolver {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  createProfessional(options) {
    return __awaiter(this, void 0, void 0, function*() {
      const newProfessional = yield new Professional_1.ProfessionalModel(options).save()
      return newProfessional
    })
  }
}
__decorate(
  [
    type_graphql_1.Mutation(() => Professional_1.Professional),
    __param(
      0,
      type_graphql_1.Arg('options', () => ProfessionalInput)
    ),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [ProfessionalInput]),
    __metadata('design:returntype', Promise)
  ],
  ProfessionalResolver.prototype,
  'createProfessional',
  null
)
ProfessionalResolver = __decorate([type_graphql_1.Resolver()], ProfessionalResolver)
exports.ProfessionalResolver = ProfessionalResolver
//# sourceMappingURL=ProfessionalResolver.js.map
