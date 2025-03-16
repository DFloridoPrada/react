import guitarrasModel from '../models/GuitarrasModel.js';

class GuitarrasController {
    async getGuitarras(req, res) {
        const datos = await guitarrasModel.getAll();
        res.json(datos);
        // console.log(datos);
    }
}

export default new GuitarrasController();