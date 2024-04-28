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

export {
    postNewJob,
}