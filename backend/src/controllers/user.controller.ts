/**
 * ============================================
 * 📄 WHAT : The User CONTROLLER — translates HTTP ⇄ user service calls.
 * 🎯 WHY  : SRP — read request, call service, send response. The safety rules
 *           live in the service; this file just plumbs HTTP.
 * 🔁 FLOW : routes/user.routes.ts ➜ THIS FILE ➜ services/user.service.ts
 * ============================================
 *
 * Same 3-line pattern as every controller in this codebase.
 */
import type { Request, Response } from 'express';
import * as userService from '../services/user.service';

// GET /api/users — list all users (admin only)
export async function getUsers(_req: Request, res: Response) {
  const users = await userService.getUsers();
  res.status(200).json({ success: true, data: users });
}

// GET /api/users/me — my own profile
export async function getMe(req: Request, res: Response) {
  const user = await userService.getMe(req.userId!);
  res.status(200).json({ success: true, data: user });
}

// PATCH /api/users/me/password — change my own password
export async function changeOwnPassword(req: Request, res: Response) {
  const result = await userService.changeOwnPassword(req.userId!, req.body);
  res.status(200).json({ success: true, data: result });
}

// PATCH /api/users/:id/password — admin resets someone's password
export async function resetUserPassword(req: Request, res: Response) {
  const result = await userService.resetUserPassword(String(req.params.id), req.body);
  res.status(200).json({ success: true, data: result });
}

// DELETE /api/users/:id — admin deletes a user
export async function deleteUser(req: Request, res: Response) {
  // requesterId is passed so the service can refuse self-deletion
  const result = await userService.deleteUser(String(req.params.id), req.userId!);
  res.status(200).json({ success: true, data: result });
}
