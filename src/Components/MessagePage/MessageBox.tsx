import React from 'react'
import ChatSectionFooter from './ChatSectionFooter'


interface IMessageBoxProps {

}
const MessageBox: React.FC<IMessageBoxProps> = () => {
    return (
        <>
            <div className="h-full relative">
                <div className="message-show-container ">
                    <div className="flex justify-start p-4">
                        <p className='bg-blue-300 rounded-md p-2'>Hellow</p>
                    </div>
                    <div className="flex justify-end p-4">
                        <p className='bg-blue-300 rounded-md p-2'>Hellow how are you ?</p>
                    </div>
                    <div className="flex justify-start p-4">
                        <p className='bg-blue-300 rounded-md p-2'>Iam Fine</p>
                    </div>
                    <div className="flex justify-end p-4">
                        <p className='bg-blue-300 rounded-md p-2'>What about your job ?</p>
                    </div>
                    <div className="flex justify-start p-4">
                        <p className='bg-blue-300 rounded-md p-2'>going with the flow.</p>
                    </div>
                    <div className="flex justify-end p-4">
                        <p className='bg-blue-300 rounded-md p-2'>oww</p>
                    </div>
                    <div className="flex justify-end p-4">
                        <p className='bg-blue-300 rounded-md p-2'>What about your job ?</p>
                    </div>
                    <div className="flex justify-start p-4">
                        <p className='bg-blue-300 rounded-md p-2'>going with the flow.</p>
                    </div>
                    <div className="flex justify-end p-4">
                        <p className='bg-blue-300 rounded-md p-2'>oww</p>
                    </div>
                </div>
                <ChatSectionFooter />
            </div>
        </>
    )
}

export default MessageBox
