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
        // Show the button when scrolling down
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scrolling
        });
    };

    return (
        <>
            <BiUpArrowCircle onClick={scrollToTop} className="fixed bottom-10 right-14 text-5xl" />
            <div className="container">
                <section className='grid sm:grid-cols-12 gap-5 min-h-[150px] py-5 bg-transparent'>
                    <LeftSide userProfile={userProfile} />
                    <MiddleSide userProfile={userProfile} />

                    <div className="sm:col-span-3 shadow-lg bg-transparent min-h-[100px] rounded-lg">
                        <FriendSuggession />
                    </div>
                </section>

            </div>
        </>


    )
}

export default Home
