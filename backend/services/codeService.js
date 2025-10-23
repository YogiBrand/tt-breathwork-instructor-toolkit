const logger = require('../utils/logger');
const prisma = require('../lib/prisma');

const generateCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'TT-2025-';

  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return code;
};

const createCodes = async (count = 1) => {
  const codes = [];

  for (let i = 0; i < count; i++) {
    let code = generateCode();

    let exists = await prisma.code.findUnique({
      where: { code }
    });

    while (exists) {
      code = generateCode();
      exists = await prisma.code.findUnique({
        where: { code }
      });
    }

    const createdCode = await prisma.code.create({
      data: {
        code,
        status: 'active'
      }
    });

    codes.push(createdCode);
    logger.info('Generated code:', { code: createdCode.code });
  }

  return codes;
};

const validateCode = async (code) => {
  const codeRecord = await prisma.code.findUnique({
    where: { code },
    include: {
      user: true
    }
  });

  if (!codeRecord) {
    return { valid: false, message: 'Invalid code' };
  }

  if (codeRecord.status === 'revoked') {
    return { valid: false, message: 'Code has been revoked' };
  }

  if (codeRecord.status === 'used' && !codeRecord.user) {
    return { valid: false, message: 'Code has been used' };
  }

  return {
    valid: true,
    codeId: codeRecord.id,
    hasAccount: !!codeRecord.user,
    user: codeRecord.user
  };
};

const markCodeAsUsed = async (codeId, email) => {
  await prisma.code.update({
    where: { id: codeId },
    data: {
      status: 'used',
      usedAt: new Date(),
      usedByEmail: email
    }
  });
};

module.exports = {
  generateCode,
  createCodes,
  validateCode,
  markCodeAsUsed
};
