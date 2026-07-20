/**
 * ============================================
 * 📄 WHAT : The admin user table — every registered account, with actions.
 * 🎯 WHY  : Reads the list from Redux; each row dispatches its own thunks.
 *           memo()ized rows so deleting one doesn't re-render them all.
 * 🔁 FLOW : selector(users) ➜ rows ➜ dispatch(resetUserPassword | deleteUser)
 *           ➜ slice updates the list ➜ only the changed rows re-render
 * ============================================
 */
import { memo, useState } from 'react';
import {
  Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow,
  IconButton, Chip, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Stack,
} from '@mui/material';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import LockResetRoundedIcon from '@mui/icons-material/LockResetRounded';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { deleteUser, resetUserPassword } from '../../../features/users/usersThunks';
import { selectUsers, selectUsersMutating } from '../../../features/users/usersSelectors';
import type { AppUser } from '../../../features/users/usersTypes';
import './UserList.scss';

interface RowProps {
  user: AppUser;
  isSelf: boolean;
  onReset: (user: AppUser) => void;
}

/** One row — memo() means editing one user doesn't re-render the whole table. */
const UserRow = memo(function UserRow({ user, isSelf, onReset }: RowProps) {
  const dispatch = useAppDispatch();
  const mutating = useAppSelector(selectUsersMutating);

  const handleDelete = () => {
    // Destructive + irreversible → confirm first (DevOps guide's instinct,
    // applied to UI: hard-to-undo actions ask before acting).
    if (window.confirm(`Delete ${user.email}? This cannot be undone.`)) {
      dispatch(deleteUser(user.id));
    }
  };

  return (
    <TableRow hover>
      <TableCell className="user-list__name">
        {user.name}
        {isSelf && <Chip label="you" size="small" sx={{ ml: 1 }} />}
      </TableCell>
      <TableCell sx={{ color: 'text.secondary' }}>{user.email}</TableCell>
      <TableCell>{user.contact}</TableCell>
      <TableCell>
        <Chip
          label={user.role}
          size="small"
          color={user.role === 'admin' ? 'primary' : 'default'}
          variant={user.role === 'admin' ? 'filled' : 'outlined'}
        />
      </TableCell>
      <TableCell align="right">
        <Tooltip title="Reset password">
          <span>
            <IconButton onClick={() => onReset(user)} disabled={mutating}>
              <LockResetRoundedIcon />
            </IconButton>
          </span>
        </Tooltip>
        {/* Can't delete yourself — the backend refuses too (defence in depth) */}
        <Tooltip title={isSelf ? 'You cannot delete your own account' : 'Delete user'}>
          <span>
            <IconButton color="error" onClick={handleDelete} disabled={isSelf || mutating}>
              <DeleteOutlineRoundedIcon />
            </IconButton>
          </span>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
});

function UserList({ currentUserId }: { currentUserId?: string }) {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const mutating = useAppSelector(selectUsersMutating);

  // Dialog state is pure UI state → local.
  const [target, setTarget] = useState<AppUser | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const closeDialog = () => {
    setTarget(null);
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!target) return;
    const result = await dispatch(
      resetUserPassword({ id: target.id, newPassword, confirmPassword })
    );
    if (resetUserPassword.fulfilled.match(result)) closeDialog();
  };

  if (users.length === 0) {
    return (
      <Card elevation={0}>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="text.secondary">No registered users yet.</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card elevation={0} className="user-list">
        <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
          <div className="user-list__scroll">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((u) => (
                  <UserRow
                    key={u.id}
                    user={u}
                    isSelf={u.id === currentUserId}
                    onReset={setTarget}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Admin password-reset dialog — no "current password" needed here */}
      <Dialog open={Boolean(target)} onClose={closeDialog} fullWidth maxWidth="xs">
        <form onSubmit={handleReset}>
          <DialogTitle>Reset password</DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Set a new password for <strong>{target?.email}</strong>.
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="New password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                helperText="At least 8 characters"
                autoFocus
                required
              />
              <TextField
                label="Confirm new password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={mutating}>
              {mutating ? 'Saving…' : 'Reset password'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default memo(UserList);
