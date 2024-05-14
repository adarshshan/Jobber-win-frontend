import { ViewIcon } from "@chakra-ui/icons";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    FormControl,
    Input,
    useToast,
    Box,
    IconButton,
    Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { ReactNode, useState } from "react";
import UserBadgeItem from "./UserBadgeItem";
import UserListItem from "./UserListItem";
import { ChatState } from "Context/ChatProvider";
import { getAllUsers } from "Api/user";
import { groupAddUser, groupremove, renameGroup } from "Api/chat";


interface IUpdateGroupChatModal {
    fetchMessages: () => Promise<void>;
    fetchAgain: boolean;
    setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
    children: ReactNode;

}
const UpdateGroupChatModal: React.FC<IUpdateGroupChatModal> = ({ children, fetchMessages, fetchAgain, setFetchAgain }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState('');
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameloading, setRenameLoading] = useState(false);
    const toast = useToast();

    const { selectedChat, setSelectedChat, userr } = ChatState();

    const handleSearch = async (query: string) => {
        setSearch(query);
        if (!query) return;
        try {
            setLoading(true);
            const res = await getAllUsers(query);
            if (res?.data.success) {
                setSearchResult(res.data.data);
            } else console.log('Somthing went wrong while fetching the users in hadlesearch in updateGropChatmodel')
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
            setLoading(false);
        }
    };

    const handleRename = async () => {
        if (!groupChatName) return;
        try {
            setRenameLoading(true);
            const res = await renameGroup(selectedChat._id, groupChatName);
            console.log(res);
            if (res?.data.success) {
                setSelectedChat(res.data.data);
                setFetchAgain(!fetchAgain);
            }
            setRenameLoading(false);
        } catch (error) {
            toast({
                title: "Error Occured!", description: 'error occured!', status: "error",
                duration: 5000, isClosable: true, position: "bottom",
            });
            setRenameLoading(false);
        }
        setGroupChatName("");
    };

    const handleAddUser = async (user1: any) => {
        if (selectedChat.users.find((u: any) => u._id === user1._id)) {
            toast({
                title: "User Already in group!", status: "error",
                duration: 5000, isClosable: true, position: "bottom",
            });
            return;
        }

        if (selectedChat.groupAdmin._id !== userr._id) {
            toast({
                title: "Only admins can add someone!", status: "error",
                duration: 5000, isClosable: true, position: "bottom",
            });
            return;
        }

        try {
            setLoading(true);
            const res = await groupAddUser(selectedChat._id, user1._id)
            if (res?.data.success) {
                setSelectedChat(res.data.data);
                setFetchAgain(!fetchAgain);
            } else console.log('Something went wrong while adding the user to the group!');
            setLoading(false);
        } catch (error) {
            toast({
                title: "Error Occured!", description: "Error occured!",
                status: "error", duration: 5000,
                isClosable: true, position: "bottom",
            });
            setLoading(false);
        }
        setGroupChatName("");
    };

    const handleRemove = async (user1: any) => {
        if (selectedChat.groupAdmin._id !== userr._id && user1._id !== userr._id) {
            toast({
                title: "Only admins can remove someone!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        try {
            setLoading(true);

            const res = await groupremove(selectedChat._id, user1._id);
            if (res?.data.success) {
                user1._id === userr._id ? setSelectedChat({}) : setSelectedChat(res.data.data);
                setFetchAgain(!fetchAgain);
                fetchMessages();
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast({
                title: "Error Occured!",
                description: 'something went wrong',
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
        setGroupChatName("");
    };

    return (
        <>
            <IconButton aria-label="Close" display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize="35px"
                        fontFamily="Work sans"
                        display="flex"
                        justifyContent="center"
                    >
                        {selectedChat.chatName}
                    </ModalHeader>

                    <ModalCloseButton />
                    <ModalBody display="flex" flexDir="column" alignItems="center">
                        <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
                            {selectedChat.users.map((u: any) => (
                                <UserBadgeItem
                                    key={u._id}
                                    user={u}
                                    handleFunction={() => handleRemove(u)}
                                />
                            ))}
                        </Box>
                        <FormControl display="flex">
                            <Input
                                placeholder="Chat Name"
                                mb={3}
                                value={groupChatName}
                                onChange={(e: any) => setGroupChatName(e.target.value)}
                            />
                            <Button
                                variant="solid"
                                colorScheme="teal"
                                ml={1}
                                isLoading={renameloading}
                                onClick={handleRename}
                            >
                                Update
                            </Button>
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder="Add User to group"
                                mb={1}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </FormControl>

                        {loading ? (
                            <Spinner size="lg" />
                        ) : (
                            searchResult?.map((user: any) => (
                                <UserListItem
                                    key={user?._id}
                                    user={user}
                                    handleFunction={() => handleAddUser(user)}
                                />
                            ))
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => handleRemove(userr)} colorScheme="red">
                            Leave Group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default UpdateGroupChatModal;
