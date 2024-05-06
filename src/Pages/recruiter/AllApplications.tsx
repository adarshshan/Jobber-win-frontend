import { getApplications } from 'Api/recruiter';
import ApplicationDetails from 'Components/Recruiter/ApplicationDetails';
import ApplicationItem from 'Components/Recruiter/ApplicationItem';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';


interface IAllApplicationsProps {

}
const AllApplications: React.FC<IAllApplicationsProps> = () => {
    const [applications, setApplications] = useState<any[]>();
    const [loading, setLoading] = useState(false);
    const [singleDetails, setSingleDetails] = useState<any>();

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
    }, [])

    const separate = (id: string) => {
        const singleItem = applications?.find((item) => item._id === id);
        setSingleDetails(singleItem)
    }
    console.log(singleDetails); console.log('this is the single items');
    return (
        <>
            <h1 className='text-xl uppercase ms-3'>All Applications</h1>
            <div className="grid grid-cols-12 gap-2 bg-blue-50 p-2">
                <div className="col-span-6  max-h-[600px] p-3 overflow-x-auto hover:overflow-scroll">
                    {applications && applications.length && applications.map((item, index) => (
                        <div key={index} onClick={() => separate(item._id)}>
                            <ApplicationItem item={item} loading={loading} />
                        </div>
                    ))}
                </div>
                <ApplicationDetails singleDetails={singleDetails} />
            </div>
        </>
    )
}

export default AllApplications
