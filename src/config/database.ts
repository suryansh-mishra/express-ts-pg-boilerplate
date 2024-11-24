import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import logger from './logger.js';

const {
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
} = process.env;

const DB_CONNECTION_URL = `postgres://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;

const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL || DB_CONNECTION_URL, // Use the connection string dynamically generated
    // TODO: Check this before production, ensure SSL is enabled for production use
    // ssl: true,
  },
});

export const checkDBConnection = async () => {
  try {
    await db.execute('SELECT 1');
    logger.info('Database connection successful');
  } catch (error: unknown) {
    logger.error('Database connection failed\n', error);
  }
};

export default db;
