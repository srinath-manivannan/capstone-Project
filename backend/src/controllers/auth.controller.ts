/**
 * ============================================
 * 📄 WHAT : The Auth CONTROLLER — translates HTTP ⇄ auth service calls.
 * 🎯 WHY  : SRP — read request, call service, send response. Nothing else.
 *           Notice: no passwords, no bcrypt, no DB here — that's the service's job.
 * 🔁 FLOW : routes/auth.routes.ts ➜ THIS FILE ➜ services/auth.service.ts
 * ============================================
 *
 * Same 3-line pattern as every controller:
 *   1. read from req  →  2. await service  →  3. res.status().json({ success, data })
 */
import type { Request, Response } from 'express';
import * as authService from '../services/auth.service';

// POST /api/auth/register — 201 = "a new resource (user) was created"
export async function register(req: Request, res: Response) {
  const result = await authService.registerUser(req.body);
  res.status(201).json({ success: true, data: result });
}

// POST /api/auth/login
export async function login(req: Request, res: Response) {
  const result = await authService.loginUser(req.body);
  res.status(200).json({ success: true, data: result });
}

// POST /api/auth/forgot-password
export async function forgotPassword(req: Request, res: Response) {
  const result = await authService.forgotPassword(req.body.email);
  res.status(200).json({ success: true, data: result });
}
