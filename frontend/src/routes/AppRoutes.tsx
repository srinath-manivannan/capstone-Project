import { Routes, Route, Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import MainLayout from '../layouts/MainLayout/MainLayout';
import Dashboard from '../pages/Dashboard/Dashboard';
import ItemsPage from '../pages/Items/ItemsPage';
import BranchList from '../pages/Branches/BranchList';
import Settings from '../pages/Settings/Settings';
import AuthPage from '../pages/Auth/AuthPage';

/**
 * Gate for pages that require a logged-in user.
 * If there's no saved token, we bounce to /login — so login is what a
 * fresh visitor sees by default. `authService` stores the token on success,
 * after which these routes become reachable.
 */
function RequireAuth({ children }: { children: ReactNode }) {
  const isLoggedIn = Boolean(localStorage.getItem('token'));
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
}

/**
 * Every protected route below is nested INSIDE MainLayout, so every page
 * automatically gets the same AppBar + Sidebar + Paper wrapper.
 * To add a new page: create it in src/pages/, then add one <Route> line here
 * and one entry in layouts/MainLayout/navItems.ts.
 */
export default function AppRoutes() {
  return (
    <Routes>
      {/* Public: the login/register/forgot screen (no AppBar/Sidebar) */}
      <Route path="/login" element={<AuthPage />} />

      {/* Protected: everything else needs a token, otherwise -> /login */}
      <Route
        element={
          <RequireAuth>
            <MainLayout />
          </RequireAuth>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/branches" element={<BranchList />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Anything unknown falls back to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
