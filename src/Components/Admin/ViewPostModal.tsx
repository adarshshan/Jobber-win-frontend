import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
} from '@chakra-ui/react'
import { getSinglePostDetails } from 'Api/user';
import React, { ReactNode, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
interface IBasicUsageProps {
    children: ReactNode;
    postId: string;
}
const PostViewModal: React.FC<IBasicUsageProps> = ({ children, postId }) => {
    const [post, setPost] = useState();
    const [comment, setComment] = useState();
    const [like, setLike] = useState();

    const { isOpen, onOpen, onClose } = useDisclosure()

    const fetchPostDetails = async (postId:string) => {
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
    
    return (
        <>
            <Button onClick={()=>{
                onOpen();
                fetchPostDetails(postId)
            }}>{children}</Button>

            <Modal isOpen={isOpen} size='full' onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Post Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="w-full flex justify-between gap-1">
                            <div className="min-h-[300px] bg-yellow-200 w-1/2">{post}</div>
                            <div className="min-h-[300px] bg-blue-200 w-1/2">{comment}</div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default PostViewModal;