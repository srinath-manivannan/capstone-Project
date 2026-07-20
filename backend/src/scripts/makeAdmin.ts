/**
 * ============================================
 * 📄 WHAT : One-off script to promote a registered user to admin.
 * 🎯 WHY  : Roles are NEVER settable from the API (that would be privilege
 *           escalation). The first admin has to be created out-of-band —
 *           this script is that safe, auditable back door.
 * 🔁 FLOW : npm run make-admin -- you@example.com ➜ DB ➜ role = 'admin'
 * ============================================
 *
 * Run:  npm run make-admin -- srinath@example.com
 *
 * NOTE: this project is CommonJS, so the work goes inside an async main()
 * (top-level await is an ES-modules-only feature).
 */
import mongoose from 'mongoose';
import { env } from '../config/env';
import User from '../models/User.model';

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.error('Usage: npm run make-admin -- <email>');
    process.exit(1);
  }

  await mongoose.connect(env.MONGO_URI, { serverSelectionTimeoutMS: 8000 });

  const user = await User.findOneAndUpdate(
    { email: email.toLowerCase() },
    { role: 'admin' },
    { returnDocument: 'after' } // Mongoose 9: replaces the deprecated `new: true`
  );

  if (!user) {
    console.error(`❌ No user found with email ${email} — register them first.`);
  } else {
    console.log(`✅ ${user.email} is now an admin.`);
  }

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error('❌ make-admin failed:', err.message);
  process.exit(1);
});
