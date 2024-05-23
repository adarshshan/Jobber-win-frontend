import { JobInterface } from "@/components/recruiter/PostJobForm";
import { SubInterface } from "Components/Admin/SubItem";
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
const changeStatus = async (status: string, applicationId: string) => {
    try {
        return await Api.put(`${recruiterRoutes.changeStatus}${status}/${applicationId}`)
    } catch (error) {
        console.log(error as Error);
    }
}
const editJobDetails = async (data: JobInterface, item: any) => {
    try {
        return await Api.put(recruiterRoutes.editJobDetails, { data, jobId: item._id })
    } catch (error) {
        console.log(error as Error)
    }
}

//.....................subscriptions....................

const getAllSubPlans = async () => {
    try {
        return await Api.get(recruiterRoutes.getAllSubPlans);
    } catch (error) {
        console.log(error as Error);
    }
}
const paymentSubscription = async (item: SubInterface) => {
    try {
        return await Api.post(recruiterRoutes.paymentSubscription, { item })
    } catch (error) {
        console.log(error as Error);
    }
}
const getCurrentSubDetails = async () => {
    try {
        return await Api.get(recruiterRoutes.getCurrentSubDetails);
    } catch (error) {
        console.log(error as Error);
    }
}
//graph
const getGraphData = async () => {
    try {
        return await Api.get(recruiterRoutes.getGraphData);
    } catch (error) {
        console.log(error as Error);
    }
}

export {
    getGraphData,
    getCurrentSubDetails,
    paymentSubscription,
    getAllSubPlans,
    postNewJob,
    getAllJobsOfRecruiter,
    getApplications,
    changeStatus,
    editJobDetails
}