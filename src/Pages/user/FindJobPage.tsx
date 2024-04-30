import { getAllAppliedandSaved } from 'Api/user'
import AllJobs from 'Components/User/FindJobPage/AllJobs'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Link } from 'react-router-dom'

interface IFindJobPageProps {

}
const FindJobPage: React.FC<IFindJobPageProps> = () => {
    const [appliedJobs, setAppliedJobs] = useState();
    useEffect(() => {
        const fetchAppliedandSaved = async () => {
            try {
                const res = await getAllAppliedandSaved();
                if (res?.data.success) {
                    setAppliedJobs(res.data.data);
                } else toast.error('Something went wrong please try again!');
            } catch (error) {
                console.log(error as Error);
            }
        }
        fetchAppliedandSaved()
    }, [])
    console.log('This is the Saved and applied jobs.');
    console.log(appliedJobs);
    return (
        <>
            <div className="grid grid-cols-12 container py-3 gap-5 sm:px-16 sm:min-h-screen bg-slate-100">
                <div className="col-span-12 sm:col-span-3 sm:min-h-screen">
                    <div className="w-full rounded-md bg-white p-3">
                        <div className="w-full p-4 hover:bg-gray-500 hover:text-white shadow-md m-2">
                            <Link to=''>Saved Jobs</Link>
                        </div>
                        <div className="w-full p-4 hover:bg-gray-500 hover:text-white shadow-md m-2">
                            <Link to=''>Skill Assessment</Link>
                        </div>
                        <div className="w-full p-4 hover:bg-gray-500 hover:text-white shadow-md m-2">
                            <Link to=''>Applied Jobs</Link>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 sm:col-span-6 bg-white min-h-screen shadow-xl">
                    <AllJobs />
                </div>
                <div className="col-span-12 sm:col-span-3 bg-white sm:min-h-screen shadow-xl"></div>
            </div>
        </>
    )
}

export default FindJobPage
