import axios, { AxiosInstance } from "axios";

const Api: AxiosInstance = axios.create({
    baseURL: "http://52.140.0.220/api",
    // baseURL: "http://localhost:5000/api",
    withCredentials: true
})

export default Api;