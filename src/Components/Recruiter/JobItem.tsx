

import { JobInterface } from '@/components/recruiter/PostJobForm';
import { Button } from '@nextui-org/react'
import React from 'react'

interface IJobItemProps {
    item: JobInterface;
}
const JobItem: React.FC<IJobItemProps> = ({ item }) => {
    return (
        <div className="flex shadow-lg rounded-sm p-3 my-3">
            <img className='rounded-lg w-20 h-20' src={item.job_img} alt="" />
            <div className='ms-4'>
                <h1 className='font-semibold'>{item.title}</h1>
                <small>{item.description}</small>
            </div>
            <div className='h-full '>
                <Button color="secondary" className='mt-3 rounded-full bg-blue-800 text-white ms-2'>
                    View
                </Button>
            </div>
        </div>
    )
}

export default JobItem
