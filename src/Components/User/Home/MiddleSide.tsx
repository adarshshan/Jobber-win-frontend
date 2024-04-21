import React, { useState } from 'react'
import MiddleCreatePost from './MiddleCreatePost'
import { Link, Spinner, User } from '@nextui-org/react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import InfiniteScroll from 'react-infinite-scroll-component'
import PostComponent from './PostComponent'
import { Skeleton } from '../../../@/components/ui/skeleton'

interface IMiddleSideProps {

}
const MiddleSide: React.FC<IMiddleSideProps> = () => {
    const [dataSource, setDataSource] = useState(Array.from({ length: 5 }));
    return (
        <>
            <div className="sm:col-span-6 shadow-lg min-h-[100px] rounded-lg bg-transparent">
                <MiddleCreatePost />
                <InfiniteScroll
                    dataLength={dataSource.length}
                    next={() => console.log('fetching data...')}
                    hasMore={true}
                    loader={<h1>Loading...</h1>}
                >
                    {dataSource.map((item, index) => {
                        return (
                            <PostComponent />
                        )
                    })}
                </InfiniteScroll>

            </div>
        </>
    )
}

export default MiddleSide