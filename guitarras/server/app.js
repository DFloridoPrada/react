import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import { dbPromise } from './database/database.js';
import cors from 'cors';

dotenv.config();
const port = process.env.PORT || 80;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));

import guitarrasRoute from './routes/guitarrasRoute.js';
app.use('/api/guitarras', guitarrasRoute);

dbPromise.then(() => {
    console.log('Base de datos cargada correctamente');
    app.listen(port, () => {
        console.log('Server escuchando en el puerto local ' + port);
    });
})
.catch((error) => {
    console.log(error);
    process.exit(1);
})
