import {Router} from "express"
import user from "../../data/fs/UserFsManager.js"
import usersPost from "../../middleware/usersPost.js";

const usersRouter = Router()

usersRouter.post("/", usersPost, async (req, res, next) => {
    try {
        const data = req.body
        const response = await user.create(data)
        return res.json({
            statusCode : 201,
            response
        })
    } catch (error) {
        return next(error);
    }
})

usersRouter.get("/", async (req, res, next) => {
    try {
        const response = await user.read()
        return res.json({
            statusCode : 200,
            response
        })
    } catch (error) {
        return next(error);
    }
})

usersRouter.get("/:uid", async (req, res, next) => {
    try {
        const {uid} = req.params
        const response = await user.readOne(uid)
        return res.json({
            statusCode : 200,
            response
        })
    } catch (error) {
        return next(error);
    }
})

usersRouter.put("/:uid", async (req, res, next) => {
    try {
        const {uid} = req.params
        const data = req.body
        const response = user.update(uid, data)
        return res.json({
            statusCode : 200,
            response
        })
    } catch (error) {
        return next(error);
    }
})

usersRouter.delete("/:uid", async (req, res, next) => {
    try {
        const {uid} = req.params
        const response = user.destroy(uid)
        return res.json({
            statusCode : 200,
            response
        })
    } catch (error) {
        return next(error);
    }
})

export default usersRouter