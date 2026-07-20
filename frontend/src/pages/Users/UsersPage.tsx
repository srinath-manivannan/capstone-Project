/**
 * ============================================
 * 📄 WHAT : The Users page — self-service password change for everyone,
 *           plus a full user table (delete / reset password) for admins.
 * 🎯 WHY  : Same page shape as ItemsPage: fetch on mount, read via selectors,
 *           children dispatch their own thunks. The admin table is rendered
 *           only for admins — but the BACKEND is what actually enforces that
 *           (hiding a button is UX, not security).
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
import ChangePasswordForm from './components/ChangePasswordForm';
import UserList from './components/UserList';
import './UsersPage.scss';

export default function UsersPage() {
  const dispatch = useAppDispatch();
  const me = useAppSelector(selectMe);
  const isAdmin = useAppSelector(selectIsAdmin);
  const loading = useAppSelector(selectUsersLoading);
  const error = useAppSelector(selectUsersError);
  const success = useAppSelector(selectUsersSuccess);

  // 1) Always load my own profile (tells us the role).
  useEffect(() => {
    dispatch(fetchMe());
    return () => {
      dispatch(clearUsersFeedback()); // clear banners when leaving the page
    };
  }, [dispatch]);

  // 2) Only admins can list everyone — fetch after we know the role.
  useEffect(() => {
    if (isAdmin) dispatch(fetchUsers());
  }, [isAdmin, dispatch]);

  return (
    <div className="users-page">
      <PageHeader
        title="Users"
        subtitle={
          isAdmin
            ? 'Manage registered accounts — reset passwords or remove users.'
            : 'Your account settings.'
        }
      />

      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      {/* Everyone: change my own password */}
      <ChangePasswordForm />

      {/* Admins only: the full account table */}
      {isAdmin &&
        (loading ? (
          <div className="users-page__spinner">
            <CircularProgress />
          </div>
        ) : (
          <UserList currentUserId={me?.id} />
        ))}
    </div>
  );
}
