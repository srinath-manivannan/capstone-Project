/**
 * ============================================
 * 📄 WHAT : Users SELECTORS — the ONLY way the UI reads users state.
 * 🎯 WHY  : If the store shape changes, only this file changes (decoupling).
 * 🔁 FLOW : store ➜ THIS FILE ➜ useAppSelector(selectX) in components
 * ============================================
 */
import type { RootState } from '../../app/store';

export const selectUsers = (state: RootState) => state.users.list;
export const selectMe = (state: RootState) => state.users.me;
/** Drives whether admin-only UI is even rendered (the backend still enforces it). */
export const selectIsAdmin = (state: RootState) => state.users.me?.role === 'admin';
export const selectUsersStatus = (state: RootState) => state.users.status;
export const selectUsersLoading = (state: RootState) => state.users.status === 'loading';
export const selectUsersMutating = (state: RootState) => state.users.mutating;
export const selectUsersError = (state: RootState) => state.users.error;
export const selectUsersSuccess = (state: RootState) => state.users.successMessage;
