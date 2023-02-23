import { Router } from 'express';
import { getInput, redirectRequest } from '../controllers/urlControllers';

const router = Router();

router.post('/', getInput);
router.get('/:id', redirectRequest);

export default router;
