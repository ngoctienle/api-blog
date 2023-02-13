import { InferSchemaType, model, Schema } from 'mongoose'

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    default: 'Admin'
  }
})

type UserType = InferSchemaType<typeof userSchema>

export const User = model<UserType>('User', userSchema)
