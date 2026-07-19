/**
 * ============================================
 * 📄 WHAT : STEP 4 — the Todos SERVICE: one function per API call.
 * 🎯 WHY  : The state layer (context) calls these; it never builds URLs or
 *           touches axios. Swap the backend → only this folder changes.
 * 🔁 FLOW : context/TodosContext.tsx ➜ THIS FILE ➜ api/client.ts ➜ backend
 * ============================================
 *
 * ⭐ Copy-me: for a new resource, duplicate this file and swap the
 * endpoints + types. The 4 verb templates below never change shape.
 * (Demo note: JSONPlaceholder fakes writes — it responds OK but doesn't
 * persist. Point .env at a real backend and everything sticks.)
 */
import { apiClient } from '../api/client';
import { ENDPOINTS } from '../api/endpoints';

/** A todo exactly as the API returns it. */
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// GET — read the list
export async function fetchTodos(): Promise<Todo[]> {
  const res = await apiClient.get<Todo[]>(ENDPOINTS.TODOS.ROOT, { params: { _limit: 8 } });
  return res.data;
}

// POST — create one
export async function createTodo(title: string): Promise<Todo> {
  const res = await apiClient.post<Todo>(ENDPOINTS.TODOS.ROOT, { title, completed: false });
  return res.data;
}

// PATCH — partial update (here: toggle completed)
export async function updateTodo(id: number, changes: Partial<Todo>): Promise<Todo> {
  const res = await apiClient.patch<Todo>(ENDPOINTS.TODOS.BY_ID(id), changes);
  return res.data;
}

// DELETE — remove one
export async function deleteTodo(id: number): Promise<void> {
  await apiClient.delete(ENDPOINTS.TODOS.BY_ID(id));
}
