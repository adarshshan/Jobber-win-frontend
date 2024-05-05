import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'

interface ISideDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}
const SideDrawer: React.FC<ISideDrawerProps> = ({ isOpen, onClose }) => {
    const btnRef = React.useRef<any>()
    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Create a new Chat</DrawerHeader>

                    <DrawerBody>
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search " required />
                            <button type="submit" className="hidden">Search</button>
                        </div>
                        <div className="mt-2">
                            <div className="flex justify-start mt-2">
                                <img className='w-14 h-14 rounded-full' src="http://res.cloudinary.com/dnn1ree80/image/upload/v1713962983/ypkk1scqoxgubcfgpymk.jpg" alt="" />
                                <div className='mt-1 ms-2 font-normal'>
                                    <h3 className=' text-lg'>Adarsh C</h3>
                                    <p>Hello how are you ?</p>
                                </div>
                            </div>
                            <div className="flex justify-start mt-2">
                                <img className='w-14 h-14 rounded-full' src="http://res.cloudinary.com/dnn1ree80/image/upload/v1713962983/ypkk1scqoxgubcfgpymk.jpg" alt="" />
                                <div className='mt-1 ms-2 font-normal'>
                                    <h3 className=' text-lg'>Adarsh C</h3>
                                    <p>Hello how are you ?</p>
                                </div>
                            </div>
                        </div>

                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default SideDrawer
