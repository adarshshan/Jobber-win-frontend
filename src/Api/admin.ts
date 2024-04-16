import adminRoutes from "../Services/Endpoints.ts/adminEndPoints";
import Api from "../Services/axios";
import errorHandler from "./errorHandler";



const login = async (email: string, password: string) => {
    try {
        let result = await Api.post(adminRoutes.login, { email, password });
        return result;
    } catch (error) {
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
        console.log(id);
        console.log('your id is above...');
        let result = await Api.put(`${adminRoutes.blockUser}${id}`);
        return result;
    } catch (error) {
        errorHandler(error as Error);
    }
}
const logout = async () => {
    try {
        let result=await Api.get(adminRoutes.logout);
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}




export {
    login,
    getAllUsers,
    blockUser,
    logout
}