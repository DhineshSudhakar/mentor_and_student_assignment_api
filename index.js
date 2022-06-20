import express from "express"
import dotenv from "dotenv"
import { MongoClient } from "mongodb"
import { mentorRoutes } from "./routes/mentorRoutes.js"
import { studentRoutes } from "./routes/studentRoutes.js"

const app = express()

app.use(express.json())

dotenv.config()

const MONGO_URL = process.env.MONGO_URL

async function clientConnection(){
    const client = new MongoClient(MONGO_URL)
    await client.connect()
    console.log("Successfully connected to mongo db server")
    return client
}

export const client = await clientConnection()

const PORT = process.env.PORT

app.get("/", (req, res) => {
    res.send("Welcome to mentor to student assignment api")
})

app.use("/mentor", mentorRoutes)
app.use("/student", studentRoutes)

app.listen(PORT, () => console.log("Server running on port:", PORT))

