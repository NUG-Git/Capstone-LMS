import axios from "axios";

const REST_API_DELETE_STUDENT_URL = "http://localhost:8080/deleteStudent";

const REST_API_UPDATE_STUDENT_URL = "http://localhost:8080/updateStudent";

const REST_API_INSTRUCTOR_GRADING_URL = 'http://localhost:8080/instructor/getAllStudents';

const REST_API_INSTRUCTOR_UPDATE_GRADE_URL = 'http://localhost:8080/instructor/updateGrade';

const REST_API_GET_STUDENT_URL = 'http://localhost:8080/getStudent';

const REST_API_ENROLL_STUDENT_URL = 'http://localhost:8080/enrollStudent';

const REST_API_FIND_STUDENT_URL = 'http://localhost:8080/findStudent';

const REST_API_UPLOAD_STUDENT_ASSIGNMENT_URL = 'http://localhost:8080/uploadFile';


//Admin Dashboard - Manage Student 
export const listStudents = () => {
    return axios.get(REST_API_INSTRUCTOR_GRADING_URL,{
        headers:{
        "Content-Type":"application/json",
        Authorization:'Bearer '+localStorage.getItem("token")
    }});
}

export const deleteStudent = (studentId: any) => {
    return axios.delete(REST_API_DELETE_STUDENT_URL + "/" + studentId,{
        headers:{
        "Content-Type":"application/json",
        Authorization:'Bearer '+localStorage.getItem("token")
    }});
}

export const updateStudent = (studentId: any, studentDto: any) => {
    return axios.put(REST_API_UPDATE_STUDENT_URL + "/" + studentId, studentDto,{
        headers:{
        "Content-Type":"application/json",
        Authorization:'Bearer '+localStorage.getItem("token")
    }});
}

export const updateGrade = (studentId:any, grade:any) => {
    return axios.put(REST_API_INSTRUCTOR_UPDATE_GRADE_URL+"/"+studentId+","+grade,{
        headers:{
        "Content-Type":"application/json",
        Authorization:'Bearer '+localStorage.getItem("token")
    }});
}

export const getStudent = (studentId:any) => {
    return axios.get(REST_API_GET_STUDENT_URL+"/"+studentId,{
        headers:{
        "Content-Type":"application/json",
        Authorization:'Bearer '+localStorage.getItem("token")
    }});
}

export const enrollStudent = (studentId:any, course:any) => {
    return axios.put(REST_API_ENROLL_STUDENT_URL+"/"+studentId+","+course,{
        headers:{
        "Content-Type":"application/json",
        Authorization:'Bearer '+localStorage.getItem("token")
    }});
}

export const findStudent = (userDto:any) => {
    return axios.post(REST_API_FIND_STUDENT_URL, userDto,{
        headers:{
        "Content-Type":"application/json",
        Authorization:'Bearer '+localStorage.getItem("token")
    }});
}