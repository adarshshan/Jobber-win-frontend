import UserListItem from 'Components/MessagePage/UserListItem'
import React, { useEffect, useRef, useState } from 'react'
import './css/JobDetails.css'
import ChatSectionHeader from 'Components/MessagePage/ChatSectionHeader'
import ChatSectionFooter from 'Components/MessagePage/ChatSectionFooter'
import io, { Socket } from 'socket.io-client';

// const socket = io('http://localhost:5000');


interface IMessagePage {

}
const MessagePage: React.FC<IMessagePage> = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [messageText, setMessageText] = useState('');
    const socket = useRef<Socket | undefined>();



    useEffect(() => {
        socket.current = io('http://localhost:5000');
        socket.current.on('connect', () => {
            console.log('Connected to server');
        });

        socket.current.on('disconnect', () => {
            console.log('Disconnected from server');
        });
    }, []);


    useEffect(() => {
        socket.current?.on('message', (message) => {
            setMessages([...messages, message]);
        });
    }, [messages]);

    const sendMessage = () => {
        socket.current?.emit('sendMessage', { text: messageText });
        setMessageText('');
    };
    return (
        <>
            <h1>Real-Time Chat App</h1>
            <div className="messages">
                {messages.map((message, index) => (
                    <div key={index} className="message">
                        <p className="message-username">{message.username}</p>
                        <p className="message-text">{message.text}</p>
                    </div>
                ))}
            </div>
            <div className="input-box">
                <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
            <div className="container pb-4">
                <div className="grid grid-cols-12 m-1 p-1 shadow-sm rounded-md gap-3">
                    <div className="col-span-4 max-h-screen bg-blue-200 p-2">
                        {/* searchbar */}
                        <form className="max-w-md mx-auto">
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
                        </form>
                        {/* end of search bar */}
                        <div className="m-1 p-2 rounded-md w-full message-list-container">
                            <UserListItem />
                            <UserListItem />
                            <UserListItem />
                            <UserListItem />
                            <UserListItem />
                            <UserListItem />
                            <UserListItem />
                            <UserListItem />
                            <UserListItem />
                        </div>
                    </div>
                    <div className="col-span-8 max-h-screen bg-blue-100">
                        <ChatSectionHeader />
                        <div className="h-full relative">
                            <div className="message-show-container ">
                                <div className="flex justify-start p-4">
                                    <p className='bg-blue-300 rounded-md p-2'>Hellow</p>
                                </div>
                                <div className="flex justify-end p-4">
                                    <p className='bg-blue-300 rounded-md p-2'>Hellow how are you ?</p>
                                </div>
                                <div className="flex justify-start p-4">
                                    <p className='bg-blue-300 rounded-md p-2'>Iam Fine</p>
                                </div>
                                <div className="flex justify-end p-4">
                                    <p className='bg-blue-300 rounded-md p-2'>What about your job ?</p>
                                </div>
                                <div className="flex justify-start p-4">
                                    <p className='bg-blue-300 rounded-md p-2'>going with the flow.</p>
                                </div>
                                <div className="flex justify-end p-4">
                                    <p className='bg-blue-300 rounded-md p-2'>oww</p>
                                </div>
                                <div className="flex justify-end p-4">
                                    <p className='bg-blue-300 rounded-md p-2'>What about your job ?</p>
                                </div>
                                <div className="flex justify-start p-4">
                                    <p className='bg-blue-300 rounded-md p-2'>going with the flow.</p>
                                </div>
                                <div className="flex justify-end p-4">
                                    <p className='bg-blue-300 rounded-md p-2'>oww</p>
                                </div>
                            </div>
                            <ChatSectionFooter />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MessagePage
