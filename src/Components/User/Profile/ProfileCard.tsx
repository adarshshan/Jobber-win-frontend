import { UserData } from '@/components/user/ProfilePage'
import { Image, Tab, Tabs } from '@nextui-org/react'
import React from 'react'
import { MdModeEdit } from 'react-icons/md';


interface IProfileCardProps {
    data: UserData | null;
    setAddProfilescreen: React.Dispatch<React.SetStateAction<boolean>>;
    pic: string;
    setUpdateScreen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ProfileCard: React.FC<IProfileCardProps> = ({ data, setAddProfilescreen, pic, setUpdateScreen }) => {


    return (
        <>
            <div id="profileCard" className='shadow-lg bg-white rounded-lg'>
                <div className="w-full min-h-[50px] relative">
                    <Image
                        className="w-[7000px] h-[120px] sm:h-[180px] rounded-lg z-0"
                        alt="NextUI hero Image"
                        src={data?.cover_image ? data.cover_image : 'https://images.template.net/wp-content/uploads/2014/11/Natural-Facebook-Cover-Photo.jpg'}
                    />
                    {/* <img onClick={() => setAddProfilescreen(true)} className="absolute top-[100px] left-16 b-10 rounded-full w-[150px] h-[150px]" src={pic} alt="Pic will be loaded" /> */}
                    <Image
                        width={150}
                        height={150}
                        onClick={() => setAddProfilescreen(true)}
                        className="absolute top-[-80px] left-10 b-10 rounded-full"
                        alt="NextUI hero Image"
                        src={data?.profile_picture.length ? data.profile_picture : "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"}
                    />
                </div>
                <div className="min-h-[250px] rounded-lg pb-5">
                    <div className="flex justify-between me-5 w-full">
                        <div className="mt-5 pt-16 ms-5">
                            <h1 className="text-2xl">{data?.name}</h1>
                            <p className="text-xl">{data?.headLine}</p>
                            <p className="text-xl">{data?.email}</p>
                            <p className="mt-2">{data?.location}, Kerala, India  <span className="text-blue-300 font-semibold">contact info</span></p>
                            <p className="text-blue-300">500+ Connections</p>
                        </div>
                        <MdModeEdit className='text-2xl me-5 mt-5' onClick={() => setUpdateScreen(true)} />
                    </div>

                    <Tabs className="ms-5 mt-3 gap-3" color={"secondary"} aria-label="Tabs colors" radius="full">
                        <Tab className="shadow-md" key="open" title="Open to" />
                        <Tab className="shadow-md" key="to" title="Add profile section" />
                        <Tab className="shadow-md" key="work" title="more" />
                    </Tabs>
                </div>
            </div>
        </>
    )
}

export default ProfileCard
