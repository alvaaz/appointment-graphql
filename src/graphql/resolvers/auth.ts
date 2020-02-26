import { User } from '../../user/user.interface'
import { UserModel } from '../../user/user.model'

import bcrypt from 'bcrypt'

export default {
  async Users(): Promise<User[] | undefined> {
    try {
      return await UserModel.find()
    } catch (err) {
      throw new Error(`Something goes wrong ${err}`)
    }
  },
  async createUser({ userInput }: { userInput: User }): Promise<User> {
    try {
      const user = await UserModel.findOne({ email: userInput.email })

      const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      if (user) throw new Error('User exists already.')
      if (!regexEmail.test(userInput.email)) throw new Error('Email invalid.')

      const hashedPassword = await bcrypt.hash(userInput.password, 12)
      const newUser = new UserModel({
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
