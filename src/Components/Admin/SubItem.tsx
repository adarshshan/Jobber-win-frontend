import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React from 'react'
import { MdEdit } from 'react-icons/md'
import SubscriptionForm from './SubscriptionForm';
export interface SubInterface {
    _id:string;
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
    return (
        <>
            <div className="md:w-1/4 shadow bg-gray-100 float-start m-5">
                <div className="pt-[15px] px-[25px] pb-[25px]">
                    <div className="flex justify-end">
                        <div className="bg-[#F6F6F7] rounded-[20px] flex justify-center align-center px-[12px]">
                            <p className="text-[#00153B] text-[12px] leading-[28px] font-bold">
                                <Button onClick={onOpen}> <MdEdit className='text-2xl ' /></Button>
                            </p>
                        </div>
                    </div>

                    <div>
                        <p className="text-[#00153B] text-[50px] leading-[63px] font-bold">
                            {item.planName}
                        </p>
                    </div>

                    <div>
                        <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                            ₹ {item.amount}
                        </p>
                        <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                            {item.duration} month
                        </p>
                    </div>
                </div>

                <div className="pt-[25px] px-[25px] pb-[35px]">
                    <div>
                        <p>{item.description}</p>
                    </div>

                </div>
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
