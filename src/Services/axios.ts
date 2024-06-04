import axios, { AxiosInstance } from "axios";

const Api: AxiosInstance = axios.create({
    // baseURL: "https://jobberwin.top/api",
    baseURL: "http://localhost:5000/api",
    withCredentials: true
})

export default Api;