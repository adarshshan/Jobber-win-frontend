
import React, { useEffect, useState } from "react";
import { getProfile } from "../../Api/user";
import ProfileCard from "Components/User/Profile/ProfileCard";
import AboutCard from "Components/User/Profile/AboutCard";
import PostCard from "Components/User/Profile/PostCard";
import SkillCard from "Components/User/Profile/SkillCard";
import FriendSuggession from "Components/User/Profile/FriendSuggession";
import { useDispatch } from "react-redux";
import { changeAbout } from "app/slice/AuthSlice";
import PhotoScreen from "Components/User/Profile/PhotoScreen";

export interface UserData {
    _id: string;
    name: string;
    email: string;
    isBlocked: boolean;
    aboutInfo: string;
    headLine: string;
    location: string;
    role: string;
    cover_image: string;
    profile_picture: string;
}

const ProfilePage: React.FC = () => {
    const [userProfile, setUserProfile] = useState<UserData | null>(null);
    const [addProfilescreen, setAddProfilescreen] = useState(false);
    const [createPostScreen, setCreatePostScreen] = useState(false);
    const [aboutScreen, setAboutScreen] = useState(false);
    const [skillAdd, setSkillAdd] = useState(false);
    const [updateScreen, setUpdateScreen] = useState(false);
    const [pic, setPic] = useState<string>("https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg");




    const dispatch = useDispatch()


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProfile();
                if (response) {
                    setUserProfile(response.data);
                    setPic(response.data?.profile_picture);
                }
                dispatch(changeAbout(userProfile?.aboutInfo));
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchData();
    }, [updateScreen])


    return (
        <>
            <div className="grid gap-5 sm:grid-cols-12 py-5 sm:container">
                <div className="sm:col-span-9 min-h-[100px] rounded-lg">
                    <ProfileCard data={userProfile} pic={pic} setAddProfilescreen={setAddProfilescreen} setUpdateScreen={setUpdateScreen} updateScreen={updateScreen} />
                    <AboutCard setAboutScreen={setAboutScreen} userProfile={userProfile} aboutScreen={aboutScreen} />
                    <PostCard setCreatePostScreen={setCreatePostScreen} createPostScreen={createPostScreen} userId={userProfile?._id} />
                    <SkillCard setSkillAdd={setSkillAdd} skillAdd={skillAdd} userId={userProfile?._id}   />
                </div>
                <div className="sm:col-span-3 min-h-[100px] rounded-lg">
                    <FriendSuggession />
                </div>
                {addProfilescreen && <PhotoScreen setAddProfilescreen={setAddProfilescreen} pic={pic} setPic={setPic} userProfile={userProfile} />}

            </div>
        </>
    );
}

export default ProfilePage