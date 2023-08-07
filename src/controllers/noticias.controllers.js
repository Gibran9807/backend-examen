import { pool } from "../db"


export const createNoticia = async (req, res) => {
    const { titulo, contenido, autor } = req.body;
    
    await pool.query('INSERT INTO Noticias (titulo, contenido, idpersonal, fecha_public) VALUES (?, ?, ?, NOW())', [titulo, contenido, autor])

    res.send('Noticia creada')
}
    


export const getNoticias  = async (req, res) => {

   const [rows] = await pool.query('SELECT * FROM Noticias')

    res.json(rows)
}

export const getNoticiaById = async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM Noticias WHERE idnoticia = ?', [req.params.id]);

      const [comentarios] = await pool.query('SELECT * FROM Comentarios WHERE idnoticia = ?', [req.params.id]);

    const noticiaComentarios = {
        ...rows[0],
        comentarios: comentarios,
    };

    for (const comentario of comentarios) {
        const [respuestas] = await pool.query('SELECT * FROM RespuestasComentario WHERE idcomentario = ?', [comentario.idcomentario]);
        comentario.respuestas = respuestas;
    }

    res.json(noticiaComentarios);
    } catch (error) {
    console.error('Error al obtener la noticia y comentarios:', error.message);
    res.status(500).json({ error: 'Error al obtener la noticia y comentarios' });
    }
};
