import axios from "axios";
//import useAxiosPrivate from "../hooks/useAxiosPrivate";


const REST_API_REGISTER_URL = 'http://localhost:8080/register';

const REST_API_LOGIN_URL = 'http://localhost:8080/login';

//const axiosPrivate = useAxiosPrivate();


export const loginUser = (userDto:any) => {
    return axios.post(REST_API_LOGIN_URL,userDto);
}

export const registerUser = (userDto:any) => {
    return axios.post(REST_API_REGISTER_URL,userDto);
}

