import { client } from "../index.js";
import uniqid from "uniqid"


export function createMentor(data) {
    return client.db("Mentor_student_api").collection("mentors").insertOne({
        ...data, 
        mentor_id: uniqid()
    });
}

export function findMentor(id){
    return client.db("Mentor_student_api").collection("mentors").findOne({mentor_id: id})
}

export function createStudent(data) {
    return client.db("Mentor_student_api").collection("students").insertOne({
        ...data, 
        student_id: uniqid()
    });
}

export function findStudent(id){
    return client.db("Mentor_student_api").collection("students").findOne({student_id: id})
}

export function findStudentAssignedToMentor(id){
    return client.db("Mentor_student_api").collection("mentors").findOne(
        {"studentsAssigned":{$elemMatch: {"student": id }}}
    )
}

export function assignStudentToMentor(id, data){
    return client.db("Mentor_student_api").collection("mentors").updateOne(
        {"mentor_id": id},
        {
            $set: {
                isStudentAssigned: true,
            },
            $push: {
                studentsAssigned : data
            }
        }
    )
}

export function assignMentortoStudent(id, data){
    return client.db("Mentor_student_api").collection("students").updateOne(
        { student_id : id },
        {
            $set: {
                isMentorAssigned : true
            },
            $push : {
                mentorAssigned : data
            }
        }
    )
}