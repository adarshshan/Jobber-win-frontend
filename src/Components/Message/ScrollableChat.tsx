import React, { useEffect } from 'react'
import ScrollableFeed from 'react-scrollable-feed';
import { Avatar, Tooltip } from '@chakra-ui/react';
import { ChatState } from 'Context/ChatProvider';
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from 'config/chatLogics';
import { sharePostMessage } from 'Api/chat';
import toast from 'react-hot-toast';


interface IScrollableChatProps {
    messages: any[];
    setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
    newMsgFn: (data: any) => void;
}
const ScrollableChat: React.FC<IScrollableChatProps> = ({ messages, setFetchAgain, newMsgFn }) => {
    console.log(messages); console.log('thisis the initial messages.....');
    const m = messages;
    const { userr, postId, setPostId, selectedChat, setChats } = ChatState()

    useEffect(() => {
        const fetchContentAndSendMsg = async () => {
            try {
                setPostId('');
                const result = await sharePostMessage(postId, selectedChat._id);
                if (result?.data.success) {
                    newMsgFn(result.data.data)
                    console.log(messages);
                } else toast.error(result?.data.message);
                setFetchAgain(true);
            } catch (error) {
                console.log(error as Error);
                setPostId('');
            }
        }
        if (postId.length) fetchContentAndSendMsg();
    }, [])
    return (
        <ScrollableFeed>
            {messages && messages.length ? (
                messages.map((m, i) => (
                    <div key={i} style={{ display: 'flex' }}>
                        {(isSameSender(messages, m, i, userr._id) || isLastMessage(messages, i, userr._id)) && (
                            <Tooltip label={m.sender.name} placement='bottom-start' hasArrow>
                                <Avatar
                                    mt='7px'
                                    mr={1}
                                    size='sm'
                                    cursor='pointer'
                                    name={m.sender.name}
                                    src={m.sender.pic} />
                            </Tooltip>
                        )}
                        <span style={{
                            backgroundColor: `${m.sender?._id === userr._id ? '#BEE3F8' : '#B9F5D0'}`,
                            borderRadius: "20px",
                            padding: "5px 15px",
                            maxWidth: "75%",
                            marginLeft: isSameSenderMargin(messages, m, i, userr._id),
                            // marginLeft: 33,
                            marginTop: isSameUser(messages, m, i) ? 3 : 10,
                            // marginTop: 3,
                        }}>
                            {m.content}
                            {m.contentType === 'sharePost' &&
                                <div className='w-[300px]'>
                                    <img src={m.shared_post?.imageUrl} alt="" />
                                    <p>{m.sender.name} has shared a Post</p>
                                    <small className='text-blue-500'>click to watch</small>
                                </div>}
                        </span>
                    </div>
                ))
            ) : (
                <div className="flex justify-center text-yellow-800">
                    No messages yet
                </div>
            )}
        </ScrollableFeed>
    )
}

export default ScrollableChat
