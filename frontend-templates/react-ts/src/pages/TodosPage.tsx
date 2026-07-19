/**
 * ============================================
 * 📄 WHAT : The Todos page — the model for every data page.
 * 🎯 WHY  : Notice what it does NOT do: no axios, no URLs, no list state.
 *           It reads everything from useTodos() and renders. The only local
 *           useState is the input draft — pure UI state.
 * 🔁 FLOW : App.tsx ➜ THIS FILE ➜ useTodos() ➜ context ➜ service ➜ API
 * ============================================
 */
import { useState } from 'react';
import type { FormEvent } from 'react';
import { useTodos } from '../context/TodosContext';
import TodoItem from '../components/TodoItem';
import './TodosPage.scss';

export default function TodosPage() {
  const { list, loading, error, addTodo } = useTodos();
  const [title, setTitle] = useState(''); // draft input = UI state → local is correct

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await addTodo(title.trim());
    setTitle('');
  };

  return (
    <main className="todos-page">
      <header className="todos-page__header">
        <h1>Todos</h1>
        <p>React + TS template — Context + useReducer + service layer</p>
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
        {list.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </main>
  );
}
