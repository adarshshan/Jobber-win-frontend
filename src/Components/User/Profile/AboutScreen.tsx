import { UserData } from '@/components/user/ProfilePage';
import { Button } from '../../../@/components/ui/button'
import { Textarea } from '@nextui-org/react'
import React from 'react'
import { IoMdClose } from 'react-icons/io'

interface IAboutScreenProps {
    setAboutScreen: React.Dispatch<React.SetStateAction<boolean>>;
    userProfile: React.Dispatch<React.SetStateAction<UserData>> | null;
}
const AboutScreen: React.FC<IAboutScreenProps> = ({ setAboutScreen, userProfile }) => {
    return (
        <>
            <div className="w-[700px] h-[500px] bg-gray-900 shadow-2xl rounded-2xl fixed top-[100px] left-[300px] text-white">
                <div className="flex justify-between m-4 text-xl">
                    <h1>Edit About</h1>
                    <IoMdClose onClick={() => setAboutScreen(false)} className="text-4xl" />
                </div>
                <div className="m-4 p-3">
                    <p>You can write about your years of experience, industry, or skills. People also talk about their achievements or previous job experiences.</p>
                    <Textarea
                        variant={"faded"}
                        label="Description"
                        labelPlacement="outside"
                        placeholder={userProfile?.aboutInfo}
                        className="col-span-12 md:col-span-6 mb-6 md:mb-0 border border-white mt-5 h-60"
                    />
                </div>
                <div className="flex justify-end p-5">
                    <Button variant="secondary">Save</Button>
                </div>
            </div>
        </>
    )
}

export default AboutScreen
