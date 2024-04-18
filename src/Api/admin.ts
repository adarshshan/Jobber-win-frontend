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




export {
    login,
    getAllUsers,
    blockUser,
    logout
}