/**
 * ============================================
 * 📄 WHAT : Auth THUNKS — the async API calls of the auth feature.
 * 🎯 WHY  : API calls NEVER live inside UI components. A thunk is a Redux
 *           action that can run async code: it calls the api client, and
 *           Redux automatically fires pending/fulfilled/rejected actions
 *           that the slice listens to. UI just dispatches — that's all.
 * 🔁 FLOW : component dispatch() ➜ THIS FILE ➜ api/client.ts ➜ backend
 *           ➜ result lands in authSlice.ts (extraReducers)
 * ============================================
 *
 * THE THUNK PATTERN (identical for every API call in the app):
 *   createAsyncThunk('<feature>/<action>', async (payload, { rejectWithValue }) => {
 *     try   → apiClient.<verb>(ENDPOINTS...) → return res.data.data
 *     catch → return rejectWithValue(readable message)
 *   })
 */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient, getErrorMessage, type ApiEnvelope } from '../../api/client';
import { ENDPOINTS } from '../../api/endpoints';
import type {
  AuthResponse,
  RegisterPayload,
  LoginPayload,
  ForgotPasswordPayload,
} from './authTypes';

// POST /auth/register — create the account (backend logs the user straight in)
export const registerUser = createAsyncThunk<
  AuthResponse,
  RegisterPayload,
  { rejectValue: string }
>('auth/register', async (payload, { rejectWithValue }) => {
  try {
    const res = await apiClient.post<ApiEnvelope<AuthResponse>>(ENDPOINTS.AUTH.REGISTER, payload);
    return res.data.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Registration failed. Please try again.'));
  }
});

// POST /auth/login
export const loginUser = createAsyncThunk<AuthResponse, LoginPayload, { rejectValue: string }>(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await apiClient.post<ApiEnvelope<AuthResponse>>(ENDPOINTS.AUTH.LOGIN, payload);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Login failed. Please try again.'));
    }
  }
);

// POST /auth/forgot-password — returns only a message
export const forgotPassword = createAsyncThunk<
  { message: string },
  ForgotPasswordPayload,
  { rejectValue: string }
>('auth/forgotPassword', async (payload, { rejectWithValue }) => {
  try {
    const res = await apiClient.post<ApiEnvelope<{ message: string }>>(
      ENDPOINTS.AUTH.FORGOT_PASSWORD,
      payload
    );
    return res.data.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Something went wrong. Please try again.'));
  }
});
