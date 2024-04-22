
import React, { useEffect, useState } from "react";
import { getProfile } from "../../Api/user";
import ProfileCard from "Components/User/Profile/ProfileCard";
import AboutCard from "Components/User/Profile/AboutCard";
import PostCard from "Components/User/Profile/PostCard";
import SkillCard from "Components/User/Profile/SkillCard";
import FriendSuggession from "Components/User/Profile/FriendSuggession";
import AboutScreen from "Components/User/Profile/AboutScreen";
import { useDispatch } from "react-redux";
import { changeAbout } from "app/slice/AuthSlice";
import PhotoScreen from "Components/User/Profile/PhotoScreen";
import { IoMdClose } from "react-icons/io";
import { Button, Textarea, Tooltip } from "@nextui-org/react";
import { GoFileMedia } from "react-icons/go";
import { FaRegSmile } from "react-icons/fa";
import CreatePostScreen from "Components/User/Profile/CreatePostScreen";

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
    const [createPostScreen, setCreatePostScreen] = useState(false);
    const [aboutScreen, setAboutScreen] = useState(false);
    const [pic, setPic] = useState('');


    const dispatch = useDispatch()

    // const { user } = useAppSelector((state) => state.auth)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProfile();
                console.log(response); console.log('this is the response....');
                if (response) {
                    setUserProfile(response.data);
                    setPic(response.data?.profile_picture); console.log(pic); console.log('this is first updated pic in profile page');
                }
                dispatch(changeAbout(userProfile?.aboutInfo));
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
                    <ProfileCard data={userProfile} pic={pic} setAddProfilescreen={setAddProfilescreen} />
                    <AboutCard setAboutScreen={setAboutScreen} userProfile={userProfile} />
                    <PostCard setCreatePostScreen={setCreatePostScreen} />
                    <SkillCard />
                </div>
                <div className="sm:col-span-3 min-h-[100px] rounded-lg">
                    <FriendSuggession />
                </div>
                {addProfilescreen && <PhotoScreen setAddProfilescreen={setAddProfilescreen} pic={pic} setPic={setPic} userProfile={userProfile} />}
                {aboutScreen && <AboutScreen setAboutScreen={setAboutScreen} userProfile={userProfile} />}
                {createPostScreen && <CreatePostScreen setCreatePostScreen={setCreatePostScreen} />}

            </div>
        </>
    );
}

export default ProfilePage