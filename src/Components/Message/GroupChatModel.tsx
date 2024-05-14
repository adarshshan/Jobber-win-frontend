import { Box, Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import React, { ReactNode, useState } from 'react'
import axios from 'axios';
import { ChatState } from 'Context/ChatProvider';
import UserBadgeItem from './UserBadgeItem';
import UserListItem from './UserListItem';
import { getAllUsers } from 'Api/user';
import { createGroupChat } from 'Api/chat';

interface IGroupChatModelProps {
    children: ReactNode;
}
const GroupChatModel: React.FC<IGroupChatModelProps> = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const { userr, chats, setChats } = ChatState();

    const handleSearch = async (query: string) => {
        setSearch(query);
        if (!query) return;
        try {
            setLoading(true);
            const res = await getAllUsers(query);
            if (res?.data.success) {
                setSearchResult(res.data.data);
            } else toast({ title: 'something went wrong', description: "Failed to load the search results", status: 'error', duration: 4000, isClosable: true, position: "bottom-left" });
            setLoading(false);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    }
    const handleSubmit = async () => {
        if (!groupChatName || !selectedUsers) {
            toast({
                title: "Please fill all the feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }
        try {
            const res = await createGroupChat(groupChatName, JSON.stringify(selectedUsers.map((u: any) => u._id)));

            setGroupChatName('');
            setSelectedUsers([]);
            setSearch('');
            onClose()
            if (res) {
                console.log('this is the data from handlesubmit');
                console.log(res);
                // setChats([data, ...chats]);
                toast({
                    title: "New Group Chat Created!",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
            }

        } catch (error) {
            toast({
                title: "Failed to Create the Chat!",
                description: ' error.response.data',
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    }

    const handleDelete = async (delUser: any) => {
        setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
    }

    const handleGroup = async (userToAdd: any) => {
        if (selectedUsers.includes(userToAdd)) {
            toast({
                title: "User already added",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        setSelectedUsers([...selectedUsers, userToAdd]);
    }
    return (
        <>
            <span onClick={onOpen}>{children}</span>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize="35px"
                        fontFamily="Work sans"
                        display="flex"
                        justifyContent="center"
                    >
                        Create Group Chat
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display="flex" flexDir="column" alignItems="center">
                        <FormControl>
                            <Input
                                placeholder="Chat Name"
                                mb={3}
                                onChange={(e) => setGroupChatName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder="Add Users eg: John, Piyush, Jane"
                                mb={1}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </FormControl>
                        <Box w="100%" display="flex" flexWrap="wrap">
                            {selectedUsers.map((u: any) => (
                                <UserBadgeItem
                                    key={u._id}
                                    user={u}
                                    handleFunction={() => handleDelete(u)}
                                />
                            ))}
                        </Box>
                        {loading ? (
                            // <ChatLoading />
                            <div>Loading...</div>
                        ) : (
                            searchResult
                                ?.slice(0, 4)
                                .map((user: any) => (
                                    <UserListItem
                                        key={user._id}
                                        user={user}
                                        handleFunction={() => handleGroup(user)}
                                    />
                                ))
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleSubmit} colorScheme="blue">
                            Create Chat
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default GroupChatModel
