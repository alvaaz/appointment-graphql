import professionalResolver from './professional'
import authResolver from './auth'
import specialtyResolver from './specialty'
import offerResolver from './offer'
import hourResolver from './hour'

const rootResolver = {
  ...professionalResolver,
  ...authResolver,
  ...specialtyResolver,
  ...offerResolver,
  ...hourResolver
}

export default rootResolver
