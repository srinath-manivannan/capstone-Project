/**
 * ============================================
 * 📄 WHAT : The items SLICE — owns the `state.items` part of the store.
 * 🎯 WHY  : One place decides how the list changes after each API result.
 *           Components just dispatch thunks and read selectors — they never
 *           hand-edit the list (predictable state, easy debugging).
 * 🔁 FLOW : itemsThunks results ➜ THIS FILE (extraReducers) ➜ store ➜ selectors
 * ============================================
 *
 * Note the pattern for every mutation:
 *   create  → unshift the new item (no refetch needed)
 *   update  → replace just the changed item (map)
 *   delete  → drop it (filter)
 * PUT and PATCH share the same fulfilled logic on purpose (DRY).
 */
import { createSlice } from '@reduxjs/toolkit';
import { fetchItems, createItem, updateItem, patchItem, deleteItem } from './itemsThunks';
import type { ItemsState } from './itemsTypes';

const initialState: ItemsState = {
  list: [],
  status: 'idle',
  mutating: false,
  error: null,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    clearItemsError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ---- READ (list) ----
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Failed to load items';
      })
      // ---- CREATE ----
      .addCase(createItem.pending, (state) => {
        state.mutating = true;
        state.error = null;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.mutating = false;
        state.list.unshift(action.payload); // newest first — matches the backend sort
      })
      .addCase(createItem.rejected, (state, action) => {
        state.mutating = false;
        state.error = action.payload ?? 'Could not create item';
      })
      // ---- UPDATE (PUT) ----
      .addCase(updateItem.fulfilled, (state, action) => {
        state.list = state.list.map((it) => (it._id === action.payload._id ? action.payload : it));
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.error = action.payload ?? 'Could not update item';
      })
      // ---- UPDATE (PATCH) — same replace logic as PUT ----
      .addCase(patchItem.fulfilled, (state, action) => {
        state.list = state.list.map((it) => (it._id === action.payload._id ? action.payload : it));
      })
      .addCase(patchItem.rejected, (state, action) => {
        state.error = action.payload ?? 'Could not update item';
      })
      // ---- DELETE ----
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.list = state.list.filter((it) => it._id !== action.payload.id);
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.error = action.payload ?? 'Could not delete item';
      });
  },
});

export const { clearItemsError } = itemsSlice.actions;
export default itemsSlice.reducer;
