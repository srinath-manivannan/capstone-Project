/**
 * ============================================
 * 📄 WHAT : The Todos page — a SERVER COMPONENT (the Next.js default).
 * 🎯 WHY  : No "use client" here, so this runs ON THE SERVER: it can be
 *           async and just AWAIT data — no useEffect, no loading spinner.
 *           The browser receives HTML that already contains the todos
 *           (faster first paint + SEO). Interactivity is then handed to
 *           the client component below.
 * 🔁 FLOW : "/todos" ➜ THIS FILE (server: await fetchTodos())
 *           ➜ <TodoApp initialTodos={…}> (client: buttons, forms, state)
 * ============================================
 *
 * 💬 INTERVIEW: "Server vs client components?" — server: default, can await
 * data, zero JS shipped, but no hooks/events. Client ("use client"): hooks +
 * events, ships JS. Pattern: fetch on the server, interact on the client.
 */
import { fetchTodos } from '@/lib/todosApi';
import TodoApp from '@/components/TodoApp';

export default async function TodosPage() {
  // Runs on the server for every request (lib/api.ts sets cache: 'no-store').
  const todos = await fetchTodos();

  return <TodoApp initialTodos={todos} />;
}
