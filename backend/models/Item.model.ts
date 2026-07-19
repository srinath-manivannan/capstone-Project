import { Schema, model } from 'mongoose';
import type { IItem } from '../types/item.types';

// The Mongoose schema = the rules MongoDB enforces for every item document.
const itemSchema = new Schema<IItem>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: '' },
    quantity: { type: Number, required: true, min: 0, default: 0 },
    // Links each item to the user that owns it. `ref: 'User'` lets us
    // .populate() the owner later if we ever need their details.
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true } // auto createdAt / updatedAt
);

export default model<IItem>('Item', itemSchema);
