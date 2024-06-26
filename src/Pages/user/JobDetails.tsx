import { getAllJobs, getSingleJob, saveJobs } from 'Api/user';
import './css/JobDetails.css'
import { JobResult } from 'Components/User/FindJobPage/AllJobs';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import JobApplyForm from 'Components/User/FindJobPage/JobApplyForm';
import { MdOutlineReportGmailerrorred } from 'react-icons/md';
import { IoMdArrowBack } from 'react-icons/io';
import { useAppSelector } from 'app/store';
import { useDispatch } from 'react-redux';
import { setSearchText } from 'app/slice/CommonSlice';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import SideOpen from '../../Components/User/FindJobPage/SideOpen';
import { GiHamburgerMenu } from "react-icons/gi";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
} from '@chakra-ui/react'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { ReportList } from 'Components/User/FindJobPage/ReportList';

interface IJobDetailsProps {

}
const JobDetails: React.FC<IJobDetailsProps> = () => {
    const [job, setJob] = useState<JobResult | null>(null);
    const [jobs, setJobs] = useState<JobResult[]>();
    const [showForm, setShowForm] = useState(false);

    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef<any>();

    const { search } = useAppSelector(state => state.common);

    const dispatch = useDispatch()

    const { jobId } = useParams();
    useEffect(() => {
        dispatch(setSearchText(''))
    }, [])
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await getAllJobs(search);
                if (res?.data.success) {
                    setJobs(res.data.data.alljobs);
                } else toast.error(res?.data.message);
            } catch (error) {
                console.log(error as Error);
            }
        }
        const fetchSingleJobDetails = async () => {
            try {
                if (jobId) {
                    const res = await getSingleJob(jobId);
                    if (res?.data.success) {
                        setJob(res.data.data)
                    } else toast.error(res?.data.message);
                } else toast.error('somthing trouble with the job id');
            } catch (error) {
                console.log(error as Error);
            }
        }
        fetchSingleJobDetails();
        fetchAllJobs();
    }, [jobId, search])
    const handleSaveJob = async (jobId: string) => {
        try {
            const res = await saveJobs(jobId);
            if (res?.data.success) {
                toast.success(res.data.message);
            } else toast.error(res?.data.message);
        } catch (error) {
            console.log(error as Error);
        }
    }
    return (
        <>
            {showForm && <JobApplyForm setShowForm={setShowForm} />}

            <div className="container mb-24">
                <div className="grid grid-cols-12 gap-2 min-h-screen shadow-lg px-4 sm:px-14 mb-5">
                    <div className={`col-spam-12 ${jobs ? 'hidden' : 'block'} sm:block sm:col-span-6 min-h-50 border-r-4`}>
                        <div className="job-listing w-full">
                            <div className="text-2xl font-semibold p-5 bg-gray-200 text-blue-500 w-full">
                                <div className="flex justify-start gap-5">
                                    <IoMdArrowBack onClick={() => navigate(-1)} className='text-2xl font-semibold mt-2' />
                                    <h1>All Jobs</h1>
                                </div>
                            </div>
                            <form className="flex items-center w-full">
                                <label htmlFor="voice-search" className="sr-only">Search</label>
                                <div className="relative w-full">
                                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                    </div>
                                    <input type="text" id="voice-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search jobs" />
                                </div>
                                <button type="submit" className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg aria-hidden="true" className="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>Search
                                </button>
                            </form>
                            <div className="job-list-container">
                                {jobs && jobs.length && jobs.map((item, index) => (
                                    <Link to={`/user/job-details/${item._id}`} className=' w-full'>
                                        <div className="flex justify-between sm:justify-start sm:gap-4 p-1 mt-3 w-full">
                                            <img className='w-16 h-16 rounded-md mt-3' src={item.job_img} alt={item.title} />
                                            <div>
                                                <h1 className="text-xl font-semibold">{item.title}</h1>
                                                <p>{item.company_name}</p>
                                                <p>{item.location}({item.job_type})</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                        </div>
                    </div>

                    <div className="col-span-12 sm:col-span-6 min-h-50">
                        {job ? <div className="job-details w-full">
                            <div className="flex justify-between">
                                <div className="flex gap-3 text-2xl mt-2 hover:text-blue-200">
                                    <Link to='/user/find-jobs'>
                                        <IoMdArrowBack className='sm:hidden block' />
                                    </Link>
                                </div>

                                <Popover>
                                    <PopoverTrigger>
                                        <Button><BsThreeDotsVertical /></Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <PopoverArrow />
                                        <PopoverCloseButton />
                                        <PopoverHeader className='bg-gray-300'> </PopoverHeader>
                                        <PopoverBody className='bg-gray-300 flex justify-center'>
                                            <Button className='w-full' onClick={() => {
                                                onOpen();
                                            }} key='xs' m={4} >
                                                <p className='text-red-500 cursor-default flex gap-3'><MdOutlineReportGmailerrorred className='mt-1' />  report this job</p>
                                            </Button>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div className="flex justify-between p-4 text-2xl font-semibold border-b-2 min-h-[80px]">
                                <div className="flex justify-start gap-5">
                                    <img className='rounded-md w-16 h-16' src={job.job_img} alt="" />
                                    <h1 className='mt-3'>{job.title}</h1>
                                </div>

                            </div>
                            <div className='p-0 sm:p-5 text-sm'>
                                <p className='mt-3'>{job.location},kerala,India  <span>1 month ago</span></p>
                                <p className='mt-3'>5 of 10 skills match your profile- you may be good fit</p>
                            </div>
                            <div className="flex justify-start py-5 sm:p-5 border-b-2 gap-5">
                                <button onClick={() => setShowForm(true)} className='rounded-full bg-blue-500 px-7 p-1 text-xl font-semibold text-white'>Apply</button>
                                <button onClick={() => handleSaveJob(job._id)} className='rounded-full border border-blue-600 px-7 p-1 text-xl font-semibold text-blue-500'>Save</button>
                            </div>
                            <div className="p-0 sm:p-5">
                                <h1 className="text-xl text-gray-800 font-medium">About the Job</h1>
                                <hr className='mt-2' />
                                <p>{job.description}</p>
                                <p className='mt-3'><span className="font-semibold">Experience</span> : {job.experience} +years</p>
                                <p className='mt-3'><span className="font-semibold">Salary</span> : {job.min_salary} - {job.max_salary} /month (based on your experience)</p>
                                <p className='mt-3'><span className="font-semibold">Expected notice period</span> : 15 days</p>
                                <p className='mt-3'><span className="font-semibold">Shift</span> : (GMT+05:30) Asia/Kolkata (IST) </p>
                                <p className='mt-3'><span className="font-semibold">Opportunity type</span> : {job.job_type}</p>
                                <p className='mt-3'><span className="font-semibold">Placement type</span> : Full time permenant position</p>
                                <p className='mt-3'><span className="font-semibold">Primary Skills</span> : Mongodb,express,javascript,node,react,tailwindcss</p>
                                <p className='mt-3'><span className="font-semibold">requirement</span> : Education: Bachelor’s degree in Computer Science, Web Development, or a related field.</p>

                            </div>
                            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Report</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <ReportList jobId={job._id} onClose={onClose} />
                                    </ModalBody>
                                </ModalContent>
                            </Modal>
                        </div> : <h1>No Data Found!</h1>}
                    </div>
                </div>
            </div>
        </>
    )
}

interface IJobDetailsProps {

}
export default JobDetails
