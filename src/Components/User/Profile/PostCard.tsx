import React, { useEffect, useState } from 'react'
import { MdModeEdit } from 'react-icons/md'
import MenuTabs from './MenuTabs'
import { Divider } from '@nextui-org/react'
import PostListItem from './PostListItem'
import { FaArrowRightLong } from 'react-icons/fa6'
import { getAllPosts } from 'Api/user'

interface IPostCardProps {
    setCreatePostScreen: React.Dispatch<React.SetStateAction<boolean>>;
    userId: string | undefined;
}
export interface PostInterface extends Document {
    _id: string;
    userId?: string;
    caption?: string;
    imageUrl?: string;
    isDeleted: boolean;
    isPrivate: boolean;
    createdAt: Date;
    updatedAt: Date;
}
const PostCard: React.FC<IPostCardProps> = ({ setCreatePostScreen, userId }) => {
    const [posts, setPosts] = useState<PostInterface[]>();
    const [fetchAgain, setFetchAgain] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                if (userId) {
                    const result = await getAllPosts(userId);
                    if (result?.data.success) {
                        let posts = result.data.data.filter((item: PostInterface) => !item.isDeleted);
                        setPosts(posts);
                        // setPosts(result.data.data);
                    }
                }

            } catch (error) {
                console.log(error as Error);
            }
        }
        fetchPosts();
    }, [userId, fetchAgain])
    
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
                    </div>
                </div>
                <MenuTabs />
                {posts?.length ? (
                    posts.map((postItem) => {
                        return (
                            <div key={Math.random()}>
                                <Divider className="my-4" />
                                <PostListItem
                                    postItem={postItem}
                                    like={100}
                                    fetchAgain={fetchAgain}
                                    setFetchAgain={setFetchAgain} />
                            </div>
                        )
                    })
                ) : (
                    <div className="m-2">
                        <h1>You havn't posted anything yet</h1>
                    </div >
                )}
                <Divider className="my-4" />
                <div id="postListFooter" className=" flex justify-center w-full">
                    <p>Show all Posts </p>
                    <FaArrowRightLong className="text-xl m-1 ms-2" />
                </div>
            </div >
        </>
    )
}

export default PostCard
