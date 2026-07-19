/**
 * ============================================
 * 📄 WHAT : The root component.
 * 🎯 WHY  : In a bigger app this is where the Router goes (routes stay
 *           navigation-only). This template has one page, so it renders it.
 * 🔁 FLOW : main.tsx ➜ THIS FILE ➜ pages/TodosPage.tsx
 * ============================================
 */
import TodosPage from './pages/TodosPage';

export default function App() {
  return <TodosPage />;
}
