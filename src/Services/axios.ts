import axios, { AxiosInstance } from "axios";


const Api: AxiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_B_URI}/api`,
    withCredentials: true
})

export default Api;