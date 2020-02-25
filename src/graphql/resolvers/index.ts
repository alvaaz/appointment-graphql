import { User, UserEntity, UserIn } from '../../models/User'
import bcrypt from 'bcrypt'

export default {
  async Users(): Promise<UserIn[] | undefined> {
    try {
      console.log('entra')
      return await User.find()
    } catch (err) {
      throw new Error(`Something goes wrong ${err}`)
    }
  },
  async createUser({ userInput }: { userInput: UserEntity }): Promise<UserIn> {
    try {
      const user = await User.findOne({ email: userInput.email })
      if (user) {
        throw new Error('User exists already.')
      }
      const hashedPassword = await bcrypt.hash(userInput.password, 12)
      const newUser = new User({
        email: userInput.email,
        password: hashedPassword
      })
      await newUser.save()
      const { _id, email } = newUser
      return { _id, email, password: null }
    } catch (err) {
      throw new Error(`Something goes wrong ${err}`)
    }
  }
}
