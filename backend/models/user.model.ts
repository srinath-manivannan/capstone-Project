import { Schema, model } from 'mongoose';
import type { IUser } from '../types/user.types';

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    contact: { type: String, required: true, trim: true },
    // select: false means this field is hidden by default on every query -
    // you have to explicitly ask for it with .select('+password')
    password: { type: String, required: true, select: false },
  },
  { timestamps: true } // adds createdAt / updatedAt automatically
);

export default model<IUser>('User', userSchema);