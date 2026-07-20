/**
 * ============================================
 * 📄 WHAT : The Redux STORE — the single source of truth for app state.
 * 🎯 WHY  : One central place holds all shared data (user, items…). Any
 *           component can read it via selectors and change it via dispatch —
 *           no props drilling across the whole tree, no duplicated fetches.
 * 🔁 FLOW : main.tsx wraps <App> in <Provider store={store}> ➜ every
 *           component can useAppSelector / useAppDispatch
 * ============================================
 *
 * ➕ Adding a feature? Create its slice in features/<name>/ and register the
 * reducer here — ONE line. That's the whole wiring.
 */
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import itemsReducer from '../features/items/itemsSlice';
import usersReducer from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer, //   state.auth  — who is logged in
    items: itemsReducer, // state.items — the items list + its loading status
    users: usersReducer, // state.users — user management (self + admin)
  },
});

// Types derived FROM the store, so they always stay in sync automatically.
// 💬 INTERVIEW: "What is RootState?" — the TypeScript shape of the ENTIRE
// store, inferred from the reducers; selectors use it for full type safety.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
