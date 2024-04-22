import React from 'react'
import { MdModeEdit } from 'react-icons/md'
import MenuTabs from './MenuTabs'
import { Divider } from '@nextui-org/react'
import PostListItem from './PostListItem'
import { FaArrowRightLong } from 'react-icons/fa6'

interface IPostCardProps {
    setCreatePostScreen: React.Dispatch<React.SetStateAction<boolean>>;
}
const PostCard: React.FC<IPostCardProps> = ({ setCreatePostScreen }) => {
    return (
        <>
            <div className="w-full min-h-[50px] bg-white mt-4 rounded-lg pt-8 p-4 shadow-lg">
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Activity</h1>
                        <p className="text-blue-500">959 Followers</p>
                    </div>
                    <div className="flex">
                        <button onClick={() => setCreatePostScreen(true)} className=" rounded-full px-2 py-1 shadow-lg border-4 text-blue-600">Create a post</button>
                        <MdModeEdit className="text-2xl m-3" />
                    </div>
                </div>
                <MenuTabs />
                <Divider className="my-4" />
                <PostListItem like={100} />
                <Divider className="my-4" />
                <PostListItem like={407} />
                <Divider className="my-4" />
                <PostListItem like={47} />
                <Divider className="my-4" />
                <div id="postListFooter" className=" flex justify-center w-full">
                    <p>Show all Posts </p>
                    <FaArrowRightLong className="text-xl m-1 ms-2" />
                </div>
            </div>
        </>
    )
}

export default PostCard
