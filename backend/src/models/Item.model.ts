/**
 * ============================================
 * 📄 WHAT : The Item MODEL — the Mongoose schema + the DB access object.
 * 🎯 WHY  : Models are the ONLY layer that talks to MongoDB. Controllers and
 *           routes never import a model directly — services do (decoupling).
 * 🔁 FLOW : services/item.service.ts ➜ THIS FILE ➜ MongoDB "items" collection
 * ============================================
 *
 * ⭐ Copy-me pattern for a new resource:
 *   1. define fields with their rules (required, min, default, trim…)
 *   2. add { timestamps: true }
 *   3. export default model<IYourType>('YourName', yourSchema)
 */
import { Schema, model } from 'mongoose';
import type { IItem } from '../types/item.types';

const itemSchema = new Schema<IItem>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: '' },
    quantity: { type: Number, required: true, min: 0, default: 0 },
    // The OWNERSHIP link: which user this item belongs to.
    // `ref: 'User'` enables .populate('owner') if we ever need user details.
    // 💬 INTERVIEW: "How do you model relations in MongoDB?" — store the other
    // document's ObjectId (like a foreign key) and populate when needed.
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true } // auto createdAt / updatedAt
);

export default model<IItem>('Item', itemSchema);
