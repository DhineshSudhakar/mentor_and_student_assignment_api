import express from "express"
import { createStudent } from "./helper.js"

const router = express.Router()

router.post("/create", async (req, res) => {
    const data = req.body
    try {
        const result = await createStudent(data)
        res.send({msg: "Student created successfully", result })
    } catch (error) {
        res.status(401).send({msg: error.message})
    }
})

export const studentRoutes = router