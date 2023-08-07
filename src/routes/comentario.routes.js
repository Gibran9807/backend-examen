import { createComentario } from "../controllers/comentarios.controller";


const router = Router();

router.post("/comentario", createComentario)



export default router