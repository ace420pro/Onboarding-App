import express from 'express';
import { PrismaClient } from '@prisma/client';
import Joi from 'joi';
import { logger } from '../utils/logger';
import { encrypt, decrypt } from '../utils/encryption';

const router = express.Router();
const prisma = new PrismaClient();

// Validation schemas
const createP2ClientSchema = Joi.object({
  firstName: Joi.string().min(1).max(50).required(),
  lastName: Joi.string().min(1).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).required(),
  dateOfBirth: Joi.date().required(),
  address: Joi.string().min(5).max(200).required(),
  city: Joi.string().min(1).max(50).required(),
  state: Joi.string().min(2).max(50).required(),
  zipCode: Joi.string().min(5).max(10).required(),
  country: Joi.string().default('US'),
  ssn: Joi.string().pattern(/^\d{9}$/).optional()
});

const updateP2ClientSchema = Joi.object({
  firstName: Joi.string().min(1).max(50),
  lastName: Joi.string().min(1).max(50),
  phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/),
  address: Joi.string().min(5).max(200),
  city: Joi.string().min(1).max(50),
  state: Joi.string().min(2).max(50),
  zipCode: Joi.string().min(5).max(10),
  status: Joi.string().valid('ACTIVE', 'INACTIVE', 'SUSPENDED')
});

// GET /api/p2-clients - Get all P2 clients
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search, status } = req.query;
    
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    
    const where: any = {};
    
    if (search) {
      where.OR = [
        { firstName: { contains: search as string, mode: 'insensitive' } },
        { lastName: { contains: search as string, mode: 'insensitive' } },
        { email: { contains: search as string, mode: 'insensitive' } }
      ];
    }
    
    if (status) {
      where.status = status;
    }

    const [clients, total] = await Promise.all([
      prisma.p2Client.findMany({
        where,
        skip,
        take: parseInt(limit as string),
        include: {
          accounts: {
            include: {
              website: {
                select: { name: true }
              }
            }
          },
          _count: {
            select: {
              accounts: true,
              verifications: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.p2Client.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        clients,
        pagination: {
          page: parseInt(page as string),
          limit: parseInt(limit as string),
          total,
          pages: Math.ceil(total / parseInt(limit as string))
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/p2-clients - Create new P2 client
router.post('/', async (req, res, next) => {
  try {
    const { error, value } = createP2ClientSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message
      });
    }

    const { ssn, ...clientData } = value;
    
    // Check if email already exists
    const existingClient = await prisma.p2Client.findUnique({
      where: { email: clientData.email }
    });

    if (existingClient) {
      return res.status(400).json({
        success: false,
        error: 'Client with this email already exists'
      });
    }

    // Encrypt SSN if provided
    const encryptedData: any = { ...clientData };
    if (ssn) {
      encryptedData.encryptedSSN = encrypt(ssn);
    }

    const client = await prisma.p2Client.create({
      data: encryptedData,
      include: {
        _count: {
          select: {
            accounts: true,
            verifications: true
          }
        }
      }
    });

    logger.info(`New P2 client created: ${client.email}`);

    res.status(201).json({
      success: true,
      data: client
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/p2-clients/:id - Get specific P2 client
router.get('/:id', async (req, res, next) => {
  try {
    const client = await prisma.p2Client.findUnique({
      where: { id: req.params.id },
      include: {
        accounts: {
          include: {
            website: true,
            logs: {
              orderBy: { createdAt: 'desc' },
              take: 10
            }
          }
        },
        verifications: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!client) {
      return res.status(404).json({
        success: false,
        error: 'P2 client not found'
      });
    }

    res.json({
      success: true,
      data: client
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/p2-clients/:id - Update P2 client
router.put('/:id', async (req, res, next) => {
  try {
    const { error, value } = updateP2ClientSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message
      });
    }

    const client = await prisma.p2Client.update({
      where: { id: req.params.id },
      data: value,
      include: {
        _count: {
          select: {
            accounts: true,
            verifications: true
          }
        }
      }
    });

    logger.info(`P2 client updated: ${client.email}`);

    res.json({
      success: true,
      data: client
    });
  } catch (error) {
    if ((error as any).code === 'P2025') {
      return res.status(404).json({
        success: false,
        error: 'P2 client not found'
      });
    }
    next(error);
  }
});

// DELETE /api/p2-clients/:id - Delete P2 client
router.delete('/:id', async (req, res, next) => {
  try {
    await prisma.p2Client.delete({
      where: { id: req.params.id }
    });

    logger.info(`P2 client deleted: ${req.params.id}`);

    res.json({
      success: true,
      message: 'P2 client deleted successfully'
    });
  } catch (error) {
    if ((error as any).code === 'P2025') {
      return res.status(404).json({
        success: false,
        error: 'P2 client not found'
      });
    }
    next(error);
  }
});

export default router;