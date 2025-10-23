const logger = require('../utils/logger');
const prisma = require('../lib/prisma');

const getLaunchProgress = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'userId is required'
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const progress = await prisma.launchProgress.findMany({
      where: { userId },
      orderBy: { week: 'asc' }
    });

    res.json({
      success: true,
      progress
    });
  } catch (error) {
    logger.error('Error getting launch progress:', { error: error.message });
    next(error);
  }
};

const completeWeek = async (req, res, next) => {
  try {
    const { userId, week } = req.body;

    if (!userId || week === undefined) {
      return res.status(400).json({
        success: false,
        error: 'userId and week are required'
      });
    }

    if (week < 1 || week > 12) {
      return res.status(400).json({
        success: false,
        error: 'Week must be between 1 and 12'
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const existingProgress = await prisma.launchProgress.findUnique({
      where: {
        userId_week: {
          userId,
          week
        }
      }
    });

    let progressRecord;

    if (existingProgress) {
      progressRecord = await prisma.launchProgress.update({
        where: {
          userId_week: {
            userId,
            week
          }
        },
        data: {
          completed: true,
          completedAt: new Date()
        }
      });
    } else {
      progressRecord = await prisma.launchProgress.create({
        data: {
          userId,
          week,
          completed: true,
          completedAt: new Date()
        }
      });
    }

    const allProgress = await prisma.launchProgress.findMany({
      where: { userId },
      orderBy: { week: 'asc' }
    });

    const completedWeeks = allProgress.filter(p => p.completed).length;
    const showCelebration = week % 4 === 0 || week === 12;

    logger.info('Week completed:', { userId, week });

    res.json({
      success: true,
      showCelebration,
      progress: progressRecord,
      totalCompleted: completedWeeks,
      totalWeeks: 12
    });
  } catch (error) {
    logger.error('Error completing week:', { error: error.message });
    next(error);
  }
};

module.exports = {
  getLaunchProgress,
  completeWeek
};
