import React, { useState } from 'react'

interface IMessageBoxInterface {
    postId: string;
    setMessageHighlight: React.Dispatch<React.SetStateAction<boolean>>;
    inputHighlight:boolean;
}
const MessageBox: React.FC<IMessageBoxInterface> = ({ postId, setMessageHighlight,inputHighlight }) => {

    return (
        <>
            <div onClick={() => setMessageHighlight(!inputHighlight)} className="bg-yellow-50 w-full min-h-[250px] cursor-default">
                <Messages setMessageHighlight={setMessageHighlight} />
                <Messages setMessageHighlight={setMessageHighlight} />
                <Messages setMessageHighlight={setMessageHighlight} />
            </div>
        </>
    )
}

export default MessageBox

interface IMessageProps {
    setMessageHighlight: React.Dispatch<React.SetStateAction<boolean>>;
}
const Messages: React.FC<IMessageProps> = ({ setMessageHighlight }) => {
    const [showReplies, setShowReplies] = useState(false);
    return (
        <>
            <div className='mt-1 bg-gray-200  p-2'>
                <div className="flex justify-start gap-3">
                    <img className='rounded-full h-8 w-8' src='http://res.cloudinary.com/dnn1ree80/image/upload/v1714442263/covvt1badeauzrh8orwb.jpg' alt="" />
                    <div>
                        <div className="flex justify-start gap-3">
                            <h1 className='text-lg font-semibold'>shanu adarsh</h1>
                            <p className="font-normal mt-1">This is actually beautiful..</p>
                        </div>
                        <div className="flex gap-3 ms-10">
                            <p>10.30</p>
                            <p onClick={() => setMessageHighlight(true)}>reply</p>
                        </div>
                        <p onClick={() => setShowReplies(!showReplies)} className='font-thin'>{showReplies ? 'hide' : 'view'} replies(3)</p>
                    </div>
                </div>
                {showReplies && <Replies />}
            </div>
        </>
    )
}

interface IRepliesProps {

}
const Replies: React.FC<IRepliesProps> = () => {
    return (
        <>
            <div id="replies">
                <div className="ms-10 bg-blue-50 flex justify-start gap-4 mb-3">
                    <img className='rounded-full h-8 w-8' src='http://res.cloudinary.com/dnn1ree80/image/upload/v1714442263/covvt1badeauzrh8orwb.jpg' alt="" />
                    <h1 className='text-lg font-semibold'>shanu adarsh</h1>
                    <p className="font-normal mt-1">This is actually beautiful..</p>
                </div>
                <div className="ms-10 bg-blue-50 flex justify-start gap-4">
                    <img className='rounded-full h-8 w-8' src='http://res.cloudinary.com/dnn1ree80/image/upload/v1714442263/covvt1badeauzrh8orwb.jpg' alt="" />
                    <h1 className='text-lg font-semibold'>shanu adarsh</h1>
                    <p className="font-normal mt-1">This is actually beautiful..</p>
                </div>
            </div>
        </>
    )
}
