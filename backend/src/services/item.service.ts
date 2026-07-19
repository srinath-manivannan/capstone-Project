/**
 * ============================================
 * 📄 WHAT : The Item SERVICE — the business logic + all DB calls for items.
 * 🎯 WHY  : SRP — controllers handle HTTP, services handle LOGIC. This is the
 *           ONLY file allowed to import Item.model. Tomorrow you could reuse
 *           these functions from a cron job or a script — they know nothing
 *           about req/res (decoupling).
 * 🔁 FLOW : controllers/item.controller.ts ➜ THIS FILE ➜ models/Item.model.ts ➜ MongoDB
 * ============================================
 *
 * 🔒 OWNERSHIP PATTERN: every function takes `owner` (the logged-in user's id
 * from the JWT) and filters by it — a user can NEVER read or touch another
 * user's items, even if they guess an id.
 * 💬 INTERVIEW: "How do you stop user A reading user B's data?" — filter every
 * query by the authenticated user's id, exactly like below (never trust ids
 * sent by the client alone).
 */
import Item from '../models/Item.model';
import { AppError } from '../utils/AppError';
import type { CreateItemInput, UpdateItemInput } from '../types/item.types';

// READ (list) — GET /api/items
export async function getItems(owner: string) {
  return Item.find({ owner }).sort({ createdAt: -1 }); // newest first
}

// READ (one) — GET /api/items/:id
export async function getItemById(id: string, owner: string) {
  const item = await Item.findOne({ _id: id, owner });
  if (!item) throw new AppError('Item not found', 404); // errorHandler turns this into a 404 response
  return item;
}

// CREATE — POST /api/items
export async function createItem(input: CreateItemInput, owner: string) {
  // owner comes from the verified TOKEN, never from the request body.
  return Item.create({ ...input, owner });
}

// UPDATE — serves BOTH PUT and PATCH (DRY: one function, one schema).
// `new: true`  → return the document AFTER the update, not before.
// `runValidators` → schema rules (min: 0 etc.) also apply on updates.
export async function updateItem(id: string, input: UpdateItemInput, owner: string) {
  const item = await Item.findOneAndUpdate({ _id: id, owner }, input, {
    new: true,
    runValidators: true,
  });
  if (!item) throw new AppError('Item not found', 404);
  return item;
}

// DELETE — DELETE /api/items/:id
export async function deleteItem(id: string, owner: string) {
  const item = await Item.findOneAndDelete({ _id: id, owner });
  if (!item) throw new AppError('Item not found', 404);
  return { id }; // echo back the deleted id so the frontend can remove it from state
}
