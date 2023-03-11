import express from "express"
import cors from "cors"
import year from "./api/year.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/year", year)
app.use("*", (req, res) => res.status(404).json({error: "not found"}))

export default app