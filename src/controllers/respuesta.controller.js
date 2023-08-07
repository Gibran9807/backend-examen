import { pool } from "../db";

export const createRespuesta = async (req, res) => {
    const { idcomentario, idpersonal_respuesta, contenido_respuesta } = req.body;

    if (idpersonal_respuesta === null) {
        await pool.query('INSERT INTO RespuestasComentario (idcomentario, contenido_respuesta, fecha_hora_respuesta) VALUES (?, ?, ?, NOW())', [idcomentario, contenido_respuesta ])

    }    

    await pool.query('INSERT INTO RespuestasComentario (idcomentario, idpersonal_respuesta, contenido_respuesta, fecha_hora_respuesta) VALUES (?, ?, ?, NOW())', [idcomentario, idpersonal_respuesta, contenido_respuesta ])

    res.send('Respuesta creada');
}
