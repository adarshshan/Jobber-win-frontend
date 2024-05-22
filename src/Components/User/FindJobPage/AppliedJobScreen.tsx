import { getAllApplications, getAllAppliedandSaved } from 'Api/user';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { HiDotsHorizontal } from 'react-icons/hi';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaCircleExclamation } from 'react-icons/fa6';

interface IAppliedJobScreen {

}
const AppliedJobScreen: React.FC<IAppliedJobScreen> = () => {
    const [applications, setApplications] = useState<any[]>();
    const [approved, setApproved] = useState<any[]>();
    const [rejected, setRejected] = useState<any[]>();
    useEffect(() => {
        const fetchAllApplications = async () => {
            try {
                const res = await getAllApplications();
                if (res?.data.success) {
                    setApplications(res.data.data);
                } else toast.error(res?.data.message);
            } catch (error) {
                console.log(error as Error);
            }
        }
        fetchAllApplications()
    }, [])
    const approvedApplications = () => {
        const data = () => applications?.filter((item) => item.status === 'Approved');
        setApproved(data);
    }
    const rejectedApplications = () => {
        const data = () => applications?.filter((item) => item.status === 'Rejected');
        setRejected(data);
    }
    
    return (
        <>
            <div className="text-2xl font-semibold text-blue-400 pb-5">
                <h1>All applied jobs</h1>
            </div>
            <div>
                <Tabs position='relative' variant='unstyled'>
                    <TabList>
                        <Tab>All</Tab>
                        <Tab onClick={approvedApplications}>Approved</Tab>
                        <Tab onClick={rejectedApplications}>Rejected</Tab>
                    </TabList>
                    <TabIndicator mt='-1.5px' height='2px' bg='blue.500' borderRadius='1px' />
                    <TabPanels>
                        <TabPanel>
                            {applications && applications.length ? (
                                applications.map((item, index) => (
                                    <div key={index} className="flex justify-between p-2 m-1 shadow-md bg-slate-100">
                                        <Link to={`/user/job-details/${item.jobId._id}`}>
                                            <div className="flex justify-start gap-5">
                                                <img className='w-20 h-20 rounded-md' src={item.jobId.job_img} alt={item.jobId.title} />
                                                <div className=' ms-4'>
                                                    <h1 className='text-lg'>{item.jobId.title}</h1>
                                                    <p>{item.jobId.company_name}</p>
                                                    <p>{item.jobId.location}</p>
                                                </div>
                                            </div>
                                        </Link>
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
                                ))
                            ) : (
                                <div className='p-6 text-sm flex gap-3'>
                                    <FaCircleExclamation className='text-red-500 mt-1 text-xl' />
                                    <h1>No Jobs found</h1>
                                </div>
                            )}
                        </TabPanel>
                        <TabPanel>
                            {approved && approved.length ? (
                                approved.map((item, index) => (
                                    <div key={index} className="flex justify-between p-2 m-1 shadow-md bg-slate-100">
                                        <Link to={`/user/job-details/${item.jobId._id}`}>
                                            <div className="flex justify-start">
                                                <img className='w-20 h-20 rounded-md' src={item.jobId.job_img} alt={item.jobId.title} />
                                                <div className=' ms-4'>
                                                    <h1 className='text-lg'>{item.jobId.title}</h1>
                                                    <p>{item.jobId.company_name}</p>
                                                    <p>{item.jobId.location}</p>
                                                </div>
                                            </div>
                                        </Link>
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
                                ))
                            ) : (
                                <div className='p-6 text-sm flex gap-3'>
                                    <FaCircleExclamation className='text-red-500 mt-1 text-xl' />
                                    <h1>No Jobs found</h1>
                                </div>
                            )}
                        </TabPanel>
                        <TabPanel>
                            {rejected && rejected.length ? (
                                rejected.map((item, index) => (
                                    <div key={index} className="flex justify-between p-2 m-1 shadow-md bg-slate-100">
                                        <Link to={`/user/job-details/${item.jobId._id}`}>
                                            <div className="flex justify-start">
                                                <img className='w-20 h-20 rounded-md' src={item.jobId.job_img} alt={item.jobId.title} />
                                                <div className=' ms-4'>
                                                    <h1 className='text-lg'>{item.jobId.title}</h1>
                                                    <p>{item.jobId.company_name}</p>
                                                    <p>{item.jobId.location}</p>
                                                </div>
                                            </div>
                                        </Link>
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
                                ))
                            ) : (
                                <div className='p-6 text-sm flex gap-3'>
                                    <FaCircleExclamation className='text-red-500 mt-1 text-xl' />
                                    <h1>No Jobs found</h1>
                                </div>
                            )}
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </>
    )
}

export default AppliedJobScreen;
