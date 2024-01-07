import { Router } from "express";
import carrito from "../../data/fs/OrdersManager.js";

const carritoRouter = Router()

carritoRouter.post("/", async (req, res) => {
    try {
        const data = req.body
        const response = await carrito.create(data)
        return res.json({
            statusCode : 201,
            response
        })
    } catch (error) {
        return error.message
    }
})

carritoRouter.get("/", async (req, res) => {
    try {
        const response = await carrito.read()
        return res.json({
            statusCode : 200,
            response
        })
    } catch (error) {
        return error.message
    }
})

carritoRouter.get("/:uid", async (req, res) => {
    try {
        const {uid} = req.params
        const response = await carrito.readOne(uid)
        return res.json({
            statusCode : 200,
            response
        })
    } catch (error) {
        return error.message
    }
})

carritoRouter.put("/:oid/:quantity/:state", async (req, res) => {
    try {
        const {oid,quantity,state} = req.params
        const response = carrito.update(oid,quantity,state)
        return res.json({
            statusCode : 200,
            response
        })
    } catch (error) {
        return error.message
    }
})

carritoRouter.delete("/:oid", async (req, res) => {
    try {
        const {oid} = req.params
        const response = carrito.destroy(oid)
        return res.json({
            statusCode : 200,
            response
        })
    } catch (error) {
        return error.message
    }
})

export default carritoRouter