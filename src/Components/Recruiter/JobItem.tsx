import { Button } from '@nextui-org/react'
import React from 'react'

interface IJobItemProps {

}
const JobItem: React.FC<IJobItemProps> = () => {
    return (
        <div className="flex shadow-lg rounded-sm p-3 my-3">
            <img className='rounded-lg w-20 h-20' src="http://res.cloudinary.com/dnn1ree80/image/upload/v1713962983/ypkk1scqoxgubcfgpymk.jpg" alt="" />
            <div className='ms-4'>
                <h1 className='font-semibold'>Frontend Developer</h1>
                <small>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus, dolor quaerat. Illum tempora blanditiis cupiditate quia exercitationem porro, explicabo, voluptates consectetur esse necessitatibus in architecto modi dolor eligendi quam dolorum?</small>
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
