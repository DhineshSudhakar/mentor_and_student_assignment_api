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

export function showAllStudents(id){          // for mentor routes
    return client.db("Mentor_student_api").collection("mentors").find(
        {mentor_id: id},
    ).project({name: 1, studentsAssigned:1}).toArray()
}

export async function findStudentAssignedToMentor(id1, id2){
    const result = await client.db("Mentor_student_api").collection("mentors").findOne(
        {
            $and : [ 
                {mentor_id: id1},
                {studentsAssigned : {$elemMatch: {student : id2}} } 
            ]
        }
        
    )
    return result
}

export async function findMentorAssignedToStudent(id1, id2){
    const result = await client.db("Mentor_student_api").collection("students").findOne(
        {
            $and : [ 
                {student_id: id1},
                {mentorAssigned : {$elemMatch: {mentor : id2}} } 
            ]
        }
    )
    return result
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

export function assignMentorToStudent(id, data){
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