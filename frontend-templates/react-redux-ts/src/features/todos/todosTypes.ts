/**
 * ============================================
 * 📄 WHAT : TypeScript SHAPES for the todos feature (no runtime code).
 * 🎯 WHY  : One source of truth — thunks, slice and components import these.
 * 🔁 FLOW : imported by todosThunks.ts, todosSlice.ts and the pages
 * ============================================
 *
 * ⭐ Copy this whole features/todos/ folder for any new resource — the
 * 4-file pattern (types / thunks / slice / selectors) never changes.
 */

/** A todo exactly as the API returns it. */
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

/** The standard async status every feature's state uses. */
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

/** The todos part of the Redux store. */
export interface TodosState {
  list: Todo[];
  status: RequestStatus;
  error: string | null;
}
