const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { PrismaClient } = require('@prisma/client');
const config = require('./utils/config');
const logger = require('./utils/logger');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth');
const brandRoutes = require('./routes/brand');
const assetRoutes = require('./routes/assets');
const launchPlanRoutes = require('./routes/launchPlan');

const app = express();
const prisma = new PrismaClient();

app.use(helmet());

app.use(cors(config.cors));

if (config.env === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim())
    }
  }));
}

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/brand', brandRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/launch-plan', launchPlanRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await prisma.$connect();
    logger.info('Database connected successfully');

    const server = app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port}`);
      logger.info(`Environment: ${config.env}`);
      logger.info(`CORS origin: ${config.cors.origin}`);
    });

    const gracefulShutdown = async (signal) => {
      logger.info(`${signal} received, shutting down gracefully`);

      server.close(async () => {
        logger.info('HTTP server closed');

        await prisma.$disconnect();
        logger.info('Database connection closed');

        process.exit(0);
      });

      setTimeout(() => {
        logger.error('Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (error) {
    logger.error('Failed to start server:', { error: error.message });
    await prisma.$disconnect();
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
}

module.exports = app;
