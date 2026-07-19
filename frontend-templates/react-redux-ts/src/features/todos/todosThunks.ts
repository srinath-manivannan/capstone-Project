/**
 * ============================================
 * 📄 WHAT : Todos THUNKS — the async API calls of this feature.
 * 🎯 WHY  : API calls NEVER live inside UI components. A thunk calls the api
 *           client and Redux automatically fires pending/fulfilled/rejected
 *           actions that the slice listens to. UI just dispatches.
 * 🔁 FLOW : component dispatch() ➜ THIS FILE ➜ api/client.ts ➜ backend
 *           ➜ result lands in todosSlice.ts (extraReducers)
 * ============================================
 *
 * THE TEMPLATE (identical for every API call in every app you build):
 *   createAsyncThunk('<feature>/<action>', async (payload, { rejectWithValue }) => {
 *     try   → apiClient.<verb>(ENDPOINTS…) → return data
 *     catch → return rejectWithValue(readable message)
 *   })
 *
 * (Demo note: JSONPlaceholder fakes writes — responses succeed but nothing
 * persists. Point .env at a real backend and everything sticks.)
 */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient, getErrorMessage } from '../../api/client';
import { ENDPOINTS } from '../../api/endpoints';
import type { Todo } from './todosTypes';

// GET — read the list
export const fetchTodos = createAsyncThunk<Todo[], void, { rejectValue: string }>(
  'todos/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.get<Todo[]>(ENDPOINTS.TODOS.ROOT, { params: { _limit: 8 } });
      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Failed to load todos.'));
    }
  }
);

// POST — create one
export const createTodo = createAsyncThunk<Todo, string, { rejectValue: string }>(
  'todos/create',
  async (title, { rejectWithValue }) => {
    try {
      const res = await apiClient.post<Todo>(ENDPOINTS.TODOS.ROOT, { title, completed: false });
      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Could not create todo.'));
    }
  }
);

// PATCH — partial update (here: toggle completed)
export const toggleTodo = createAsyncThunk<Todo, Todo, { rejectValue: string }>(
  'todos/toggle',
  async (todo, { rejectWithValue }) => {
    try {
      const res = await apiClient.patch<Todo>(ENDPOINTS.TODOS.BY_ID(todo.id), {
        completed: !todo.completed,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Could not update todo.'));
    }
  }
);

// DELETE — remove one
export const deleteTodo = createAsyncThunk<number, number, { rejectValue: string }>(
  'todos/delete',
  async (id, { rejectWithValue }) => {
    try {
      await apiClient.delete(ENDPOINTS.TODOS.BY_ID(id));
      return id; // give the slice the id so it can drop the row
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Could not delete todo.'));
    }
  }
);
