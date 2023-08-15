import express from "express"
import { EntryModel, CategoryModel } from "./db.js"
import entryRoutes from './routes/entry_routes.js'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(express.json())

app.get("/", (request, response) => response.send({ info: "Journal API" }))

app.get("/categories", async (req, res) =>
  res.send(await CategoryModel.find())
)

app.use('/entries', entryRoutes)

export default app