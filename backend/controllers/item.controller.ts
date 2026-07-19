import type { Request, Response } from 'express';
import * as itemService from '../services/item.service';

/**
 * CONTROLLERS stay thin: read the request, call the service, send the response.
 * `req.userId` is set by the `protect` middleware (the logged-in user's id).
 * Every response uses the same shape: { success, data }.
 */

// GET /api/items
export async function getItems(req: Request, res: Response) {
  const items = await itemService.getItems(req.userId!);
  res.status(200).json({ success: true, data: items });
}

// GET /api/items/:id
export async function getItem(req: Request, res: Response) {
  const item = await itemService.getItemById(String(req.params.id), req.userId!);
  res.status(200).json({ success: true, data: item });
}

// POST /api/items
export async function createItem(req: Request, res: Response) {
  const item = await itemService.createItem(req.body, req.userId!);
  res.status(201).json({ success: true, data: item });
}

// PUT /api/items/:id
export async function updateItem(req: Request, res: Response) {
  const item = await itemService.updateItem(String(req.params.id), req.body, req.userId!);
  res.status(200).json({ success: true, data: item });
}

// DELETE /api/items/:id
export async function deleteItem(req: Request, res: Response) {
  const result = await itemService.deleteItem(String(req.params.id), req.userId!);
  res.status(200).json({ success: true, data: result });
}
