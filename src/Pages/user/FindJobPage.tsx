
import { getAllSavedJobs } from 'Api/user'
import AllJobs from 'Components/User/FindJobPage/AllJobs'
import AppliedJobScreen from 'Components/User/FindJobPage/AppliedJobScreen'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { HiDotsHorizontal } from 'react-icons/hi'
import SavedJobScreen from 'Components/User/FindJobPage/SavedJobScreen'

interface IFindJobPageProps {

}
const FindJobPage: React.FC<IFindJobPageProps> = () => {
    const [showApplied, setShowApplied] = useState(false);
    const [showAllJobs, setShowAllJobs] = useState(true)
    const [showSave, setShowSave] = useState(false);
    const [savedJobs, setSavedJobs] = useState<any[]>();

    const openSavedJobPage = async () => {
        setShowSave(true);
        setShowApplied(false);
        setShowAllJobs(false);
    }
    console.log(savedJobs);
    return (
        <>
            <div className="grid grid-cols-12 container py-3 gap-5 sm:px-16 sm:min-h-screen bg-slate-100">
                <div className="col-span-12 sm:col-span-3 sm:min-h-screen">
                    <div className="w-full rounded-md bg-white p-3">
                        <div onClick={() => { setShowAllJobs(true); setShowApplied(false); }} className="w-full p-4 hover:bg-gray-500 hover:text-white shadow-md m-2">
                            All Jobs
                        </div>
                        <div onClick={openSavedJobPage} className="w-full p-4 hover:bg-gray-500 hover:text-white shadow-md m-2">
                            Saved Jobs
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
                    {!showAllJobs && !showApplied && showSave && <SavedJobScreen savedJobs={savedJobs} setSavedJobs={setSavedJobs} />}
                </div>
                <div className="col-span-12 sm:col-span-3 bg-white sm:min-h-screen shadow-xl"></div>
            </div>
        </>
    )
}

export default FindJobPage
