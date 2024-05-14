import chatRoutes from "Services/Endpoints.ts/chatEndPoints";
import Api from "../Services/axios";
import messageRoutes from "Services/Endpoints.ts/messageEndPoints";

const fetchChat = async () => {
    try {
        return await Api.get(chatRoutes.fetchChat);
    } catch (error) {
        console.log(error as Error);
    }
}
const accessChat = async (userId: string) => {
    try {
        return await Api.post(chatRoutes.accessChat, { userId });
    } catch (error) {
        console.log(error as Error);
    }
}
const sendMessages = async (content: string, chatId: string) => {
    try {
        return await Api.post(messageRoutes.sendMessages, { content: content, chatId: chatId });
    } catch (error) {
        console.log(error as Error);
    }
}
const getMessages = async (chatId: string) => {
    try {
        return await Api.get(`${messageRoutes.getMessages}${chatId}`)
    } catch (error) {
        console.log(error as Error);
    }
}
const createGroupChat = async (name: string, users: any) => {
    try {
        return await Api.post(chatRoutes.createGroupChat, { name, users });
    } catch (error) {
        console.log(error);
    }
}
const renameGroup = async (chatId: string, chatName: string) => {
    try {
        return await Api.put(chatRoutes.renameGroup, { chatId: chatId, chatName: chatName })
    } catch (error) {
        console.log(error as Error);
    }
}
const groupremove = async (chatId: string, userId: string) => {
    try {
        return await Api.put(chatRoutes.groupRemoveUser, { chatId: chatId, userId: userId })
    } catch (error) {
        console.log(error as Error);
    }
}
const groupAddUser = async (chatId: string, userId: string) => {
    try {
        return await Api.put(chatRoutes.groupAddUser, { chatId: chatId, userId: userId });
    } catch (error) {
        console.log(error as Error);
    }
}
export {
    fetchChat,
    accessChat,
    sendMessages,
    getMessages,
    createGroupChat,
    renameGroup,
    groupremove,
    groupAddUser
}