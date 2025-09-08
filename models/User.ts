import mongoose, { Schema, models, model } from 'mongoose'

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
)

export default models.User || model('User', UserSchema)
