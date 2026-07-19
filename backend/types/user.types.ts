import type { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  contact: string;
  password: string; // stored as a bcrypt hash, never the real password
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterInput {
  name: string;
  email: string;
  contact: string;
  password: string;
  confirmPassword: string;
}

export interface LoginInput {
  email: string;
  password: string;
}