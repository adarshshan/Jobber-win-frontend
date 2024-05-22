
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
import CreatePostScreen from "Components/User/Profile/CreatePostScreen";
import AddSkillScreen from "Components/User/Profile/AddSkillScreen";
import UpdateScreen from "Components/User/Profile/UpdateScreen";

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
            <div className="grid gap-5 sm:grid-cols-12 py-5 container">
                <div className="sm:col-span-9 min-h-[100px] rounded-lg">
                    <ProfileCard data={userProfile} pic={pic} setAddProfilescreen={setAddProfilescreen} setUpdateScreen={setUpdateScreen} />
                    <AboutCard setAboutScreen={setAboutScreen} userProfile={userProfile} />
                    <PostCard setCreatePostScreen={setCreatePostScreen} userId={userProfile?._id} />
                    <SkillCard setSkillAdd={setSkillAdd} userId={userProfile?._id} />
                </div>
                <div className="sm:col-span-3 min-h-[100px] rounded-lg">
                    <FriendSuggession />
                </div>
                {addProfilescreen && <PhotoScreen setAddProfilescreen={setAddProfilescreen} pic={pic} setPic={setPic} userProfile={userProfile} />}
                {aboutScreen && <AboutScreen setAboutScreen={setAboutScreen} userProfile={userProfile} />}
                {createPostScreen && <CreatePostScreen setCreatePostScreen={setCreatePostScreen} />}
                {skillAdd && <AddSkillScreen setSkillAdd={setSkillAdd} userId={userProfile?._id} />}
                {updateScreen && <UpdateScreen setUpdateScreen={setUpdateScreen} userId={userProfile?._id} />}

            </div>
        </>
    );
}

export default ProfilePage