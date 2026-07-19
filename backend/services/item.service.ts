import Item from '../models/Item.model';
import { AppError } from '../utils/AppError';
import type { CreateItemInput, UpdateItemInput } from '../types/item.types';

/**
 * SERVICE layer = all the real work (DB queries, rules).
 * Controllers stay thin and just call these functions.
 *
 * Every function takes `owner` (the logged-in user's id) so a user can only
 * ever see and touch their OWN items — a very common ownership pattern.
 */

// GET all items belonging to the user (newest first)
export async function getItems(owner: string) {
  return Item.find({ owner }).sort({ createdAt: -1 });
}

// GET one item by id (only if it belongs to the user)
export async function getItemById(id: string, owner: string) {
  const item = await Item.findOne({ _id: id, owner });
  if (!item) throw new AppError('Item not found', 404);
  return item;
}

// CREATE a new item owned by the user
export async function createItem(input: CreateItemInput, owner: string) {
  return Item.create({ ...input, owner });
}

// UPDATE an item the user owns. `new: true` returns the UPDATED document.
export async function updateItem(id: string, input: UpdateItemInput, owner: string) {
  const item = await Item.findOneAndUpdate({ _id: id, owner }, input, {
    new: true,
    runValidators: true,
  });
  if (!item) throw new AppError('Item not found', 404);
  return item;
}

// DELETE an item the user owns
export async function deleteItem(id: string, owner: string) {
  const item = await Item.findOneAndDelete({ _id: id, owner });
  if (!item) throw new AppError('Item not found', 404);
  return { id };
}
