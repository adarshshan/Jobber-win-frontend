import { Button, Divider, User } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import SingleUser from './SingleUser'
import { UserData } from '@/components/user/ProfilePage';
import { getAllUsers } from 'Api/user';
import { Link } from 'react-router-dom';

interface IFriendSuggessionProps {

}
const FriendSuggession: React.FC<IFriendSuggessionProps> = () => {

    const [users, setUsers] = useState<UserData[] | undefined>();
    useEffect(() => {
        const fetchData = async () => {
            const res = await getAllUsers();
            if (res?.data.success) {
                setUsers(res.data.data)
            }
        }
        fetchData();
    }, [])
    return (
        <>
            <div id="friendsuggession" className="bg-white w-full pt-8 px-8 pb-3 rounded-lg shadow-xl text-lg">
                <h1 className="text-lg font-semibold">People you may know</h1>
                {users?.slice(0, 4).map((item, index) => {
                    return (
                        <div key={index + Math.random()}>
                            <Divider className="my-4" />
                            <SingleUser id={item._id} name={item.name} description={item.headLine} imageUrl={item.profile_picture} />
                        </div>
                    )
                })}
                <div className="flex justify-center text-xl font-bold text-gray-400">
                    <Link to='/user/my-network'><p>Show More</p></Link>
                </div>
            </div>
        </>
    )
}

export default FriendSuggession
