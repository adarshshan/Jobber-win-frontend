import React, { KeyboardEvent, useLayoutEffect, useState } from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import { FaRegCommentAlt } from 'react-icons/fa';
import { IoIosShareAlt } from 'react-icons/io';
import { VscSave } from 'react-icons/vsc';
import { IPostInterface } from './MiddleSide';
import { UserData } from '@/components/user/ProfilePage';
import { getLikes, likePost, sendMessage, unLikePost } from 'Api/user';
import { useAppSelector } from 'app/store';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, OrderedList, useDisclosure } from '@chakra-ui/react';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { ReportList } from './ReportList';
import { MdOutlineReportGmailerrorred } from 'react-icons/md';
import MessageBox from './MessageBox';
import ShareModalContent from './ShareModalContent';


interface IPostComponentProps {
    item: IPostInterface;
    userProfile: UserData | null;
}
const PostComponent: React.FC<IPostComponentProps> = ({ item, userProfile }) => {
    const [like, setLike] = useState<number>();
    const [likedUser, setLikedUser] = useState<string[]>([])
    const [userDetails, setUserDetails] = useState<any[]>([]);
    const [userScreen, setUserScreen] = useState(false);
    const [reportScreen, setReportScreen] = useState(false);
    const [postShareScreen, setPostShareScreen] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [inputHighlight, setMessageHighlight] = useState(false);
    const [comment, setComment] = useState('');
    const [commentCount, setCommentCount] = useState(0);

    const [loadAgain, setLoadAgain] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { user } = useAppSelector(state => state.auth);
    const userId = user._id;

    useLayoutEffect(() => {
        const fetchLikeDetails = async () => {
            try {
                const res = await getLikes(item._id);
                let arr = res?.data.data.likedUsers.map((item: any) => item.userId);
                setUserDetails(arr);
                setLike(res?.data.data.likeCount);
                let ar = res?.data.data.likedUsers.map((item: any) => item.userId._id);
                if (ar) {
                    setLikedUser(ar);
                }
            } catch (error) {
                console.log(error as Error);
            }
        }
        fetchLikeDetails();
    }, [like])

    const handleLike = async (postId: string) => {
        try {
            const res = await likePost(postId);
            if (res?.data.success) {
                setLike(res?.data.data.likeCount);
            } else console.log(res?.data.message);
        } catch (error) {
            console.log(error as Error);
        }
    }

    const handleUnlike = async (postId: string) => {
        try {
            const res = await unLikePost(postId);
            if (res?.data.success) {
                setLike(res.data.data.likeCount);
            } else console.log(res?.data.message);
        } catch (error) {
            console.log(error as Error);
        }
    }

    const handleSendMessage = async (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            let postId = item._id;
            const res = await sendMessage(comment, postId)
            setLoadAgain(!loadAgain);
            setComment('');
        }
    }

    return (
        <>
            <main className="h-full w-full flex items-center justify-center shadow-lg rounded-xl bg-white mt-4">
                <div className="border max-w-screen-md w-full mt-6 rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                        <div className="gap-3.5 flex items-center">
                            <img
                                src={item.result[0].profile_picture}
                                className="object-cover rounded-full w-10 h-10"
                                alt="User Avatar"
                            />
                            <div className="flex flex-col">
                                <b className="mb-2 capitalize">{item.result[0].name}</b>
                                <time dateTime="2021-08-06T21:15:00" className="text-gray-400 text-xs">
                                    {item.createdAt}
                                </time>
                            </div>
                        </div>
                        <div className="bg-gray-100 rounded-full h-3.5 flex items-center justify-center">
                            <Popover>
                                <PopoverTrigger>
                                    <Button><BsThreeDotsVertical /></Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverHeader className='bg-gray-300'> </PopoverHeader>
                                    <PopoverBody className='bg-gray-300 flex justify-center'>
                                        <Button className='w-full' onClick={() => {
                                            onOpen();
                                            setUserScreen(false);
                                            setReportScreen(true);
                                        }} key='xs' m={4} >
                                            <p className='text-red-500 cursor-default flex gap-3'><MdOutlineReportGmailerrorred className='mt-1' />  report this post</p>
                                        </Button>
                                    </PopoverBody>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div className="whitespace-pre-wrap mt-7">{item.caption}</div>
                    <div className="mt-5 flex gap-2 justify-center  pb-4 flex-wrap">
                        <img
                            src={item.imageUrl}
                            className="bg-red-500 rounded-2xl w-1/3 object-cover h-96 flex-auto"
                            alt="photo"
                        />
                    </div>
                    <div className="ms-1 text-black border-b-2">
                        <p className='cursor-pointer' onClick={() => {
                            onOpen()
                            setReportScreen(false);
                            setUserScreen(true);
                        }}>{like} likes</p>
                    </div>
                    <div className="h-16 border-b flex items-center justify-around">
                        {likedUser && likedUser.includes(userId) ? (
                            <div onClick={() => handleUnlike(item._id)} className="flex items-center gap-3 hover:bg-blue-50 p-3 text-blue-500 cursor-pointer">
                                <AiOutlineLike className=' text-xl' />
                            </div>
                        ) : (
                            <div onClick={() => handleLike(item._id)} className="flex items-center gap-3 hover:bg-blue-50 p-3 cursor-pointer">
                                <AiOutlineLike className=' text-xl' />
                            </div>
                        )}

                        <div onClick={() => setShowMessage(!showMessage)} className="flex items-center gap-3 hover:bg-blue-50 p-3 cursor-default">
                            <FaRegCommentAlt />
                            <div className="text-sm">{commentCount === 0 ? '' : commentCount} Comments</div>
                        </div>
                        <div onClick={() => {
                            setPostShareScreen(true)
                            setReportScreen(false);
                            setUserScreen(false);
                            onOpen()
                        }} className="flex items-center gap-3 hover:bg-blue-50 p-3 cursor-default">
                            <IoIosShareAlt />
                            <div className="text-sm">Share</div>
                        </div>
                        <div className="flex items-center gap-3 hover:bg-blue-50 p-3">
                            <VscSave />
                            <div className="text-sm">Saved</div>
                        </div>
                    </div>


                    {showMessage && <MessageBox
                        postId={item._id}
                        setMessageHighlight={setMessageHighlight}
                        inputHighlight={inputHighlight}
                        loadAgain={loadAgain}
                        setLoadAgain={setLoadAgain}
                        setCommentCount={setCommentCount} />}


                    <div className="flex items-center justify-between mt-4">
                        <img
                            src={userProfile?.profile_picture}
                            className="bg-yellow-50 rounded-full w-10 h-10 object-cover border"
                            alt="User Avatar"
                        />
                        <div className="flex items-center bg-gray-50 h-11 w-11/12 border rounded-2xl overflow-hidden">
                            <input
                                onKeyDown={handleSendMessage}
                                type="text"
                                value={comment}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setComment(e.target.value)}
                                className={`h-full w-full ${inputHighlight ? 'bg-gray-200' : 'bg-gray-50'}  outline-none px-4`}
                                placeholder="Write your comment..."
                                name="comment" />
                        </div>
                    </div>

                </div>
            </main>
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{reportScreen ? 'Report' : (postShareScreen ? 'Share Post ' : 'Liked users')}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {userScreen && userDetails && userDetails.length && userDetails.map((userItem, index) => (
                            <Link to={`/user/view-user-profile/${userItem._id}`} key={index} className="flex justify-start mt-2">
                                <img className='w-14 h-14 rounded-full' src={userItem.profile_picture} alt='///' />
                                <div className='mt-1 ms-2 font-normal'>
                                    <h3 className=' text-lg'>{userItem.name}</h3>
                                    <p>{userItem.headLine}</p>
                                </div>
                            </Link>
                        ))}
                        {reportScreen && <ReportList onClose={onClose} postId={item._id} />}
                        {postShareScreen && <ShareModalContent postId={item._id} onClose={onClose} />}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default PostComponent;
