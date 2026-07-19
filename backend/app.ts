import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import authRoutes from './routes/auth.routes';
import itemRoutes from './routes/item.routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Only allow requests from your frontend's URL, not from anywhere on the internet
app.use(cors({ origin: env.CLIENT_URL, credentials: true }));

// Lets Express read JSON bodies (req.body) sent from the frontend
app.use(express.json());

// Simple route to check the server is alive: GET http://localhost:5000/api/health
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// Feature routes — one line per resource. Add new resources the same way.
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes); // example CRUD resource (copy this pattern)

// Must be registered LAST - it catches errors from every route above it
app.use(errorHandler);

export default app;