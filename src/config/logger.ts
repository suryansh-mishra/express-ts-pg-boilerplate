import { createLogger, format, transports } from 'winston';

const isDevelopment = process.env.NODE_ENV === 'development';

const getCurrentTimestamp = (): string => {
  const now = new Date();
  return now.toISOString().replace(/T/, ' ').replace(/\..+/, ''); // YYYY-MM-DD HH:mm:ss
};
const timestamp = getCurrentTimestamp();

// Configure the logger based on the environment
const logger = createLogger({
  level: isDevelopment ? 'debug' : 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    isDevelopment ? format.colorize() : format.uncolorize(), // Avoid colorized logs in production for clarity
    format.printf(
      ({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`
    )
  ),
  transports: [
    // Console transport for development and production
    new transports.Console({
      format: isDevelopment
        ? format.combine(format.colorize(), format.simple())
        : format.json(), // JSON format for structured logs in production
    }),
    // File transport only in production
    ...(isDevelopment
      ? []
      : [
          new transports.File({
            filename: `logs/[${timestamp}] error.log`,
            level: 'error',
          }),
          new transports.File({ filename: `logs/[${timestamp}] combined.log` }),
        ]),
  ],
  exitOnError: false, // Prevent the logger from causing the application to exit
});

export default logger;
