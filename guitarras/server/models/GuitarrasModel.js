import { dbPromise } from '../database/database.js';

class GuitarrasModel {
    async getAll() {
        const db = await dbPromise;
        return db.all('SELECT * FROM GUITARRAS');
    }
}

export default new GuitarrasModel();