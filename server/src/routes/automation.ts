import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// POST /api/automation/start - Start automation for a P2 client
router.post('/start', async (req, res, next) => {
  try {
    const { p2ClientId, websiteIds } = req.body;

    if (!p2ClientId || !websiteIds || !Array.isArray(websiteIds)) {
      return res.status(400).json({
        success: false,
        error: 'p2ClientId and websiteIds array are required'
      });
    }

    // Verify P2 client exists
    const p2Client = await prisma.p2Client.findUnique({
      where: { id: p2ClientId }
    });

    if (!p2Client) {
      return res.status(404).json({
        success: false,
        error: 'P2 client not found'
      });
    }

    // Create P2 accounts for each website
    const accounts = await Promise.all(
      websiteIds.map(async (websiteId: string) => {
        // Check if account already exists
        const existingAccount = await prisma.p2Account.findUnique({
          where: {
            p2ClientId_websiteId: {
              p2ClientId,
              websiteId
            }
          }
        });

        if (existingAccount) {
          return existingAccount;
        }

        // Create new account
        return prisma.p2Account.create({
          data: {
            p2ClientId,
            websiteId,
            status: 'PENDING',
            registrationStep: 'PENDING'
          },
          include: {
            website: { select: { name: true } }
          }
        });
      })
    );

    // TODO: Add to automation queue
    // This is where we would add jobs to Bull/Redis queue

    res.json({
      success: true,
      data: {
        message: 'Automation started',
        accounts
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;