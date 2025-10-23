const { createCodes } = require('../services/codeService');
const logger = require('../utils/logger');

const DEFAULT_COUNT = 100;

const seedCodes = async () => {
  try {
    const count = parseInt(process.argv[2], 10) || DEFAULT_COUNT;

    logger.info(`Generating ${count} access codes...`);

    const codes = await createCodes(count);

    console.log('\n=================================');
    console.log('Access Codes Generated');
    console.log('=================================\n');

    codes.forEach((code, index) => {
      console.log(`${index + 1}. ${code.code}`);
    });

    console.log('\n=================================');
    console.log(`Total: ${codes.length} codes`);
    console.log('=================================\n');

    logger.info(`Successfully generated ${codes.length} codes`);

    process.exit(0);
  } catch (error) {
    logger.error('Error seeding codes:', { error: error.message });
    console.error('Error:', error.message);
    process.exit(1);
  }
};

if (require.main === module) {
  seedCodes();
}

module.exports = seedCodes;
