/**
 * ============================================
 * 📄 WHAT : STEP 2 — every backend ENDPOINT PATH, in ONE file.
 * 🎯 WHY  : URLs scattered across components = a maintenance nightmare.
 *           When the backend renames a route, you change ONE line here.
 * 🔁 FLOW : config/env.ts (base URL) ➜ THIS FILE (paths) ➜ feature thunks
 * ============================================
 *
 * Pattern per resource: a nested object — static paths as strings,
 * parameterised paths as tiny functions.
 */
export const ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    FORGOT_PASSWORD: '/auth/forgot-password',
  },
  ITEMS: {
    ROOT: '/items', //               GET list · POST create
    BY_ID: (id: string) => `/items/${id}`, // GET one · PUT · PATCH · DELETE
  },
  USERS: {
    ROOT: '/users', //                                  GET list (admin only)
    ME: '/users/me', //                                 GET my profile
    PASSWORD_BY_ID: (id: string) => `/users/${id}/password`, // PATCH admin reset
    BY_ID: (id: string) => `/users/${id}`, //           DELETE (admin only)
  },
} as const;
