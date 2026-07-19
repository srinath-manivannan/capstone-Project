import * as Yup from 'yup';

// Backend validation (Yup) — runs before the controller via validateRequest().
// Never trust the client; validate here even though the frontend also validates.

export const createItemSchema = Yup.object({
  name: Yup.string().trim().min(2, 'Name is too short').required('Name is required'),
  description: Yup.string().trim().max(500, 'Description is too long').optional(),
  quantity: Yup.number()
    .typeError('Quantity must be a number')
    .integer('Quantity must be a whole number')
    .min(0, 'Quantity cannot be negative')
    .required('Quantity is required'),
});

// On update every field is optional — the user may change only one thing.
export const updateItemSchema = Yup.object({
  name: Yup.string().trim().min(2, 'Name is too short').optional(),
  description: Yup.string().trim().max(500, 'Description is too long').optional(),
  quantity: Yup.number()
    .typeError('Quantity must be a number')
    .integer('Quantity must be a whole number')
    .min(0, 'Quantity cannot be negative')
    .optional(),
});
