
import { addToFriend, getAllFriends, getAllRequests, getAllUsers } from 'Api/user';
import ProfileCard from 'Components/User/Home/ProfileCard';
import ContactCard from 'Components/User/Mynetwork/ContactCard';
import LeftSideBar from 'Components/User/Mynetwork/LeftSideBar';
import React, { useEffect, useState } from 'react'
import { UserData } from './ProfilePage';
import { FaCheck } from 'react-icons/fa6';
import { IoMdCloseCircleOutline } from 'react-icons/io';


interface IMyNetworkPageProps {

}
interface IReceivedRequestInterface {
    _id: string;
    name: string;
    profile_picture: string;
    headLine: string;
}
const MyNetworkPage: React.FC<IMyNetworkPageProps> = () => {
    const [users, setUsers] = useState<UserData[] | undefined>();
    const [receivedReq, setReceivedReq] = useState<IReceivedRequestInterface[]>();
    const [confirmFriend, setConfirmFriend] = useState(false);
    const [friendList, setFriendList] = useState<string[]>()

    useEffect(() => {
        const fetchData = async () => {
            const res = await getAllUsers();
            if (res?.data.success) {
                setUsers(res.data.data)
            }
        }
        fetchData();
    }, [])
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const result = await getAllRequests();
                // console.log(result?.data.data);
                setReceivedReq(result?.data.data)
            } catch (error) {
                console.log(error as Error);
            }
        }
        const fetchFriends = async () => {
            try {
                const res = await getAllFriends();
                // console.log(res?.data.data);
                setFriendList(res?.data.data);
            } catch (error) {
                console.log(error as Error);
            }
        }
        fetchRequests();
        fetchFriends();
    }, [confirmFriend]);

    const handleAddFriend = async (id: string) => {
        try {
            const res = await addToFriend(id);
            if (res?.data.success) setConfirmFriend(true);
        } catch (error) {
            console.log(error as Error);
        }
    }
    console.log(friendList);
    return (
        <>
            <div className="container  p-3 bg-slate-200">
                <div className="grid sm:grid-cols-12 gap-4">
                    <LeftSideBar toatalFriends={friendList?.length ? friendList.length : 0} />
                    <div className="sm:col-span-9 min-h-[100px]  shadow-xl rounded-lg">
                        <div className="w-full bg-white shadow-lg min-h-[50px] rounded-lg p-4">
                            {receivedReq?.length && receivedReq?.length ? receivedReq.map((item, index) => {
                                return (
                                    <div key={index + Math.random()} className="flex justify-between py-3 p-4 shadow-md">
                                        <div className="flex p-2 gap-8">
                                            <img className='rounded-full w-10 h-10' src={item.profile_picture} alt="profile picture" />
                                            <div>
                                                <p className='text-lg'>{item.name}</p>
                                                <p className='text-sm'>{item.headLine}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 text-2xl p-2">
                                            <IoMdCloseCircleOutline className='mt-3 hover:text-red-600' />
                                            <FaCheck onClick={() => handleAddFriend(item._id)} className='mt-3 hover:text-green-400' />
                                        </div>
                                    </div>
                                )
                            }) : <h1>No pending requests</h1>}
                        </div>
                        <div className="w-full bg-white shadow-lg min-h-[50px] rounded-lg p-4 mt-4">
                            <h1 className='text-lg font-semibold ms-3'>People you may know</h1>
                            <div className="flex flex-wrap w-full">
                                {
                                    users && users.map((item, index) => {
                                        return (
                                            <div key={index} className='w-full sm:w-1/2 md:w-1/3 p-4'>
                                                <ContactCard item={item} />
                                            </div>
                                        )
                                    })
                                }
                                {!users?.length && <h1 className='text-xl font-semibold'>No suggessions...</h1>}
                            </div>

                        </div>
                        <div className="w-full bg-white shadow-lg min-h-[50px] rounded-lg p-4 mt-4">

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default MyNetworkPage
