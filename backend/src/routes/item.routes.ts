/**
 * ============================================
 * 📄 WHAT : The Item ROUTES — the "table of contents" of the Items API.
 * 🎯 WHY  : One glance shows every URL + verb this resource answers to,
 *           and exactly which middleware runs before each controller.
 * 🔁 FLOW : app.ts ('/api/items') ➜ THIS FILE ➜ protect ➜ validate ➜ controller
 * ============================================
 *
 * Read ANY line left-to-right and you can see the request's journey:
 *   verb + URL → [protect] → [validateRequest?] → asyncHandler(controller)
 *
 * ⭐ Copy-me pattern: every resource's routes file looks EXACTLY like this —
 * the same 6 lines, in the same order. Only the names change.
 */
import { Router } from 'express';
import * as itemController from '../controllers/item.controller';
import { validateRequest } from '../middleware/validateRequest';
import { asyncHandler } from '../utils/asyncHandler';
import { protect } from '../middleware/auth';
import { createItemSchema, updateItemSchema } from '../validations/item.validation';

const router = Router();

// 🔒 Guard EVERYTHING below: no valid token → 401, controllers never run.
router.use(protect);

//         URL      validation (only when a body arrives)      controller
router.get(   '/',                                             asyncHandler(itemController.getItems));   // READ  all
router.get(   '/:id',                                          asyncHandler(itemController.getItem));    // READ  one
router.post(  '/',    validateRequest(createItemSchema),       asyncHandler(itemController.createItem)); // CREATE
router.put(   '/:id', validateRequest(updateItemSchema),       asyncHandler(itemController.updateItem)); // UPDATE (full)
router.patch( '/:id', validateRequest(updateItemSchema),       asyncHandler(itemController.patchItem));  // UPDATE (partial)
router.delete('/:id',                                          asyncHandler(itemController.deleteItem)); // DELETE

// 💬 INTERVIEW: "Why no validation on GET/DELETE?" — they carry no request
// body; the only input is the :id in the URL, which the service checks.

export default router;
