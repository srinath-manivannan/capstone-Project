/**
 * ============================================
 * 📄 WHAT : The Auth SERVICE — register/login/forgot-password logic.
 * 🎯 WHY  : SRP — ALL security-sensitive logic (hashing, comparing, token
 *           creation) lives here, away from HTTP. The controller can't get
 *           it wrong because it never touches a password.
 * 🔁 FLOW : controllers/auth.controller.ts ➜ THIS FILE ➜ models/User.model.ts ➜ MongoDB
 * ============================================
 */
import bcrypt from 'bcryptjs';
import User from '../models/User.model';
import { AppError } from '../utils/AppError';
import { generateToken } from '../utils/generateToken';
import type { RegisterInput, LoginInput } from '../types/user.types';

// 💬 INTERVIEW: "What is a salt round?" — how many times bcrypt re-scrambles.
// Higher = slower to crack but slower to log in; 10 is the industry default.
const SALT_ROUNDS = 10;

export async function registerUser(input: RegisterInput) {
  const { name, email, contact, password } = input;

  // STEP 1: block duplicate accounts (409 Conflict is the standard status).
  const existing = await User.findOne({ email });
  if (existing) {
    throw new AppError('An account with this email already exists', 409);
  }

  // STEP 2: HASH the password. Hashing is ONE-WAY — it can never be reversed.
  // 💬 INTERVIEW: "Hashing vs encryption?" — encryption is two-way (you can
  // decrypt with a key); hashing is one-way (nobody, not even us, can get the
  // password back). Passwords must always be HASHED, never encrypted.
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // STEP 3: save the user (with the hash, never the real password).
  const user = await User.create({ name, email, contact, password: hashedPassword });

  // STEP 4: issue a JWT so registration logs the user straight in.
  const token = generateToken(user.id);

  // STEP 5: return ONLY safe fields — never the password hash.
  return {
    token,
    user: { id: user.id, name: user.name, email: user.email, contact: user.contact },
  };
}

export async function loginUser(input: LoginInput) {
  const { email, password } = input;

  // STEP 1: find the user. `.select('+password')` is needed because the
  // schema hides the hash by default (select: false in User.model.ts).
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    // 🔒 Same generic message as a wrong password — never reveal WHICH part
    // was wrong, or attackers can discover which emails are registered.
    throw new AppError('Invalid email or password', 401);
  }

  // STEP 2: bcrypt.compare hashes the typed password the same way and checks
  // whether the result matches the stored hash. The original password is
  // never "decrypted" — it can't be.
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError('Invalid email or password', 401);
  }

  // STEP 3: success → issue a fresh token.
  const token = generateToken(user.id);

  return {
    token,
    user: { id: user.id, name: user.name, email: user.email, contact: user.contact },
  };
}

export async function forgotPassword(email: string) {
  // 🔒 Always answer the SAME message whether or not the email exists —
  // otherwise this endpoint becomes an "is this email registered?" scanner.
  // TODO (future): generate a short-lived reset token here and email it.
  await User.findOne({ email });
  return { message: 'If that email is registered, password reset instructions have been sent.' };
}
