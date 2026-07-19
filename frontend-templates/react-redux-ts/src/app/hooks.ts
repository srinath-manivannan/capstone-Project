/**
 * ============================================
 * 📄 WHAT : TYPED Redux hooks — the only two hooks the UI uses for state.
 * 🎯 WHY  : Wrapping useDispatch/useSelector once gives autocomplete and
 *           type-safety everywhere (DRY — never re-type RootState in the UI).
 * 🔁 FLOW : components ➜ THESE HOOKS ➜ app/store.ts
 * ============================================
 *
 * Rule for the whole app:
 *   READ  state → const todos = useAppSelector(selectTodos);
 *   WRITE state → const dispatch = useAppDispatch(); dispatch(someThunk());
 */
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
