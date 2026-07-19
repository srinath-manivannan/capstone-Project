/**
 * ============================================
 * 📄 WHAT : STEP 4 — the Todos SERVICE: one function per API call.
 * 🎯 WHY  : Shared by BOTH sides — the server component calls fetchTodos()
 *           for the first render, the client component calls the mutations.
 *           One service, two runtimes. Components never build URLs.
 * 🔁 FLOW : app/todos/page.tsx (server) + components/TodoApp.tsx (client)
 *           ➜ THIS FILE ➜ lib/api.ts ➜ backend
 * ============================================
 *
 * (Demo note: JSONPlaceholder fakes writes — it responds OK but doesn't
 * persist. Point .env.local at a real backend and everything sticks.)
 */
import { apiFetch } from './api';
import { ENDPOINTS } from './endpoints';

/** A todo exactly as the API returns it. */
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// GET — read the list
export function fetchTodos(): Promise<Todo[]> {
  return apiFetch<Todo[]>(`${ENDPOINTS.TODOS.ROOT}?_limit=8`);
}

// POST — create one
export function createTodo(title: string): Promise<Todo> {
  return apiFetch<Todo>(ENDPOINTS.TODOS.ROOT, {
    method: 'POST',
    body: JSON.stringify({ title, completed: false }),
  });
}

// PATCH — partial update (here: toggle completed)
export function updateTodo(id: number, changes: Partial<Todo>): Promise<Todo> {
  return apiFetch<Todo>(ENDPOINTS.TODOS.BY_ID(id), {
    method: 'PATCH',
    body: JSON.stringify(changes),
  });
}

// DELETE — remove one
export function deleteTodo(id: number): Promise<void> {
  return apiFetch<void>(ENDPOINTS.TODOS.BY_ID(id), { method: 'DELETE' });
}
