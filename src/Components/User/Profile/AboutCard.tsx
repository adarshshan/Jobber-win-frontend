import { UserData } from '@/components/user/ProfilePage';
import { getProfile } from 'Api/user';
import { useAppSelector } from 'app/store';
import React, { useEffect, useState } from 'react'
import { CiEdit } from 'react-icons/ci'

interface IAboutCardProps {
    setAboutScreen: React.Dispatch<React.SetStateAction<boolean>>;
    userProfile: UserData | null
}
const AboutCard: React.FC<IAboutCardProps> = ({ setAboutScreen, userProfile }) => {
    const [data, setData] = useState<string>();
    const { about } = useAppSelector((state) => state.auth)
    useEffect(() => {
        const getP = async () => {
            const response = await getProfile();
            if (response) setData(response?.data.aboutInfo);
        }
        getP();
    }, [about, userProfile])
    return (
        <>
            <div className="w-full min-h-[50px] bg-white mt-4 rounded-lg pt-8 p-4 shadow-lg">
                <div className="flex justify-between">
                    <h1 className="text-xl font-semibold ms-5">About</h1>
                    <CiEdit onClick={() => setAboutScreen(true)} className="font-semibold text-2xl me-8" />
                </div>
                <div className="text-center sm:text-left mt-3">
                    <p>{data ? data : 'somthing have to be here....'}</p>
                </div>
            </div>
        </>
    )
}

export default AboutCard
