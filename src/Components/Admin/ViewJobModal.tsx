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
import React, { ReactNode } from 'react'
interface IBasicUsageProps {
    children: ReactNode;
    job: any;
}
const ViewJobModal: React.FC<IBasicUsageProps> = ({ children, job }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button onClick={onOpen}>{children}</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Job Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="p-5">
                            <ul>
                                <li><span className='font-semibold'>Job Title : </span>{job[0]}</li>
                                <li><span className='font-semibold'>Company :</span>{job[1]}</li>
                                <li><span className='font-semibold'>Job Type : </span>{job[3]}</li>
                                <li><span className='font-semibold'>Description :</span>{job[4]}</li>
                                <li><span className='font-semibold'>Experience :</span>{job[5]}</li>
                                <li><span className='font-semibold'>Location :</span>{job[6]}</li>
                                <li><span className='font-semibold'>Recruiter :</span>{job[7]}</li>
                            </ul>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ViewJobModal;