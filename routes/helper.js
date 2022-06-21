import { client } from "../index.js";
import uniqid from "uniqid"

export function createMentor(data) {
    return client.db("Mentor_student_api").collection("mentors").insertOne({
        ...data, 
        mentor_id: uniqid()
    });
}

export function createStudent(data) {
    return client.db("Mentor_student_api").collection("students").insertOne({
        ...data, 
        student_id: uniqid()
    });
}