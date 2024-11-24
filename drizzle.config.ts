import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const {
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
} = process.env;

const DB_CONNECTION_URL = `postgres://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;

export default defineConfig({
  out: './drizzle', // Output directory for the generated files
  schema: './src/db/schema', // Path to your database schema
  dialect: 'postgresql', // Specify PostgreSQL dialect
  dbCredentials: {
    url: process.env.DATABASE_URL || DB_CONNECTION_URL, // Use the DATABASE_URL from .env if available, otherwise use the dynamically created URL
  },
  casing: 'snake_case',
});
