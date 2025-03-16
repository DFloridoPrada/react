import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const initDatabase = async () => {
    const db = await open({
        filename: path.join(__dirname, 'db.db'),
        driver: sqlite3.Database
    });

    await db.run(`PRAGMA foreign_key = ON;`);
    const result = await db.get('PRAGMA foreign_keys;');
    console.log(`Foreign key status: ${result}`);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS GUITARRAS (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            imagen TEXT NOT NULL,
            descripcion TEXT NOT NULL,
            precio INTEGER NOT NULL
        );
    `);

    const registros = await db.all('SELECT * FROM GUITARRAS');

    if (registros.length<1) {
        await db.exec(`
            INSERT INTO GUITARRAS (nombre, imagen, descripcion, precio) VALUES
            ("Lukather", "guitarra_01", "Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.", 299),
            ("SRV", "guitarra_02", "Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.", 349),
            ("Borland", "guitarra_03", "Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.", 329),
            ("VAI", "guitarra_04", "Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.", 299),
            ("Thompson", "guitarra_05", "Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.", 399),
            ("White", "guitarra_06", "Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.", 329),
            ("Cobain", "guitarra_07", "Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.", 349),
            ("Dale", "guitarra_08", "Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.", 379),
            ("Krieger", "guitarra_09", "Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.", 289),
            ("Campbell", "guitarra_10", "Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.", 349),
            ("Reed", "guitarra_11", "Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.", 399),
            ("Hazel", "guitarra_12", "Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.", 379);
        `);
    }

    return db;
}

export const dbPromise = initDatabase();