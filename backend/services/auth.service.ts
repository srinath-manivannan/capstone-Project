import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import { AppError } from '../utils/AppError';
import { generateToken } from '../utils/generateToken';
import type { RegisterInput, LoginInput } from '../types/user.types';

const SALT_ROUNDS = 10; // higher = more secure but slower; 10 is the standard default

export async function registerUser(input: RegisterInput) {
  const { name, email, contact, password } = input;

  // Stop duplicate accounts before we even touch bcrypt
  const existing = await User.findOne({ email });
  if (existing) {
    throw new AppError('An account with this email already exists', 409);
  }

  // HASHING: bcrypt scrambles the password into something that can't be
  // reversed back into the original text. We NEVER store the real password.
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await User.create({ name, email, contact, password: hashedPassword });

  const token = generateToken(user.id);

  return {
    token,
    user: { id: user.id, name: user.name, email: user.email, contact: user.contact },
  };
}

export async function loginUser(input: LoginInput) {
  const { email, password } = input;

  // .select('+password') is required here because the schema hides
  // password by default (select: false in User.model.ts)
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    // Same generic message as a wrong password - don't reveal WHICH part was wrong
    throw new AppError('Invalid email or password', 401);
  }

  // bcrypt.compare hashes the entered password the same way and checks
  // if the result matches the stored hash - the original password is
  // never decrypted, because it can't be.
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError('Invalid email or password', 401);
  }

  const token = generateToken(user.id);

  return {
    token,
    user: { id: user.id, name: user.name, email: user.email, contact: user.contact },
  };
}

export async function forgotPassword(email: string) {
  // Always return the same message whether or not the email exists -
  // this stops someone using this endpoint to check which emails are registered.
  //
  // TODO (future step): once Resend is wired up per your project plan,
  // generate a short-lived reset token here and email it to the user.
  await User.findOne({ email });
  return { message: 'If that email is registered, password reset instructions have been sent.' };
}