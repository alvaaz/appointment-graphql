import { Document, Schema, model } from 'mongoose'

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

export interface UserIn {
  _id: string
  email: string
  password: string
}

export interface UserEntity extends Document {
  email: string
  password: string
}

export const User = model<UserEntity>('User', userSchema)
