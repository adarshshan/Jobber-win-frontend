import { UserData } from '@/components/user/ProfilePage'
import { Image, Tab, Tabs } from '@nextui-org/react'
import React from 'react'


interface IProfileCardProps {
    data: UserData | null;
}
const ProfileCard: React.FC<IProfileCardProps> = ({ data }) => {
    console.log(data); console.log('data from profile page');
    return (
        <>
            <div id="profileCard" className='shadow-lg bg-white rounded-lg'>
                <div className="w-full min-h-[50px] relative">
                    <Image
                        className="w-[7000px] h-[120px] sm:h-[180px] rounded-lg z-0"
                        alt="NextUI hero Image"
                        src={data?.cover_image ? data.cover_image : 'https://images.template.net/wp-content/uploads/2014/11/Natural-Facebook-Cover-Photo.jpg'}
                    />
                    <Image
                        width={150}
                        className="absolute top-[-80px] left-10 b-10 rounded-full"
                        alt="NextUI hero Image"
                        src={data?.profile_picture}
                    />
                </div>
                <div className="min-h-[250px] rounded-lg">
                    <div className="mt-5 pt-16 ms-5">
                        <h1 className="text-2xl">{data?.name}</h1>
                        <p className="text-xl">Mern Stack Developer</p>
                        <p className="mt-2">Malappuram, Kerala, India  <span className="text-blue-300 font-semibold">contact info</span></p>
                        <p className="text-blue-300">500+ Connections</p>
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
