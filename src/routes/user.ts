import { login, register } from '@controllers/user.js';
import { Router } from 'express';

const router = Router();

/**
 * @route POST /api/v1/register
 * @desc Register a new user
 */
router.post('/register', register);
router.post('/login', login);

export default router;
