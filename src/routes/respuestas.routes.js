import { createRespuesta } from "../controllers/respuesta.controller";

const router = Router();

router.post("/", createRespuesta)


export default router