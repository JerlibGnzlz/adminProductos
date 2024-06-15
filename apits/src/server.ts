import express from "express"
import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import router from "./routes"
import { db } from "./config/db"
import colors from "colors"
import { swaggerSpec } from "./config/swagger";



export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.bgBlue.bold("Coneccion Exitosa"))
    } catch (error) {
        console.log(colors.bgRed.bold("Hubo un error al conectar la Base de Datos"))
    }
}
connectDB()

export const server = express()

server.use(express.json())

server.use("/api/products", router)


server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
