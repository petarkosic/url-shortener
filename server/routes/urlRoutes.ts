import { Router } from 'express';
import { getInput } from '../controllers/urlControllers';

const router = Router();

router.get('/', getInput);

export default router;
