import express from "express"
import { client } from "../index.js"
import { assignStudentToMentor, createMentor, findStudent, findMentor, findStudentAssignedToMentor, assignMentorToStudent, showAllStudents } from "./helper.js"

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
    const student_id = req.body.student
    try {
        const student = await findStudent(student_id)
        if(student){
            const isStudentAssigned = await findStudentAssignedToMentor(mentor_id, student_id)
            console.log(isStudentAssigned)
            if(isStudentAssigned){
                res.status(401).send({msg: "student already assigned to"})
            }else{
                const data = {
                    student : student_id,
                    student_name : student.name
                }
                const result = await assignStudentToMentor(mentor_id, data)
                const mentor = await findMentor(mentor_id)
                const dataToStudent = {
                    mentor_id,
                    mentor_name : mentor.name
                }
                await assignMentorToStudent(student_id, dataToStudent )
                res.send(result)
            }
        }else{
            res.status(401).send({msg: "student not found"})
        }
        
    } catch (error) {
        console.log(error)
        res.status(401).send({msg: error.message})
    }
})

router.get("/showallstudents/:id", async (req, res) => {
    const mentor_id = req.params.id
    try {
        const result = await showAllStudents(mentor_id)
        res.send(result)
    } catch (error) {
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

export const mentorRoutes = router


