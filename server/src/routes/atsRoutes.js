import { Router } from 'express';
import { evaluateATS } from '../controllers/atsController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.use(requireAuth);
router.post('/score', evaluateATS);

export default router;
