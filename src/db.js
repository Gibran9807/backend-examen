import { createPool } from "mysql2/promise";


export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'Fallout98',
    port: 3306,
    database: 'Noticias'
})

