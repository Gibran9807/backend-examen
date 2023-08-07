import { pool } from '../db';
import jwt from 'jsonwebtoken';
import config from '../config'

const bcrypt = require('bcryptjs');

export const signin = async (req, res) => {
    const { nombre_usuario, contrasena } = req.body;

    try {
        const result = await pool.query(
            'SELECT * FROM Personal WHERE usuario = ? AND contrasena = ?',
            [nombre_usuario, contrasena]
        );

        if (result.length === 0) {
            return res.status(401).json('Credenciales inválidas');
        }
        const user = result[0][0]
        console.log(user);
        const id = result[0][0].idpersonal

        const token = jwt.sign({ id }, config.SECRET, {
            expiresIn: config.EXPIRATION
            
        })

        res.status(200).json({user:{idpersonal: id, apepaterno: user.apepaterno, apematerno: user.apematerno, nombre: user.nombre, direccion: user.direccion , usuario: user.usuario, fechadeingreso: Date()} ,token});
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json('Error al iniciar sesión');
    }
};

export const signup = async (req, res) => {

    const { apepaterno, apematerno, nombre, direccion, usuario, contrasena } = req.body;

    const encryptPassword = bcrypt.hashSync(contrasena, 10);

    try {

        const checkUserQuery = await pool.query('SELECT COUNT(*) as count_users FROM Personal WHERE usuario = ?', [usuario], (err, results) => {
            if (err) {
                console.error('Error al verificar el usuario:', err);
                connection.end();
                return res.status(500).json('Error al verificar el usuario');
            }
        });

        if (checkUserQuery[0][0].count_users > 0) {
            res.status(400).json("El usuario ya existe");
        } else {
            const result = await pool.query(
                'INSERT INTO Personal (apepaterno, apematerno, nombre, direccion, usuario, contrasena, fechadeingreso) VALUES (?, ?, ?, ?, ?, ?, NOW())',
                [apepaterno, apematerno, nombre, direccion, usuario, encryptPassword]
            );
            
            const data = result
            console.log(data);
            const id = result[0].insertId
            const token = jwt.sign({ id, data }, config.SECRET, {
                expiresIn: config.EXPIRATION
            })
    
            res.status(200).json({user: { idpersonal: id, apepaterno, apematerno, nombre, direccion, usuario, fechadeingreso: Date() }, token});
        }

        
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json('Error al registrar usuario');
    }


}