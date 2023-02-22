import { Router } from 'express';
import { getInput } from '../controllers/urlControllers';

const router = Router();

router.post('/', getInput);

export default router;
