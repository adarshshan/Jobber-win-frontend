import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React from 'react'
import { MdDeleteOutline, MdEdit } from 'react-icons/md'
import SubscriptionForm from './SubscriptionForm';
import { ActivateSubscription, DeactivateSubscription, deleteSubscription } from 'Api/admin';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
export interface SubInterface {
    _id: string;
    planName: string;
    duration: number;
    amount: number;
    description: string;
    status: string;
}
interface ISubItemProps {
    item: SubInterface;
    fetchAgain: boolean;
    setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
}
const SubItem: React.FC<ISubItemProps> = ({ item, fetchAgain, setFetchAgain }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleDelete = async (subId: string) => {
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
                    deleteSubscription(subId).then((res) => {
                        if (res?.data.success) {
                            setFetchAgain(!fetchAgain);
                            Swal.fire({
                                title: "Deleted!",
                                text: res.data.message,
                                icon: "success"
                            });
                        } else {
                            Swal.fire({
                                title: 'Failed',
                                text: res?.data.message,
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
    const handleDeactivate = async (subId: string) => {
        try {
            const res = await DeactivateSubscription(subId);
            if (res?.data.success) {
                setFetchAgain(!fetchAgain);
                toast.success(res.data.message);
            } else toast.error(res?.data.message);
        } catch (error) {
            console.log(error as Error);
        }
    }
    const handleActivate = async (subId: string) => {
        try {
            const res = await ActivateSubscription(subId);
            if (res?.data.success) {
                toast.success(res.data.message);
                setFetchAgain(!fetchAgain);
            } else toast.error(res?.data.message);
        } catch (error) {
            console.log(error as Error);
        }
    }
    return (
        <>
            <div className="md:w-1/4 shadow bg-gray-100 float-start m-5 min-h-[400px]">
                <div className="pt-[15px] px-[25px] pb-[25px]">
                    <div className='flex justify-center'>
                        <p className="text-[#00153B] text-[50px] leading-[63px] font-bold uppercase">
                            {item.planName}
                        </p>
                    </div>
                    <hr />
                    <div className="flex justify-around font-bold">
                        <Button onClick={onOpen}> <MdEdit className='text-2xl hover:text-green-400' /></Button>
                        <Button onClick={() => handleDelete(item._id)}><MdDeleteOutline className='text-2xl hover:text-red-500' /></Button>
                    </div>
                    <hr />
                    <div>
                        <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                            ₹ {item.amount}
                        </p>
                        <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                            {item.duration} month
                        </p>
                    </div>
                </div>
                <div className='p-5'>
                    <p>{item.description}</p>
                </div>
                {item.status === 'active' ? (
                    <button onClick={() => handleDeactivate(item._id)} className='w-full hover:bg-red-600 bg-red-500 text-white'>Deactivate</button>
                ) : (
                    <button onClick={() => handleActivate(item._id)} className='w-full hover:bg-blue-600 bg-blue-500 text-white'>Activate</button>
                )}
            </div>


            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Subscription plan</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <SubscriptionForm item={item} setFetchAgain={setFetchAgain} fetchAgain={fetchAgain} onClose={onClose} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default SubItem
