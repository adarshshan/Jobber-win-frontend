import React from 'react'
import { Button, Tooltip } from '@nextui-org/react';
import { GoVerified } from 'react-icons/go';
import { HiDotsVertical } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';

interface IApplicationDetailsProps {
    singleDetails: any;
}
const ApplicationDetails: React.FC<IApplicationDetailsProps> = ({ singleDetails }) => {
    return (
        <>
            <div className="col-span-6  min-h-[100px]">
                {singleDetails ? (
                    <div className="w-full">
                        <div className="flex justify-between">
                            <div className="flex justify-left gap-4 m-4">
                                <img className='w-36 h-36 rounded-md' src={singleDetails.userId.profile_picture} alt="" />
                                <div>
                                    <h1 className=' text-lg'><span className="font-semibold">Name:</span>{singleDetails.userId.name}</h1>
                                    <h1 className='mt-3 text-lg'><span className="font-semibold">Headline:</span> {singleDetails.userId.headLine}</h1>
                                    <h1 className='mt-3 text-lg'><span className="font-semibold">Email:</span> {singleDetails.userId.email}</h1>
                                    <h1 className='mt-3 text-lg'><span className="font-semibold">Mobile:</span> {singleDetails.userId.phoneNumber}</h1>
                                    <h1 className='mt-3 text-lg'><span className="font-semibold">Place:</span> {singleDetails.userId.location}</h1>
                                </div>
                            </div>
                            <HiDotsVertical className='text-2xl m-4' />
                        </div>

                        <div className="flex justify-center">
                            <Link to={singleDetails.resume} target="_blank">
                                <button className=' px-2 bg-blue-200 text-md'>View Resume</button>
                            </Link>
                        </div>
                        <div id="jobDetails" className="flex mt-2 shadow-md gap-4 m-4 p-3">
                            <img className='w-20 h-20 rounded-md ms-3' src={singleDetails.jobId.job_img} alt="" />
                            <div>
                                <h1 className='text-xl'>{singleDetails.jobId.title}</h1>
                                <hr className='mt-2' />
                                <h1 className=' text-lg mt-3'><span className="font-semibold">Company:</span>{singleDetails.jobId.company_name}</h1>
                                <h1 className=' text-lg mt-3'><span className="font-semibold">industry:</span>{singleDetails.jobId.industry}</h1>
                                <h1 className=' text-lg mt-3'><span className="font-semibold">Type:</span> {singleDetails.jobId.job_type}</h1>
                                <h1 className=' text-lg mt-3'><span className="font-semibold">location:</span> {singleDetails.jobId.location}</h1>
                                <h1 className=' text-lg mt-3'><span className="font-semibold">total_vaccancy:</span> {singleDetails.jobId.total_vaccancy}</h1>
                                <h1 className=' text-lg mt-3'><span className="font-semibold">Salary:</span> {singleDetails.jobId.min_salary} k - {singleDetails.jobId.max_salary} k /mo</h1>
                            </div>
                        </div>
                        <div className="flex justify-around text-3xl font-bold p-5">
                            <Tooltip content="Reject the application">
                                <Button><IoClose className='hover:text-red-600' /></Button>
                            </Tooltip>
                            <Tooltip content="Approve the application">
                                <Button><GoVerified className='hover:text-green-500' /></Button>
                            </Tooltip>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="relative w-full h-full">
                            <div className="absolute left-1/3 top-1/3 transform -translate-x-1/2 -translate-y-1/2 animate-bounce">
                                <h1 className='text-2xl'>Jobberwin</h1>
                                <h1>Find Your Dream Jobs</h1>
                            </div>
                        </div>
                    </>
                )}

            </div>
        </>
    )
}

export default ApplicationDetails
