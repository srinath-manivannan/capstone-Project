/**
 * ============================================
 * 📄 WHAT : TypeScript SHAPES for the items feature (no runtime code).
 * 🎯 WHY  : One source of truth — thunks, slice and components import these.
 * 🔁 FLOW : imported by itemsThunks.ts, itemsSlice.ts and the Items pages
 * ============================================
 *
 * ⭐ Items is the EXAMPLE FEATURE — copy this whole folder for any new
 * resource (products, tasks…), rename, and change the fields.
 */
import type { RequestStatus } from '../auth/authTypes';

/** An item exactly as the backend returns it. */
export interface Item {
  _id: string;
  name: string;
  description: string;
  quantity: number;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

/** Body of POST /items */
export interface CreateItemPayload {
  name: string;
  description?: string;
  quantity: number;
}

/** Body of PUT/PATCH /items/:id — send only what changes. */
export interface UpdateItemPayload {
  id: string;
  changes: Partial<CreateItemPayload>;
}

/** The items part of the Redux store. */
export interface ItemsState {
  list: Item[];
  status: RequestStatus; // for the initial list fetch (page-level spinner)
  mutating: boolean; //     true while a create/update/delete is in flight
  error: string | null;
}
