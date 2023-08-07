import { Router } from "express";
import { verifyToken } from "../middleware";

const router = Router();

import * as noticiaContoller from '../controllers/noticias.controllers'


router.get("/", noticiaContoller.getNoticias )

router.get("/:id", noticiaContoller.getNoticiaById )

router.post("/", verifyToken, noticiaContoller.createNoticia )




export default router
