/**
 * ============================================
 * 📄 WHAT : One todo row — a memo()ized leaf component.
 * 🎯 WHY  : It dispatches its own thunks (no props drilling of callbacks).
 *           memo + the slice replacing only the changed todo means toggling
 *           ONE row re-renders ONE row.
 * 🔁 FLOW : TodosPage maps the list ➜ THIS FILE ➜ dispatch(toggle/delete)
 * ============================================
 */
import { memo } from 'react';
import { useAppDispatch } from '../app/hooks';
import { toggleTodo, deleteTodo } from '../features/todos/todosThunks';
import type { Todo } from '../features/todos/todosTypes';
import './TodoItem.scss';

interface Props {
  todo: Todo;
}

function TodoItem({ todo }: Props) {
  const dispatch = useAppDispatch();

  return (
    <li className={`todo-item ${todo.completed ? 'todo-item--done' : ''}`}>
      <label className="todo-item__label">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => dispatch(toggleTodo(todo))}
        />
        <span className="todo-item__title">{todo.title}</span>
      </label>
      <button
        type="button"
        className="todo-item__delete"
        onClick={() => dispatch(deleteTodo(todo.id))}
        aria-label={`Delete ${todo.title}`}
      >
        ✕
      </button>
    </li>
  );
}

export default memo(TodoItem);
