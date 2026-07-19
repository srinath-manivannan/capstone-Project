/**
 * ============================================
 * 📄 WHAT : The auth SLICE — owns the `state.auth` part of the store.
 * 🎯 WHY  : A slice = initial state + the reducers that may change it.
 *           Components can NEVER edit state directly; they dispatch actions
 *           and THIS file decides what changes (predictable, debuggable).
 * 🔁 FLOW : authThunks results ➜ THIS FILE (extraReducers) ➜ store ➜ selectors
 * ============================================
 *
 * The JWT is the ONE exception to "no localStorage": it must survive a page
 * refresh, so we mirror it there. All other app state lives in Redux only.
 */
import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, forgotPassword } from './authThunks';
import type { AuthState } from './authTypes';

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'), // survive page refresh
  status: 'idle',
  error: null,
  forgotMessage: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  // Plain (synchronous) reducers — dispatched directly by the UI.
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    clearAuthError(state) {
      state.error = null;
      state.forgotMessage = null;
    },
  },
  // Async results — every thunk fires pending/fulfilled/rejected automatically.
  // Same 3-case pattern for every thunk in the app.
  extraReducers: (builder) => {
    builder
      // ---- register ----
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Registration failed';
      })
      // ---- login ----
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Login failed';
      })
      // ---- forgot password ----
      .addCase(forgotPassword.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.forgotMessage = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.forgotMessage = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Request failed';
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
