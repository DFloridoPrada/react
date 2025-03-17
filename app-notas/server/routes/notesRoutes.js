import express from 'express';
import notesController from '../controllers/NotesController.js';

const router = express.Router();

router.route('')
.get(notesController.getNotes);

export default router;