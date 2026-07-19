/**
 * ============================================
 * 📄 WHAT : One todo row — a memo()ized leaf component.
 * 🎯 WHY  : memo + the reducer replacing only the changed todo means
 *           toggling ONE row re-renders ONE row, not the whole list.
 * 🔁 FLOW : TodosPage maps the list ➜ THIS FILE ➜ useTodos() actions
 * ============================================
 */
import { memo } from 'react';
import { useTodos } from '../context/TodosContext';
import type { Todo } from '../services/todosApi';
import './TodoItem.scss';

interface Props {
  todo: Todo;
}

function TodoItem({ todo }: Props) {
  const { toggleTodo, removeTodo } = useTodos();

  return (
    <li className={`todo-item ${todo.completed ? 'todo-item--done' : ''}`}>
      <label className="todo-item__label">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo)}
        />
        <span className="todo-item__title">{todo.title}</span>
      </label>
      <button
        type="button"
        className="todo-item__delete"
        onClick={() => removeTodo(todo.id)}
        aria-label={`Delete ${todo.title}`}
      >
        ✕
      </button>
    </li>
  );
}

export default memo(TodoItem);
