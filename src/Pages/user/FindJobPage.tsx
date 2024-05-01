
import AllJobs from 'Components/User/FindJobPage/AllJobs'
import AppliedJobScreen from 'Components/User/FindJobPage/AppliedJobScreen'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

interface IFindJobPageProps {

}
const FindJobPage: React.FC<IFindJobPageProps> = () => {
    const [showApplied, setShowApplied] = useState(false);
    const [showAllJobs, setShowAllJobs] = useState(true)

    return (
        <>
            <div className="grid grid-cols-12 container py-3 gap-5 sm:px-16 sm:min-h-screen bg-slate-100">
                <div className="col-span-12 sm:col-span-3 sm:min-h-screen">
                    <div className="w-full rounded-md bg-white p-3">
                        <div onClick={() => { setShowAllJobs(true); setShowApplied(false); }} className="w-full p-4 hover:bg-gray-500 hover:text-white shadow-md m-2">
                            All Jobs
                        </div>
                        <div className="w-full p-4 hover:bg-gray-500 hover:text-white shadow-md m-2">
                            <Link to=''>Saved Jobs</Link>
                        </div>
                        <div className="w-full p-4 hover:bg-gray-500 hover:text-white shadow-md m-2">
                            <Link to=''>Skill Assessment</Link>
                        </div>
                        <div onClick={() => setShowApplied(true)} className="w-full p-4 hover:bg-gray-500 hover:text-white shadow-md m-2">
                            Applied Jobs
                        </div>
                    </div>
                </div>
                <div className="col-span-12 sm:col-span-6 bg-white min-h-screen shadow-xl">
                    {!showApplied && showAllJobs && <AllJobs />}
                    {showApplied && <AppliedJobScreen />}
                </div>
                <div className="col-span-12 sm:col-span-3 bg-white sm:min-h-screen shadow-xl"></div>
            </div>
        </>
    )
}

export default FindJobPage
