import { useEffect, useState, useCallback } from 'react';
import { Alert, CircularProgress, Box } from '@mui/material';
import PageHeader from '../../components/PageHeader';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import {
  getItems, createItem, updateItem, deleteItem,
  type Item, type ItemInput,
} from '../../services/itemService';

/**
 * EXAMPLE CRUD PAGE — study this file to learn the whole pattern.
 *
 * This "parent" component owns ALL the state and ALL the API calls. The child
 * components (ItemForm, ItemList) are "dumb": they just display data and call
 * the functions the parent hands them through props. That passing-of-props
 * from parent to child is what people mean by "props drilling".
 *
 *   ItemsPage (owns items + handlers)
 *     ├─ ItemForm   (gets: onCreate)
 *     └─ ItemList   (gets: items, onDelete, onChangeQuantity)
 */
export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1) READ — fetch the list once when the page mounts.
  useEffect(() => {
    (async () => {
      try {
        setItems(await getItems());
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Failed to load items.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 2) CREATE — add the new item to the top of the list (no full refetch needed).
  const handleCreate = useCallback(async (input: ItemInput) => {
    const created = await createItem(input);
    setItems((prev) => [created, ...prev]);
  }, []);

  // 3) UPDATE — replace just the one item that changed.
  const handleChangeQuantity = useCallback(async (id: string, quantity: number) => {
    const updated = await updateItem(id, { quantity });
    setItems((prev) => prev.map((it) => (it._id === id ? updated : it)));
  }, []);

  // 4) DELETE — drop the item from the list.
  const handleDelete = useCallback(async (id: string) => {
    await deleteItem(id);
    setItems((prev) => prev.filter((it) => it._id !== id));
  }, []);

  return (
    <>
      <PageHeader title="Items" subtitle="A full CRUD example — create, list, update and delete." />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* CREATE lives in a child that only knows how to call onCreate */}
      <ItemForm onCreate={handleCreate} />

      {/* READ / UPDATE / DELETE handled by a child that receives data + callbacks */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <ItemList items={items} onDelete={handleDelete} onChangeQuantity={handleChangeQuantity} />
      )}
    </>
  );
}
