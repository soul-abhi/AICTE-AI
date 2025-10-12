import { Router } from 'express';
import {
    getPortfolio,
    getPublicPortfolio,
    upsertPortfolio
} from '../controllers/portfolioController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.use(requireAuth);

router.get('/', getPortfolio);
router.post('/', upsertPortfolio);
router.get('/public/:slug', getPublicPortfolio);

export default router;
