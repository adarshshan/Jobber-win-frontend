
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
const getAllPosts = async (userId: string) => {
    try {
        const result = await Api.get(`${userRoutes.getAllPosts}/${userId}`);
        return result;
    } catch (error) {
        console.log(error as Error);
    }
}
const getAllHomePosts = async () => {
    try {
        return await Api.get(userRoutes.getAllHomePosts);
    } catch (error) {
        console.log(error as Error);
    }
}
const addSkill = async (id: string, skill: string) => {
    try {
        return await Api.patch(`${userRoutes.addSkill}${id}`, { skill });
    } catch (error) {
        console.log(error as Error);
    }
}
const getAllSkills = async (id: string) => {
    try {
        return await Api.get(`${userRoutes.getAllSkills}${id}`);
    } catch (error) {
        console.log(error as Error);
    }
}
const deleteSkill = async (id: string | undefined, skill: string) => {
    try {
        if (id) return await Api.delete(`${userRoutes.deleteSkill}${skill}/${id}`);
    } catch (error) {
        console.log(error as Error);
    }
}
const updateUser = async (userId: string, name: string | undefined, headLine: string | undefined, gender: string | undefined, qualification: string | undefined, location: string | undefined, phoneNumber: string | undefined) => {
    try {
        if (userId) return await Api.put(`${userRoutes.updateUser}${userId}`, { name, headLine, gender, qualification, location, phoneNumber });
    } catch (error) {
        console.log(error as Error);
    }
}
const removeProfilePic = async (id: string | undefined) => {
    try {
        return await Api.delete(`${userRoutes.removeProfilePic}${id}`);
    } catch (error) {
        console.log(error as Error);
    }
}

//netWork
const getAllUsers = async () => {
    try {
        return await Api.get(userRoutes.getAllUsers);
    } catch (error) {
        console.log(error as Error);
    }
}
const getUserProfile = async (userId: string) => {
    try {
        return await Api.get(`${userRoutes.getUserProfile}${userId}`);
    } catch (error) {
        console.log(error);
    }
}
const getUserPosts = async (userId: string) => {
    try {
        return await Api.get(`${userRoutes.getUserPosts}${userId}`)
    } catch (error) {
        console.log(error as Error);
    }
}
const sendRequest = async (receiverId: string) => {
    try {
        return await Api.post(userRoutes.sendRequest, { receiverId });
    } catch (error) {
        console.log(error as Error);
    }
}
const getAllRequests = async () => {
    try {
        const res = await Api.get(userRoutes.getAllRequests);
        return res;
    } catch (error) {
        console.log(error);
    }
}
const addToFriend = async (id: string) => {
    try {
        return await Api.put(`${userRoutes.addToFriend}${id}`);
    } catch (error) {
        console.log(error as Error);
    }
}
const getAllFriends = async () => {
    try {
        return await Api.get(userRoutes.getAllFriends);
    } catch (error) {
        console.log(error);
    }
}
const unFriend = async (id: string) => {
    try {
        return await Api.delete(`${userRoutes.unFriend}${id}`);
    } catch (error) {
        console.log(error as Error)
    }
}
const removeRequest = async (id: string) => {
    try {
        return await Api.put(`${userRoutes.removeRequest}${id}`);
    } catch (error) {
        console.log(error as Error);
    }
}
const getSendRequests = async () => {
    try {
        return await Api.get(userRoutes.getAllSendRequests);
    } catch (error) {
        console.log(error as Error);
    }
}
const cancelRequest = async (id: string) => {
    try {
        return await Api.delete(`${userRoutes.withdrawSendRequest}${id}`);
    } catch (error) {
        console.log(error as Error);
    }
}

//jobs
const getAllJobs = async () => {
    try {
        return await Api.get(userRoutes.getAllJobs);
    } catch (error) {
        console.log(error as Error);
    }
}
const getSingleJob = async (jobId: string) => {
    try {
        return await Api.get(`${userRoutes.getSingleJob}${jobId}`);
    } catch (error) {
        console.log(error as Error);
    }
}
const applyJob = async (jobId: string, resume: string, qualification: string, experience: number) => {
    try {
        return await Api.post(`${userRoutes.applyJob}${jobId}`, { resume, qualification, experience });
    } catch (error) {
        console.log(error as Error);
    }
}
const getAllAppliedandSaved = async () => {
    try {
        return await Api.get(userRoutes.getAllAppliedandSaved);
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
    createPost,
    getAllPosts,
    getAllHomePosts,
    addSkill,
    getAllSkills,
    deleteSkill,
    updateUser,
    removeProfilePic,
    getAllUsers,
    getUserProfile,
    getUserPosts,
    sendRequest,
    getAllRequests,
    addToFriend,
    getAllFriends,
    unFriend,
    removeRequest,
    getSendRequests,
    cancelRequest,
    getAllJobs,
    getSingleJob,
    applyJob,
    getAllAppliedandSaved
}