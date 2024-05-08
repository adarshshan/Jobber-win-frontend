import React from 'react'
import { HiDotsVertical } from 'react-icons/hi'

interface IApplicationItemProps {
    item: any;
}
const ApplicationItem: React.FC<IApplicationItemProps> = ({ item}) => {
    return (
        <>
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
