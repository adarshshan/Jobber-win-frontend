
import { getAllUsers } from 'Api/user';
import ProfileCard from 'Components/User/Home/ProfileCard';
import ContactCard from 'Components/User/Mynetwork/ContactCard';
import LeftSideBar from 'Components/User/Mynetwork/LeftSideBar';
import React, { useEffect, useState } from 'react'
import { UserData } from './ProfilePage';


interface IMyNetworkPageProps {

}
const MyNetworkPage: React.FC<IMyNetworkPageProps> = () => {
    const [users, setUsers] = useState<UserData[]|undefined>();
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
            <div className="container  p-3 bg-slate-200">
                <div className="grid sm:grid-cols-12 gap-4">
                    <LeftSideBar />
                    <div className="sm:col-span-9 min-h-[100px]  shadow-xl rounded-lg">
                        <div className="w-full bg-white shadow-lg min-h-[50px] rounded-lg p-4">
                            <div className="flex justify-between py-3 text-xl font-semibold p-4">
                                <p>No pending inviations</p>
                                <p>Manage</p>
                            </div>
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
