import express from "express"
import { client } from "../index.js"
import { assignMentorToStudent, assignStudentToMentor, createStudent, findMentor, findMentorAssignedToStudent, findStudent } from "./helper.js"

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

router.put("/assign/:id", async(req, res) => {
    const student_id = req.params.id
    const mentor_id = req.body.mentor
    try {
        const mentor = await findMentor(mentor_id)
        console.log(mentor)
        if(mentor){
            const isMentorAssigned = await findMentorAssignedToStudent(student_id, mentor_id)
            console.log(isMentorAssigned)
            if(isMentorAssigned){
                res.status(401).send({msg: "Mentor already assigned"})
            }else{
                const data = {
                    mentor : mentor_id,
                    mentor_name : mentor.name
                }
                const result = await assignMentorToStudent(student_id, data)
                const student = await findStudent(student_id)
                const dataToMentor = {
                    student_id,
                    student_name : student.name
                }
                await assignStudentToMentor(mentor_id, dataToMentor )
                res.send(result)
            }
        }else{
            res.status(401).send({msg: "mentor not found"})
        }
        
    } catch (error) {
        console.log(error)
        res.status(401).send({msg: error.message})
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

router.put("/updateall", async(req, res) => {
    try {
        const result = await client.db("Mentor_student_api").collection("students").updateMany(
            {},
            {
                $unset: {
                    isMentorAsssigned : false,
                }
            }
        )
        res.send(result)
    } catch (error) {
        res.status(401).send({msg: error.message})
    }
})

export const studentRoutes = router