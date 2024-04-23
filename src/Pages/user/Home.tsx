import React, { useEffect, useState } from 'react'
import LeftSide from 'Components/User/Home/LeftSide';
import MiddleSide from 'Components/User/Home/MiddleSide';
import FriendSuggession from 'Components/User/Profile/FriendSuggession';
import { getProfile } from 'Api/user';
import { UserData } from './ProfilePage';
interface ITestProps {

}
const Home: React.FC<ITestProps> = () => {
    const [userProfile, setUserProfile] = useState<UserData | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProfile();
                if (response) {
                    setUserProfile(response.data);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchData();
    }, [])

    return (
        <div className="container">
            <section className='grid sm:grid-cols-12 gap-5 min-h-[150px] py-5 bg-transparent'>
                <LeftSide userProfile={userProfile} />
                <MiddleSide userProfile={userProfile} />

                <div className="sm:col-span-3 shadow-lg bg-transparent min-h-[100px] rounded-lg">
                    <FriendSuggession />
                </div>
            </section>

        </div>

    )
}

export default Home
