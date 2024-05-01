import { getAllAppliedandSaved } from 'Api/user';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { HiDotsHorizontal } from 'react-icons/hi';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

interface IAppliedJobScreen {

}
const AppliedJobScreen: React.FC<IAppliedJobScreen> = () => {
    const [appliedJobs, setAppliedJobs] = useState<any[]>();
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
            <div className="text-2xl font-semibold text-blue-400 pb-5">
                <h1>All applied jobs</h1>
            </div>
            <div>
                {appliedJobs && appliedJobs.length && appliedJobs.map((item, index) => (
                    <div key={index} className="flex justify-between p-2 m-1 shadow-md bg-slate-100">
                        <div className="flex justify-start">
                            <img className='w-20 h-20 rounded-md' src={item.jobDetails.job_img} alt={item.jobDetails.title} />
                            <h1 className='text-xl m-4'>{item.jobDetails.title}</h1>
                        </div>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button variant="solid" >
                                    <HiDotsHorizontal className='m-4' />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu className='bg-gray-500 w-40 text-center text-white' aria-label="Static Actions">
                                <DropdownItem className='my-1 hover:bg-white hover:text-black' key="new">
                                    <div className="flex justify-center gap-1">
                                        <span>Cancel Application</span>
                                    </div>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                ))}
            </div>
        </>
    )
}

export default AppliedJobScreen;
