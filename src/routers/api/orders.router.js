import { Router } from "express";
import carrito from "../../data/fs/OrdersManager.js";
import carritoPost from "../../middleware/carritoPost.js";

const carritoRouter = Router()

carritoRouter.post("/", carritoPost, async (req, res, next) => {
    try {
        const data = req.body
        const response = await carrito.create(data)
        return res.json({
            statusCode : 201,
            response
        })
    } catch (error) {
        return next(error)
    }
})

carritoRouter.get("/", async (req, res, next) => {
    try {
        const response = await carrito.read()
        return res.json({
            statusCode : 200,
            response
        })
    } catch (error) {
        return next(error)
    }
})

carritoRouter.get("/:uid", async (req, res, next) => {
    try {
        const {uid} = req.params
        const response = await carrito.readOne(uid)
        return res.json({
            statusCode : 200,
            response
        })
    } catch (error) {
        return next(error)
    }
})

carritoRouter.put("/:oid/:quantity/:state", async (req, res, next) => {
    try {
        const {oid,quantity,state} = req.params
        const response = carrito.update(oid,quantity,state)
        return res.json({
            statusCode : 200,
            response
        })
    } catch (error) {
        return next(error)
    }
})

carritoRouter.delete("/:oid", async (req, res, next) => {
    try {
        const {oid} = req.params
        const response = carrito.destroy(oid)
        return res.json({
            statusCode : 200,
            response
        })
    } catch (error) {
        return next(error)
    }
})

export default carritoRouter