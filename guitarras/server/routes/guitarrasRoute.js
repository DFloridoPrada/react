import express from 'express';
import guitarrasController from '../controllers/GuitarrasController.js';

const router = express.Router();

router.route('').get(guitarrasController.getGuitarras);

export default router;