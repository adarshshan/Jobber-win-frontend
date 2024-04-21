
import React, { useEffect, useState } from "react";
import { getProfile } from "../../Api/user";
import ProfileCard from "Components/User/Profile/ProfileCard";
import AboutCard from "Components/User/Profile/AboutCard";
import PostCard from "Components/User/Profile/PostCard";
import SkillCard from "Components/User/Profile/SkillCard";
import FriendSuggession from "Components/User/Profile/FriendSuggession";
import { IoMdClose } from "react-icons/io";
import { IoCameraSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Textarea } from "@nextui-org/react";
import { Button } from "../../@/components/ui/button";
import AboutScreen from "Components/User/Profile/AboutScreen";

export interface UserData {
    _id: string;
    name: string;
    email: string;
    isBlocked: boolean;
    aboutInfo: string;
    role: string;
    cover_image: string;
    profile_picture: string;
}

const ProfilePage: React.FC = () => {
    const [userProfile, setUserProfile] = useState<UserData | null>(null);
    const [addProfilescreen, setAddProfilescreen] = useState(false);
    const [aboutScreen, setAboutScreen] = useState(false);

    // const { user } = useAppSelector((state) => state.auth)

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

    return (
        <>
            <div className="grid gap-5 sm:grid-cols-12 py-5 container">
                <div className="sm:col-span-9 min-h-[100px] rounded-lg">
                    <ProfileCard data={userProfile} setAddProfilescreen={setAddProfilescreen} />
                    <AboutCard setAboutScreen={setAboutScreen} />
                    <PostCard />
                    <SkillCard />
                </div>
                <div className="sm:col-span-3 min-h-[100px] rounded-lg">
                    <FriendSuggession />
                </div>
                {addProfilescreen && <div className="w-[700px] h-[500px] bg-gray-900 shadow-2xl rounded-2xl absolute top-[100px] left-[300px] text-white">
                    <div className="flex justify-between m-5 text-2xl">
                        <h1>Profile Photo</h1>
                        <IoMdClose onClick={() => setAddProfilescreen(false)} />
                    </div>
                    <div className="flex justify-center">
                        <img className="rounded-full w-[280px] h-[280px]" src="https://image.europafm.com/clipping/cmsimages01/2022/07/19/8AC3EBBD-873A-4532-8F0D-68C945D6BAB6/emilia-clarke-actriz-britanica-35-anos_98.jpg?crop=3355,1888,x0,y19&width=1900&height=1069&optimize=low&format=webply" alt="" />
                    </div>
                    <hr className="mt-9" />
                    <div className="flex justify-around text-xl mt-3">
                        <div className="text-center">
                            <IoCameraSharp className="text-4xl ms-4" />
                            <h1>Add Photo</h1>
                        </div>
                        <div className="text-center">
                            <MdDelete className="text-4xl ms-2" />
                            <h1>Delete</h1>
                        </div>
                    </div>
                </div>}
                {
                    aboutScreen && <AboutScreen setAboutScreen={setAboutScreen} userProfile={userProfile}  />
                }

            </div>
        </>
    );
};

export default ProfilePage