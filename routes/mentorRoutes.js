import express from "express"
import { createMentor } from "./helper.js"

const router = express.Router()

router.post("/create", async (req, res) => {
    const data = req.body
    try {
        const result = await createMentor(data)
        res.send({msg: "Mentor created successfully", result })
    } catch (error) {
        res.status(401).send({msg: error.message})
    }
    
})

export const mentorRoutes = router


