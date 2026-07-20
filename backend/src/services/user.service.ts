/**
 * ============================================
 * 📄 WHAT : The User SERVICE — user-management logic (list, delete, passwords).
 * 🎯 WHY  : SRP — the ONLY file that touches User.model for these operations.
 *           All the safety rules (never leak hashes, can't delete yourself,
 *           verify the current password) live HERE, not in the controller.
 * 🔁 FLOW : controllers/user.controller.ts ➜ THIS FILE ➜ models/User.model.ts
 * ============================================
 */
import bcrypt from 'bcryptjs';
import User from '../models/User.model';
import { AppError } from '../utils/AppError';
import type { ChangePasswordInput, ResetPasswordInput, PublicUser } from '../types/user.types';

const SALT_ROUNDS = 10;

/** Map a DB document to the SAFE public shape (never includes the hash). */
function toPublicUser(u: any): PublicUser {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    contact: u.contact,
    role: u.role,
    createdAt: u.createdAt,
  };
}

// GET /api/users — list every registered user (admin only).
// The hash is `select:false` in the schema, so it can't leak here by accident —
// and toPublicUser() is the second layer of that same defence.
export async function getUsers(): Promise<PublicUser[]> {
  const users = await User.find().sort({ createdAt: -1 });
  return users.map(toPublicUser);
}

// GET /api/users/me — the logged-in user's own profile.
export async function getMe(userId: string): Promise<PublicUser> {
  const user = await User.findById(userId);
  if (!user) throw new AppError('User not found', 404);
  return toPublicUser(user);
}

// PATCH /api/users/me/password — change YOUR OWN password.
export async function changeOwnPassword(userId: string, input: ChangePasswordInput) {
  // .select('+password') because the schema hides the hash by default.
  const user = await User.findById(userId).select('+password');
  if (!user) throw new AppError('User not found', 404);

  // 🔒 Prove it's really them: verify the CURRENT password first.
  // Without this, a stolen/left-open session could lock the real owner out.
  const isMatch = await bcrypt.compare(input.currentPassword, user.password);
  if (!isMatch) throw new AppError('Current password is incorrect', 401);

  user.password = await bcrypt.hash(input.newPassword, SALT_ROUNDS);
  await user.save();
  return { message: 'Password updated successfully' };
}

// PATCH /api/users/:id/password — ADMIN resets another user's password.
export async function resetUserPassword(targetId: string, input: ResetPasswordInput) {
  const user = await User.findById(targetId);
  if (!user) throw new AppError('User not found', 404);

  user.password = await bcrypt.hash(input.newPassword, SALT_ROUNDS);
  await user.save();
  return { message: `Password reset for ${user.email}` };
}

// DELETE /api/users/:id — ADMIN deletes a user.
export async function deleteUser(targetId: string, requesterId: string) {
  // 🔒 Guard 1: don't let an admin delete themselves — that's how a system
  // ends up with zero admins and nobody able to fix it.
  if (targetId === requesterId) {
    throw new AppError('You cannot delete your own account', 400);
  }

  const user = await User.findById(targetId);
  if (!user) throw new AppError('User not found', 404);

  // 🔒 Guard 2: never remove the last admin (same lock-out reasoning).
  if (user.role === 'admin') {
    const adminCount = await User.countDocuments({ role: 'admin' });
    if (adminCount <= 1) throw new AppError('Cannot delete the last admin', 400);
  }

  await user.deleteOne();
  return { id: targetId };
}
