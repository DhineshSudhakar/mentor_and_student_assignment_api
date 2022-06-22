import express from "express"
import { client } from "../index.js"
import { assignStudentToMentor, createMentor } from "./helper.js"

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

router.put("/assign/:id", async(req, res) => {
    const mentor_id = req.params.id
    const data = req.body
    console.log(mentor_id, data);
    try {
        const result = await assignStudentToMentor(mentor_id, data)
        res.send(result)
    } catch (error) {
        
    }
})

router.put("/updateall", async(req, res) => {
    try {
        const result = await client.db("Mentor_student_api").collection("mentors").updateMany(
            {},
            {
                $unset: {
                    isStudentAsssigned : false 
                }
            }
        )
        res.send(result)
    } catch (error) {
        res.status(401).send({msg: error.message})
    }
})

export const mentorRoutes = router


