import jwt from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";

export const verifyToken = async (req, res, next) => {
    const token = req.headers["x-access-token"] 

    console.log(token);

    if (!token) {
        return res.status(403).json({
            message: "No token provided"
        });
    }

    const decoded = jwt.verify(token, config.SECRET)
    req.personalId = decoded.id
    const result = await pool.query(
        'SELECT * FROM Personal Where idpersonal = ?',
        [req.personalId]
    );

    if(!result) return res.status(404).json({message: "Not user found"})
    
    next()
};

