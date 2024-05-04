import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { FaRegFaceSmile } from 'react-icons/fa6'


interface IChatSectionFooterProps {

}
const ChatSectionFooter: React.FC<IChatSectionFooterProps> = () => {
    return (
        <>
            <div className="absolute bg-blue-200 w-full bottom-16 flex justify-between p-3">
                <div className="flex justify-start p-3 text-2xl gap-5">
                    <FaRegFaceSmile />
                    <FaPlus />
                </div>
                <form className="flex items-center w-full  mx-8">
                    <label htmlFor="voice-search" className="sr-only">Search</label>
                    <div className="relative w-full">
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type a message" required />
                        <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z" />
                            </svg>
                        </button>
                    </div>
                    <button type="submit" className="hidden"></button>
                </form>
            </div>
        </>
    )
}

export default ChatSectionFooter
