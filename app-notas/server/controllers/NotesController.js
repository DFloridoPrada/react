import notesModel from '../models/NotesModel.js';

class NotesController {
    async getNotes(req, res) {
        const notes = await notesModel.allNotes();
        res.json(notes);
    }
}

export default new NotesController();