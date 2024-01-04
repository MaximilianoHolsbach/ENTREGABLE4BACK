import express from "express"
import router from "./src/routers/index.router.js"
import errorHandler from "./src/middleware/errorHandler.mid.js"
import pathHandler from "./src/middleware/pathHandler.mid.js"


const server = express()
const PORT = 8080
const ready = () => console.log("server ready on port"+PORT)
server.listen(PORT,ready)

//middlewares

server.use(express.json()); // Obliga a trabajar en formato json

server.use(express.urlencoded({ extended: true })); // Para poder decodificar correctamente los json query y params

server.use("/",router)

server.use(errorHandler)

server.use(pathHandler)

