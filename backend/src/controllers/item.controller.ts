/**
 * ============================================
 * 📄 WHAT : The Item CONTROLLER — translates HTTP ⇄ service calls.
 * 🎯 WHY  : SRP — a controller ONLY (1) reads the request, (2) calls the
 *           service, (3) sends the response. No DB code, no business rules.
 *           If a controller grows an `if`, the logic probably belongs in the service.
 * 🔁 FLOW : routes/item.routes.ts ➜ THIS FILE ➜ services/item.service.ts
 * ============================================
 *
 * THE 3-LINE CONTROLLER PATTERN (every function below is the same shape):
 *   1. pull what you need from req   (params / body / userId)
 *   2. await the service call
 *   3. res.status(code).json({ success: true, data })
 *
 * Status codes: 200 OK (read/update/delete) · 201 Created (create).
 * `req.userId` is set by the `protect` middleware (see middleware/auth.ts).
 * Errors? None handled here — services throw, asyncHandler catches (SRP again).
 */
import type { Request, Response } from 'express';
import * as itemService from '../services/item.service';

// GET /api/items — list my items
export async function getItems(req: Request, res: Response) {
  const items = await itemService.getItems(req.userId!);
  res.status(200).json({ success: true, data: items });
}

// GET /api/items/:id — read one item
export async function getItem(req: Request, res: Response) {
  const item = await itemService.getItemById(String(req.params.id), req.userId!);
  res.status(200).json({ success: true, data: item });
}

// POST /api/items — create an item
export async function createItem(req: Request, res: Response) {
  const item = await itemService.createItem(req.body, req.userId!);
  res.status(201).json({ success: true, data: item });
}

// PUT /api/items/:id — replace the item's editable fields.
// 💬 INTERVIEW: "PUT vs PATCH?" — PUT means "here is the FULL new version of
// the resource"; PATCH means "change ONLY these fields". Both are idempotent
// in our design; they share one service function + one schema (DRY).
export async function updateItem(req: Request, res: Response) {
  const item = await itemService.updateItem(String(req.params.id), req.body, req.userId!);
  res.status(200).json({ success: true, data: item });
}

// PATCH /api/items/:id — partial update (e.g. only { quantity: 5 }).
export async function patchItem(req: Request, res: Response) {
  const item = await itemService.updateItem(String(req.params.id), req.body, req.userId!);
  res.status(200).json({ success: true, data: item });
}

// DELETE /api/items/:id — remove the item
export async function deleteItem(req: Request, res: Response) {
  const result = await itemService.deleteItem(String(req.params.id), req.userId!);
  res.status(200).json({ success: true, data: result });
}
