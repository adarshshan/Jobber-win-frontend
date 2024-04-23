import { Link, useNavigate } from "react-router-dom";
import { FormData } from "../Pages/user/SignupPage";
import userRoutes from "../Services/Endpoints.ts/userEndPoints";
import Api from "../Services/axios";
import errorHandler from "./errorHandler";
import toast from "react-hot-toast";


const login = async (email: string, password: string) => {
    try {
        const result = await Api.post(userRoutes.login, { email, password });
        return result;
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}
const signup = async ({ name, phone, email, password, confirmPassword, role }: FormData) => {
    try {
        const result = await Api.post(userRoutes.signup, { name, phone, email, password, role });
        if (result.data.success) {
            return true;
        } else {
            errorHandler(result.data.message);
        }
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}
const googleLogin = async (name: string | null, email: string | null, googlePhotoUrl: string | null) => {
    try {
        if (!name || !email) return;
        const result = await Api.post(userRoutes.googleLogin, { name, email, googlePhotoUrl })
        return result;
    } catch (error) {
        console.log(error as Error);
        if (error) console.log(error)
        console.log('error coming from here...');
    }
}
const verifyOtp = async (otpnum: string) => {
    try {
        const otp = parseInt(otpnum);
        const result = await Api.post(userRoutes.veryfyOtp, { otp });
        return result;
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}
const logout = async () => {
    try {
        return await Api.get(userRoutes.logout);
    } catch (error) {
        console.log(error as Error);
        errorHandler(error as Error);
    }
}
const getProfile = async () => {
    try {
        const result = await Api.get(userRoutes.getProfile);
        return result;
    } catch (error) {
        console.log(error);
    }
}
const updateAbout = async (id: string, about: string) => {
    try {
        const result = await Api.put(`${userRoutes.updateAbout}${id}`, { aboutInfo: about });
        if (result.data.success) toast.success(result.data.message);
        return result.data;
    } catch (error) {
        console.log(error as Error)
    }
}
const setProfilePic = async (pic: string, id: string) => {
    try {
        const result = await Api.put(userRoutes.updateProfile, { pic, id });
        return result;
    } catch (error) {
        console.log(error as Error);
    }
}
const createPost = async (pic: string, id: string, caption: string) => {
    try {
        const result = await Api.post(userRoutes.createPost, { userId: id, imageUrl: pic, caption: caption })
        return result;
    } catch (error) {
        console.log(error as Error);
    }
}

export {
    signup,
    verifyOtp,
    login,
    logout,
    getProfile,
    googleLogin,
    updateAbout,
    setProfilePic,
    createPost
}