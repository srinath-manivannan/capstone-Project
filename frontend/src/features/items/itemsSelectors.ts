/**
 * ============================================
 * 📄 WHAT : Items SELECTORS — the ONLY way the UI reads items state.
 * 🎯 WHY  : If the store shape changes, only this file changes (decoupling).
 * 🔁 FLOW : store ➜ THIS FILE ➜ useAppSelector(selectX) in components
 * ============================================
 */
import type { RootState } from '../../app/store';

export const selectItems = (state: RootState) => state.items.list;
export const selectItemsStatus = (state: RootState) => state.items.status;
export const selectItemsLoading = (state: RootState) => state.items.status === 'loading';
export const selectItemsMutating = (state: RootState) => state.items.mutating;
export const selectItemsError = (state: RootState) => state.items.error;
