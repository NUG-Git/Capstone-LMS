import axios from "axios";
//import useAxiosPrivate from "../hooks/useAxiosPrivate";

const REST_API_GET_INSTRUCTORS_URL = "http://localhost:8080/getAllInstructors";

const REST_API_DELETE_INSTRUCTOR_URL = "http://localhost:8080/deleteInstructor";

const REST_API_UPDATE_INSTRUCTOR_URL = "http://localhost:8080/updateInstructor";

const REST_API_GET_REPORTS_URL = "http://localhost:8080/report";

const REST_API_ADMIN_BASE_URL = "http://localhost:8080/getAllCourses";

const REST_API_CREATE_COURSE_URL = "http://localhost:8080/createCourse";

const REST_API_GET_COURSE_URL = "http://localhost:8080/getCourse";

const REST_API_UPDATE_COURSE_URL = "http://localhost:8080/updateCourse";

const REST_API_DELETE_COURSE_URL = "http://localhost:8080/deleteCourse";

const REST_API_GET_COURSE_NAMES_URL = "http://localhost:8080/getCourseNames";

const REST_API_GET_ASSIGNMENT_URL = "http://localhost:8080/downloadFile";

const REST_API_UPLOAD_ASSIGNMENT_URL = "http://localhost:8080/uploadFile";

const REST_API_SEND_EMAIL_URL = "http://localhost:8080/sendEmail";



//const axiosPrivate = useAxiosPrivate();

//Admin Dashboard - Manage Instructors 

export const listInstructors = () => {
  return axios.get(REST_API_GET_INSTRUCTORS_URL,{
    headers:{
    "Content-Type":"application/json",
    Authorization:'Bearer '+localStorage.getItem("token")
}});
};

export const deleteInstructor = (instructorId: any) => {
  return axios.delete(REST_API_DELETE_INSTRUCTOR_URL + "/" + instructorId,{
    headers:{
    "Content-Type":"application/json",
    Authorization:'Bearer '+localStorage.getItem("token")
}});
};

export const updateInstructor = (instructorId: any, instructorDto: any) => {
  return axios.put(
    REST_API_UPDATE_INSTRUCTOR_URL + "/" + instructorId,
    instructorDto,{
      headers:{
      "Content-Type":"application/json",
      Authorization:'Bearer '+localStorage.getItem("token")
  }}
  );
};

//Admin Dashboard - Reports
export const getReports = () => {
  return axios.get(REST_API_GET_REPORTS_URL,{
    headers:{
    "Content-Type":"application/json",
    Authorization:'Bearer '+localStorage.getItem("token")
}});
};

//Instructor Dashboard - Manage Courses

export const listCourse = () => {
  return axios.get(REST_API_ADMIN_BASE_URL,{
    headers:{
    "Content-Type":"application/json",
    Authorization:'Bearer '+localStorage.getItem("token")
}});
};

export const createCourse = (course: any) => {
  return axios.post(REST_API_CREATE_COURSE_URL, course,{
    headers:{
    "Content-Type":"application/json",
    Authorization:'Bearer '+localStorage.getItem("token")
}});
};

export const getCourse = (courseId: any) => {
  return axios.get(REST_API_GET_COURSE_URL + "/" + courseId,{
    headers:{
    "Content-Type":"application/json",
    Authorization:'Bearer '+localStorage.getItem("token")
}});
};

export const updateCourse = (courseId: any, course: any) => {
  return axios.put(REST_API_UPDATE_COURSE_URL + "/" + courseId, course,{
    headers:{
    "Content-Type":"application/json",
    Authorization:'Bearer '+localStorage.getItem("token")
}});
};

export const deleteCourse = (courseId: any) => {
  return axios.delete(REST_API_DELETE_COURSE_URL + "/" + courseId,{
    headers:{
    "Content-Type":"application/json",
    Authorization:'Bearer '+localStorage.getItem("token")
}});
};

export const getCourseNames = () => {
  return axios.get(REST_API_GET_COURSE_NAMES_URL,{
    headers:{
    "Content-Type":"application/json",
    Authorization:'Bearer '+localStorage.getItem("token")
}});
};

export const getAssignment = (courseId: any) => {
  return axios.get(REST_API_GET_ASSIGNMENT_URL + "/" + courseId,{
    headers:{
    "Content-Type":"application/json",
    Authorization:'Bearer '+localStorage.getItem("token")
}});
};

export const uploadAssignment = (courseId: any, fd: any) => {
  return axios.post(REST_API_UPLOAD_ASSIGNMENT_URL + "/" + courseId, fd,{
    headers:{
    "Content-Type":"application/json",
    Authorization:'Bearer '+localStorage.getItem("token")
}});
};

export const sendEmail = (courseId: any) => {
  return axios.get(REST_API_SEND_EMAIL_URL + "/" + courseId,{
    headers:{
    "Content-Type":"application/json",
    Authorization:'Bearer '+localStorage.getItem("token")
}});
};

