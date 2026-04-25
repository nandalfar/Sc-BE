import { Router } from 'express';
import { validateBody } from '../middlewares/validation.middleware';
import { registerSchema, loginSchema } from '../schemas/auth.schema';
import { register, login, logout } from '../controllers/auth.controller';

const router = Router();

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.post('/logout', logout);

export default router;
