import React, { ReactNode } from "react";
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
} from '@chakra-ui/react'

interface ISideOpenProps {
    children: ReactNode;
    setShowAllJobs: React.Dispatch<React.SetStateAction<boolean>>;
    setShowApplied: React.Dispatch<React.SetStateAction<boolean>>;
    openSavedJobPage: () => Promise<void>;
}
const SideOpen: React.FC<ISideOpenProps> = ({ children, setShowAllJobs, setShowApplied, openSavedJobPage }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef<any>()

    return (
        <>
            <Button ref={btnRef} colorScheme='white' onClick={onOpen}>
                {children}
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>menu</DrawerHeader>

                    <DrawerBody>
                        <div className="w-full rounded-md bg-yellow p-3">
                            <div onClick={() => {
                                setShowAllJobs(true);
                                setShowApplied(false);
                                onClose()
                            }} className="w-full p-4 hover:bg-gray-500 hover:text-white shadow-md m-2">
                                All Jobs
                            </div>
                            <div onClick={() => {
                                openSavedJobPage();
                                onClose();
                            }
                            } className="w-full p-4 hover:bg-gray-500 hover:text-white shadow-md m-2">
                                Saved Jobs
                            </div>
                            <div onClick={() => {
                                setShowApplied(true)
                                onClose();
                            }} className="w-full p-4 hover:bg-gray-500 hover:text-white shadow-md m-2">
                                Applied Jobs
                            </div>
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default SideOpen;