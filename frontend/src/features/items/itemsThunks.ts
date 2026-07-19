/**
 * ============================================
 * 📄 WHAT : Items THUNKS — one thunk per backend endpoint (all 5 verbs).
 * 🎯 WHY  : API calls never live in components. Each thunk is the SAME
 *           template with only the verb + endpoint + types swapped.
 * 🔁 FLOW : component dispatch() ➜ THIS FILE ➜ api/client.ts ➜ backend
 *           ➜ result lands in itemsSlice.ts (extraReducers)
 * ============================================
 *
 * ⭐ Master templates — GET / POST / PUT / PATCH / DELETE. Copy these five
 * for any resource; only names, endpoints and types change.
 */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient, getErrorMessage, type ApiEnvelope } from '../../api/client';
import { ENDPOINTS } from '../../api/endpoints';
import type { Item, CreateItemPayload, UpdateItemPayload } from './itemsTypes';

// GET /items — read the whole list
export const fetchItems = createAsyncThunk<Item[], void, { rejectValue: string }>(
  'items/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.get<ApiEnvelope<Item[]>>(ENDPOINTS.ITEMS.ROOT);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Failed to load items.'));
    }
  }
);

// POST /items — create one
export const createItem = createAsyncThunk<Item, CreateItemPayload, { rejectValue: string }>(
  'items/create',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await apiClient.post<ApiEnvelope<Item>>(ENDPOINTS.ITEMS.ROOT, payload);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Could not create item.'));
    }
  }
);

// PUT /items/:id — full update (send every editable field)
export const updateItem = createAsyncThunk<Item, UpdateItemPayload, { rejectValue: string }>(
  'items/update',
  async ({ id, changes }, { rejectWithValue }) => {
    try {
      const res = await apiClient.put<ApiEnvelope<Item>>(ENDPOINTS.ITEMS.BY_ID(id), changes);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Could not update item.'));
    }
  }
);

// PATCH /items/:id — partial update (send only what changed)
export const patchItem = createAsyncThunk<Item, UpdateItemPayload, { rejectValue: string }>(
  'items/patch',
  async ({ id, changes }, { rejectWithValue }) => {
    try {
      const res = await apiClient.patch<ApiEnvelope<Item>>(ENDPOINTS.ITEMS.BY_ID(id), changes);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Could not update item.'));
    }
  }
);

// DELETE /items/:id — remove one (backend echoes back { id })
export const deleteItem = createAsyncThunk<{ id: string }, string, { rejectValue: string }>(
  'items/delete',
  async (id, { rejectWithValue }) => {
    try {
      const res = await apiClient.delete<ApiEnvelope<{ id: string }>>(ENDPOINTS.ITEMS.BY_ID(id));
      return res.data.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Could not delete item.'));
    }
  }
);
