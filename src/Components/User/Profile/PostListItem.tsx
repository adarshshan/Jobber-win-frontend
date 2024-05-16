import React, { useState } from 'react'
import { AiOutlineLike } from 'react-icons/ai'
import { PostInterface } from './PostCard';
import { MdDeleteOutline, MdModeEdit } from 'react-icons/md';
import { deletePost, updatePostCaption } from 'Api/user';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';

interface IPostListItemProps {
    like: number;
    postItem: PostInterface;
    fetchAgain: boolean;
    setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>
}
export const truncateDescription = (description: string, maxLength: number) => {
    const words = description.split(' ');
    const truncatedWords = words.slice(0, maxLength);
    const truncatedDescription = truncatedWords.join(' ');
    if (words.length > maxLength) {
        return truncatedDescription + ' ...';
    } else {
        return truncatedDescription;
    }
}
const PostListItem: React.FC<IPostListItemProps> = ({ like, postItem, fetchAgain, setFetchAgain }) => {

    const [caption, setCatpion] = useState(postItem.caption);
    const { isOpen, onOpen, onClose } = useDisclosure()

    const deletePosts = async (postId: string) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    deletePost(postId).then((res) => {
                        console.log(res);
                        if (res?.data.success) {
                            setFetchAgain(!fetchAgain);
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your post has been deleted.",
                                icon: "success"
                            });
                        } else {
                            setFetchAgain(!fetchAgain);
                            Swal.fire({
                                title: "Failed!",
                                text: "failed to delete please try again.",
                                icon: "error"
                            });
                        }
                    })
                }
            });
        } catch (error) {
            console.log(error as Error);
        }
    }
    const updateCaption = async () => {
        try {
            const postId = postItem._id;
            if (caption && postId) {
                const res = await updatePostCaption(caption, postId);
                if (res?.data.success) {
                    setFetchAgain(!fetchAgain);
                    toast.success(res.data.message);
                } else toast.error(res?.data.message);
            }
        } catch (error) {
            console.log(error as Error);
        }
    }

    return (
        <>
            <div id="postlist">
                <div className="flex py-2 min-h-[100px]">
                    <div className="w-2/12 min-h-3">
                        <img className="w-[90px] h-[90px] ms-4" src={postItem.imageUrl} alt="///PostImage" />
                    </div>
                    <div className="w-10/12 min-h-3 ps-3">
                        {postItem.caption && truncateDescription(postItem.caption, 40)}
                    </div>
                    <div>
                        <MdDeleteOutline onClick={() => deletePosts(postItem._id)} className='text-red-500 text-2xl' />
                        <MdModeEdit onClick={onOpen} className="text-blue-500 text-2xl mt-4" />
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="flex ms-2">
                        <AiOutlineLike className="text-xl text-blue-400" /><p>{like}</p>
                    </div>
                    <p className="me-2">1 comment</p>
                </div>
            </div>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit The caption</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6} className='min-h-[300px]'>
                        <textarea
                            name="caption"
                            className='w-full h-80'
                            value={caption}
                            onChange={(e: any) => setCatpion(e.target.value)}
                        ></textarea>
                        <div className="w-full flex justify-end">
                            <Button onClick={updateCaption}>update</Button>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default PostListItem
