import axios, { AxiosInstance } from "axios";

console.log(process.env); console.log('this is the secret uri...');

const Api: AxiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_B_URI}/api`,
    withCredentials: true
})

export default Api;