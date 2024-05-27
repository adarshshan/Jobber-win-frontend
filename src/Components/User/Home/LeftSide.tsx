import React from 'react'
import ProfileCard from './ProfileCard'
import { UserData } from '@/components/user/ProfilePage';

interface ILeftSideProps {
    userProfile: UserData | null;
}
const LeftSide: React.FC<ILeftSideProps> = ({ userProfile }) => {

    return (
        <>
            <div className="md:col-span-3 text-lg min-h-[100px] bg-transparent rounded-lg">
                <ProfileCard userProfile={userProfile} />
            </div>
        </>
    )
}

export default LeftSide
