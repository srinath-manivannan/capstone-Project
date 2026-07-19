/**
 * ============================================
 * 📄 WHAT : The items table — READ (list) + UPDATE (PATCH) + DELETE.
 * 🎯 WHY  : Reads the list straight from Redux (selector) and dispatches
 *           thunks for changes. Each row is a memo()ized component, so
 *           editing ONE row doesn't re-render every other row.
 * 🔁 FLOW : selector(items) ➜ render rows ➜ click ➜ dispatch(patch/delete)
 *           ➜ slice updates list ➜ ONLY the changed row re-renders
 * ============================================
 */
import { memo } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { patchItem, deleteItem } from '../../../features/items/itemsThunks';
import { selectItems } from '../../../features/items/itemsSelectors';
import type { Item } from '../../../features/items/itemsTypes';
import './ItemList.scss';

/**
 * One row. memo() = re-render ONLY when this row's `item` object changes.
 * The slice replaces just the edited item, so all other rows keep their
 * old object reference and skip re-rendering — that's the optimization.
 */
const ItemRow = memo(function ItemRow({ item }: { item: Item }) {
  const dispatch = useAppDispatch();

  return (
    <TableRow hover>
      <TableCell className="item-list__name">{item.name}</TableCell>
      <TableCell sx={{ color: 'text.secondary' }}>{item.description || '—'}</TableCell>
      <TableCell align="center">
        {/* PATCH — partial update: we send ONLY { quantity } */}
        <span className="item-list__qty-controls">
          <IconButton
            size="small"
            disabled={item.quantity <= 0}
            onClick={() =>
              dispatch(patchItem({ id: item._id, changes: { quantity: item.quantity - 1 } }))
            }
          >
            <RemoveRoundedIcon fontSize="small" />
          </IconButton>
          <span className="item-list__qty-value">{item.quantity}</span>
          <IconButton
            size="small"
            onClick={() =>
              dispatch(patchItem({ id: item._id, changes: { quantity: item.quantity + 1 } }))
            }
          >
            <AddRoundedIcon fontSize="small" />
          </IconButton>
        </span>
      </TableCell>
      <TableCell align="right">
        {/* DELETE */}
        <IconButton color="error" onClick={() => dispatch(deleteItem(item._id))}>
          <DeleteOutlineRoundedIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
});

function ItemList() {
  // READ from Redux — the single source of truth. No local copy.
  const items = useAppSelector(selectItems);

  if (items.length === 0) {
    return (
      <Card elevation={0}>
        <CardContent className="item-list__empty">
          <Typography color="text.secondary">No items yet — add your first one above.</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card elevation={0} className="item-list">
      <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
        <div className="item-list__scroll">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <ItemRow key={item._id} item={item} />
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(ItemList);
