
import React, { useEffect, useState } from "react";
import { getProfile } from "../../Api/user";
import ProfileCard from "Components/User/Profile/ProfileCard";
import AboutCard from "Components/User/Profile/AboutCard";
import PostCard from "Components/User/Profile/PostCard";
import SkillCard from "Components/User/Profile/SkillCard";
import { Divider, User } from "@nextui-org/react";
import FriendSuggession from "Components/User/Profile/FriendSuggession";

interface UserData {
    _id?: string;
    name?: string;
    email?: string;
    isBlocked?: boolean;
    role?: string;
    profile_picture: string;
}

const ProfilePage: React.FC = () => {
    const [userProfile, setUserProfile] = useState<UserData | null>(null);

    // const { user } = useAppSelector((state) => state.auth)

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('ehlloo');
                const response = await getProfile();
                if (response) setUserProfile(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchData();
    }, [])

    return (
        <>
            <div className="grid gap-5 sm:grid-cols-12 py-5 container">
                <div className="sm:col-span-9 min-h-[100px] rounded-lg">
                    <ProfileCard />
                    <AboutCard />
                    <PostCard />
                    <SkillCard />
                </div>
                <div className="sm:col-span-3 min-h-[100px] rounded-lg">
                    <FriendSuggession />
                </div>
            </div>
        </>
    );
};

export default ProfilePage