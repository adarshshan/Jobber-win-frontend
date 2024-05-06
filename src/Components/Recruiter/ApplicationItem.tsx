import { Spinner } from '@chakra-ui/react';
import React from 'react'
import { HiDotsVertical } from 'react-icons/hi'

interface IApplicationItemProps {
    item: any;
    loading: boolean;
}
const ApplicationItem: React.FC<IApplicationItemProps> = ({ item, loading }) => {
    return (
        <>
            {loading &&
                <div className="flex justify-center">
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                </div>
            }
            <div className="flex justify-between mt-3 shadow-lg rounded-md bg-white p-2">
                <div className="flex justify-start gap-4">
                    <img className='rounded-xl p-2 w-16 h-16' src={item.jobId.job_img} alt="" />
                    <div>
                        <h1>{item.userId.name}</h1>
                        <p>{item.jobId.title}</p>
                        <p>{item.userId.headLine}</p>
                    </div>
                </div>
                <HiDotsVertical className='text-2xl m-4' />
            </div>
        </>
    )
}

export default ApplicationItem
