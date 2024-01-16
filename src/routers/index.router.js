import { Router } from "express";
import apirouter from "./api/index.router.js";

const router = Router()

// Implementar el router de  views
router.use("/api",apirouter)

export default router