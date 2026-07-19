import type { Request, Response } from 'express';
import * as authService from '../services/auth.service';

// Controllers stay thin: read the request, call the service, send the response.
// All the real logic (hashing, checks, DB calls) lives in auth.service.ts.

export async function register(req: Request, res: Response) {
  const result = await authService.registerUser(req.body);
  res.status(201).json({ success: true, data: result });
}

export async function login(req: Request, res: Response) {
  const result = await authService.loginUser(req.body);
  res.status(200).json({ success: true, data: result });
}

export async function forgotPassword(req: Request, res: Response) {
  const result = await authService.forgotPassword(req.body.email);
  res.status(200).json({ success: true, data: result });
}
