/**
 * ============================================
 * 📄 WHAT : TypeScript SHAPES for the Item resource (no runtime code).
 * 🎯 WHY  : One source of truth for "what an item looks like" — model, service
 *           and controller all import these, so they can never disagree.
 * 🔁 FLOW : imported by models/Item.model.ts and services/item.service.ts
 * ============================================
 *
 * ⭐ Item is the EXAMPLE RESOURCE — the template you copy for any new
 * resource (Product, Task, Branch…). Rename "Item" and change the fields.
 *
 * Naming pattern (same for every resource):
 *   I<Name>            = the document as stored in MongoDB
 *   <Action><Name>Input = what the client may SEND for that action
 */
import type { Document, Types } from 'mongoose';

// The item document inside MongoDB.
export interface IItem extends Document {
  name: string;
  description: string;
  quantity: number;
  owner: Types.ObjectId; // the user who created it (comes from the JWT, never from the client!)
  createdAt: Date;
  updatedAt: Date;
}

// Body of POST /api/items — everything a new item needs.
export interface CreateItemInput {
  name: string;
  description?: string;
  quantity: number;
}

// Body of PUT/PATCH /api/items/:id — all optional (client sends what changes).
export interface UpdateItemInput {
  name?: string;
  description?: string;
  quantity?: number;
}
