const { PrismaClient } = require('@prisma/client');

/**
 * Shared Prisma client instance.
 * Prevents exhausting database connections when modules import Prisma directly.
 */
const globalScope = globalThis;

const prisma =
  globalScope.__ttToolkitPrisma__ ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalScope.__ttToolkitPrisma__ = prisma;
}

module.exports = prisma;
