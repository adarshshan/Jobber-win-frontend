

import { JobInterface } from '@/components/recruiter/PostJobForm';
import { useDisclosure } from '@chakra-ui/react';
import { Button } from '@nextui-org/react'
import React from 'react'
import { CiEdit } from 'react-icons/ci';
import FormModal from './FormModal';

interface IJobItemProps {
    item: JobInterface;
    fetchAgain: boolean;
    setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
}
const JobItem: React.FC<IJobItemProps> = ({ item, fetchAgain, setFetchAgain }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <div className="flex shadow-lg rounded-sm p-3 my-3">
            <img className='rounded-lg w-20 h-20' src={item.job_img} alt="" />
            <div className='ms-4'>
                <h1 className='font-semibold'>{item.title}</h1>
                <small>{item.description}</small>
            </div>
            <div className='h-full '>
                <Button color="secondary" className='mt-3 rounded-full bg-blue-800 text-white ms-2'>
                    <FormModal
                        item={item}
                        isOpen={isOpen}
                        onClose={onClose}
                        fetchAgain={fetchAgain}
                        setFetchAgain={setFetchAgain}>
                        <CiEdit onClick={onOpen} />
                    </FormModal>
                </Button>
            </div>
        </div>
    )
}

export default JobItem
