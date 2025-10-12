import { Router } from 'express';
import { downloadResume, getResume, upsertResume } from '../controllers/resumeController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.use(requireAuth);

router.get('/', getResume);
router.post('/', upsertResume);
router.get('/download', downloadResume);

export default router;
