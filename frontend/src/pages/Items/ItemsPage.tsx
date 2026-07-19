/**
 * ============================================
 * 📄 WHAT : The Items page — ⭐ THE MODEL for every data page in the app.
 * 🎯 WHY  : Look how little a page does now: fetch once on mount, then read
 *           everything from Redux via selectors. No axios, no local copies
 *           of server data, no props drilling — children talk to Redux
 *           themselves.
 * 🔁 FLOW : mount ➜ dispatch(fetchItems) ➜ thunk ➜ api client ➜ backend
 *           ➜ itemsSlice stores the list ➜ selectors re-render the UI
 * ============================================
 */
import { useEffect } from 'react';
import { Alert, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchItems } from '../../features/items/itemsThunks';
import { selectItemsStatus, selectItemsError } from '../../features/items/itemsSelectors';
import PageHeader from '../../components/PageHeader';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import './ItemsPage.scss';

export default function ItemsPage() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectItemsStatus);
  const error = useAppSelector(selectItemsError);

  // Fetch ONCE. The 'idle' guard means: if the data is already in Redux
  // (user navigated away and back), we do NOT refetch — Redux is the cache.
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchItems());
    }
  }, [status, dispatch]);

  return (
    <div className="items-page">
      <PageHeader title="Items" subtitle="A full CRUD example — create, list, update and delete." />

      {error && <Alert severity="error">{error}</Alert>}

      {/* CREATE — the form dispatches its own thunk */}
      <ItemForm />

      {/* READ/UPDATE/DELETE — the list reads Redux and dispatches thunks */}
      {status === 'loading' ? (
        <div className="items-page__spinner">
          <CircularProgress />
        </div>
      ) : (
        <ItemList />
      )}
    </div>
  );
}
