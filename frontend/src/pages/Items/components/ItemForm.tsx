import { useState } from 'react';
import { Card, CardContent, Stack, TextField, Button, Typography } from '@mui/material';
import type { ItemInput } from '../../../services/itemService';

// This child receives ONE prop from the parent: a function to call when the
// user submits. It doesn't know or care what the parent does with the data —
// that separation is what keeps components reusable.
interface Props {
  onCreate: (input: ItemInput) => Promise<void>;
}

export default function ItemForm({ onCreate }: Props) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      await onCreate({ name, description, quantity: Number(quantity) });
      // Clear the form after a successful create.
      setName('');
      setQuantity('');
      setDescription('');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Could not create item.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card elevation={0} sx={{ mb: 2.5 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Add a new item
        </Typography>

        <Stack
          component="form"
          onSubmit={handleSubmit}
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ alignItems: { sm: 'flex-start' } }}
        >
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            sx={{ flex: 2 }}
          />
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            sx={{ flex: 1 }}
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ flex: 3 }}
          />
          <Button type="submit" variant="contained" disabled={saving} sx={{ py: 1.75, px: 3 }}>
            {saving ? 'Adding…' : 'Add'}
          </Button>
        </Stack>

        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 1.5 }}>
            {error}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
