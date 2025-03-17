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

    await db.exec(`
        CREATE TABLE IF NOT EXISTS NOTES (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            lastModification DATE NOT NULL
        );
    `);

    const records = await db.all('SELECT * FROM NOTES');

    if (records.length < 1) {
        await db.exec(`
            INSERT INTO NOTES (title, content, lastModification) VALUES

            ("¿Cómo usar Sqlite en Nodejs?", "SQLite es una base de datos ligera y sin servidor que se integra fácilmente en aplicaciones Node.js mediante bibliotecas como sqlite3 o better-sqlite3. Su uso en Node.js es ideal para proyectos pequeños o medianos, ya que permite almacenar datos en un solo archivo sin necesidad de configurar un servidor de base de datos. Con consultas SQL estándar, los desarrolladores pueden leer y escribir datos de manera eficiente, mientras que su compatibilidad con promesas y métodos síncronos facilita la gestión de transacciones. Gracias a su bajo consumo de recursos y simplicidad, SQLite es una excelente opción para aplicaciones locales, herramientas de línea de comandos y prototipos rápidos.", CURRENT_TIMESTAMP),

            ("¿Qué son los materiales en Three js?", "En Three.js, un material define cómo se renderiza la superficie de un objeto en la escena, controlando propiedades como el color, la reflectividad y la transparencia. Existen varios tipos de materiales, como MeshBasicMaterial, que no responde a la luz, o MeshStandardMaterial, que utiliza iluminación física realista. Los materiales pueden configurarse con texturas, mapas de normales y efectos avanzados como transparencia o emisividad. Gracias a su flexibilidad, Three.js permite personalizar materiales para crear desde superficies metálicas y plásticas hasta efectos complejos como vidrio o neón, mejorando la inmersión visual en entornos 3D interactivos.", CURRENT_TIMESTAMP),

            ("¿Qué es React Native?", "React Native es un framework de desarrollo móvil que permite crear aplicaciones nativas para iOS y Android utilizando JavaScript y React. Su enfoque basado en componentes permite reutilizar código y escribir interfaces declarativas con JSX, simplificando el desarrollo. Gracias a su arquitectura, React Native se comunica con las APIs nativas del dispositivo a través de un puente, ofreciendo un rendimiento cercano al nativo. Además, su ecosistema incluye bibliotecas como React Navigation para la gestión de rutas y Expo para un desarrollo más rápido. Su capacidad de recarga en tiempo real y su amplia comunidad lo convierten en una opción popular para el desarrollo móvil moderno.", CURRENT_TIMESTAMP);
        `);
    }

    return db;
}

export const dbPromise = initDatabase();