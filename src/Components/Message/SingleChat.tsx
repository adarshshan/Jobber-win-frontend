import React, { useEffect, useState } from 'react'
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react'
import animationData from '../../animations/typing.json'
import Lottie from 'react-lottie'
import io from 'socket.io-client'
import { ChatState } from 'Context/ChatProvider'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { getSender, getSenderFull } from 'config/chatLogics'
import ProfileModal from './ProfileModal'
import ScrollableChat from './ScrollableChat'
import UpdateGroupChatModal from './UpdateGroupChatModal'
import { getMessages, sendMessages } from 'Api/chat'

const ENDPOINT = 'http://localhost:5000'
var socket: any, selectedChatCompare: any;

interface ISingleChat {
    fetchAgain: boolean;
    setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>
}
const SingleChat: React.FC<ISingleChat> = ({ fetchAgain, setFetchAgain }) => {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState('');
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIstyping] = useState(false);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const toast = useToast();

    const { userr,
         selectedChat,
        setSelectedChat,
        notification,
        setNotification, } = ChatState()

    useEffect(() => {
        socket = io(ENDPOINT)
        socket.emit("setup", userr);
        socket.on("connected", () => setSocketConnected(true));
        socket.on("typing", () => setIstyping(true))
        socket.on("stop typing", () => setIstyping(false))
    }, [])

    const fetchMessages = async () => {
        if (!selectedChat) return;
        try {
            setLoading(true);
            const res = await getMessages(selectedChat._id);
            if (res?.data.success) {
                console.log(res);
                setMessages(res.data.data);
                // socket.emit('join chat', selectedChat._id);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast({
                title: "Error occured!",
                description: "failed to send the message",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            })
        }
    }


    useEffect(() => {
        fetchMessages();
        selectedChatCompare = selectedChat;
    }, [selectedChat])

    useEffect(() => {
        // socket.on("message recieved", (newMessageReceived: any) => {
        //     if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
        //         if (!notification.includes(newMessageReceived)) {
        //             setNotification([newMessageReceived, ...notification]);
        //             setFetchAgain(!fetchAgain);
        //         }
        //     } else {
        //         setMessages([...messages, newMessageReceived]);
        //     }
        // })
    })


    const sendMessage = async (event: any) => {
        if (event.key === "Enter" && newMessage) {
            try {
                setNewMessage("");
                const res = await sendMessages(newMessage, selectedChat._id)

                if (res?.data.success) {
                    // socket.emit("new message", data.message);

                    setMessages([...messages, res.data.data]);
                }
                console.log(res);

            } catch (error) {
                console.log(error)
                toast({
                    title: "Error occured!",
                    description: "failed to send the message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom',
                })
            }
        }
    }

    const typingHandler = async (e: any) => {
        setNewMessage(e.target.value);
        if (!socketConnected) return;
        if (!typing) {
            setTyping(true);
            socket.emit("typing", selectedChat._id);
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;

            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedChat._id);
                setTyping(false);
            }
        }, timerLength)
    }
    console.log(selectedChat);console.log('this is the seleced chat!');
    return (
        <>
            {selectedChat ? (
                <>
                    <Text
                        fontSize={{ base: "28px", md: "30px" }}
                        pb={3}
                        px={2}
                        w="100%"
                        fontFamily="Work sans"
                        display="flex"
                        justifyContent={{ base: "space-between" }}
                        alignItems="center"
                    >
                        <IconButton
                            aria-label="Close"
                            display={{ base: "flex", md: "none" }}
                            icon={<ArrowBackIcon />}
                            onClick={() => setSelectedChat("")}
                        />
                        {selectedChat.isGroupChat ? (
                            <>
                                {selectedChat.chatName.toUpperCase()}
                                <UpdateGroupChatModal
                                    fetchMessages={fetchMessages}
                                    fetchAgain={fetchAgain}
                                    setFetchAgain={setFetchAgain}>
                                    edit
                                </UpdateGroupChatModal>
                            </>
                        ) : (
                            <>
                                {getSender(userr, selectedChat.users)}
                            </>
                        )}
                    </Text>
                    <Box
                        display="flex"
                        flexDir="column"
                        justifyContent="flex-end"
                        p={3}
                        bg="#E8E8E8"
                        w="100%"
                        h="100%"
                        borderRadius="lg"
                        overflowY="hidden"
                    >
                        {loading ? (<Spinner
                            size="xl"
                            w={20}
                            h={20}
                            alignSelf="center"
                            margin="auto" />) : (

                            <div className='messages'>
                                <ScrollableChat messages={messages} />
                            </div>

                        )}
                        <FormControl
                            onKeyDown={sendMessage}
                            id="first-name"
                            isRequired
                            mt={3}
                        >
                            {isTyping ? (
                                <div>
                                    <Lottie
                                        options={defaultOptions}
                                        // height={50}
                                        width={70}
                                        style={{ marginBottom: 15, marginLeft: 0 }}
                                    />
                                </div>
                            ) : (
                                <></>
                            )}
                            <Input
                                variant="filled"
                                bg="#E0E0E0"
                                placeholder="Enter a message.."
                                value={newMessage}
                                onChange={typingHandler}
                            />
                        </FormControl>
                    </Box>
                </>
            ) : (
                <Box display='flex' alignItems='center' justifyContent="center" h="80%">
                    <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                        Click on a user to start chatting
                    </Text>
                </Box>
            )}
        </>
    )
}

export default SingleChat
