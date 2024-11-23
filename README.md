# express-ts-boilerplate

Boilerplate for setting up an Express server with TypeScript and PostgreSQL.

## Features

- **TypeScript**: Fully typed environment for safer and scalable code.
- **Express**: Minimal and flexible Node.js web application framework.
- **PostgreSQL**: Integrated database connectivity with `pg` and `drizzle-orm`.
- **Security**: Secure headers with `helmet` and password hashing with `bcrypt`.
- **JWT Authentication**: User authentication powered by `jsonwebtoken`.
- **Environment Configuration**: Managed using `dotenv`.
- **Logging**: Streamlined logging with `morgan` and `winston`.
- **Validation**: Schema validation with `zod` and `drizzle-zod`.

## Requirements

- Node.js >= 22
- PostgreSQL >= 17
- Bun (for development)

## Installation

1. **Install dependencies**  
   Run the following command in your terminal:  
   **`npm install`**

2. **Set up environment variables**  
   Create a `.env` file in the root directory with the following contents:  
   **`DATABASE_URL=your_postgres_connection_string`**  
   **`JWT_SECRET=your_jwt_secret`**

3. **Run database migrations**  
   Use `drizzle-kit` to generate the required database schema by running:  
   **`npx drizzle-kit generate:pg --schema ./path-to-your-schema`**

## Scripts

| Command         | Description                                                              |
| --------------- | ------------------------------------------------------------------------ |
| `npm run dev`   | Start the development server using Bun.                                  |
| `npm run build` | Clean the `dist` directory, compile TypeScript code, and adjust aliases. |
| `npm run start` | Run the production server from the compiled files.                       |
| `npm run clean` | Clean the `dist` directory.                                              |
