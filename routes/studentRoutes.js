import express from "express"
import { client } from "../index.js"
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

router.put("/updateall", async(req, res) => {
    try {
        const result = await client.db("Mentor_student_api").collection("students").updateMany(
            {},
            {
                $set: {
                    isMentorAssigned : false,
                    mentorAssigned: []
                }
            }
        )
        res.send(result)
    } catch (error) {
        res.status(401).send({msg: error.message})
    }
})

export const studentRoutes = router