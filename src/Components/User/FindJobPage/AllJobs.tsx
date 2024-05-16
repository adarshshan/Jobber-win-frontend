import { JobInterface } from '@/components/recruiter/PostJobForm';
import { getAllJobs, getJobsByDate, getJobsByExperience } from 'Api/user'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { MdOutlineReport } from 'react-icons/md';
import { FaAngleDown, FaRegSave } from 'react-icons/fa';
import { useAppSelector } from 'app/store';
import { useDispatch } from 'react-redux';
import { setSearchText } from 'app/slice/CommonSlice';
import { FaCircleExclamation } from 'react-icons/fa6';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
} from '@chakra-ui/react'


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
    const [skillJob, setSkillJob] = useState<JobResult[]>();
    const [color, setColor] = useState('A');

    const { search } = useAppSelector((state) => state.common);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSearchText(''))
    }, [])
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await getAllJobs(search);
                if (res?.data.success) {
                    console.log(res);
                    setJobs(res.data.data.alljobs);
                    setSkillJob(res.data.data.jobs)
                } else toast.error(res?.data.message);
            } catch (error) {
                console.log(error as Error);
            }
        }
        fetchAllJobs();
    }, [search])

    const handleSortJobs = async (jobType: string, payLoad: string) => {
        try {
            setColor(payLoad);
            const res = await getAllJobs(jobType);
            if (res?.data.success) {
                console.log(res);
                setJobs(res.data.data.alljobs);
                setSkillJob(res.data.data.jobs)
            } else toast.error(res?.data.message);
        } catch (error) {
            console.log(error as Error);
        }
    }
    const handleSortJobsByDate = async (num: number) => {
        try {
            const res = await getJobsByDate(num);
            if (res?.data.success) {
                setJobs(res.data.data);
            } else toast.error(res?.data.message)
        } catch (error) {
            console.log(error as Error);
        }
    }
    const handleSortJobsByExperience = async (start: number, end: number) => {
        try {
            const res = await getJobsByExperience(start, end);
            if (res?.data.success) {
                setJobs(res.data.data);
            } else toast.error(res?.data.message);
        } catch (error) {
            console.log(error as Error);
            alert('its here...');
        }
    }

    return (
        <>
            <div className="w-full">
                <div className="w-full p-3 font-semibold">
                    <p>jobs According to your skills</p>
                </div>
                {skillJob && skillJob.length ? (
                    skillJob.map((item, index) => (
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
                                        <div className=' flex justify-center gap-1 text-red-500'>
                                            <MdOutlineReport className='text-xl mt-1' />
                                            <span>Report Job</span>
                                        </div>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>

                        </div>
                    ))
                ) : (
                    <div className='p-6 text-sm flex gap-3'>
                        <FaCircleExclamation className='text-red-500 mt-1 text-xl' />
                        <h1>your skills are not matching with the jobs</h1>
                    </div>
                )}
            </div>
            <div className="w-full">
                <div className="w-full p-3 font-semibold">
                    <p>All jobs</p>
                </div>
                <div className="flex gap-2">
                    <div onClick={() => handleSortJobs('', 'A')} className={`rounded-full cursor-default ${color === 'A' ? 'bg-gray-600 text-white' : 'bg-gray-100'} p-1  px-3 shadow-lg float-start`}>all</div>
                    <div onClick={() => handleSortJobs('full-time', 'B')} className={`rounded-full cursor-default ${color === 'B' ? 'bg-gray-600 text-white' : 'bg-gray-100'} p-1  px-3 shadow-lg float-start`}>full-time</div>
                    <div onClick={() => handleSortJobs('part-time', 'C')} className={`rounded-full cursor-default ${color === 'C' ? 'bg-gray-600 text-white' : 'bg-gray-100'} p-1  px-3 shadow-lg float-start`}>half-time</div>
                    <div onClick={() => handleSortJobs('remote', 'D')} className={`rounded-full cursor-default ${color === 'D' ? 'bg-gray-600 text-white' : 'bg-gray-100'} p-1  px-3 shadow-lg float-start`}>remote</div>
                    <Popover>
                        <PopoverTrigger>
                            <Button onClick={() => setColor('F')} className={`rounded-full cursor-default ${color === 'F' ? 'bg-gray-600 text-white' : 'bg-gray-100'} p-1  px-3 shadow-lg float-start`}>Sort by Date</Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader className='bg-gray-300'> </PopoverHeader>
                            <PopoverBody className='bg-gray-300 '>
                                <Button className='w-full hover:bg-gray-600 hover:text-white' onClick={() => { handleSortJobsByDate(1) }} key='xsd' >
                                    <p className='cursor-default '>last 1 days</p>
                                </Button>
                                <Button className='w-full hover:bg-gray-600 hover:text-white' onClick={() => { handleSortJobsByDate(7) }} key='xs' >
                                    <p className='cursor-default '>last 7 days</p>
                                </Button>
                                <Button className='w-full hover:bg-gray-600 hover:text-white' onClick={() => { handleSortJobsByDate(15) }} key='xpd' >
                                    <p className='cursor-default '>last 15 days</p>
                                </Button>
                                <Button className='w-full hover:bg-gray-600 hover:text-white' onClick={() => { handleSortJobsByDate(30) }} key='zds' >
                                    <p className='cursor-default '>last 30 days</p>
                                </Button>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>

                    <Popover>
                        <PopoverTrigger>
                            <Button onClick={() => setColor('E')} className={`rounded-full cursor-default ${color === 'E' ? 'bg-gray-600 text-white' : 'bg-gray-100'} p-1  px-3 shadow-lg flex gap-1  float-start`}>Experience</Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader className='bg-gray-300'> </PopoverHeader>
                            <PopoverBody className='bg-gray-300 '>
                                <Button className='w-full hover:bg-gray-600 hover:text-white' onClick={() => { handleSortJobsByExperience(0, 0) }} key='xsd' >
                                    <p className='cursor-default '> Entry Level (no experience) </p>
                                </Button>
                                <Button className='w-full hover:bg-gray-600 hover:text-white' onClick={() => { handleSortJobsByExperience(0, 1) }} key='xds' >
                                    <p className='cursor-default '> below 1 year</p>
                                </Button>
                                <Button className='w-full hover:bg-gray-600 hover:text-white' onClick={() => { handleSortJobsByExperience(0, 2) }} key='xspd' >
                                    <p className='cursor-default '>below 2 years</p>
                                </Button>
                                <Button className='w-full hover:bg-gray-600 hover:text-white' onClick={() => { handleSortJobsByExperience(2, 4) }} key='xstd' >
                                    <p className='cursor-default '>2 - 4 years</p>
                                </Button>
                                <Button className='w-full hover:bg-gray-600 hover:text-white' onClick={() => { handleSortJobsByExperience(4, 0) }} key='xzds' >
                                    <p className='cursor-default '>above 4 years</p>
                                </Button>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>

                </div>
                {jobs && jobs.length ? (
                    jobs.map((item, index) => (
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
                                        <div className=' flex justify-center gap-1 text-red-500'>
                                            <MdOutlineReport className='text-xl mt-1' />
                                            <span>Report Job</span>
                                        </div>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>

                        </div>
                    ))
                ) : (
                    <div className='p-6 text-sm flex gap-3'>
                        <FaCircleExclamation className='text-red-500 mt-1 text-xl' />
                        <h1>No Jobs found</h1>
                    </div>
                )}
            </div >
        </>
    )
}

export default AllJobs
