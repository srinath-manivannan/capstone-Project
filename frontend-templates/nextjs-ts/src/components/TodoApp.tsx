/**
 * ============================================
 * 📄 WHAT : The interactive half of /todos — a CLIENT COMPONENT.
 * 🎯 WHY  : "use client" (line 1 of the code) is what enables hooks and
 *           onClick/onChange. It receives the server-fetched list as a prop
 *           (initialTodos) and owns all state changes from there.
 * 🔁 FLOW : app/todos/page.tsx (server data) ➜ THIS FILE (client state)
 *           ➜ lib/todosApi.ts ➜ lib/api.ts ➜ backend
 * ============================================
 */
'use client';

import { memo, useState } from 'react';
import type { FormEvent } from 'react';
import { createTodo, updateTodo, deleteTodo, type Todo } from '@/lib/todosApi';
import styles from './TodoApp.module.scss';

/** One row — memo()ized so toggling one row re-renders one row. */
const TodoRow = memo(function TodoRow({
  todo,
  onToggle,
  onDelete,
}: {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <li className={`${styles.item} ${todo.completed ? styles.itemDone : ''}`}>
      <label className={styles.itemLabel}>
        <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo)} />
        <span className={styles.itemTitle}>{todo.title}</span>
      </label>
      <button
        type="button"
        className={styles.itemDelete}
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete ${todo.title}`}
      >
        ✕
      </button>
    </li>
  );
});

interface Props {
  initialTodos: Todo[]; // fetched on the SERVER, handed over as a prop
}

export default function TodoApp({ initialTodos }: Props) {
  // Client state starts from the server data — no loading flash on first paint.
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const created = await createTodo(title.trim());
      setTodos((prev) => [created, ...prev]);
      setTitle('');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleToggle = async (todo: Todo) => {
    const updated = await updateTodo(todo.id, { completed: !todo.completed });
    setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated : t)));
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1>Todos</h1>
        <p>Next.js template — server-fetched first paint, client-side interactivity</p>
      </header>

      <form className={styles.form} onSubmit={handleAdd}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs doing?"
          aria-label="New todo title"
        />
        <button type="submit">Add</button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      <ul className={styles.list}>
        {todos.map((todo) => (
          <TodoRow key={todo.id} todo={todo} onToggle={handleToggle} onDelete={handleDelete} />
        ))}
      </ul>
    </main>
  );
}
