import professionalResolver from './professional'
import authResolver from './auth'
import specialtyResolver from './specialty'

const rootResolver = {
  ...professionalResolver,
  ...authResolver,
  ...specialtyResolver
}

export default rootResolver
