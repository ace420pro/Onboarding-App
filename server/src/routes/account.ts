import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/accounts - Get all P2 accounts
router.get('/', async (req, res, next) => {
  try {
    const { p2ClientId, websiteId, status } = req.query;
    
    const where: any = {};
    if (p2ClientId) where.p2ClientId = p2ClientId;
    if (websiteId) where.websiteId = websiteId;
    if (status) where.status = status;

    const accounts = await prisma.p2Account.findMany({
      where,
      include: {
        p2Client: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        },
        website: {
          select: {
            name: true,
            url: true
          }
        },
        logs: {
          orderBy: { createdAt: 'desc' },
          take: 5
        }
      },
      orderBy: { updatedAt: 'desc' }
    });

    res.json({
      success: true,
      data: accounts
    });
  } catch (error) {
    next(error);
  }
});

export default router;