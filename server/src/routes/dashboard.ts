import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/dashboard/stats - Get dashboard statistics
router.get('/stats', async (req, res, next) => {
  try {
    // Get basic counts
    const [
      totalP2s,
      totalWebsites,
      totalAccounts,
      pendingAccounts,
      completedAccounts,
      failedAccounts
    ] = await Promise.all([
      prisma.p2Client.count({ where: { status: 'ACTIVE' } }),
      prisma.website.count({ where: { isActive: true } }),
      prisma.p2Account.count(),
      prisma.p2Account.count({ where: { status: 'PENDING' } }),
      prisma.p2Account.count({ where: { status: 'COMPLETED' } }),
      prisma.p2Account.count({ where: { status: 'FAILED' } })
    ]);

    // Calculate completion rate
    const completionRate = totalAccounts > 0 
      ? ((completedAccounts / totalAccounts) * 100).toFixed(1)
      : 0;

    // Get recent activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentLogs = await prisma.accountLog.findMany({
      where: {
        createdAt: { gte: sevenDaysAgo }
      },
      include: {
        account: {
          include: {
            p2Client: { select: { firstName: true, lastName: true } },
            website: { select: { name: true } }
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 10
    });

    res.json({
      success: true,
      data: {
        stats: {
          totalP2s,
          totalWebsites,
          totalAccounts,
          pendingAccounts,
          completedAccounts,
          failedAccounts,
          completionRate: parseFloat(completionRate as string)
        },
        recentActivity: recentLogs
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;