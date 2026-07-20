/**
 * ============================================
 * 📄 WHAT : The users SLICE — owns the `state.users` part of the store.
 * 🎯 WHY  : ONE place decides how state changes after each API result.
 * 🔁 FLOW : usersThunks results ➜ THIS FILE (extraReducers) ➜ store ➜ selectors
 * ============================================
 */
import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers, fetchMe, changeMyPassword, resetUserPassword, deleteUser } from './usersThunks';
import type { UsersState } from './usersTypes';

const initialState: UsersState = {
  list: [],
  me: null,
  status: 'idle',
  mutating: false,
  error: null,
  successMessage: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Clear banners when the user navigates or dismisses them.
    clearUsersFeedback(state) {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ---- READ list ----
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Failed to load users';
      })
      // ---- READ me ----
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.me = action.payload;
      })
      // ---- change my own password ----
      .addCase(changeMyPassword.pending, (state) => {
        state.mutating = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(changeMyPassword.fulfilled, (state, action) => {
        state.mutating = false;
        state.successMessage = action.payload.message;
      })
      .addCase(changeMyPassword.rejected, (state, action) => {
        state.mutating = false;
        state.error = action.payload ?? 'Could not change password';
      })
      // ---- admin resets someone's password ----
      .addCase(resetUserPassword.pending, (state) => {
        state.mutating = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(resetUserPassword.fulfilled, (state, action) => {
        state.mutating = false;
        state.successMessage = action.payload.message;
      })
      .addCase(resetUserPassword.rejected, (state, action) => {
        state.mutating = false;
        state.error = action.payload ?? 'Could not reset password';
      })
      // ---- DELETE — drop the row from the list ----
      .addCase(deleteUser.pending, (state) => {
        state.mutating = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.mutating = false;
        state.list = state.list.filter((u) => u.id !== action.payload.id);
        state.successMessage = 'User deleted';
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.mutating = false;
        state.error = action.payload ?? 'Could not delete user';
      });
  },
});

export const { clearUsersFeedback } = usersSlice.actions;
export default usersSlice.reducer;
