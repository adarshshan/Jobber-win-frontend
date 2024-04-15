import adminRoutes from "../Services/Endpoints.ts/adminEndPoints";
import Api from "../Services/axios";
import errorHandler from "./errorHandler";



const login = async (email: string, password: string) => {
    try {
        console.log('login from adminRoutes.ts is present')
        let result = await Api.post(adminRoutes.login, { email, password });
        console.log(result);
        return result;
    } catch (error) {
        errorHandler(error as Error);
    }
}




export {
    login,

}