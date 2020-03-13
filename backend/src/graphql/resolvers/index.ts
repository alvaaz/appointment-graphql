import professionalResolver from './professional'
import authResolver from './auth'
import specialtyResolver from './specialty'
import offerResolver from './offer'

const rootResolver = {
  ...professionalResolver,
  ...authResolver,
  ...specialtyResolver,
  ...offerResolver
}

export default rootResolver
