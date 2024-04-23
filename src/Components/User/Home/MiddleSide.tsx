import React, { useEffect, useState } from 'react'
import MiddleCreatePost from './MiddleCreatePost'
import { Link, Spinner, User } from '@nextui-org/react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import InfiniteScroll from 'react-infinite-scroll-component'
import PostComponent from './PostComponent'
import { Skeleton } from '../../../@/components/ui/skeleton'
import { getAllHomePosts } from 'Api/user'

interface IMiddleSideProps {

}
interface UserInterfaces {
    _id: string;
    name: string;
    password: string;
    email: string;
    isBlocked: boolean;
    role: string;
    profile_picture: string;
    cover_image?: string;
    skills?: string[];
    savedJobs?: string[];
    appliedJobs?: string[];
    aboutInfo: string;
}

export interface IPostInterface {
    _id: string;
    userId: string;
    caption: string;
    imageUrl: string;
    isPrivate?: boolean;
    createdAt?: string;
    updatedAt?: string;
    result: UserInterfaces[];
}

const MiddleSide: React.FC<IMiddleSideProps> = () => {
    const [dataSource, setDataSource] = useState<IPostInterface[]>();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllHomePosts()
                setDataSource(result?.data.data);
            } catch (error) {
                console.log(error as Error);
            }
        }
        fetchData();
    }, [])
    console.log(dataSource);
    return (
        <>
            <div className="sm:col-span-6 shadow-lg min-h-[100px] rounded-lg bg-transparent">
                <MiddleCreatePost />
                <InfiniteScroll
                    dataLength={dataSource?.length ?? 0}
                    next={() => console.log('fetching data...')}
                    hasMore={true}
                    loader={<h1>Loading...</h1>}
                >
                    {dataSource?.map((item, index) => {
                        return (
                            <PostComponent key={index} item={item} />
                        )
                    })}
                </InfiniteScroll>

            </div>
        </>
    )
}

export default MiddleSide