import React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { MdVideoCall } from 'react-icons/md'

interface IChatSectionHeaderProps {

}
const ChatSectionHeader: React.FC<IChatSectionHeaderProps> = () => {
    return (
        <>
            <div className="w-full flex justify-between p-2 bg-blue-200">
                <div className="flex justify-start gap-4">
                    <img className='w-14 h-14 rounded-full' src="http://res.cloudinary.com/dnn1ree80/image/upload/v1713962983/ypkk1scqoxgubcfgpymk.jpg" alt="" />
                    <div>
                        <h3 className='text-xl'>Adarsh C</h3>
                        <p>typing...</p>
                    </div>
                </div>
                <div className="flex justify-end gap-3 text-4xl p-2">
                    <MdVideoCall />
                    <BsThreeDots />
                </div>
            </div>
        </>
    )
}

export default ChatSectionHeader
