import express from 'express';
import dotenv from 'dotenv';
import { dbPromise } from './database/database.js';
import cors from 'cors';


dotenv.config();

const port = process.env.PORT || 80;

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));

import notesRoutes from './routes/notesRoutes.js';
app.use('/api/notes', notesRoutes);

dbPromise.then(() => {
    console.log('Base de datos cargada correctamente');
    app.listen(port, () => {
        console.log(`Servidor escuchando en el puerto ${port}`);
    })
})
.catch((error) => {
    console.log(error);
});