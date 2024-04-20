import { Image, Tab, Tabs } from '@nextui-org/react'
import React from 'react'

interface IProfileCardProps {

}
const ProfileCard: React.FC<IProfileCardProps> = (props) => {
    return (
        <>
            <div id="profileCard" className='shadow-lg rounded-lg'>
                <div className="w-full min-h-[50px] relative">
                    <Image
                        className="w-[7000px] h-auto rounded-lg z-0"
                        alt="NextUI hero Image"
                        src="https://media.licdn.com/dms/image/D5616AQHnodou7Uu9CA/profile-displaybackgroundimage-shrink_350_1400/0/1699113016195?e=1718841600&v=beta&t=BdMRtWVftRhW0Aqtn6YmugZm3fN-sFwZTogjQGorIh8"
                    />
                    <Image
                        width={150}
                        className="absolute top-[-80px] left-10 b-10 rounded-full"
                        alt="NextUI hero Image"
                        src="https://i0.wp.com/digital-photography-school.com/wp-content/uploads/2013/07/bs-01.jpg?resize=600%2C600&ssl=1"
                    />
                </div>
                <div className="min-h-[250px] rounded-lg">
                    <div className="mt-5 pt-16 ms-5">
                        <h1 className="text-2xl">Adarsh C</h1>
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
