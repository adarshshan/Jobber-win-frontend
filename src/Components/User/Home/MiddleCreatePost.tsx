import { UserData } from '@/components/user/ProfilePage';
import React from 'react'
import { MdOutlinePermMedia } from 'react-icons/md'
import { Link } from 'react-router-dom';
interface IMiddleCreatePostProps {
    userProfile: UserData | null;
}
const MiddleCreatePost: React.FC<IMiddleCreatePostProps> = ({ userProfile }) => {
    return (
        <>
            <div className="w-full rounded-lg border shadow-lg mb-3 min-h-[50px]">
                <div className="flex">
                    <div className='w-2/12 p-2'>
                        <Link to='/user/profile'>
                            <img src={userProfile?.profile_picture} alt="\\profile picture" className=" rounded-full  md:w-full md:h-full ms-3" />
                        </Link>
                    </div>
                    <div className="w-10/12 p-7">
                        <input type="text" className='border border-gray-300 focus:border-blue-500 rounded-full p-3 w-full sm:w-full' placeholder='Start a Post' />
                    </div>
                </div>
                <div className='flex text-lg font-semibold gap-2 px-3 pb-3  ms-4'>
                    <MdOutlinePermMedia className='mt-1' />
                    <p className=''>Media</p>
                </div>
            </div>
        </>
    )
}

export default MiddleCreatePost
