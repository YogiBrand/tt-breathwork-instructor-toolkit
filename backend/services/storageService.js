const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const logger = require('../utils/logger');

const UPLOAD_DIR = process.env.UPLOAD_DIR || '/app/uploads';
const ASSETS_DIR = path.join(UPLOAD_DIR, 'assets');
const IMAGES_DIR = path.join(UPLOAD_DIR, 'images');

const ensureDirectories = async () => {
  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    await fs.mkdir(ASSETS_DIR, { recursive: true });
    await fs.mkdir(IMAGES_DIR, { recursive: true });
    logger.info('Storage directories initialized');
  } catch (error) {
    logger.error('Error creating storage directories:', { error: error.message });
    throw error;
  }
};

const saveAsset = async (buffer, fileName, userId) => {
  try {
    await ensureDirectories();

    const userDir = path.join(ASSETS_DIR, userId);
    await fs.mkdir(userDir, { recursive: true });

    const timestamp = Date.now();
    const uniqueFileName = `${timestamp}-${fileName}`;
    const filePath = path.join(userDir, uniqueFileName);

    await fs.writeFile(filePath, buffer);

    logger.info('Asset saved:', { userId, fileName: uniqueFileName });

    return {
      filePath,
      fileName: uniqueFileName,
      fileSize: buffer.length
    };
  } catch (error) {
    logger.error('Error saving asset:', { error: error.message, userId, fileName });
    throw error;
  }
};

const saveImage = async (buffer, fileName, userId) => {
  try {
    await ensureDirectories();

    const userDir = path.join(IMAGES_DIR, userId);
    await fs.mkdir(userDir, { recursive: true });

    const ext = path.extname(fileName);
    const uniqueFileName = `${uuidv4()}${ext}`;
    const filePath = path.join(userDir, uniqueFileName);

    await fs.writeFile(filePath, buffer);

    logger.info('Image saved:', { userId, fileName: uniqueFileName });

    return {
      filePath,
      fileName: uniqueFileName,
      fileSize: buffer.length
    };
  } catch (error) {
    logger.error('Error saving image:', { error: error.message, userId, fileName });
    throw error;
  }
};

const getAsset = async (filePath) => {
  try {
    const buffer = await fs.readFile(filePath);
    return buffer;
  } catch (error) {
    logger.error('Error reading asset:', { error: error.message, filePath });
    throw error;
  }
};

const deleteAsset = async (filePath) => {
  try {
    await fs.unlink(filePath);
    logger.info('Asset deleted:', { filePath });
    return true;
  } catch (error) {
    logger.error('Error deleting asset:', { error: error.message, filePath });
    throw error;
  }
};

const getUserAssets = async (userId) => {
  try {
    const userDir = path.join(ASSETS_DIR, userId);

    try {
      await fs.access(userDir);
    } catch {
      return [];
    }

    const files = await fs.readdir(userDir);

    const assets = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(userDir, file);
        const stats = await fs.stat(filePath);

        return {
          fileName: file,
          filePath,
          fileSize: stats.size,
          createdAt: stats.birthtime
        };
      })
    );

    return assets;
  } catch (error) {
    logger.error('Error getting user assets:', { error: error.message, userId });
    throw error;
  }
};

module.exports = {
  ensureDirectories,
  saveAsset,
  saveImage,
  getAsset,
  deleteAsset,
  getUserAssets
};
