import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/verification/:id - Get verification details
router.get('/:id', async (req, res, next) => {
  try {
    const verification = await prisma.identityVerification.findUnique({
      where: { id: req.params.id },
      include: {
        p2Client: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    if (!verification) {
      return res.status(404).json({
        success: false,
        error: 'Verification not found'
      });
    }

    res.json({
      success: true,
      data: verification
    });
  } catch (error) {
    next(error);
  }
});

export default router;