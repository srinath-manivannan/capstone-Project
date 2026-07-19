import { Router } from 'express';
import * as itemController from '../controllers/item.controller';
import { validateRequest } from '../middleware/validateRequest';
import { asyncHandler } from '../utils/asyncHandler';
import { protect } from '../middleware/auth';
import { createItemSchema, updateItemSchema } from '../validations/item.validation';

const router = Router();

// Every item route below requires a valid token. `protect` runs first and
// puts the user's id on req.userId.
router.use(protect);

// The 5 classic CRUD routes. Read the flow right-to-left:
// request -> (validate) -> asyncHandler (catches errors) -> controller -> service -> DB
router.get('/', asyncHandler(itemController.getItems));                                   // list
router.get('/:id', asyncHandler(itemController.getItem));                                 // read one
router.post('/', validateRequest(createItemSchema), asyncHandler(itemController.createItem)); // create
router.put('/:id', validateRequest(updateItemSchema), asyncHandler(itemController.updateItem)); // update
router.delete('/:id', asyncHandler(itemController.deleteItem));                           // delete

export default router;
