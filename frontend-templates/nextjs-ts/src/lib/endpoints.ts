/**
 * ============================================
 * 📄 WHAT : STEP 2 — every endpoint path, in ONE file.
 * 🎯 WHY  : When the backend renames a route, you change ONE line here.
 * 🔁 FLOW : lib/env.ts (base URL) ➜ THIS FILE (paths) ➜ lib/todosApi.ts
 * ============================================
 */
export const ENDPOINTS = {
  TODOS: {
    ROOT: '/todos', //                    GET list · POST create
    BY_ID: (id: number) => `/todos/${id}`, // PATCH update · DELETE remove
  },
} as const;
