/**
 * ============================================
 * 📄 WHAT : The Express APP — global middleware + every /api route, in order.
 * 🎯 WHY  : One place to see the whole API surface. Middleware ORDER MATTERS:
 *           each request flows top-to-bottom through this file.
 * 🔁 FLOW : server.ts ➜ THIS FILE ➜ routes/*.routes.ts ➜ controllers…
 * ============================================
 */
import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import authRoutes from './routes/auth.routes';
import itemRoutes from './routes/item.routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// STEP 1: CORS — only allow requests from OUR frontend's URL.
// 💬 INTERVIEW: "What is CORS?" — a browser security rule; the server must
// explicitly say which websites may call it. Without this, the browser
// blocks your frontend's requests.
app.use(cors({ origin: env.CLIENT_URL, credentials: true }));

// STEP 2: JSON body parser — turns the raw request body into req.body.
// Without this line, req.body would be undefined in every controller.
app.use(express.json());

// STEP 3: Health check — a free way to ask "is the server alive?"
// Try it: GET http://localhost:5000/api/health
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// STEP 4: Feature routes — ONE line per resource (modular monolith:
// each feature is its own folder-set, but they deploy as one app).
// ➕ Adding a new resource? Create its files, then add ONE line here.
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes); // ⭐ the example CRUD resource — copy this pattern

// STEP 5: Error handler — MUST be registered LAST.
// 💬 INTERVIEW: "Why last?" — Express runs middleware in order; an error
// thrown anywhere above gets passed DOWN to the next error middleware,
// so the catcher must sit at the bottom of the stack.
app.use(errorHandler);

export default app;
