import { Router } from "express";
import { signin, signup } from "../controllers/auth.controller";

const router = Router();

router.post("/", signup)
router.post("/", signin)

export default router