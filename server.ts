/***
 * Main entry point for the application
 * Author: Suryansh Mishra
 * Description: Initializes the server,  handles errors, and manages application lifecycle events.
 *** */

import env from '@config/env.js';
import app from '@/app.js'; // Import the application instance
import logger from '@config/logger.js';
import db from '@config/database.js';

if (!env.success) {
  logger.error(
    'Failed loading env:',
    JSON.stringify(env.error.format(), null, 2)
  );
  process.exit(1);
}

const PORT = process.env.PORT;

// Start the server and listen on the specified port
const server = app.listen(PORT, () => {
  logger.info(`Server listening on PORT ${PORT}`);
});

// Global error handler for uncaught exceptions
process.on('uncaughtException', (error: any) => {
  if (error && error.code === 'EADDRINUSE') {
    logger.error(
      'EADDRINUSE: Address already in use. Try using a different port or address.'
    );
    process.exit(1);
  }

  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Graceful shutdown handling for termination signals (e.g., SIGTERM)
process.once('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

// Optional: SIGINT handling if you want to manage Ctrl+C interruptions
process.once('SIGINT', () => {
  logger.info('SIGINT signal received: shutting down gracefully');
  server.close(() => {
    logger.info('HTTP server shut down');
    process.exit(0);
  });
});
