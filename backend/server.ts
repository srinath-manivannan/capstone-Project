import app from './app';
import { connectDB } from './config/db';
import { env } from './config/env';

// Connect to MongoDB FIRST, then start listening for requests -
// this avoids the server accepting traffic before the DB is ready.
connectDB().then(() => {
  app.listen(env.PORT, () => {
    console.log(`Server running on http://localhost:${env.PORT}`);
  });
});