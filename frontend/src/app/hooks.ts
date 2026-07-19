/**
 * ============================================
 * 📄 WHAT : TYPED Redux hooks — the only two hooks the UI uses for state.
 * 🎯 WHY  : The raw useDispatch/useSelector don't know OUR store's types.
 *           Wrapping them once here gives autocomplete + type errors
 *           everywhere for free (DRY — never re-type RootState in the UI).
 * 🔁 FLOW : components ➜ THESE HOOKS ➜ app/store.ts
 * ============================================
 *
 * Rule for the whole app:
 *   READ  state → const items = useAppSelector(selectItems);
 *   WRITE state → const dispatch = useAppDispatch(); dispatch(someThunk());
 */
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
