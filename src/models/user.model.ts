import mongoose, { Document, Model } from 'mongoose'

export interface IUser extends Document {
  username: string
  email: string
  password: string
  profilePic: string
  public_id: string
}

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    profilePic: {
      type: String,
      default: ''
    },
    public_id: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
)

const UserModel: Model<IUser> = mongoose.model<IUser>('User', UserSchema)

export default UserModel
