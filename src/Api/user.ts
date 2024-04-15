import errorHandler from "./errorHandler";

const signup = async (name: string, phone: number, email: string, password: string, role: string) => {
    try {
        
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}