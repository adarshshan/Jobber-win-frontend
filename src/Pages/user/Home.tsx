import React, { useEffect, useState } from 'react'
import LeftSide from 'Components/User/Home/LeftSide';
import MiddleSide from 'Components/User/Home/MiddleSide';
import FriendSuggession from 'Components/User/Profile/FriendSuggession';
import { getProfile } from 'Api/user';
import { UserData } from './ProfilePage';
import { BiUpArrowCircle } from 'react-icons/bi';
interface ITestProps {

}
const Home: React.FC<ITestProps> = () => {
    const [userProfile, setUserProfile] = useState<UserData | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProfile();
                if (response) setUserProfile(response.data);

            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchData();
    }, [])
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <BiUpArrowCircle onClick={scrollToTop} className="fixed bottom-20 sm:bottom-10 right-4 sm:right-14 text-5xl text-gray-300 hover:text-black" />
            <div className=" bg-blue-50">
                <section className='grid md:grid-cols-12 gap-3 sm:gap-5 sm:container min-h-[150px] py-5'>
                    <LeftSide userProfile={userProfile} />
                    <MiddleSide userProfile={userProfile} />

                    <div className="md:col-span-3 shadow-lg bg-transparent min-h-[100px] rounded-lg mb-16">
                        <FriendSuggession />
                    </div>
                </section>
            </div>
        </>


    )
}

export default Home
