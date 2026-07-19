import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout/MainLayout';
import Dashboard from '../pages/Dashboard/Dashboard';
import BranchList from '../pages/Branches/BranchList';
import Settings from '../pages/Settings/Settings';
import AuthPage from '../pages/Auth/AuthPage';

/**
 * Routes nested INSIDE <Route element={<MainLayout />}> automatically get
 * the shared AppBar + Sidebar + Paper wrapper.
 *
 * /login is deliberately OUTSIDE that wrapper - it's a full-screen page
 * with no AppBar/Sidebar, so it sits as its own top-level <Route>.
 *
 * To add a new page: create it in src/pages/, then add one <Route> line here
 * and one entry in layouts/MainLayout/navItems.ts.
 */
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />

      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/branches" element={<BranchList />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
