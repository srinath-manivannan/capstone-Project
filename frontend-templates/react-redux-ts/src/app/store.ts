/**
 * ============================================
 * 📄 WHAT : The Redux STORE — the single source of truth for app state.
 * 🎯 WHY  : One central place holds all shared data. Any component can read
 *           it (selectors) and change it (dispatch) — no props drilling,
 *           no duplicated fetches, full DevTools timeline.
 * 🔁 FLOW : main.tsx wraps <App> in <Provider store={store}>
 * ============================================
 *
 * ➕ Adding a feature? Create features/<name>/ and register its reducer
 * here — ONE line. That's the whole wiring.
 */
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/todosSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer, // state.todos
  },
});

// Types derived FROM the store — they can never drift out of sync.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
