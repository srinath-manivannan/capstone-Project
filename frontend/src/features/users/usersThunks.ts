/**
 * ============================================
 * 📄 WHAT : Users THUNKS — one thunk per backend endpoint.
 * 🎯 WHY  : API calls never live in components. Same template as itemsThunks —
 *           only the names, endpoints and types change.
 * 🔁 FLOW : component dispatch() ➜ THIS FILE ➜ api/client.ts ➜ backend
 *           ➜ result lands in usersSlice.ts (extraReducers)
 * ============================================
 */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient, getErrorMessage, type ApiEnvelope } from '../../api/client';
import { ENDPOINTS } from '../../api/endpoints';
import type { AppUser, ChangePasswordPayload, ResetPasswordPayload } from './usersTypes';

// GET /users — list every registered user (admin only; 403 for normal users)
export const fetchUsers = createAsyncThunk<AppUser[], void, { rejectValue: string }>(
  'users/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.get<ApiEnvelope<AppUser[]>>(ENDPOINTS.USERS.ROOT);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Failed to load users.'));
    }
  }
);

// GET /users/me — my own profile (any logged-in user)
export const fetchMe = createAsyncThunk<AppUser, void, { rejectValue: string }>(
  'users/fetchMe',
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.get<ApiEnvelope<AppUser>>(ENDPOINTS.USERS.ME);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Failed to load your profile.'));
    }
  }
);

// PATCH /users/me/password — change MY OWN password (needs current password)
export const changeMyPassword = createAsyncThunk<
  { message: string },
  ChangePasswordPayload,
  { rejectValue: string }
>('users/changeMyPassword', async (payload, { rejectWithValue }) => {
  try {
    const res = await apiClient.patch<ApiEnvelope<{ message: string }>>(
      ENDPOINTS.USERS.MY_PASSWORD,
      payload
    );
    return res.data.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Could not change your password.'));
  }
});

// PATCH /users/:id/password — ADMIN resets another user's password
export const resetUserPassword = createAsyncThunk<
  { message: string },
  ResetPasswordPayload,
  { rejectValue: string }
>('users/resetPassword', async ({ id, ...body }, { rejectWithValue }) => {
  try {
    const res = await apiClient.patch<ApiEnvelope<{ message: string }>>(
      ENDPOINTS.USERS.PASSWORD_BY_ID(id),
      body
    );
    return res.data.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Could not reset the password.'));
  }
});

// DELETE /users/:id — ADMIN deletes a user
export const deleteUser = createAsyncThunk<{ id: string }, string, { rejectValue: string }>(
  'users/delete',
  async (id, { rejectWithValue }) => {
    try {
      const res = await apiClient.delete<ApiEnvelope<{ id: string }>>(ENDPOINTS.USERS.BY_ID(id));
      return res.data.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Could not delete the user.'));
    }
  }
);
