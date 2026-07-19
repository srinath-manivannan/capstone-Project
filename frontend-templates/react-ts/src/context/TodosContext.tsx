/**
 * ============================================
 * 📄 WHAT : STEP 5 — the STATE LAYER: Context + useReducer (no Redux).
 * 🎯 WHY  : Server data must be shared, predictable and outside components.
 *           useReducer gives us Redux-style thinking (actions ➜ reducer ➜
 *           new state) with zero libraries; Context makes it available to
 *           any component under the provider.
 * 🔁 FLOW : components call useTodos() ➜ THIS FILE ➜ services/todosApi.ts
 * ============================================
 *
 * The three pieces (memorise this trio — it IS the pattern):
 *   1. reducer   — HOW state changes (pure, no API calls here!)
 *   2. provider  — owns the state + async functions that call the service
 *   3. useTodos  — the ONLY way components touch any of it
 *
 * 💬 INTERVIEW: "How do you manage state without Redux?" — exactly this:
 * Context for distribution + useReducer for predictable updates + a service
 * layer for API calls. Redux adds DevTools/middleware on the same idea.
 */
import { createContext, useContext, useEffect, useReducer, useCallback } from 'react';
import type { ReactNode } from 'react';
import { fetchTodos, createTodo, updateTodo, deleteTodo, type Todo } from '../services/todosApi';
import { getErrorMessage } from '../api/client';

// ---------- 1. State + actions + reducer ----------

interface TodosState {
  list: Todo[];
  loading: boolean;
  error: string | null;
}

// Every possible change, named. A component can never "edit" state directly.
type TodosAction =
  | { type: 'LOAD_START' }
  | { type: 'LOAD_SUCCESS'; payload: Todo[] }
  | { type: 'LOAD_ERROR'; payload: string }
  | { type: 'ADDED'; payload: Todo }
  | { type: 'UPDATED'; payload: Todo }
  | { type: 'DELETED'; payload: number };

const initialState: TodosState = { list: [], loading: false, error: null };

// The reducer is PURE: (state, action) ➜ new state. No API calls in here.
function todosReducer(state: TodosState, action: TodosAction): TodosState {
  switch (action.type) {
    case 'LOAD_START':
      return { ...state, loading: true, error: null };
    case 'LOAD_SUCCESS':
      return { list: action.payload, loading: false, error: null };
    case 'LOAD_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'ADDED':
      return { ...state, list: [action.payload, ...state.list] };
    case 'UPDATED':
      return {
        ...state,
        list: state.list.map((t) => (t.id === action.payload.id ? action.payload : t)),
      };
    case 'DELETED':
      return { ...state, list: state.list.filter((t) => t.id !== action.payload) };
  }
}

// ---------- 2. The provider ----------

interface TodosContextValue extends TodosState {
  addTodo: (title: string) => Promise<void>;
  toggleTodo: (todo: Todo) => Promise<void>;
  removeTodo: (id: number) => Promise<void>;
}

const TodosContext = createContext<TodosContextValue | undefined>(undefined);

/** Wrap any part of the app that needs todos (here: the whole app, in main.tsx). */
export function TodosProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todosReducer, initialState);

  // READ — load once when the provider mounts.
  useEffect(() => {
    (async () => {
      dispatch({ type: 'LOAD_START' });
      try {
        dispatch({ type: 'LOAD_SUCCESS', payload: await fetchTodos() });
      } catch (err) {
        dispatch({ type: 'LOAD_ERROR', payload: getErrorMessage(err, 'Failed to load todos.') });
      }
    })();
  }, []);

  // WRITE — each function: call the service, then dispatch the result.
  // useCallback keeps their identity stable for memo()ized children.
  const addTodo = useCallback(async (title: string) => {
    const created = await createTodo(title);
    dispatch({ type: 'ADDED', payload: created });
  }, []);

  const toggleTodo = useCallback(async (todo: Todo) => {
    const updated = await updateTodo(todo.id, { completed: !todo.completed });
    dispatch({ type: 'UPDATED', payload: updated });
  }, []);

  const removeTodo = useCallback(async (id: number) => {
    await deleteTodo(id);
    dispatch({ type: 'DELETED', payload: id });
  }, []);

  return (
    <TodosContext.Provider value={{ ...state, addTodo, toggleTodo, removeTodo }}>
      {children}
    </TodosContext.Provider>
  );
}

// ---------- 3. The hook components actually use ----------

export function useTodos(): TodosContextValue {
  const ctx = useContext(TodosContext);
  if (!ctx) throw new Error('useTodos must be used inside <TodosProvider>');
  return ctx;
}
