/**
 * ============================================
 * 📄 WHAT : The todos SLICE — owns the `state.todos` part of the store.
 * 🎯 WHY  : ONE place decides how state changes after each API result.
 *           Components dispatch thunks and read selectors — they never
 *           hand-edit the list (predictable state, easy debugging).
 * 🔁 FLOW : todosThunks results ➜ THIS FILE (extraReducers) ➜ store ➜ selectors
 * ============================================
 *
 * The mutation pattern (same in every slice you'll ever write):
 *   create → unshift · update → map-replace · delete → filter
 */
import { createSlice } from '@reduxjs/toolkit';
import { fetchTodos, createTodo, toggleTodo, deleteTodo } from './todosThunks';
import type { TodosState } from './todosTypes';

const initialState: TodosState = {
  list: [],
  status: 'idle',
  error: null,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {}, // no sync-only actions needed in this feature
  extraReducers: (builder) => {
    builder
      // ---- READ ----
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Failed to load todos';
      })
      // ---- CREATE ----
      .addCase(createTodo.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.error = action.payload ?? 'Could not create todo';
      })
      // ---- UPDATE (toggle) ----
      .addCase(toggleTodo.fulfilled, (state, action) => {
        state.list = state.list.map((t) => (t.id === action.payload.id ? action.payload : t));
      })
      .addCase(toggleTodo.rejected, (state, action) => {
        state.error = action.payload ?? 'Could not update todo';
      })
      // ---- DELETE ----
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.list = state.list.filter((t) => t.id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.error = action.payload ?? 'Could not delete todo';
      });
  },
});

export default todosSlice.reducer;
