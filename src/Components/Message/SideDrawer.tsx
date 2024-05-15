import React from 'react'
import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { getSender } from '../../config/chatLogics';
import { ChatState } from 'Context/ChatProvider';
import ProfileModal from './ProfileModal';
import ChatLoading from './ChatLoading';
import UserListItem from './UserListItem';
import { getAllUsers } from 'Api/user';
import { accessChat } from 'Api/chat';
import { Badge } from '@nextui-org/react';

const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);

    const navigate = useNavigate();

    const {
        selectedChat,
        setSelectedChat,
        userr,
        notification,
        setNotification,
        chats,
        setChats,
    } = ChatState();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleSearch = async (e: any) => {
        try {
            setLoading(true);
            const res = await getAllUsers(search);
            if (res?.data.success) {
                setLoading(false);
                setSearchResult(res.data.data)
            }
        } catch (error) {
            console.log(error);
        }

    }
    const accessChats = async (userId: string) => {
        try {
            setLoading(true);
            const res = await accessChat(userId);
            if (res?.data.success) {
                const data = res.data.data;
                if (!chats.find((c: any) => c._id === data._id)) setChats([data, ...chats]);
                setSelectedChat(data);
                setLoading(false);
                onClose()
            } else console.log('Something went wrong while invoking the accessChats function');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Box
                display={'flex'}
                justifyContent="space-between"
                alignItems="center"
                bg="white"
                w="100%"
                p="5px 10px 5px 10px"
                borderWidth="5px">
                <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
                    <Button variant='ghost' onClick={onOpen}>
                        <i className='fas fa-search'></i>
                        <Text display={{ base: "none", md: "flex" }} px={4}>
                            Search User
                        </Text>
                    </Button>
                </Tooltip>
                <Text fontSize="2xl" fontFamily="Work sans">
                    Messages
                </Text>
                <div>
                    <Menu>
                        <MenuButton p={1}>
                            <div className="bg-gray-300 flex gap-1 px-2  rounded-full">
                                <p className='mt-1'>{notification.length ? notification.length : ''}</p>
                                <BellIcon fontSize="2xl" m={1} />
                            </div>
                        </MenuButton>
                        <MenuList pl={2}>
                            {!notification.length && "No New Messages"}
                            {notification.map((notif: any) => (
                                <MenuItem
                                    key={notif._id}
                                    onClick={() => {
                                        setSelectedChat(notif.chat);
                                        setNotification(notification.filter((n: any) => n !== notif));
                                    }}
                                >
                                    {notif.chat.isGroupChat
                                        ? `New Message in ${notif.chat.chatName}`
                                        : `New Message from ${getSender(userr, notif.chat.users)}`}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                </div>
            </Box>
            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
                    <DrawerBody>
                        <Box display="flex" pb={2}>
                            <Input
                                placeholder="Search by name or email"
                                mr={2}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyUp={handleSearch}
                            />
                            <Button onClick={handleSearch}>Go</Button>
                        </Box>
                        {loading ? (
                            <ChatLoading />
                        ) : (
                            searchResult?.map((user: any) => (
                                <UserListItem
                                    key={user?._id}
                                    user={user}
                                    handleFunction={() => accessChats(user?._id)}
                                />
                            ))
                        )}
                        {loadingChat && <Spinner ml="auto" display="flex" />}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default SideDrawer
