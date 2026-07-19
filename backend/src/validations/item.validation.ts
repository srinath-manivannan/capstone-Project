/**
 * ============================================
 * 📄 WHAT : Yup VALIDATION SCHEMAS for the Item endpoints.
 * 🎯 WHY  : "What input is acceptable" lives here, separate from the logic
 *           (SRP). validateRequest() runs these BEFORE any controller —
 *           never trust the client, even though the frontend validates too.
 * 🔁 FLOW : routes/item.routes.ts ➜ validateRequest(THIS) ➜ controller
 * ============================================
 *
 * ⭐ Copy-me pattern for a new resource: one CREATE schema (fields required)
 * and one UPDATE schema (same fields, all optional).
 */
import * as Yup from 'yup';

// POST /api/items — creating needs the required fields present.
export const createItemSchema = Yup.object({
  name: Yup.string().trim().min(2, 'Name is too short').required('Name is required'),
  description: Yup.string().trim().max(500, 'Description is too long').optional(),
  quantity: Yup.number()
    .typeError('Quantity must be a number')
    .integer('Quantity must be a whole number')
    .min(0, 'Quantity cannot be negative')
    .required('Quantity is required'),
});

// PUT/PATCH /api/items/:id — every field optional (send only what changes),
// but anything that IS sent must still follow the same rules (DRY: one
// update schema serves both verbs).
export const updateItemSchema = Yup.object({
  name: Yup.string().trim().min(2, 'Name is too short').optional(),
  description: Yup.string().trim().max(500, 'Description is too long').optional(),
  quantity: Yup.number()
    .typeError('Quantity must be a number')
    .integer('Quantity must be a whole number')
    .min(0, 'Quantity cannot be negative')
    .optional(),
});
