import UserListItem from 'Components/MessagePage/UserListItem'
import React, { useEffect, useRef, useState } from 'react'
import './css/JobDetails.css'
import ChatSectionHeader from 'Components/MessagePage/ChatSectionHeader'
import io, { Socket } from 'socket.io-client';
import { Button, Input, useDisclosure } from '@chakra-ui/react'
import SideDrawer from 'Components/MessagePage/SideDrawer'
import { MdPersonSearch } from 'react-icons/md'
import MessageBox from 'Components/MessagePage/MessageBox'
import { ChatState } from 'Context/ChatProvider'
import { fetchChat } from 'Api/chat'




interface IMessagePage {

}
const MessagePage: React.FC<IMessagePage> = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [messageText, setMessageText] = useState('');
    const socket = useRef<Socket | undefined>();

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef<any>()

    const { userr, chats, notification,
        selectedChat, setChats, setNotification,
        setSelectedChat, setUser } = ChatState() || {};


    const fetchChats = async () => {
        // console.log(user._id);
        try {
            const result = await fetchChat();
            console.log(result);
            // setChats(data);
        } catch (error) {
            console.log(error)
        }
    };
    useEffect(() => {
        socket.current = io('http://localhost:5000');
        socket.current.on('connect', () => {
            console.log('Connected to server' + socket.current?.id);
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
            <SideDrawer isOpen={isOpen} onClose={onClose} />

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
                        <div className="flex justify-between">
                            <h1 className='font-semibold ms-5 text-xl'>Chats</h1>
                            <Button ref={btnRef} onClick={onOpen}> <MdPersonSearch className='text-2xl' /> </Button>
                        </div>
                        {/* end of search bar */}
                        <div className="m-1 p-2 rounded-md w-full message-list-container">
                            <UserListItem />
                            <UserListItem />
                            <UserListItem />
                        </div>
                    </div>
                    <div className="col-span-8 max-h-screen bg-blue-100">
                        <ChatSectionHeader />
                        <MessageBox />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MessagePage
