import { Button, useDisclosure } from '@chakra-ui/react';
import { getAllSavedJobs, removeSavedJobs } from 'Api/user';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react'
import toast from 'react-hot-toast';

interface ISavedJObScreenProps {
    savedJobs: any[] | undefined;
    setSavedJobs: React.Dispatch<React.SetStateAction<any[] | undefined>>
}
const SavedJobScreen: React.FC<ISavedJObScreenProps> = ({ savedJobs, setSavedJobs }) => {
    const [jobId, setJobId] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef<HTMLInputElement | any>(null)

    useEffect(() => {
        const fetchSave = async () => {
            try {
                const res = await getAllSavedJobs();
                if (res?.data.success) {
                    setSavedJobs(res.data.data);
                } else toast.error(res?.data.message);
            } catch (error) {
                console.log(error as Error);
            }
        }
        fetchSave()
    }, [jobId])

    const handleUnsaveJob = async () => {
        try {
            if (jobId) {
                const res = await removeSavedJobs(jobId);
                setJobId('');
                if (res?.data.success) {
                    toast.success(res.data.message);
                } else toast.error(res?.data.message);
            }

        } catch (error) {
            console.log(error as Error);
        }
    }
    return (
        <>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Customer
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button onClick={() => {
                                handleUnsaveJob()
                                onClose()
                            }} colorScheme='red' ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <div className="w-full text-xl m-3 uppercase">
                <h1>saved jobs</h1>
            </div>
            <div className="w-full mt-4">
                {savedJobs && savedJobs.length ? (
                    savedJobs.map((item, index) => (
                        <div key={index} className="flex justify-between p-2 m-1 shadow-md bg-slate-100">
                            <Link to={`/user/job-details/${item._id}`}>
                                <div className="flex justify-start">
                                    <img className='w-20 h-20 rounded-md' src={item.job_img} alt='' />
                                    <div className=' ms-4'>
                                        <h1 className='text-lg'>{item.title}</h1>
                                        <p>{item.company_name}</p>
                                        <p>{item.location}</p>
                                    </div>
                                </div>
                            </Link>

                            <Button colorScheme='red' onClick={() => {
                                setJobId(item._id);
                                onOpen()
                            }}>
                                <p className='cursor-pointer'>
                                    remove
                                </p>
                            </Button>
                        </div>
                    ))
                ) : (
                    <h1>oops there is no jobs are saved.</h1>
                )}
            </div>
        </>
    )
}

export default SavedJobScreen
