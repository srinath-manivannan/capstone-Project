/**
 * ============================================
 * 📄 WHAT : The "add item" form — the CREATE (POST) part of the page.
 * 🎯 WHY  : Dispatches its own thunk instead of receiving callbacks via
 *           props (no props drilling). Draft input values are UI state,
 *           so they're allowed to be local; the moment data matters to the
 *           app (the created item), it lives in Redux.
 * 🔁 FLOW : submit ➜ dispatch(createItem) ➜ thunk ➜ backend
 *           ➜ itemsSlice unshifts the new item ➜ ItemList re-renders
 * ============================================
 *
 * memo(): this component reads only `mutating` from Redux, so it re-renders
 * only when that flag changes — not when the items list changes.
 */
import { memo, useState, useCallback } from 'react';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createItem } from '../../../features/items/itemsThunks';
import { selectItemsMutating } from '../../../features/items/itemsSelectors';
import './ItemForm.scss';

function ItemForm() {
  const dispatch = useAppDispatch();
  const saving = useAppSelector(selectItemsMutating);

  // Draft values = pure UI state → local is correct here.
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');

  // useCallback: stable handler, no re-creation on every keystroke render.
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const result = await dispatch(createItem({ name, description, quantity: Number(quantity) }));
      // Clear the draft only if the create actually succeeded.
      if (createItem.fulfilled.match(result)) {
        setName('');
        setQuantity('');
        setDescription('');
      }
    },
    [dispatch, name, description, quantity]
  );

  return (
    <Card elevation={0} className="item-form">
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" className="item-form__title">
          Add a new item
        </Typography>

        <form className="item-form__row" onSubmit={handleSubmit}>
          <TextField
            className="item-form__name"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            className="item-form__qty"
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
          <TextField
            className="item-form__desc"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button type="submit" variant="contained" disabled={saving} sx={{ py: 1.75, px: 3 }}>
            {saving ? 'Adding…' : 'Add'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

// React.memo — skip re-rendering when parent re-renders with same props.
export default memo(ItemForm);
