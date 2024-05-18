import adminRoutes from "../Services/Endpoints.ts/adminEndPoints";
import Api from "../Services/axios";
import errorHandler from "./errorHandler";



const login = async (email: string, password: string) => {
    console.log('ehlldfksl')
    try {
        let result = await Api.post(adminRoutes.login, { email, password });
        return result;
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}
const getAllUsers = async () => {
    try {
        let result = await Api.get(adminRoutes.getAllUsers);
        return result;
    } catch (error) {
        errorHandler(error as Error);
    }
}
const blockUser = async (id: string) => {
    try {
        let result = await Api.put(`${adminRoutes.blockUser}${id}`);
        return result;
    } catch (error) {
        errorHandler(error as Error);
    }
}
const logout = async () => {
    try {
        let result = await Api.get(adminRoutes.logout);
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}
const getPostReports = async () => {
    try {
        return await Api.get(adminRoutes.getPostReports);
    } catch (error) {
        console.log(error as Error);
    }
}
const getJobReports = async () => {
    try {
        return await Api.get(adminRoutes.getJobReports);
    } catch (error) {
        console.log(error as Error);
    }
}
const removeReportedJob = async (jobId: string) => {
    try {
        return await Api.put(`${adminRoutes.removeReportedJob}${jobId}`)
    } catch (error) {
        console.log(error as Error);
    }
}
const removeReportedPost = async (postId: string) => {
    try {
        return await Api.put(`${adminRoutes.removeReportedPost}${postId}`);
    } catch (error) {
        console.log(error as Error);
    }
}


export {
    removeReportedPost,
    removeReportedJob,
    getJobReports,
    getPostReports,
    login,
    getAllUsers,
    blockUser,
    logout
}