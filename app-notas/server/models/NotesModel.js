import { dbPromise } from '../database/database.js'

class NotesModel {
    async allNotes() {
        const db = await dbPromise;
        return db.all('SELECT * FROM NOTES');
    }
}

export default new NotesModel();