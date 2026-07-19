import type { Document, Types } from 'mongoose';

/**
 * EXAMPLE RESOURCE — "Item".
 *
 * This whole set of item.* files is a template you copy for any new resource
 * (Product, Branch, Task, …). Rename "Item" everywhere and change the fields.
 *
 * IItem = the shape of an item document as stored in MongoDB.
 */
export interface IItem extends Document {
  name: string;
  description: string;
  quantity: number;
  owner: Types.ObjectId; // the user who created it (from the auth token)
  createdAt: Date;
  updatedAt: Date;
}

// What the client is allowed to send when CREATING an item.
export interface CreateItemInput {
  name: string;
  description?: string;
  quantity: number;
}

// What the client is allowed to send when UPDATING an item (all optional).
export interface UpdateItemInput {
  name?: string;
  description?: string;
  quantity?: number;
}
