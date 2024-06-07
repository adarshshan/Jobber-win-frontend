import React, { useEffect, useState } from 'react'
import MiddleCreatePost from './MiddleCreatePost'
import InfiniteScroll from 'react-infinite-scroll-component'
import PostComponent from './PostComponent'
import { getAllHomePosts } from 'Api/user'
import { UserData } from '@/components/user/ProfilePage'

import io from 'socket.io-client'
import { ChatState } from 'Context/ChatProvider'
import toast from 'react-hot-toast'

const ENDPOINT = process.env.REACT_APP_B_URI;
export var socket: any, selectedChatCompare: any;


interface IMiddleSideProps {
    userProfile: UserData | null;
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

const MiddleSide: React.FC<IMiddleSideProps> = ({ userProfile }) => {
    const [dataSource, setDataSource] = useState<IPostInterface[]>();
    const [socketConnected, setSocketConnected] = useState(false);

    const { userr } = ChatState()

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
    useEffect(() => {
        if (ENDPOINT) {
            socket = io(ENDPOINT)
            socket.emit("setup", userr);
            socket.on("connected", () => setSocketConnected(true));
        }
    }, [])
    useEffect(() => {
        socket.on("receivedNotifications", (notification: any) => {
            toast.success('notification received...');
            console.log(notification);
        })
    })

    return (
        <>
            <div className="md:col-span-6 shadow-lg min-h-[100px] rounded-lg bg-transparent px-3">
                <MiddleCreatePost userProfile={userProfile} />
                <InfiniteScroll
                    dataLength={dataSource?.length ?? 0}
                    next={() => console.log('fetching data...')}
                    hasMore={true}
                    loader={<h1>Loading...</h1>}
                >
                    {dataSource?.map((item, index) => {
                        return (
                            <PostComponent key={index} item={item} userProfile={userProfile} />
                        )
                    })}
                </InfiniteScroll>

            </div>
        </>
    )
}

export default MiddleSide