/**
 * ============================================
 * 📄 WHAT : The Users page — the admin table of registered accounts.
 * 🎯 WHY  : Same page shape as ItemsPage: fetch on mount, read via selectors,
 *           children dispatch their own thunks. The table renders only for
 *           admins — but the BACKEND is what actually enforces that
 *           (hiding UI is UX, not security: requireAdmin returns 403).
 * 🔁 FLOW : mount ➜ dispatch(fetchMe) ➜ if admin ➜ dispatch(fetchUsers)
 *           ➜ usersSlice ➜ selectors re-render
 * ============================================
 */
import { useEffect } from 'react';
import { Alert, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchMe, fetchUsers } from '../../features/users/usersThunks';
import { clearUsersFeedback } from '../../features/users/usersSlice';
import {
  selectIsAdmin,
  selectMe,
  selectUsersError,
  selectUsersLoading,
  selectUsersSuccess,
} from '../../features/users/usersSelectors';
import PageHeader from '../../components/PageHeader';
import UserList from './components/UserList';
import './UsersPage.scss';

export default function UsersPage() {
  const dispatch = useAppDispatch();
  const me = useAppSelector(selectMe);
  const isAdmin = useAppSelector(selectIsAdmin);
  const loading = useAppSelector(selectUsersLoading);
  const error = useAppSelector(selectUsersError);
  const success = useAppSelector(selectUsersSuccess);

  // 1) Always load my own profile (it tells us the role).
  useEffect(() => {
    dispatch(fetchMe());
    return () => {
      dispatch(clearUsersFeedback()); // clear banners when leaving the page
    };
  }, [dispatch]);

  // 2) Only admins may list everyone — fetch once we know the role.
  useEffect(() => {
    if (isAdmin) dispatch(fetchUsers());
  }, [isAdmin, dispatch]);

  return (
    <div className="users-page">
      <PageHeader
        title="Users"
        subtitle="Registered accounts — reset a password or remove a user."
      />

      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      {!isAdmin ? (
        // Non-admins get an honest message instead of an empty page.
        <Alert severity="info">
          You need an admin account to manage users.
        </Alert>
      ) : loading ? (
        <div className="users-page__spinner">
          <CircularProgress />
        </div>
      ) : (
        <UserList currentUserId={me?.id} />
      )}
    </div>
  );
}
