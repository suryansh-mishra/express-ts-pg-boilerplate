import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

const {
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
} = process.env;

const DB_CONNECTION_URL = `postgres://${DATABASE_USER}s:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;

const connectionString = process.env.DATABASE_URL || DB_CONNECTION_URL;

const db = drizzle({
  connection: {
    connectionString, // Use the connection string dynamically generated
    // TODO: Check this before production, ensure SSL is enabled for production use
    // ssl: true,
  },
});

export default db;
