import { Accordion, AccordionItem } from '@nextui-org/react'
import React from 'react'
import { IoIosContacts } from 'react-icons/io'

interface ILeftSideBar {
    toatalFriends: number;
    setShowFriendScreen: React.Dispatch<React.SetStateAction<boolean>>;
}
const LeftSideBar: React.FC<ILeftSideBar> = ({ toatalFriends, setShowFriendScreen }) => {
    return (
        <>
            <div className="sm:col-span-3 min-h-[100px] bg-white shadow-xl rounded-lg">
                <div className='p-3'>
                    <h1 className='font-bold text-xl '>Manage My network</h1>
                    <div onClick={() => setShowFriendScreen(true)} className="flex justify-between">
                        <p className='flex text-xl mt-2 ms-3'><IoIosContacts className='text-2xl mt-1 me-3' /> Friends </p>
                        <p className='mt-2 me-5'>{toatalFriends}</p>
                    </div>

                </div>
                <Accordion
                    motionProps={{
                        variants: {
                            enter: {
                                y: 0,
                                opacity: 1,
                                height: "auto",
                                transition: {
                                    height: {
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 30,
                                        duration: 1,
                                    },
                                    opacity: {
                                        easings: "ease",
                                        duration: 1,
                                    },
                                },
                            },
                            exit: {
                                y: -10,
                                opacity: 0,
                                height: 0,
                                transition: {
                                    height: {
                                        easings: "ease",
                                        duration: 0.25,
                                    },
                                    opacity: {
                                        easings: "ease",
                                        duration: 0.3,
                                    },
                                },
                            },
                        },
                    }}
                >
                    <AccordionItem aria-label="" title={<h1 className='hover:bg-slate-300 p-3'>Show more</h1>}>
                        <div onClick={() => setShowFriendScreen(true)} className='w-full hover:bg-gray-700 hover:text-white hover:font-semibold mt-2 border border-gray-900 p-2 rounded-sm bg-gray-50'>Friends</div>
                        <div className='w-full hover:bg-gray-700 hover:text-white hover:font-semibold mt-2 border border-gray-900 p-2 rounded-sm bg-gray-50'>Following</div>
                        <div className='w-full hover:bg-gray-700 hover:text-white hover:font-semibold mt-2 border border-gray-900 p-2 rounded-sm bg-gray-50'>Recruiters</div>
                    </AccordionItem>
                </Accordion>
            </div>
        </>
    )
}

export default LeftSideBar
