import { JobInterface } from "@/components/recruiter/PostJobForm";
import recruiterRoutes from "Services/Endpoints.ts/recruiterEndPoints";
import Api from "Services/axios";




const postNewJob = async (data: JobInterface) => {
    try {
        return await Api.post(recruiterRoutes.postNewJob, { data })
    } catch (error) {
        console.log(error as Error);
    }
}
const getAllJobsOfRecruiter = async () => {
    try {
        return await Api.get(recruiterRoutes.getAllJobsOfRecruiter);
    } catch (error) {
        console.log(error as Error);
    }
}
const getApplications = async () => {
    try {
        return await Api.get(recruiterRoutes.getApplications);
    } catch (error) {
        console.log(error as Error);
    }
}

export {
    postNewJob,
    getAllJobsOfRecruiter,
    getApplications
}