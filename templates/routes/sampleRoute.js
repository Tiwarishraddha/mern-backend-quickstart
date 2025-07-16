import express from 'express';
import { registerSample } from '../controllers/sampleController.js';

const router = express.Router();
router.post('/register', registerSample);

export default router;
