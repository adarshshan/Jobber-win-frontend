import { getComments, replyComment } from 'Api/user';
import { computeTime } from 'constants/Helpers';
import React, { KeyboardEvent, useEffect, useState } from 'react'

interface IMessageBoxInterface {
    postId: string;
    setMessageHighlight: React.Dispatch<React.SetStateAction<boolean>>;
    inputHighlight: boolean;
    loadAgain: boolean;
    setLoadAgain: React.Dispatch<React.SetStateAction<boolean>>;
    setCommentCount: React.Dispatch<React.SetStateAction<number>>;
}
interface Iuser {
    name: string;
    profile_picture: string;
    _id: string;
}
interface IReplies {
    _id: string;
    text: string;
    userId: Iuser;
    createdAt: string;
}
interface IComments {
    text: string;
    userId: Iuser;
    createdAt: string;
    _id: string;
    replies: IReplies[]
}
const MessageBox: React.FC<IMessageBoxInterface> = ({ postId, setMessageHighlight, inputHighlight, loadAgain, setLoadAgain, setCommentCount }) => {
    const [comments, setComments] = useState<IComments[]>([]);
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await getComments(postId);
                if (res?.data.success) {
                    const data = res.data.data.comments;
                    data.sort((a: any, b: any) => {
                        const dateA: Date = new Date(a.createdAt);
                        const dateB: Date = new Date(b.createdAt);
                        if (dateA < dateB) return -1;
                        if (dateA > dateB) return 1;
                        return 0;
                    });
                    setComments(data);
                    setCommentCount(data.length);
                }
            } catch (error) {
                console.log(error as Error)
            }
        }
        fetchComments()
    }, [loadAgain])
    console.log(comments);
    return (
        <>
            <div onClick={() => setMessageHighlight(!inputHighlight)} className=" w-full cursor-default">
                {comments && comments.length ? (
                    comments.map((item, index) => (
                        <Messages key={index}
                            setMessageHighlight={setMessageHighlight}
                            item={item}
                            setLoadAgain={setLoadAgain}
                            loadAgain={loadAgain} />
                    ))
                ) : (
                    <h1>No comments</h1>
                )}

            </div>
        </>
    )
}

export default MessageBox

interface IMessageProps {
    setMessageHighlight: React.Dispatch<React.SetStateAction<boolean>>;
    item: IComments;
    setLoadAgain: React.Dispatch<React.SetStateAction<boolean>>;
    loadAgain: boolean;
}

const Messages: React.FC<IMessageProps> = ({ setMessageHighlight, item, setLoadAgain, loadAgain }) => {
    const [showReplies, setShowReplies] = useState(false);
    const [replyInput, setReplyInput] = useState(false);
    const [reply, setReply] = useState('');

    const { _date, _time } = computeTime(item.createdAt);

    const sendReplyComment = async (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            try {
                const res = await replyComment(item._id, reply);
                setReply('');
                if (res?.data.success) {
                    setLoadAgain(!loadAgain);
                    setReplyInput(false)
                }
            } catch (error) {
                console.log(error as Error);
            }
        }
    }
    return (
        <>
            <div className='mt-1 bg-gray-100 rounded-lg p-2'>
                <div className="flex justify-start gap-3">
                    <img className='rounded-full h-8 w-8' src={item.userId.profile_picture} alt="" />
                    <div>
                        <div className="flex justify-start gap-3">
                            <h1 className='text-lg font-semibold'>{item.userId.name}</h1>
                            <p className="font-normal mt-1">{item.text}</p>
                        </div>
                        <div>
                            <div className="flex gap-3 ms-10">
                                <p>{_time}</p>
                                <p onClick={() => {
                                    setReplyInput(!replyInput);
                                    setMessageHighlight(true)
                                }}>reply</p>
                            </div>
                        </div>
                        {item.replies.length ? <p onClick={() => setShowReplies(!showReplies)} className='font-thin'>{showReplies ? 'hide' : 'view'} replies({item.replies.length})</p> : ''}
                        {replyInput && <input
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            onKeyDown={sendReplyComment}
                            className='rounded-full ms-10 focus:outline-none px-4 w-full' type="text" />}
                    </div>
                </div>
                {showReplies && <Replies replies={item.replies} />}
            </div>


        </>
    )
}

interface IRepliesProps {
    replies: IReplies[];
}
const Replies: React.FC<IRepliesProps> = ({ replies }) => {

    return (
        <>
            {replies && replies.length ? (
                <div id="replies">

                    {replies.map((item, index) => (
                        <div key={index} className='ms-10 mb-3 w-full flex justify-between border-b'>
                            <div className="flex justify-start gap-4">
                                <img className='rounded-full h-8 w-8' src={item.userId.profile_picture} alt="" />

                                <h1 className='text-lg font-semibold'>{item.userId.name}</h1>
                                <p className="font-normal mt-1">{item.text}</p>
                            </div>
                            <p className='text-sm me-16'> {computeTime(item.createdAt)._time}</p>
                        </div>

                    ))}

                </div>

            ) : (
                <h1>No Replies yet!</h1>
            )}

        </>
    )
}
