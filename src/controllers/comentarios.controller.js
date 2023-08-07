import { pool } from "../db";

export const createComentario = async (req, res) => {
    const { idnoticia, idpersonal, comentario} = req.body;
    
    if (idpersonal === null) {
        await pool.query('INSERT INTO Comentarios (idnoticia, comentario, fecha_hora) VALUES (?, ?, NOW())', [idnoticia, comentario])
    }

    await pool.query('INSERT INTO Comentarios (idnoticia, idpersonal, comentario, fecha_hora) VALUES (?, ?, ?, NOW())', [idnoticia, idpersonal, comentario])

    res.send('Comentario creado');
}
