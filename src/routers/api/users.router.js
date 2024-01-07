import {Router} from "express"
import user from "../../data/fs/UserFsManager.js"
const usersRouter = Router()

usersRouter.post("/", async (req, res) => {
    try {
        const data = req.body
        const response = await user.create(data)
        return res.json({
            statusCode : 201,
            response
        })
    } catch (error) {
        return error.message
    }
})

usersRouter.get("/", async (req, res) => {
    try {
        const response = await user.read()
        return res.json({
            statusCode : 200,
            response
        })
    } catch (error) {
        return error.message
    }
})

usersRouter.get("/:uid", async (req, res) => {
    try {
        const {uid} = req.params
        const response = await user.readOne(uid)
        return res.json({
            statusCode : 200,
            response
        })
    } catch (error) {
        return error.message
    }
})

usersRouter.put("/:uid", async (req, res) => {
    try {
        const {uid} = req.params
        const data = req.body
        const response = user.update(uid, data)
        return res.json({
            statusCode : 200,
            response
        })
    } catch (error) {
        return error.message
    }
})

usersRouter.delete("/:uid", async (req, res) => {
    try {
        const {uid} = req.params
        const response = user.destroy(uid)
        return res.json({
            statusCode : 200,
            response
        })
    } catch (error) {
        return error.message
    }
})

export default usersRouter