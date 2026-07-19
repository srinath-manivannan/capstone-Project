/**
 * ============================================
 * 📄 WHAT : Todos SELECTORS — the ONLY way the UI reads todos state.
 * 🎯 WHY  : If the store shape changes, only this file changes (decoupling).
 * 🔁 FLOW : store ➜ THIS FILE ➜ useAppSelector(selectX) in components
 * ============================================
 */
import type { RootState } from '../../app/store';

export const selectTodos = (state: RootState) => state.todos.list;
export const selectTodosLoading = (state: RootState) => state.todos.status === 'loading';
export const selectTodosStatus = (state: RootState) => state.todos.status;
export const selectTodosError = (state: RootState) => state.todos.error;
