import mongoose from 'mongoose'

interface IUser extends mongoose.Document {
  firstName: string
  lastName: string
  email: string
  password: string
  role: number
}

const userSchema = new mongoose.Schema({
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
    type: Number,
    default: 0
  }
})

export const UserModel = mongoose.model<IUser>('User', userSchema)
