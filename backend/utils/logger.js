const winston = require('winston');
const config = require('./config');

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    let msg = `${timestamp} [${level}]: ${message}`;
    if (Object.keys(meta).length > 0) {
      msg += ` ${JSON.stringify(meta)}`;
    }
    return msg;
  })
);

const logger = winston.createLogger({
  level: config.env === 'production' ? 'info' : 'debug',
  format: logFormat,
  transports: [
    new winston.transports.File({
      filename: '/var/log/tt-toolkit/error.log',
      level: 'error',
      maxsize: 10485760, // 10MB
      maxFiles: 30
    }),
    new winston.transports.File({
      filename: '/var/log/tt-toolkit/combined.log',
      maxsize: 10485760,
      maxFiles: 30
    })
  ]
});

if (config.env !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: consoleFormat
    })
  );
}

module.exports = logger;
