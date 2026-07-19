import {
  Card, CardContent, Typography, Table, TableBody, TableCell, TableHead,
  TableRow, IconButton, Stack, Box,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import type { Item } from '../../../services/itemService';

// This child receives the DATA (items) plus two callbacks from the parent.
// It renders the table and calls the callbacks on click — again, it holds no
// state of its own and knows nothing about the API.
interface Props {
  items: Item[];
  onDelete: (id: string) => void;
  onChangeQuantity: (id: string, quantity: number) => void;
}

export default function ItemList({ items, onDelete, onChangeQuantity }: Props) {
  if (items.length === 0) {
    return (
      <Card elevation={0}>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="text.secondary">No items yet — add your first one above.</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card elevation={0}>
      <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
        <Box sx={{ overflowX: 'auto' }}>
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
                <TableRow key={item._id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{item.name}</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{item.description || '—'}</TableCell>
                  <TableCell align="center">
                    {/* UPDATE (PUT) — bump the quantity up or down */}
                    <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                      <IconButton
                        size="small"
                        disabled={item.quantity <= 0}
                        onClick={() => onChangeQuantity(item._id, item.quantity - 1)}
                      >
                        <RemoveRoundedIcon fontSize="small" />
                      </IconButton>
                      <Typography sx={{ minWidth: 28, textAlign: 'center', fontWeight: 600 }}>
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => onChangeQuantity(item._id, item.quantity + 1)}
                      >
                        <AddRoundedIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    {/* DELETE */}
                    <IconButton color="error" onClick={() => onDelete(item._id)}>
                      <DeleteOutlineRoundedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </CardContent>
    </Card>
  );
}
