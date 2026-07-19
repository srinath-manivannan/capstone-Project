/**
 * ============================================
 * 📄 WHAT : The route table — URLs ➜ pages. NAVIGATION ONLY.
 * 🎯 WHY  : Routes never contain logic or API calls — a route's only job is
 *           "this URL shows this page". Pages fetch their own data via Redux.
 *           React.lazy = each page's code downloads only when first visited
 *           (code-splitting → smaller initial bundle, faster first load).
 * 🔁 FLOW : App.tsx ➜ THIS FILE ➜ the page component for the current URL
 * ============================================
 */
import { lazy, Suspense, type ReactNode } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { useAppSelector } from '../app/hooks';
import { selectIsLoggedIn } from '../features/auth/authSelectors';
import MainLayout from '../layouts/MainLayout/MainLayout';

// Lazy pages — downloaded on first visit, shown under <Suspense> meanwhile.
const AuthPage = lazy(() => import('../pages/Auth/AuthPage'));
const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));
const ItemsPage = lazy(() => import('../pages/Items/ItemsPage'));
const BranchList = lazy(() => import('../pages/Branches/BranchList'));
const Settings = lazy(() => import('../pages/Settings/Settings'));

// Centered spinner while a lazy page's code is downloading.
function PageLoader() {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}
    >
      <CircularProgress />
    </Box>
  );
}

/**
 * Gate for pages that require a logged-in user — reads Redux, not storage.
 * No token in the store → bounce to /login.
 */
function RequireAuth({ children }: { children: ReactNode }) {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
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
    </Suspense>
  );
}
