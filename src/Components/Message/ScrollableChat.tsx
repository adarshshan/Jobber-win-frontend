import React, { useEffect, useState } from 'react'
import ScrollableFeed from 'react-scrollable-feed';
import { Avatar, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Tooltip, useDisclosure } from '@chakra-ui/react';
import { ChatState } from 'Context/ChatProvider';
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from 'config/chatLogics';
import { sharePostMessage } from 'Api/chat';
import toast from 'react-hot-toast';
import { getSinglePostDetails } from 'Api/user';
import { AiOutlineLike } from 'react-icons/ai';
import { VscSave } from 'react-icons/vsc';
import MessageBox from 'Components/User/Home/MessageBox';


interface IScrollableChatProps {
    messages: any[];
    setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
    newMsgFn: (data: any) => void;
}
const ScrollableChat: React.FC<IScrollableChatProps> = ({ messages, setFetchAgain, newMsgFn }) => {
    const [post, setPost] = useState<any>();
    const [comment, setComment] = useState<any>();
    const [like, setLike] = useState<any>();


    const { userr, postId, setPostId, selectedChat, setChats } = ChatState()
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        const fetchContentAndSendMsg = async () => {
            try {
                setPostId('');
                const result = await sharePostMessage(postId, selectedChat._id);
                if (result?.data.success) {
                    newMsgFn(result.data.data)
                } else toast.error(result?.data.message);
                setFetchAgain(true);
            } catch (error) {
                console.log(error as Error);
                setPostId('');
            }
        }
        if (postId.length) fetchContentAndSendMsg();
    }, [])

    const fetchPostDetails = async (postId: string) => {
        try {
            const res = await getSinglePostDetails(postId);
            if (res?.data.success) {
                setPost(res.data.data.post);
                setComment(res.data.data.comment.data);
                setLike(res.data.data.like);
            } else toast.error(res?.data.message);
        } catch (error) {
            console.log(error as Error);
        }
    }

    const viewPost = async (postId: string) => {
        try {
            fetchPostDetails(postId);
            onOpen();
        } catch (error) {
            console.log(error as Error);
        }
    }
    return (
        <>
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
                                    <div onClick={() => viewPost(m.shared_post._id)} className='w-[300px]'>
                                        <img src={m.shared_post?.imageUrl} alt="" />
                                        <p>{m.sender.name} has shared a Post</p>
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

            <Modal onClose={onClose} size='4xl' isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>shared post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="flex rounded-md">
                            <div className="w-1/2 bg-blue-50 min-h-10">
                                <img src={post?.imageUrl} alt="" />
                                <div className="ms-1 text-black border-b-2">
                                    <p className='cursor-pointer' onClick={() => {
                                    }}>{like?.likeCount} likes</p>
                                </div>
                                <div className="h-16 border-b flex items-center justify-around">
                                    <div className="flex items-center gap-3 hover:bg-blue-50 p-3 text-blue-500 cursor-pointer">
                                        <AiOutlineLike className=' text-xl' />
                                    </div>
                                    <div className="flex items-center gap-3 hover:bg-blue-50 p-3">
                                        <VscSave />
                                        <div className="text-sm">Save</div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/2 bg-yellow-50 max-h-[350px] overflow-y-auto scrollbar-hidden">
                                <MessageBox postId={post?._id} loadAgain={isOpen} />
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ScrollableChat

