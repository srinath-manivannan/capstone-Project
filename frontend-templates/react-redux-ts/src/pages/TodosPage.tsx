/**
 * ============================================
 * 📄 WHAT : The Todos page — the model for every data page.
 * 🎯 WHY  : Notice what it does NOT do: no axios, no URLs, no list state.
 *           It dispatches thunks and reads selectors. The only local
 *           useState is the input draft — pure UI state.
 * 🔁 FLOW : App.tsx ➜ THIS FILE ➜ dispatch(thunk) ➜ slice ➜ selectors ➜ re-render
 * ============================================
 */
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchTodos, createTodo } from '../features/todos/todosThunks';
import {
  selectTodos,
  selectTodosStatus,
  selectTodosLoading,
  selectTodosError,
} from '../features/todos/todosSelectors';
import TodoItem from '../components/TodoItem';
import './TodosPage.scss';

export default function TodosPage() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectTodos);
  const status = useAppSelector(selectTodosStatus);
  const loading = useAppSelector(selectTodosLoading);
  const error = useAppSelector(selectTodosError);

  const [title, setTitle] = useState(''); // draft input = UI state → local is correct

  // Fetch ONCE. The 'idle' guard makes Redux the cache — navigating away and
  // back does NOT refetch.
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await dispatch(createTodo(title.trim()));
    setTitle('');
  };

  return (
    <main className="todos-page">
      <header className="todos-page__header">
        <h1>Todos</h1>
        <p>React + Redux + TS template — thunks ➜ slice ➜ selectors</p>
      </header>

      <form className="todos-page__form" onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs doing?"
          aria-label="New todo title"
        />
        <button type="submit">Add</button>
      </form>

      {error && <p className="todos-page__error">{error}</p>}
      {loading && <p className="todos-page__loading">Loading…</p>}

      <ul className="todos-page__list">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </main>
  );
}
