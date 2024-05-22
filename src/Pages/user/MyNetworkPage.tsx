
import { addToFriend, getAllFriends, getAllRequests, getAllUsers, getSendRequests, removeRequest, unFriend } from 'Api/user';
import ContactCard from 'Components/User/Mynetwork/ContactCard';
import LeftSideBar from 'Components/User/Mynetwork/LeftSideBar';
import React, { useEffect, useState } from 'react'
import { UserData } from './ProfilePage';
import { FaCheck } from 'react-icons/fa6';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import toast from 'react-hot-toast';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../../@/components/ui/alert-dialog"
import { useAppSelector } from 'app/store';
import { setSearchText } from 'app/slice/CommonSlice';
import { useDispatch } from 'react-redux';


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
    const [friendList, setFriendList] = useState<UserData[]>()
    const [showFriendsScreen, setShowFriendScreen] = useState(false);
    const [sendReq, setSendReq] = useState<string[]>();

    const { search } = useAppSelector((state) => state.common)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setSearchText(''))
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const res = await getAllUsers(search);
            if (res?.data.success) {
                setUsers(res.data.data)
            }
        }
        fetchData();
    }, [confirmFriend, search])

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const result = await getAllRequests();
                setReceivedReq(result?.data.data)
            } catch (error) {
                console.log(error as Error);
            }
        }
        const fetchFriends = async () => {
            try {
                const res = await getAllFriends();
                if (res?.data) {
                    setFriendList(res?.data.data);
                }

            } catch (error) {
                console.log(error as Error);
            }
        }
        fetchRequests();
        fetchFriends();
    }, [confirmFriend]);

    useEffect(() => {
        const fetchSentRequest = async () => {
            try {
                const res = await getSendRequests();
                if (res?.data.success) {
                    setSendReq(res.data.data);
                }
            } catch (error) {
                console.log(error as Error);
            }
        }
        fetchSentRequest()
    }, [confirmFriend])

    const handleAddFriend = async (id: string) => {
        try {
            const res = await addToFriend(id);
            if (res?.data.success) setConfirmFriend(!confirmFriend);
        } catch (error) {
            console.log(error as Error);
        }
    }

    const handleUnfriend = async (id: string) => {
        try {
            const res = await unFriend(id);
            if (res?.data.success) setConfirmFriend(!confirmFriend);
        } catch (error) {
            console.log(error as Error);
        }
    }
    
    const handleRemoveRequest = async (id: string) => {
        try {
            const res = await removeRequest(id);
            if (res?.data.success) {
                setConfirmFriend(!confirmFriend);
                toast.success(res.data.message);
            } else toast.error(res?.data.message);
        } catch (error) {
            console.log(error as Error);
        }
    }

    return (
        <>
            <div className="container  p-3 bg-slate-200">
                <div className="grid sm:grid-cols-12 gap-4">
                    <LeftSideBar setShowFriendScreen={setShowFriendScreen} toatalFriends={friendList?.length ? friendList.length : 0} />
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
                                            <IoMdCloseCircleOutline onClick={() => handleRemoveRequest(item._id)} className='mt-3 hover:text-red-600' />
                                            <FaCheck onClick={() => handleAddFriend(item._id)} className='mt-3 hover:text-green-400' />
                                        </div>
                                    </div>
                                )
                            }) : <h1>No pending requests</h1>}
                        </div>
                        {!showFriendsScreen && <div className="w-full bg-white shadow-lg min-h-[50px] rounded-lg p-4 mt-4">
                            <h1 className='text-lg font-semibold ms-3'>People you may know</h1>
                            <div className="flex flex-wrap w-full">
                                {
                                    users && users.map((item, index) => {
                                        return (
                                            <div key={index} className='w-full sm:w-1/2 md:w-1/3 p-4'>
                                                <ContactCard confirmFriend={confirmFriend} setConfirmFriend={setConfirmFriend} sendReq={sendReq} item={item} />
                                            </div>
                                        )
                                    })
                                }
                                {!users?.length && <h1 className='text-xl font-semibold'>No suggessions...</h1>}
                            </div>
                        </div>}
                        {showFriendsScreen && friendList?.length && friendList.map((item, index) => {
                            return (
                                <div key={index + Math.random()} className="w-full bg-white shadow-lg min-h-[50px] rounded-lg p-4 mt-4">
                                    <div className="flex justify-between m-2 p-2 shadow-lg min-[100px]:">
                                        <div className="flex justify-start gap-3">
                                            <img className='w-16 h-16 rounded-full' src={item.profile_picture} alt="profile pic" />
                                            <div>
                                                <h1>{item.name}</h1>
                                                <small>{item.headLine}</small>
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-3">
                                            <button className='font-semibold text-blue-400 mb-4'>Message</button>
                                            <AlertDialog>
                                                <AlertDialogTrigger><button className='font-semibold text-blue-400 mb-4'>Unfriend</button></AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Do you want to unfriend?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This will remove the user from your friend list
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction><p onClick={() => handleUnfriend(item._id)}>yes</p></AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                        <div className="w-full bg-white shadow-lg min-h-[50px] rounded-lg p-4 mt-4">

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default MyNetworkPage
