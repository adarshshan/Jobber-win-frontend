
import React, { useEffect, useState } from "react";
import { getUserPosts, getUserProfile } from "../../Api/user";
import FriendSuggession from "Components/User/Profile/FriendSuggession";
import { Divider, Image, Tab, Tabs } from "@nextui-org/react";
import MenuTabs from "Components/User/Profile/MenuTabs";
import { AiOutlineLike } from "react-icons/ai";
import { FaArrowRightLong } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { IPostInterface } from "Components/User/Home/MiddleSide";
import { truncateDescription } from "Components/User/Profile/PostListItem";

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
    skills: string[];
}

const ViewUserProfile: React.FC = () => {
    const [userProfile, setUserProfile] = useState<UserData | null>(null);
    const [userPosts, setUserPosts] = useState<IPostInterface[]>();

    const { userId } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userId) {
                    const response = await getUserProfile(userId); console.log(response);
                    setUserProfile(response?.data.data);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        const getPosts = async () => {
            try {
                if (userId) {
                    const res = await getUserPosts(userId);
                    setUserPosts(res?.data.data);
                }
            } catch (error) {
                console.log(error as Error);
            }
        }
        fetchData();
        getPosts();
    }, [])
    console.log(userProfile);
    console.log(userPosts);

    return (
        <>
            <div className="grid gap-5 sm:grid-cols-12 py-5 container">
                <div className="sm:col-span-9 min-h-[100px] rounded-lg">
                    <div id="profileCard" className='shadow-lg bg-white rounded-lg'>
                        <div className="w-full min-h-[50px] relative">
                            <Image
                                className="w-[7000px] h-[120px] sm:h-[180px] rounded-lg z-0"
                                alt="NextUI hero Image"
                                src={'https://images.template.net/wp-content/uploads/2014/11/Natural-Facebook-Cover-Photo.jpg'}
                            />
                            {/* <img onClick={() => setAddProfilescreen(true)} className="absolute top-[100px] left-16 b-10 rounded-full w-[150px] h-[150px]" src={pic} alt="Pic will be loaded" /> */}
                            <Image
                                width={150}
                                height={150}
                                className="absolute top-[-80px] left-10 b-10 rounded-full"
                                alt="NextUI hero Image"
                                src={userProfile?.profile_picture}
                            />
                        </div>
                        <div className="min-h-[250px] rounded-lg pb-5">
                            <div className="flex justify-between me-5 w-full">
                                <div className="mt-5 pt-16 ms-5">
                                    <h1 className="text-2xl">{userProfile?.name}</h1>
                                    <p className="text-xl">{userProfile?.headLine}</p>
                                    <p className="mt-2">{userProfile?.location}, Kerala, India  <span className="text-blue-300 font-semibold">contact info</span></p>
                                    <p className="text-blue-300">500+ Connections</p>
                                </div>
                            </div>

                            <Tabs className="ms-5 mt-3 gap-3" color={"secondary"} aria-label="Tabs colors" radius="full">
                                <Tab className="shadow-md" key="open" title="Connect" />
                                <Tab className="shadow-md" key="to" title="Message" />
                                <Tab className="shadow-md" key="work" title="more" />
                            </Tabs>
                        </div>
                    </div>
                    {/* end of profile card */}
                    <div className="w-full min-h-[50px] bg-white mt-4 rounded-lg pt-8 p-4 shadow-lg">
                        <div className="flex justify-between">
                            <h1 className="text-xl font-semibold ms-5">About</h1>
                        </div>
                        <div className="text-center sm:text-left mt-3">
                            <p>{userProfile?.aboutInfo}</p>
                        </div>
                    </div>
                    {/* end of About card */}
                    <div className="w-full min-h-[50px] bg-white mt-4 rounded-lg pt-8 p-4 shadow-lg">
                        <div className="flex justify-between">
                            <div>
                                <h1 className="text-2xl font-semibold">Activity</h1>
                                <p className="text-blue-500">959 Followers</p>
                            </div>
                        </div>
                        <MenuTabs />
                        <Divider className="my-4" />
                        {userPosts?.length && userPosts.map((item, index) => {
                            return (
                                <div id="postlist">
                                    <div className="flex py-2 min-h-[100px]">
                                        <div className="w-2/12 min-h-3">
                                            <img className="w-[90px] h-[90px] ms-4" src={item.imageUrl} alt="///PostImage" />
                                        </div>
                                        <div className="w-10/12 min-h-3 ps-3">
                                            {truncateDescription(item.caption,40)}
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="flex ms-2">
                                            <AiOutlineLike className="text-xl text-blue-400" /><p>{100}</p>
                                        </div>
                                        <p className="me-2">1 comment</p>
                                    </div>
                                </div>
                            )
                        })}

                        <Divider className="my-4" />
                        <div id="postListFooter" className=" flex justify-center w-full">
                            <p>Show all Posts </p>
                            <FaArrowRightLong className="text-xl m-1 ms-2" />
                        </div>
                    </div>
                    {/* end of Post card */}
                    <div className="w-full min-h-[50px] bg-white mt-4 rounded-lg pt-8 p-4 shadow-lg">
                        <div className="flex justify-between text-2xl mx-2">
                            <h1 className="font-semibold">Skills</h1>
                        </div>
                        <div className="text-lg font-semibold">
                            {userProfile?.skills.length && userProfile.skills.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <Divider className="my-4" />
                                        <div className="flex justify-between mx-5">
                                            <h1 >{item}</h1>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <Divider className="my-4" />
                        <h1>Show all Skills</h1>
                        <FaArrowRightLong className="text-xl m-1 ms-2" />
                    </div>
                    {/* end of skill card */}
                </div>
                <div className="sm:col-span-3 min-h-[100px] rounded-lg">
                    <FriendSuggession />
                </div>

            </div>
        </>
    );
}

export default ViewUserProfile