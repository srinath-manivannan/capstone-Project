/**
 * ============================================
 * 📄 WHAT : Auth SELECTORS — the ONLY way the UI reads auth state.
 * 🎯 WHY  : Components never dig into the store shape themselves
 *           (state.auth.token…). If the shape changes, only THIS file
 *           changes — every component keeps working (decoupling).
 * 🔁 FLOW : store ➜ THIS FILE ➜ useAppSelector(selectX) in components
 * ============================================
 *
 * Pattern: one tiny function per piece of state, named select<Thing>.
 */
import type { RootState } from '../../app/store';

export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectIsLoggedIn = (state: RootState) => Boolean(state.auth.token);
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthLoading = (state: RootState) => state.auth.status === 'loading';
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectForgotMessage = (state: RootState) => state.auth.forgotMessage;
