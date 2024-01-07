import { Router } from "express";
import usersRouter from "./users.router.js";
import productsRouter from "./products.router.js";
import carritoRouter from "./orders.router.js"

const apirouter = Router()

apirouter.use("/users",usersRouter)
apirouter.use("/products",productsRouter)
apirouter.use("/orders",carritoRouter)

// Definir los enrrutadores de los recursos

export default apirouter