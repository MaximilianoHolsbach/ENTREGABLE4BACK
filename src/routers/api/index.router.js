import { Router } from "express";
import usersRouter from "./users.router.js";
import productsRouter from "./products.router.js";

const apirouter = Router()

apirouter.use("/user",usersRouter)
apirouter.use("/products",productsRouter)

// Definir los enrrutadores de los recursos

export default apirouter