import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ChatState {
    selectedChat: any;
    setSelectedChat: React.Dispatch<React.SetStateAction<any>>;
    userr: any | null;
    setUser: React.Dispatch<React.SetStateAction<string | null>>;
    notification: any[];
    setNotification: React.Dispatch<React.SetStateAction<any[]>>;
    chats: any[];
    setChats: React.Dispatch<React.SetStateAction<any[]>>;
    postId: string;
    setPostId: React.Dispatch<React.SetStateAction<string>>;
    again: boolean;
    setAgain: React.Dispatch<React.SetStateAction<boolean>>;
    videoLink: string;
    setVideoLink: React.Dispatch<React.SetStateAction<string>>;
}

const ChatContext = createContext<ChatState | null>(null);

interface ChatProviderProps {
    children: React.ReactNode;
}

const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
    const [selectedChat, setSelectedChat] = useState<any>();
    const [userr, setUser] = useState<any | null>(null);
    const [notification, setNotification] = useState<any[]>([]);
    const [chats, setChats] = useState<any[]>([]);
    const [postId, setPostId] = useState<string>('');
    const [again, setAgain] = useState(false);
    const [videoLink, setVideoLink] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = localStorage.getItem('userAddress');
        if (userInfo) setUser(JSON.parse(userInfo));
    }, [navigate]);

    return (
        <ChatContext.Provider
            value={{
                selectedChat,
                setSelectedChat,
                userr,
                setUser,
                notification,
                setNotification,
                chats,
                setChats,
                postId,
                setPostId,
                again,
                setAgain,
                videoLink,
                setVideoLink
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const ChatState = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChatState must be used within a ChatProvider");
    }
    return context;
};

export default ChatProvider;
