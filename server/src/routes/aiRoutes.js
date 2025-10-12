import { Router } from 'express';
import { generateText } from '../controllers/aiController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.use(requireAuth);
router.post('/generate', generateText);

export default router;
