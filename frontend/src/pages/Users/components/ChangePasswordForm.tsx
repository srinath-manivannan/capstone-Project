/**
 * ============================================
 * 📄 WHAT : "Change my password" card — available to EVERY logged-in user.
 * 🎯 WHY  : Self-service: the backend takes the user id from the TOKEN, so
 *           this form can only ever change YOUR password. Requires the
 *           current password to prove it's really you.
 * 🔁 FLOW : submit ➜ dispatch(changeMyPassword) ➜ thunk ➜ backend ➜ slice
 *           ➜ success banner on UsersPage
 * ============================================
 */
import { memo, useState, useCallback } from 'react';
import { Card, CardContent, Typography, TextField, Button, Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { changeMyPassword } from '../../../features/users/usersThunks';
import { selectUsersMutating } from '../../../features/users/usersSelectors';
import './ChangePasswordForm.scss';

function ChangePasswordForm() {
  const dispatch = useAppDispatch();
  const saving = useAppSelector(selectUsersMutating);

  // Draft input values = pure UI state → local is correct.
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const result = await dispatch(
        changeMyPassword({ currentPassword, newPassword, confirmPassword })
      );
      // Clear the fields only on success (keep them on failure so the user
      // can correct one field instead of retyping everything).
      if (changeMyPassword.fulfilled.match(result)) {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    },
    [dispatch, currentPassword, newPassword, confirmPassword]
  );

  return (
    <Card elevation={0} className="change-password">
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" className="change-password__title">
          Change my password
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2} className="change-password__fields">
            <TextField
              label="Current password"
              type="password"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <TextField
              label="New password"
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              helperText="At least 8 characters"
              required
            />
            <TextField
              label="Confirm new password"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" disabled={saving} sx={{ alignSelf: 'flex-start' }}>
              {saving ? 'Updating…' : 'Update password'}
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}

export default memo(ChangePasswordForm);
