import { getApplications } from 'Api/recruiter';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';

interface IApplicationProps {
    render: any;
    approved: any[] | undefined
    rejected: any[] | undefined
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    applications: any[] | undefined;
    setApplications: React.Dispatch<React.SetStateAction<any[] | undefined>>;
}
const ApplicationsData: React.FC<IApplicationProps> = ({
    render,
    approved,
    rejected,
    setLoading,
    applications,
    setApplications }) => {

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                setLoading(true);
                const res = await getApplications();
                if (res?.data.success) {
                    setApplications(res?.data.data);
                    setLoading(false);
                } else toast.error(res?.data.message);
            } catch (error) {
                console.log(error as Error)
                toast.error('somthing went wrong while fetching the application details');
            }
        }
        fetchApplications()
    }, [approved, rejected])

    
    return render(applications)
}

export default ApplicationsData
