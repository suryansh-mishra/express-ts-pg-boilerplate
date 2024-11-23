import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL,
    // TODO
    // !IMPORTANT: Check this before production
    // ssl: true,
  },
});

export default db;
