import express from 'express';
import { PrismaClient } from '@prisma/client';
import Joi from 'joi';
import { logger } from '../utils/logger';

const router = express.Router();
const prisma = new PrismaClient();

// Validation schemas
const createWebsiteSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  url: Joi.string().uri().required(),
  category: Joi.string().min(1).max(50).required(),
  config: Joi.object().required(),
  isActive: Joi.boolean().default(true)
});

// GET /api/websites - Get all websites
router.get('/', async (req, res, next) => {
  try {
    const { active } = req.query;
    
    const where: any = {};
    if (active !== undefined) {
      where.isActive = active === 'true';
    }

    const websites = await prisma.website.findMany({
      where,
      include: {
        _count: {
          select: { accounts: true }
        }
      },
      orderBy: { name: 'asc' }
    });

    res.json({
      success: true,
      data: websites
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/websites - Create new website
router.post('/', async (req, res, next) => {
  try {
    const { error, value } = createWebsiteSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message
      });
    }

    const website = await prisma.website.create({
      data: value,
      include: {
        _count: {
          select: { accounts: true }
        }
      }
    });

    logger.info(`New website added: ${website.name}`);

    res.status(201).json({
      success: true,
      data: website
    });
  } catch (error) {
    next(error);
  }
});

export default router;