import { JobInterface } from '@/components/recruiter/PostJobForm';
import { getAllJobs } from 'Api/user'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { MdOutlineReport } from 'react-icons/md';
import { FaRegSave } from 'react-icons/fa';


export interface JobResult {
    _id: string;
    title: string;
    company_name: string;
    industry: string;
    description: string;
    total_vaccancy: number;
    location: string;
    job_img?: string;
    job_type: string;
    recruiter_details: any;
    experience: number;
    min_salary: number;
    max_salary: number;
}
interface IAllJobsProps {

}
const AllJobs: React.FC<IAllJobsProps> = () => {

    const [jobs, setJobs] = useState<JobResult[]>();

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await getAllJobs();
                if (res?.data.success) {
                    setJobs(res.data.data);
                } else toast.error(res?.data.message);
            } catch (error) {
                console.log(error as Error);
            }
        }
        fetchAllJobs();
    }, [])
    return (
        <>
            <div className="w-full">
                <div className="w-full p-3 font-semibold">
                    <p>All Jobs</p>
                </div>
                {jobs && jobs.length && jobs.map((item, index) => (
                    <div key={index} className="flex justify-between p-2 gap-2 bg-gray-100 shadow-md">
                        <Link to={`/user/job-details/${item._id}`}>
                            <div className="flex justify-start gap-4 p-1">
                                <img className='w-16 h-16 rounded-md mt-3' src={item.job_img} alt={item.title} />
                                <div>
                                    <h1 className="text-xl font-semibold">{item.title}</h1>
                                    <p>{item.company_name}</p>
                                    <p>{item.location}({item.job_type})</p>
                                </div>
                            </div>
                        </Link>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button variant="solid" >
                                    <BsThreeDotsVertical className='mt-5' />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu className='bg-gray-500 w-40 text-center text-white' aria-label="Static Actions">
                                <DropdownItem className='my-1 hover:bg-white hover:text-black' key="new">
                                    <div className="flex justify-center gap-1">
                                        <FaRegSave className='text-xl mt-1' />
                                        <span>save job</span>
                                    </div>
                                </DropdownItem>
                                <DropdownItem className='my-1 hover:bg-white hover:text-black' key="copy">
                                    <div className=' flex justify-center gap-1'>
                                        <MdOutlineReport className='text-xl mt-1' />
                                        <span>Report Job</span>
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

export default AllJobs
