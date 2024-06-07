import { Box } from '@chakra-ui/react';
import ChatBox from 'Components/Message/ChatBox';
import Mychats from 'Components/Message/Mychats';
import SideDrawer from 'Components/Message/SideDrawer';
import { ChatState } from 'Context/ChatProvider';
import userRoutes from 'Services/Endpoints.ts/userEndPoints';
import React, {  useState } from 'react'

const ChatPage = () => {
    const [fetchAgain, setFetchAgain] = useState(false);

    const { userr } = ChatState();
    

    return (
        <div className=' sm:w-full w-[440px] ms-4 sm:ms-0'>
            {userRoutes && <SideDrawer />}
            <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
                {userr && <Mychats fetchAgain={fetchAgain} />}
                {userr && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
            </Box>
        </div>
    )
}

export default ChatPage
