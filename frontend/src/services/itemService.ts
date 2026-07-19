import api from './api';

/**
 * EXAMPLE API SERVICE — one file per resource.
 *
 * This is the template for talking to the backend. Copy it for any resource
 * (products, tasks, branches…). Notice the pattern is always the same:
 *
 *   GET    list        -> api.get('/things')
 *   GET    one         -> api.get('/things/:id')
 *   POST   create      -> api.post('/things', body)
 *   PUT    update      -> api.put('/things/:id', body)
 *   DELETE remove      -> api.delete('/things/:id')
 *
 * `api` (see api.ts) already knows the base URL and auto-attaches the auth
 * token, so here we only care about the endpoint + data.
 *
 * The backend always replies with { success, data }, so each function digs out
 * `.data.data` and returns just the useful part — components never see axios.
 */

// The shape of an Item as it comes back from the backend.
export interface Item {
  _id: string;
  name: string;
  description: string;
  quantity: number;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

// What we send when creating/updating.
export interface ItemInput {
  name: string;
  description?: string;
  quantity: number;
}

// Backend response envelope: { success: true, data: ... }
interface ApiResponse<T> {
  success: boolean;
  data: T;
}

// GET /items  -> list every item
export async function getItems(): Promise<Item[]> {
  const res = await api.get<ApiResponse<Item[]>>('/items');
  return res.data.data;
}

// GET /items/:id  -> read a single item
export async function getItem(id: string): Promise<Item> {
  const res = await api.get<ApiResponse<Item>>(`/items/${id}`);
  return res.data.data;
}

// POST /items  -> create a new item
export async function createItem(input: ItemInput): Promise<Item> {
  const res = await api.post<ApiResponse<Item>>('/items', input);
  return res.data.data;
}

// PUT /items/:id  -> update an existing item (send only the fields that change)
export async function updateItem(id: string, input: Partial<ItemInput>): Promise<Item> {
  const res = await api.put<ApiResponse<Item>>(`/items/${id}`, input);
  return res.data.data;
}

// DELETE /items/:id  -> remove an item
export async function deleteItem(id: string): Promise<void> {
  await api.delete(`/items/${id}`);
}
